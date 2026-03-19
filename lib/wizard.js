import inquirer from 'inquirer';
import chalk from 'chalk';
import { readFileSync } from 'fs';
import { basename, resolve } from 'path';
import {
  PLUGIN_PRESETS,
  ALL_PLUGINS,
  REPORT_STYLES,
  DEFAULT_HOURLY_RATE,
  I18N,
  ROLES,
  EXPERIENCE_LEVELS,
  COMM_STYLES
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
 * @returns {Promise<{projectName: string, hourlyRate: number, reportStyle: string, plugins: object[], techStack: string[], lang: string, profile?: {role: string, specialization: string, level: string, commStyle: string}}>}
 */
export async function wizard(techStack = []) {
  // Language selection FIRST — before anything else
  const { lang } = await inquirer.prompt([{
    type: 'list',
    name: 'lang',
    message: 'Sprache / Language:',
    choices: [
      { name: 'Deutsch', value: 'de' },
      { name: 'English', value: 'en' }
    ]
  }]);

  const t = I18N[lang];

  console.log();
  console.log(chalk.bold.cyan('  ' + t.wizard.title));
  console.log();

  if (techStack.length > 0) {
    const detected = [...(techStack.languages || []), ...(techStack.frameworks || [])];
    if (detected.length > 0) {
      console.log(chalk.dim('  ' + t.wizard.detectedStack) + chalk.yellow(detected.join(', ')));
      console.log();
    }
  }

  const defaultName = detectProjectName();

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: t.wizard.projectName,
      default: defaultName
    },
    {
      type: 'input',
      name: 'projectDescription',
      message: t.wizard.projectDescription
    },
    {
      type: 'number',
      name: 'hourlyRate',
      message: t.wizard.hourlyRate,
      default: DEFAULT_HOURLY_RATE
    },
    {
      type: 'list',
      name: 'reportStyle',
      message: t.wizard.reportStyle,
      choices: Object.entries(REPORT_STYLES).map(([key, val]) => ({
        name: val.label,
        value: key
      }))
    },
    {
      type: 'list',
      name: 'pluginPreset',
      message: t.wizard.pluginPreset,
      choices: [
        { name: `Minimal  — ${PLUGIN_PRESETS.minimal.map(p => p.name).join(', ')}`,  value: 'minimal' },
        { name: `Standard — ${PLUGIN_PRESETS.standard.map(p => p.name).join(', ')}`, value: 'standard' },
        { name: `Full     — ${PLUGIN_PRESETS.full.map(p => p.name).join(', ')}`,     value: 'full' },
        { name: t.wizard.custom, value: 'custom' }
      ]
    },
    {
      type: 'checkbox',
      name: 'customPlugins',
      message: t.wizard.selectPlugins,
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

  // ── Optional personalization ──────────────────────────────────────
  let profile = null;

  const { wantsProfile } = await inquirer.prompt([{
    type: 'confirm',
    name: 'wantsProfile',
    message: t.wizard.personalize,
    default: false
  }]);

  if (wantsProfile) {
    console.log();
    console.log(chalk.bold.cyan('  ' + t.profile.title));
    console.log();

    const profileAnswers = await inquirer.prompt([
      {
        type: 'list',
        name: 'role',
        message: t.wizard.role,
        choices: ROLES.map(r => ({ name: r[lang], value: r.value }))
      },
      {
        type: 'input',
        name: 'specialization',
        message: t.wizard.specialization,
        validate: (input) => input.length <= 100 || (lang === 'de' ? 'Max. 100 Zeichen' : 'Max 100 characters')
      },
      {
        type: 'list',
        name: 'level',
        message: t.wizard.experienceLevel,
        choices: EXPERIENCE_LEVELS.map(l => ({ name: l[lang], value: l.value }))
      },
      {
        type: 'list',
        name: 'commStyle',
        message: t.wizard.commStyle,
        choices: COMM_STYLES.map(c => ({ name: c[lang], value: c.value }))
      }
    ]);

    profile = {
      role: profileAnswers.role,
      specialization: profileAnswers.specialization || '',
      level: profileAnswers.level,
      commStyle: profileAnswers.commStyle
    };
  }

  return {
    projectName: answers.projectName,
    projectDescription: answers.projectDescription || '',
    hourlyRate: answers.hourlyRate,
    reportStyle: answers.reportStyle,
    plugins,
    techStack,
    lang,
    profile
  };
}
