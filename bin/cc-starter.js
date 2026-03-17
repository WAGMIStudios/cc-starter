#!/usr/bin/env node

import chalk from 'chalk';
import { detect } from '../lib/detect.js';
import { wizard } from '../lib/wizard.js';
import { scaffold } from '../lib/scaffold.js';
import { installPlugins } from '../lib/plugins.js';
import { I18N } from '../lib/constants.js';

async function main() {
  // 1. Banner
  console.log(chalk.cyan.bold(`
  ╔═══════════════════════════════════════╗
  ║        cc-starter v1.0.0              ║
  ║   Claude Code Project Kickstart       ║
  ╚═══════════════════════════════════════╝
  `));

  // 2. Auto-detect tech stack
  console.log(chalk.dim('  Detecting tech stack...'));
  const techStack = detect(process.cwd());

  if (techStack.languages.length > 0 || techStack.frameworks.length > 0) {
    const detected = [...techStack.languages, ...techStack.frameworks].join(', ');
    console.log(chalk.green(`  ✓ Found: ${detected}\n`));
  } else {
    console.log(chalk.dim('  No specific tech stack detected (empty or new project)\n'));
  }

  // 3. Interactive wizard (language selection happens first inside wizard)
  const config = await wizard(techStack);
  const lang = config.lang || 'en';
  const t = I18N[lang];

  // 4. Scaffold files
  console.log(chalk.cyan(`\n  ${t.scaffold.scaffolding}\n`));
  const result = await scaffold(config);

  // 5. Install plugins
  await installPlugins(config.plugins, lang);

  // 6. Summary
  console.log(chalk.green.bold(`
  ══════════════════════════════════════════
  ${t.summary.done}

  ${t.summary.quickCommands}
    node scripts/stats/cocomo.js          → ${t.summary.costEstimate}
    node scripts/stats/vibe-code.js help  → ${t.summary.tokenTools}
    node scripts/stats/project-report.js  → ${t.summary.htmlStats}
  ══════════════════════════════════════════
  `));
}

main().catch(err => {
  console.error(chalk.red(`\n  Error: ${err.message}\n`));
  process.exit(1);
});
