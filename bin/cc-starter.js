#!/usr/bin/env node

import chalk from 'chalk';
import { detect } from '../lib/detect.js';
import { wizard } from '../lib/wizard.js';
import { scaffold } from '../lib/scaffold.js';
import { installPlugins } from '../lib/plugins.js';

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

  // 3. Interactive wizard
  const config = await wizard(techStack);

  // 4. Scaffold files
  console.log(chalk.cyan('\n  Scaffolding project...\n'));
  const result = await scaffold(config);

  // 5. Install plugins
  await installPlugins(config.plugins);

  // 6. Summary
  console.log(chalk.green.bold(`
  ══════════════════════════════════════════
  Done! Run 'claude' to start coding.

  Quick commands:
    node scripts/stats/cocomo.js          → Project cost estimate
    node scripts/stats/vibe-code.js help  → Token-saving tools
    node scripts/stats/project-report.js  → HTML statistics
  ══════════════════════════════════════════
  `));
}

main().catch(err => {
  console.error(chalk.red(`\n  Error: ${err.message}\n`));
  process.exit(1);
});
