import fs from 'node:fs';
import path from 'node:path';

/**
 * Detect programming languages and frameworks in the given directory.
 * @param {string} cwd - Directory to analyze
 * @returns {{ languages: string[], frameworks: string[], raw: object }}
 */
export function detect(cwd) {
  const languages = [];
  const frameworks = [];
  const raw = { files: [], packageJson: null, requirements: null, pyproject: null };

  const exists = (file) => {
    try { return fs.existsSync(path.join(cwd, file)); } catch { return false; }
  };

  const globMatch = (ext) => {
    try {
      const entries = fs.readdirSync(cwd);
      return entries.some((e) => e.endsWith(ext));
    } catch { return false; }
  };

  const readJson = (file) => {
    try { return JSON.parse(fs.readFileSync(path.join(cwd, file), 'utf-8')); } catch { return null; }
  };

  const readText = (file) => {
    try { return fs.readFileSync(path.join(cwd, file), 'utf-8'); } catch { return null; }
  };

  // ── Language detection ──────────────────────────────────────────────

  const pkg = readJson('package.json');
  if (pkg) raw.packageJson = pkg;

  if (pkg || globMatch('.ts')) {
    const hasTs = pkg?.devDependencies?.typescript || pkg?.dependencies?.typescript || globMatch('.ts');
    languages.push(hasTs ? 'TypeScript' : 'JavaScript');
  }

  const hasPython = exists('requirements.txt') || exists('pyproject.toml') || exists('setup.py');
  if (hasPython) languages.push('Python');

  if (exists('go.mod'))        languages.push('Go');
  if (exists('Cargo.toml'))    languages.push('Rust');
  if (exists('pom.xml') || exists('build.gradle') || exists('build.gradle.kts')) languages.push('Java');
  if (globMatch('.csproj') || globMatch('.sln')) languages.push('C# / .NET');
  if (exists('Gemfile'))       languages.push('Ruby');
  if (exists('composer.json')) languages.push('PHP');

  // ── Framework detection (Node / package.json) ──────────────────────

  if (pkg) {
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };

    const nodeFw = [
      ['next',                 'Next.js'],
      ['react',                'React'],
      ['vue',                  'Vue'],
      ['@angular/core',        'Angular'],
      ['svelte',               'Svelte'],
      ['express',              'Express'],
      ['fastify',              'Fastify'],
      ['tailwindcss',          'Tailwind CSS'],
      ['prisma',               'Prisma'],
      ['drizzle-orm',          'Drizzle'],
      ['@supabase/supabase-js','Supabase'],
      ['mongoose',             'MongoDB'],
    ];

    for (const [dep, name] of nodeFw) {
      if (allDeps[dep]) frameworks.push(name);
    }
  }

  // ── Framework detection (Python) ───────────────────────────────────

  if (hasPython) {
    const reqTxt = readText('requirements.txt');
    const pyproject = readText('pyproject.toml');
    if (reqTxt) raw.requirements = reqTxt;
    if (pyproject) raw.pyproject = pyproject;

    const pythonSource = [reqTxt, pyproject].filter(Boolean).join('\n').toLowerCase();

    const pyFw = [
      ['fastapi', 'FastAPI'],
      ['django',  'Django'],
      ['flask',   'Flask'],
    ];

    for (const [pkg, name] of pyFw) {
      if (pythonSource.includes(pkg)) frameworks.push(name);
    }
  }

  // ── Collect notable files for raw output ───────────────────────────

  const notable = [
    'package.json', 'tsconfig.json', 'requirements.txt', 'pyproject.toml',
    'setup.py', 'go.mod', 'Cargo.toml', 'pom.xml', 'build.gradle',
    'build.gradle.kts', 'Gemfile', 'composer.json',
  ];
  raw.files = notable.filter(exists);

  return { languages, frameworks, raw };
}
