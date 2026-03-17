import { execSync } from 'node:child_process';
import chalk from 'chalk';
import { I18N } from './constants.js';

/**
 * Check whether the `claude` CLI is available on this machine.
 * @returns {boolean}
 */
function isClaudeAvailable() {
  try {
    execSync('claude --version', { stdio: 'ignore', timeout: 10000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Install Claude Code plugins.
 *
 * - If no plugins are selected, prints a dim note and returns.
 * - If the `claude` CLI is not found, prints manual-install instructions.
 * - Otherwise attempts `claude plugin install` for each plugin, falling back
 *   to manual instructions on failure.
 *
 * @param {Array<{ name: string, source: string }>} plugins
 * @param {string} [lang='en'] - Language code ('de' or 'en')
 */
export async function installPlugins(plugins, lang = 'en') {
  const t = I18N[lang];

  if (!plugins || plugins.length === 0) {
    console.log(chalk.dim(`  ${t.plugins.noPlugins}`));
    return;
  }

  // ── Pre-flight: is the CLI installed? ─────────────────────────────

  if (!isClaudeAvailable()) {
    console.log(chalk.yellow(`\n  ⚠ ${t.plugins.cliNotFound}`));
    console.log(chalk.dim(`    ${t.plugins.installFirst}`));
    console.log(chalk.dim(`    ${t.plugins.manualInstall}\n`));
    for (const p of plugins) {
      console.log(chalk.dim(`    claude plugin install ${p.name}@${p.source}`));
    }
    return;
  }

  // ── Install each plugin ───────────────────────────────────────────

  console.log(chalk.cyan(`\n  ${t.plugins.installing}\n`));

  // Show what will be installed
  for (const p of plugins) {
    console.log(chalk.white(`    ${p.name}`) + chalk.dim(` — ${p.desc}`));
  }
  console.log('');

  let installed = 0;
  let failed = 0;

  for (const plugin of plugins) {
    const ref = `${plugin.name}@${plugin.source}`;
    try {
      console.log(chalk.dim(`  Installing ${plugin.name}...`));
      execSync(`claude plugin install ${ref}`, {
        stdio: 'inherit',
        timeout: 30000,
      });
      console.log(chalk.green(`  ✓ ${plugin.name}`) + chalk.dim(` — ${t.plugins.installed}`));
      installed++;
    } catch {
      console.log(chalk.yellow(`  ⚠ ${plugin.name} — ${t.plugins.manualNeeded}`));
      console.log(chalk.dim(`    claude plugin install ${ref}`));
      failed++;
    }
  }

  // ── Summary ───────────────────────────────────────────────────────

  console.log('');
  if (installed > 0) console.log(chalk.green(`  ${installed} ${t.plugins.pluginsInstalled}`));
  if (failed > 0)    console.log(chalk.yellow(`  ${failed} ${t.plugins.pluginsManual}`));
}
