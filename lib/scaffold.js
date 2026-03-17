import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import Handlebars from 'handlebars';
import inquirer from 'inquirer';
import chalk from 'chalk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE_DIR = path.join(__dirname, '..', 'template');

/**
 * Scaffold a cc-starter project into the given directory.
 * @param {object} config - Wizard output
 * @param {string} [cwd=process.cwd()] - Target directory
 * @returns {Promise<{ filesCreated: number, filesSkipped: number }>}
 */
export async function scaffold(config, cwd = process.cwd()) {
  let filesCreated = 0;
  let filesSkipped = 0;

  // ── 1. .claude/ directory structure ────────────────────────────────
  const claudeDir = path.join(cwd, '.claude');
  const claudeExists = fs.existsSync(claudeDir);

  let claudeAction = 'overwrite';
  if (claudeExists) {
    const answer = await inquirer.prompt([{
      type: 'list',
      name: 'action',
      message: 'Existing .claude/ found. What should we do?',
      choices: [
        { name: 'Overwrite — replace all files', value: 'overwrite' },
        { name: 'Merge — keep existing, add missing files only', value: 'merge' },
        { name: 'Skip — leave .claude/ untouched', value: 'skip' }
      ]
    }]);
    claudeAction = answer.action;
  }

  if (claudeAction === 'skip') {
    console.log(chalk.yellow('  ⊘ .claude/') + chalk.dim('                 skipped'));
    filesSkipped += countFiles(path.join(TEMPLATE_DIR, 'claude'));
  } else {
    const result = copyClaudeDir(claudeAction, cwd);
    filesCreated += result.created;
    filesSkipped += result.skipped;
  }

  // ── 2. Render CLAUDE.md from Handlebars template ──────────────────
  const claudeMdPath = path.join(cwd, 'CLAUDE.md');
  const claudeMdExists = fs.existsSync(claudeMdPath);

  let claudeMdAction = 'overwrite';
  if (claudeMdExists) {
    const answer = await inquirer.prompt([{
      type: 'list',
      name: 'action',
      message: 'Existing CLAUDE.md found. What should we do?',
      choices: [
        { name: 'Overwrite — replace with cc-starter version', value: 'overwrite' },
        { name: 'Append — add cc-starter section at the end', value: 'append' },
        { name: 'Skip — leave CLAUDE.md untouched', value: 'skip' }
      ]
    }]);
    claudeMdAction = answer.action;
  }

  if (claudeMdAction === 'skip') {
    console.log(chalk.yellow('  ⊘ CLAUDE.md') + chalk.dim('               skipped'));
    filesSkipped += 1;
  } else {
    renderClaudeMd(config, claudeMdAction, cwd);
    filesCreated += 1;
    console.log(chalk.green('  ✓ CLAUDE.md') + chalk.dim(`               ${claudeMdAction === 'append' ? 'appended' : 'created'}`));
  }

  // ── 3. Copy scripts/stats/ (always overwrite) ─────────────────────
  const scriptsResult = copyScriptsStats(cwd);
  filesCreated += scriptsResult.created;
  console.log(chalk.green('  ✓ scripts/stats/') + chalk.dim(`          ${scriptsResult.created} files`));

  // ── 4. Create .cc-starter.json (always overwrite) ──────────────────
  const ccConfig = {
    projectName: config.projectName,
    hourlyRate: config.hourlyRate,
    reportStyle: config.reportStyle,
    createdAt: new Date().toISOString(),
    version: '1.0.0'
  };
  fs.writeJsonSync(path.join(cwd, '.cc-starter.json'), ccConfig, { spaces: 2 });
  filesCreated += 1;
  console.log(chalk.green('  ✓ .cc-starter.json') + chalk.dim('        created'));

  // ── 5. Update .gitignore ───────────────────────────────────────────
  const gitignoreUpdated = updateGitignore(cwd);
  if (gitignoreUpdated) {
    filesCreated += 1;
    console.log(chalk.green('  ✓ .gitignore') + chalk.dim('              updated'));
  } else {
    console.log(chalk.dim('  - .gitignore              already up to date'));
  }

  console.log();
  console.log(chalk.bold.green(`  Done!`) + chalk.dim(` ${filesCreated} created, ${filesSkipped} skipped`));

  return { filesCreated, filesSkipped };
}

// ── Helpers ────────────────────────────────────────────────────────────

/**
 * Copy the template/claude/ tree into cwd/.claude/.
 * In 'merge' mode, only copies files that don't already exist.
 */
function copyClaudeDir(action, cwd) {
  const src = path.join(TEMPLATE_DIR, 'claude');
  const dest = path.join(cwd, '.claude');
  let created = 0;
  let skipped = 0;

  const subdirs = [
    { dir: 'rules',     files: ['01-general.md', '02-code-standards.md', '03-dev-ops.md'] },
    { dir: 'memory',    files: ['MEMORY.md'] },
    { dir: 'project',   files: ['README.md'] },
    { dir: 'reference', files: ['README.md'] },
    { dir: 'commands',  files: ['kickstart.md'] },
  ];

  // Also copy settings.json at the root of .claude/
  const rootFiles = ['settings.json'];

  for (const { dir, files } of subdirs) {
    const destDir = path.join(dest, dir);
    fs.ensureDirSync(destDir);
    let dirCreated = 0;

    for (const file of files) {
      const srcFile = path.join(src, dir, file);
      const destFile = path.join(destDir, file);

      if (action === 'merge' && fs.existsSync(destFile)) {
        skipped += 1;
        continue;
      }

      fs.copySync(srcFile, destFile);
      dirCreated += 1;
      created += 1;
    }

    if (dirCreated > 0) {
      console.log(chalk.green(`  ✓ .claude/${dir}/`) + chalk.dim(`          ${dirCreated} file${dirCreated !== 1 ? 's' : ''}`));
    } else {
      console.log(chalk.yellow(`  ⊘ .claude/${dir}/`) + chalk.dim('          skipped (exists)'));
    }
  }

  for (const file of rootFiles) {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);

    if (action === 'merge' && fs.existsSync(destFile)) {
      skipped += 1;
      console.log(chalk.yellow(`  ⊘ .claude/${file}`) + chalk.dim('       skipped (exists)'));
      continue;
    }

    fs.copySync(srcFile, destFile);
    created += 1;
    console.log(chalk.green(`  ✓ .claude/${file}`) + chalk.dim('       created'));
  }

  return { created, skipped };
}

/**
 * Render CLAUDE.md from Handlebars template.
 */
function renderClaudeMd(config, action, cwd) {
  const templateSrc = fs.readFileSync(path.join(TEMPLATE_DIR, 'CLAUDE.md.hbs'), 'utf-8');
  const template = Handlebars.compile(templateSrc);

  const techStack = config.techStack || { languages: [], frameworks: [] };
  const rendered = template({
    projectName: config.projectName,
    techStack
  });

  const destPath = path.join(cwd, 'CLAUDE.md');

  if (action === 'append') {
    const existing = fs.readFileSync(destPath, 'utf-8');
    const separator = '\n\n---\n\n<!-- cc-starter section -->\n';
    fs.writeFileSync(destPath, existing + separator + rendered, 'utf-8');
  } else {
    fs.writeFileSync(destPath, rendered, 'utf-8');
  }
}

/**
 * Copy scripts/stats/ files (always overwrite).
 */
function copyScriptsStats(cwd) {
  const src = path.join(TEMPLATE_DIR, 'scripts', 'stats');
  const dest = path.join(cwd, 'scripts', 'stats');
  fs.ensureDirSync(dest);

  const files = fs.readdirSync(src).filter(f => f.endsWith('.js'));
  for (const file of files) {
    fs.copySync(path.join(src, file), path.join(dest, file));
  }

  return { created: files.length };
}

/**
 * Append cc-starter entries to .gitignore if not already present.
 * @returns {boolean} true if .gitignore was modified
 */
function updateGitignore(cwd) {
  const gitignorePath = path.join(cwd, '.gitignore');
  let content = '';

  if (fs.existsSync(gitignorePath)) {
    content = fs.readFileSync(gitignorePath, 'utf-8');
  }

  const marker = '# cc-starter';
  if (content.includes(marker)) {
    return false;
  }

  const block = [
    '',
    '# cc-starter',
    '.vibe-stats.json',
    'stats/report.html',
    ''
  ].join('\n');

  // Ensure we start on a new line
  const prefix = content.length > 0 && !content.endsWith('\n') ? '\n' : '';
  fs.writeFileSync(gitignorePath, content + prefix + block, 'utf-8');
  return true;
}

/**
 * Count files recursively in a directory.
 */
function countFiles(dir) {
  if (!fs.existsSync(dir)) return 0;
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      count += countFiles(path.join(dir, entry.name));
    } else {
      count += 1;
    }
  }
  return count;
}
