import inquirer from 'inquirer';
import chalk from 'chalk';
import { readFileSync } from 'fs';
import { basename, resolve } from 'path';
import {
  PLUGIN_PRESETS,
  ALL_PLUGINS,
  REPORT_STYLES,
  DEFAULT_HOURLY_RATE
} from './constants.js';

/**
 * Detect project name from package.json or fall back to folder name.
 */
function detectProjectName() {
  try {
    const pkg = JSON.parse(readFileSync(resolve('package.json'), 'utf-8'));
    if (pkg.name) return pkg.name;
  } catch {
    // no package.json — fall through
  }
  return basename(resolve('.'));
}

/**
 * Interactive setup wizard.
 * @param {string[]} techStack - Auto-detected technologies (e.g. ['Node.js', 'TypeScript', 'React'])
 * @returns {Promise<{projectName: string, hourlyRate: number, reportStyle: string, plugins: object[], techStack: string[]}>}
 */
export async function wizard(techStack = []) {
  console.log();
  console.log(chalk.bold.cyan('  cc-starter') + chalk.dim(' — project kickstart wizard'));
  console.log();

  if (techStack.length > 0) {
    console.log(chalk.dim('  Detected tech stack: ') + chalk.yellow(techStack.join(', ')));
    console.log();
  }

  const defaultName = detectProjectName();

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: defaultName
    },
    {
      type: 'number',
      name: 'hourlyRate',
      message: 'Hourly rate for COCOMO estimation (\u20ac):',
      default: DEFAULT_HOURLY_RATE
    },
    {
      type: 'list',
      name: 'reportStyle',
      message: 'Report style:',
      choices: Object.entries(REPORT_STYLES).map(([key, val]) => ({
        name: val.label,
        value: key
      }))
    },
    {
      type: 'list',
      name: 'pluginPreset',
      message: 'Plugin preset:',
      choices: [
        { name: `Minimal  — ${PLUGIN_PRESETS.minimal.map(p => p.name).join(', ')}`,  value: 'minimal' },
        { name: `Standard — ${PLUGIN_PRESETS.standard.map(p => p.name).join(', ')}`, value: 'standard' },
        { name: `Full     — ${PLUGIN_PRESETS.full.map(p => p.name).join(', ')}`,     value: 'full' },
        { name: 'Custom   — pick individual plugins',                                value: 'custom' }
      ]
    },
    {
      type: 'checkbox',
      name: 'customPlugins',
      message: 'Select plugins:',
      when: (ans) => ans.pluginPreset === 'custom',
      choices: ALL_PLUGINS.map((p) => ({
        name: `${p.name} ${chalk.dim('— ' + p.desc)}`,
        value: p,
        checked: false
      }))
    }
  ]);

  const plugins = answers.pluginPreset === 'custom'
    ? answers.customPlugins || []
    : PLUGIN_PRESETS[answers.pluginPreset];

  return {
    projectName: answers.projectName,
    hourlyRate: answers.hourlyRate,
    reportStyle: answers.reportStyle,
    plugins,
    techStack
  };
}
