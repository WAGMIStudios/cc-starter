import { execSync } from 'node:child_process';
import chalk from 'chalk';

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
 */
export async function installPlugins(plugins) {
  if (!plugins || plugins.length === 0) {
    console.log(chalk.dim('  No plugins selected.'));
    return;
  }

  // ── Pre-flight: is the CLI installed? ─────────────────────────────

  if (!isClaudeAvailable()) {
    console.log(chalk.yellow('\n  ⚠ Claude Code CLI not found. Skipping plugin installation.'));
    console.log(chalk.dim('    Install Claude Code first: https://claude.ai/download'));
    console.log(chalk.dim('    Then install plugins manually:\n'));
    for (const p of plugins) {
      console.log(chalk.dim(`    claude plugin install ${p.name}@${p.source}`));
    }
    return;
  }

  // ── Install each plugin ───────────────────────────────────────────

  console.log(chalk.cyan('\n  Installing plugins...\n'));

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
      console.log(chalk.green(`  ✓ ${plugin.name}`));
      installed++;
    } catch {
      console.log(chalk.yellow(`  ⚠ ${plugin.name} — manual install needed:`));
      console.log(chalk.dim(`    claude plugin install ${ref}`));
      failed++;
    }
  }

  // ── Summary ───────────────────────────────────────────────────────

  console.log('');
  if (installed > 0) console.log(chalk.green(`  ${installed} plugin(s) installed`));
  if (failed > 0)    console.log(chalk.yellow(`  ${failed} plugin(s) need manual installation`));
}
