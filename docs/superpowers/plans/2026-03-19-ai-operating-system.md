# AI Operating System Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an optional developer personalization step to the cc-starter wizard that generates a user profile memory file with auto-derived behavioral preferences.

**Architecture:** Extend the existing wizard → scaffold pipeline. New constants/I18N keys and a `derivePreferences()` function in `constants.js`, new prompts appended to `wizard.js`, and a new scaffold step in `scaffold.js` that writes `user_profile.md` + updates MEMORY.md and .gitignore.

**Tech Stack:** Node.js ES Modules, inquirer, chalk, fs-extra

**Spec:** `docs/superpowers/specs/2026-03-19-ai-operating-system-design.md`

**Note:** This project has no test suite. Verification is done by running `node bin/cc-starter.js` manually.

---

### Task 1: Add constants, I18N keys, and derivePreferences to constants.js

**Files:**
- Modify: `lib/constants.js`

- [ ] **Step 1: Add ROLES constant after ALL_PLUGINS (line 27)**

```js
export const ROLES = [
  { value: 'frontend',  en: 'Frontend Developer',          de: 'Frontend Developer' },
  { value: 'backend',   en: 'Backend Developer',           de: 'Backend Developer' },
  { value: 'fullstack', en: 'Fullstack Developer',         de: 'Fullstack Developer' },
  { value: 'techlead',  en: 'Tech Lead / Architect',       de: 'Tech Lead / Architect' },
  { value: 'devops',    en: 'DevOps / SRE',                de: 'DevOps / SRE' },
  { value: 'data',      en: 'Data Scientist / ML Engineer', de: 'Data Scientist / ML Engineer' },
  { value: 'student',   en: 'Student / Learning',          de: 'Student / Lernend' },
  { value: 'other',     en: 'Other',                       de: 'Andere' }
];

export const EXPERIENCE_LEVELS = [
  { value: 'beginner',     en: 'Beginner (< 1 year)',      de: 'Einsteiger (< 1 Jahr)' },
  { value: 'intermediate', en: 'Intermediate (1-3 years)',  de: 'Fortgeschritten (1-3 Jahre)' },
  { value: 'experienced',  en: 'Experienced (3-7 years)',   de: 'Erfahren (3-7 Jahre)' },
  { value: 'senior',       en: 'Senior (7+ years)',         de: 'Senior (7+ Jahre)' }
];

export const COMM_STYLES = [
  { value: 'short',    en: 'Short & direct — code and results, minimal explanations',  de: 'Kurz & direkt — Code und Ergebnis, minimale Erklärungen' },
  { value: 'balanced', en: 'Balanced — brief explanations when needed',                 de: 'Balanced — kurze Erklärungen wenn nötig' },
  { value: 'detailed', en: 'Detailed — explain decisions and alternatives',             de: 'Ausführlich — Entscheidungen und Alternativen erklären' }
];
```

- [ ] **Step 2: Add derivePreferences function after COMM_STYLES**

```js
export function derivePreferences(role, level, commStyle, lang) {
  const prefs = [];
  const t = I18N[lang]?.profile?.preferences || I18N.en.profile.preferences;

  // Level-based
  if (level === 'experienced' || level === 'senior') {
    prefs.push(t.noBeginnerExplanations);
  }
  if (level === 'senior') {
    prefs.push(t.noBasicsRepetition);
  }

  // Communication style
  if (commStyle === 'short') {
    prefs.push(t.noSummaries);
  }
  if (commStyle === 'detailed') {
    prefs.push(t.showAlternatives);
  }

  // Role-based
  if (role === 'student') {
    prefs.push(t.explainConcepts);
  }
  if (role === 'techlead') {
    prefs.push(t.architectureFocus);
  }
  if (role === 'devops') {
    prefs.push(t.infraFocus);
  }

  return prefs;
}
```

- [ ] **Step 3: Add I18N keys for wizard profile section and profile preferences**

Add to `I18N.de.wizard`:
```js
personalize: 'Claude personalisieren?',
role: 'Deine Rolle:',
specialization: 'Spezialisierung / Schwerpunkt (optional, max 100 Zeichen):',
experienceLevel: 'Erfahrungslevel:',
commStyle: 'Kommunikationsstil:',
```

Add to `I18N.en.wizard`:
```js
personalize: 'Personalize Claude?',
role: 'Your role:',
specialization: 'Specialization / focus (optional, max 100 chars):',
experienceLevel: 'Experience level:',
commStyle: 'Communication style:',
```

Add to `I18N.de` (new `profile` key):
```js
profile: {
  title: 'Personalisierung',
  headings: {
    role: '## Rolle',
    experience: '## Erfahrung',
    commStyle: '## Kommunikationsstil',
    preferences: '## Präferenzen'
  },
  preferences: {
    noBeginnerExplanations: 'Keine Anfänger-Erklärungen bei Standardkonzepten',
    noBasicsRepetition: 'Keine Wiederholung von Grundlagen, erwarte eigenständiges Urteil',
    noSummaries: 'Keine Zusammenfassungen am Ende, keine Einleitungen',
    showAlternatives: 'Alternativen und Trade-offs immer mitliefern',
    explainConcepts: 'Konzepte erklären, Lernressourcen vorschlagen',
    architectureFocus: 'Architektur-Perspektive priorisieren, Team-Impact berücksichtigen',
    infraFocus: 'Infrastruktur, Sicherheit und Monitoring mitdenken'
  },
  existingProfile: 'Vorhandenes Profil gefunden. Was soll passieren?',
  overwriteProfile: 'Überschreiben',
  skipProfile: 'Überspringen'
}
```

Add to `I18N.en` (new `profile` key):
```js
profile: {
  title: 'Personalization',
  headings: {
    role: '## Role',
    experience: '## Experience',
    commStyle: '## Communication Style',
    preferences: '## Preferences'
  },
  preferences: {
    noBeginnerExplanations: 'No beginner explanations for standard concepts',
    noBasicsRepetition: 'No repetition of basics, expect independent judgment',
    noSummaries: 'No summaries at the end, no introductions',
    showAlternatives: 'Always provide alternatives and trade-offs',
    explainConcepts: 'Explain concepts, suggest learning resources',
    architectureFocus: 'Prioritize architecture perspective, consider team impact',
    infraFocus: 'Think about infrastructure, security, and monitoring'
  },
  existingProfile: 'Existing profile found. What should we do?',
  overwriteProfile: 'Overwrite',
  skipProfile: 'Skip'
}
```

- [ ] **Step 4: Commit**

```bash
git add lib/constants.js
git commit -m "feat: add ROLES, EXPERIENCE_LEVELS, COMM_STYLES constants and derivePreferences function"
```

---

### Task 2: Add personalization prompts to wizard.js

**Files:**
- Modify: `lib/wizard.js:1-123`

- [ ] **Step 1: Update import to include new constants**

In `lib/wizard.js:5-11`, update the import:

```js
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
```

- [ ] **Step 2: Update JSDoc at line 26-29**

```js
/**
 * Interactive setup wizard.
 * @param {string[]} techStack - Auto-detected technologies (e.g. ['Node.js', 'TypeScript', 'React'])
 * @returns {Promise<{projectName: string, hourlyRate: number, reportStyle: string, plugins: object[], techStack: string[], lang: string, profile?: {role: string, specialization: string, level: string, commStyle: string}}>}
 */
```

- [ ] **Step 3: Add personalization prompts after plugin resolution (after line 112)**

Insert after `const plugins = ...` block and before `return {`:

```js
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
```

- [ ] **Step 4: Add `profile` to the return object**

Update the return at line 114-122:

```js
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
```

- [ ] **Step 5: Commit**

```bash
git add lib/wizard.js
git commit -m "feat: add optional personalization prompts to wizard"
```

---

### Task 3: Add profile writing to scaffold.js

**Files:**
- Modify: `lib/scaffold.js:1-274`

- [ ] **Step 1: Update import to include derivePreferences and new constants**

In `lib/scaffold.js:7`, update:

```js
import { I18N, derivePreferences, ROLES, EXPERIENCE_LEVELS, COMM_STYLES } from './constants.js';
```

- [ ] **Step 2: Add writeUserProfile helper function before the `countFiles` function (before line 259)**

```js
/**
 * Write .claude/memory/user_profile.md from profile config.
 * Skipped if claudeAction is 'skip'.
 * @returns {{ created: boolean }}
 */
async function writeUserProfile(config, claudeAction, cwd, lang, t) {
  if (!config.profile || claudeAction === 'skip') {
    return { created: false };
  }

  const profilePath = path.join(cwd, '.claude', 'memory', 'user_profile.md');
  const profileExists = fs.existsSync(profilePath);

  if (profileExists) {
    const answer = await inquirer.prompt([{
      type: 'list',
      name: 'action',
      message: t.profile.existingProfile,
      choices: [
        { name: t.profile.overwriteProfile, value: 'overwrite' },
        { name: t.profile.skipProfile, value: 'skip' }
      ]
    }]);
    if (answer.action === 'skip') {
      console.log(chalk.yellow('  ⊘ user_profile.md') + chalk.dim(`         ${t.scaffold.skipped}`));
      return { created: false };
    }
  }

  const { role, specialization, level, commStyle } = config.profile;
  const preferences = derivePreferences(role, level, commStyle, lang);
  const h = t.profile.headings;

  // Find display labels
  const roleObj = ROLES.find(r => r.value === role);
  const levelObj = EXPERIENCE_LEVELS.find(l => l.value === level);
  const commObj = COMM_STYLES.find(c => c.value === commStyle);

  const roleLabel = roleObj ? roleObj[lang] : role;
  const levelLabel = levelObj ? levelObj[lang] : level;
  const commLabel = commObj ? commObj[lang] : commStyle;

  const roleLine = specialization ? `${roleLabel} — ${specialization}` : roleLabel;

  const lines = [
    '---',
    'name: User Profile',
    'description: Role, experience level, communication preferences and auto-derived guidelines',
    'type: user',
    '---',
    '',
    h.role,
    roleLine,
    '',
    h.experience,
    levelLabel,
    '',
    h.commStyle,
    commLabel,
  ];

  if (preferences.length > 0) {
    lines.push('', h.preferences);
    for (const pref of preferences) {
      lines.push(`- ${pref}`);
    }
  }

  lines.push('');

  fs.ensureDirSync(path.join(cwd, '.claude', 'memory'));
  fs.writeFileSync(profilePath, lines.join('\n'), 'utf-8');
  console.log(chalk.green('  ✓ user_profile.md') + chalk.dim(`         ${t.scaffold.created}`));

  // Append to MEMORY.md if not already present (idempotency guard)
  const memoryPath = path.join(cwd, '.claude', 'memory', 'MEMORY.md');
  if (fs.existsSync(memoryPath)) {
    const memoryContent = fs.readFileSync(memoryPath, 'utf-8');
    if (!memoryContent.includes('user_profile.md')) {
      const entry = '\n- [User Profile](user_profile.md) — Role, experience, communication preferences\n';
      fs.appendFileSync(memoryPath, entry, 'utf-8');
    }
  }

  return { created: true };
}
```

- [ ] **Step 3: Add profile step to scaffold function — between step 4 and step 5**

In `lib/scaffold.js`, insert after the `.cc-starter.json` block (after line 96) and before the `.gitignore` block (line 98):

```js
  // ── 4b. Write user profile (if personalization was chosen) ────────
  const profileResult = await writeUserProfile(config, claudeAction, cwd, lang, t);
  if (profileResult.created) {
    filesCreated += 1;
  }
```

- [ ] **Step 4: Update updateGitignore to include user_profile.md**

In the `updateGitignore` function, two changes are needed:

**A) Update the `block` array (line 245-251) for first-run users:**

```js
  const block = [
    '',
    '# cc-starter',
    '.vibe-stats.json',
    'stats/report.html',
    '.claude/memory/user_profile.md',
    ''
  ].join('\n');
```

**B) Add entry-level check for existing users who already have the `# cc-starter` block.** Before the early return on line 242, add a check that appends the profile entry if missing:

```js
  const marker = '# cc-starter';
  if (content.includes(marker)) {
    // Block exists — but check if user_profile.md entry is present (upgrade path)
    const profileEntry = '.claude/memory/user_profile.md';
    if (!content.includes(profileEntry)) {
      const updatedContent = content.replace(
        'stats/report.html',
        'stats/report.html\n' + profileEntry
      );
      fs.writeFileSync(gitignorePath, updatedContent, 'utf-8');
      return true;
    }
    return false;
  }
```

This handles the upgrade path: existing users who re-run cc-starter after updating will get the profile entry added to their existing `.gitignore` block.

- [ ] **Step 5: Commit**

```bash
git add lib/scaffold.js
git commit -m "feat: add user profile generation to scaffold pipeline"
```

---

### Task 4: Verify end-to-end by running the wizard

- [ ] **Step 1: Run cc-starter in a temp directory**

```bash
mkdir /tmp/cc-test && cd /tmp/cc-test && node F:/cc-starter/bin/cc-starter.js
```

Choose: English → test project → skip personalization → verify it works as before (no profile created).

- [ ] **Step 2: Run again with personalization**

```bash
rm -rf /tmp/cc-test && mkdir /tmp/cc-test && cd /tmp/cc-test && node F:/cc-starter/bin/cc-starter.js
```

Choose: Deutsch → enable personalization → Fullstack → "React + Next.js" → Senior → Kurz & direkt.

Verify:
- `.claude/memory/user_profile.md` exists with correct frontmatter and derived preferences
- `.claude/memory/MEMORY.md` contains the user_profile.md link
- `.gitignore` contains `.claude/memory/user_profile.md`

- [ ] **Step 3: Run a third time to verify conflict handling**

```bash
cd /tmp/cc-test && node F:/cc-starter/bin/cc-starter.js
```

Choose personalization again. Verify: Overwrite/Skip dialog appears for existing profile. MEMORY.md entry is NOT duplicated.

- [ ] **Step 4: Clean up**

```bash
rm -rf /tmp/cc-test
```

---

### Task 5: Update README.md

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add row to "What You Get" table**

Find the line `| Plugin presets |` and insert before it:

```markdown
| AI Operating System | Optional developer profile — role, experience, communication style |
```

- [ ] **Step 2: Add new section after Plugin Presets**

Find the `---` line after the Plugin Presets section (after `Plugins are installed via...`) and insert after it:

```markdown
## 🧠 AI Operating System (optional)

Personalize Claude to your working style. The wizard asks for your role, experience level, and communication preference — then auto-derives smart defaults (no beginner explanations for seniors, architecture focus for tech leads, etc.).

Saved as `.claude/memory/user_profile.md` — not committed to git.

---
```

- [ ] **Step 3: Add row to Comparison table**

Find the line `| Zero dependencies in output |` and insert after it:

```markdown
| AI Operating System | ✅ | ❌ | ❌ | ❌ |
```

- [ ] **Step 4: Update "How It Works" flow**

Find the `npx cc-starter` ASCII flow block and replace it with:

```
npx cc-starter
├─ Detect tech stack (TypeScript, Next.js, ...)
├─ Interactive wizard (name, rate, plugins)
├─ Optional: personalize Claude (role, style)
├─ Scaffold .claude/ + scripts/ + CLAUDE.md
├─ Install selected plugins
└─ Ready to code!
```

- [ ] **Step 5: Commit**

```bash
git add README.md
git commit -m "docs: add AI Operating System feature to README"
```

---

### Task 6: Update docs/index.html — add feature card

**Files:**
- Modify: `docs/index.html`

- [ ] **Step 1: Find the features grid in the "What You Get" section**

Look for `id="features"` section and the existing feature cards. Add a new card after the last existing card, matching the same HTML structure and CSS classes.

- [ ] **Step 2: Add bilingual feature card**

The card should follow the exact pattern of existing cards in the grid. Content:

- EN title: "AI Operating System"
- DE title: "KI-Betriebssystem"
- EN description: "Optional developer profile — Claude adapts to your role, experience level, and communication style. Smart defaults auto-derived."
- DE description: "Optionales Entwicklerprofil — Claude passt sich an deine Rolle, Erfahrung und deinen Kommunikationsstil an. Smarte Standardwerte werden automatisch abgeleitet."

- [ ] **Step 3: Commit**

```bash
git add docs/index.html
git commit -m "docs: add AI Operating System feature card to landing page"
```

---

### Task 7: Final verification and version bump

- [ ] **Step 1: Run full end-to-end test one more time**

```bash
rm -rf /tmp/cc-final && mkdir /tmp/cc-final && cd /tmp/cc-final && node F:/cc-starter/bin/cc-starter.js
```

Verify all features work together: wizard, personalization, scaffold, profile, gitignore, MEMORY.md.

- [ ] **Step 2: Bump version in package.json**

From `1.0.7` to `1.1.0` (new feature = minor bump).

```bash
cd F:/cc-starter && npm version minor --no-git-tag-version
git add package.json package-lock.json
git commit -m "chore: bump version to 1.1.0"
```

- [ ] **Step 3: Clean up temp directory**

```bash
rm -rf /tmp/cc-final
```
