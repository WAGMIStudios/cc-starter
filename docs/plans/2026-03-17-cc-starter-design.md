# cc-starter Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build `cc-starter`, an npx-installable CLI that scaffolds an optimized Claude Code environment with token-saving scripts, project statistics, COCOMO estimation, interactive plugin installation, and a memory system — ready for any tech stack.

**Architecture:** Node.js CLI with interactive prompts (inquirer). Detects existing project tech stack, scaffolds `.claude/` structure with generalized rules, copies stats scripts, optionally installs Claude Code plugins. No runtime dependencies in the output — all scaffolded scripts are vanilla Node.js.

**Tech Stack:** Node.js CLI (bin entry), inquirer for prompts, chalk for colored output, fs-extra for file operations. Zero dependencies in scaffolded output.

---

## Context & Competitive Analysis

### Existing Claude Code Starter Kits
- **TheDecipherist/claude-code-mastery-project-starter-kit** — 27 commands, MDD workflow, profile system. No stats/scripts.
- **serpro69/claude-starter-kit** — MCP server integration, GitHub template. No token tracking.
- **cloudnative-co/claude-code-starter-kit** — One-command install, wizard, 3 profiles. No stats.
- **cassmtnr/claude-code-starter** — npx installer, auto-detects tech stack. Only generates docs.

### Our Differentiators
1. **Token-Savings Scripts** — vibe-code.js (types/tree/imports extraction), vibe-stats.js (tracking)
2. **COCOMO-II Estimation** — "Your project is worth €74k" in the terminal
3. **HTML Project Report** — Visual statistics with optional chart.js
4. **Interactive Plugin Installation** — Presets (Minimal/Standard/Full/Custom)
5. **Memory System** — Out-of-the-box `.claude/memory/` with MEMORY.md index
6. **Tech Stack Auto-Detection** — Generates stack-specific rules

---

## Repo Structure (what lives in the cc-starter GitHub repo)

```
cc-starter/
├── package.json                 # name: "cc-starter", bin: "cc-starter"
├── README.md                    # GitHub + LinkedIn showcase
├── LICENSE                      # MIT
├── bin/
│   └── cc-starter.js            # CLI entry point
├── lib/
│   ├── wizard.js                # Interactive setup wizard
│   ├── detect.js                # Tech stack auto-detection
│   ├── scaffold.js              # File/folder creation
│   ├── plugins.js               # Plugin installation logic
│   └── constants.js             # Presets, defaults, plugin registry
├── template/                    # Files that get copied to user project
│   ├── claude/                  # → becomes .claude/
│   │   ├── rules/
│   │   │   ├── 01-general.md
│   │   │   ├── 02-code-standards.md
│   │   │   └── 03-dev-ops.md
│   │   ├── memory/
│   │   │   └── MEMORY.md
│   │   ├── project/
│   │   │   └── README.md
│   │   ├── reference/
│   │   │   └── README.md
│   │   ├── commands/
│   │   │   └── kickstart.md     # /kickstart for existing projects
│   │   └── settings.json
│   ├── CLAUDE.md.hbs            # Handlebars template with placeholders
│   └── scripts/
│       └── stats/
│           ├── vibe-code.js     # Types, tree, imports extraction
│           ├── vibe-stats.js    # Token savings tracker
│           ├── cocomo.js        # COCOMO-II cost estimation
│           └── project-report.js # HTML statistics report
└── docs/
    └── screenshots/             # For README + LinkedIn posts
```

---

## Scaffolded Output (what the user gets in their project)

```
user-project/
├── CLAUDE.md                    # Generated, project-specific
├── .claude/
│   ├── rules/
│   │   ├── 01-general.md        # Todo tracking, STOPP & Re-plan, Verification
│   │   ├── 02-code-standards.md # Generalized code quality rules
│   │   └── 03-dev-ops.md        # Git separation, ENV rules
│   ├── memory/
│   │   └── MEMORY.md            # Empty index, ready to use
│   ├── project/
│   │   └── README.md            # Placeholder
│   ├── reference/
│   │   └── README.md            # Placeholder
│   ├── commands/
│   │   └── kickstart.md         # /kickstart for re-running setup
│   └── settings.json            # Optimized defaults
├── scripts/
│   └── stats/
│       ├── vibe-code.js
│       ├── vibe-stats.js
│       ├── cocomo.js
│       └── project-report.js
└── .vibe-stats.json             # Token tracking data (gitignored)
```

---

## CLI Wizard Flow

```
$ npx cc-starter

  ╔═══════════════════════════════════════╗
  ║        cc-starter v1.0.0              ║
  ║   Claude Code Project Kickstart       ║
  ╚═══════════════════════════════════════╝

  ? Project name: my-saas-app
  ? Hourly rate for COCOMO estimation (€): 80
  ? Report style:
    › [1] Minimal (zero dependencies, plain HTML)
      [2] Fancy (installs chart.js for visual charts)

  Detecting tech stack...
  ✓ Found: TypeScript, Next.js, Tailwind CSS

  ? Plugin preset:
    › [1] Minimal   — superpowers (TDD, debugging, plans)
      [2] Standard  — + feature-dev, pr-review-toolkit
      [3] Full      — + frontend-design
      [4] Custom    — choose individually

  Scaffolding...
  ✓ .claude/rules/           3 files
  ✓ .claude/memory/          MEMORY.md
  ✓ .claude/commands/        kickstart.md
  ✓ .claude/settings.json    optimized defaults
  ✓ CLAUDE.md                generated for "my-saas-app"
  ✓ scripts/stats/           4 tools
  ✓ .gitignore               updated (+.vibe-stats.json)

  Installing plugins...
  ✓ superpowers@superpowers-marketplace
  ✓ feature-dev@claude-code-plugins
  ✓ pr-review-toolkit@claude-code-plugins

  ══════════════════════════════════════════
  Done! Run 'claude' to start coding.

  Quick commands:
    node scripts/stats/cocomo.js          → Project cost estimate
    node scripts/stats/vibe-code.js help  → Token-saving tools
    node scripts/stats/project-report.js  → HTML statistics
  ══════════════════════════════════════════
```

---

## Task 1: Repository Setup + package.json

**Files:**
- Create: `package.json`
- Create: `bin/cc-starter.js`
- Create: `LICENSE`
- Create: `.gitignore`

**Step 1: Initialize git repo**

Run: `cd F:/cc-starter && git init`

**Step 2: Create package.json**

```json
{
  "name": "cc-starter",
  "version": "1.0.0",
  "description": "Claude Code Project Kickstart — scaffolds an optimized dev environment with token-saving scripts, COCOMO estimation, and interactive plugin setup",
  "bin": {
    "cc-starter": "./bin/cc-starter.js"
  },
  "keywords": [
    "claude-code",
    "cli",
    "scaffold",
    "starter-kit",
    "vibe-coding",
    "token-savings",
    "cocomo",
    "developer-tools"
  ],
  "author": "Lars Fanter",
  "license": "MIT",
  "dependencies": {
    "inquirer": "^9.2.0",
    "chalk": "^5.3.0",
    "fs-extra": "^11.2.0",
    "handlebars": "^4.7.8"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/LarsFanter/cc-starter"
  }
}
```

**Step 3: Create bin/cc-starter.js (entry point)**

Minimal shell that:
1. Shows ASCII banner
2. Calls wizard
3. Calls scaffold
4. Calls plugin installer
5. Shows summary

**Step 4: Create LICENSE (MIT)**

**Step 5: Create .gitignore**

```
node_modules/
.vibe-stats.json
```

**Step 6: Commit**

```bash
git add -A && git commit -m "init: cc-starter repo with package.json and CLI entry"
```

---

## Task 2: Interactive Wizard (lib/wizard.js)

**Files:**
- Create: `lib/wizard.js`
- Create: `lib/constants.js`

**Step 1: Create constants.js with plugin presets**

```javascript
module.exports = {
  PLUGIN_PRESETS: {
    minimal: [
      { name: 'superpowers', source: 'superpowers-marketplace', desc: 'TDD, debugging, plans, brainstorming' }
    ],
    standard: [
      { name: 'superpowers', source: 'superpowers-marketplace', desc: 'TDD, debugging, plans, brainstorming' },
      { name: 'feature-dev', source: 'claude-code-plugins', desc: 'Code explorer, architect, reviewer' },
      { name: 'pr-review-toolkit', source: 'claude-code-plugins', desc: 'PR reviews, silent-failure-hunter' }
    ],
    full: [
      { name: 'superpowers', source: 'superpowers-marketplace', desc: 'TDD, debugging, plans, brainstorming' },
      { name: 'feature-dev', source: 'claude-code-plugins', desc: 'Code explorer, architect, reviewer' },
      { name: 'pr-review-toolkit', source: 'claude-code-plugins', desc: 'PR reviews, silent-failure-hunter' },
      { name: 'frontend-design', source: 'claude-code-plugins', desc: 'UI/UX implementation skill' }
    ]
  },
  REPORT_STYLES: {
    minimal: { label: 'Minimal (zero dependencies, plain HTML)', packages: [] },
    fancy: { label: 'Fancy (visual charts with chart.js)', packages: ['chart.js'] }
  },
  DEFAULT_HOURLY_RATE: 80
}
```

**Step 2: Create wizard.js with inquirer prompts**

Questions in order:
1. Project name (auto-detect from package.json or folder name)
2. Hourly rate for COCOMO (default: €80)
3. Report style (Minimal / Fancy)
4. Plugin preset (Minimal / Standard / Full / Custom)
5. If Custom: checkbox list of all available plugins

Returns config object used by scaffold.js.

**Step 3: Commit**

```bash
git add lib/ && git commit -m "feat: interactive wizard with plugin presets"
```

---

## Task 3: Tech Stack Auto-Detection (lib/detect.js)

**Files:**
- Create: `lib/detect.js`

**Step 1: Create detect.js**

Checks current directory for:
- `package.json` → Node.js, reads dependencies for framework detection
- `requirements.txt` / `pyproject.toml` → Python
- `go.mod` → Go
- `Cargo.toml` → Rust
- `pom.xml` / `build.gradle` → Java
- `*.csproj` → C#/.NET
- `Gemfile` → Ruby

Framework detection from dependencies:
- `next` → Next.js
- `react` → React
- `vue` → Vue
- `angular` → Angular
- `express` → Express
- `fastapi` → FastAPI
- `django` → Django
- `tailwindcss` → Tailwind CSS
- `prisma` → Prisma ORM
- `drizzle-orm` → Drizzle
- `supabase` → Supabase

Returns: `{ languages: ['TypeScript'], frameworks: ['Next.js', 'Tailwind CSS'], orm: 'Prisma' }`

**Step 2: Commit**

```bash
git add lib/detect.js && git commit -m "feat: tech stack auto-detection"
```

---

## Task 4: Template Files (generalized from HIRIO-AI)

**Files:**
- Create: `template/claude/rules/01-general.md`
- Create: `template/claude/rules/02-code-standards.md`
- Create: `template/claude/rules/03-dev-ops.md`
- Create: `template/claude/memory/MEMORY.md`
- Create: `template/claude/project/README.md`
- Create: `template/claude/reference/README.md`
- Create: `template/claude/commands/kickstart.md`
- Create: `template/claude/settings.json`
- Create: `template/CLAUDE.md.hbs`

**Step 1: Generalize rules from HIRIO-AI**

Remove ALL references to: hirio, hirio-ai, careeros, career os, CareerOS, n8n, Supabase-specific tables, hirio.ai domain, NozeDiveNeu, Lars, Brevo, Strato, Hetzner.

Keep universal principles:
- 01-general: Todo tracking, documentation, STOPP & re-plan, diff against main, session management
- 02-code-standards: i18n reminder (generic), security basics, design system placeholder
- 03-dev-ops: Git commit separation, ENV rules, port management

**Step 2: Create CLAUDE.md.hbs template**

```handlebars
# CLAUDE.md - {{projectName}}

## Project Overview
**Project:** {{projectName}}
**Stack:** {{#each techStack}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
**Language:** {{primaryLanguage}}

---

## Quick Reference

### Commands
```bash
node scripts/stats/vibe-code.js help      # Token-saving code analysis
node scripts/stats/vibe-stats.js report    # Token savings report
node scripts/stats/cocomo.js               # Project cost estimation
node scripts/stats/project-report.js       # HTML project statistics
```

### Rules
See `.claude/rules/` for detailed working rules:
- `01-general.md` — Task tracking, planning, verification
- `02-code-standards.md` — Code quality, security
- `03-dev-ops.md` — Git, environment, deployment

### Memory System
Persistent memory across sessions in `.claude/memory/`.
Index file: `.claude/memory/MEMORY.md`

---

## Detected Tech Stack
{{#each detectedFrameworks}}
- {{this}}
{{/each}}

---

*Generated by [cc-starter](https://github.com/LarsFanter/cc-starter)*
```

**Step 3: Create settings.json**

```json
{
  "enabledPlugins": {},
  "alwaysThinkingEnabled": true
}
```

**Step 4: Create /kickstart command**

```markdown
---
name: kickstart
description: Re-run cc-starter setup or upgrade existing configuration
---

Run `npx cc-starter` in this project directory to:
- Update rules to latest version
- Add missing scripts
- Install new plugins
- Regenerate CLAUDE.md
```

**Step 5: Commit**

```bash
git add template/ && git commit -m "feat: generalized template files from production project"
```

---

## Task 5: vibe-code.js (generalized from vibe-react.js)

**Files:**
- Create: `template/scripts/stats/vibe-code.js`

**Step 1: Generalize vibe-react.js**

Changes from original:
- Rename tool name from "CareerOS Vibe-React" to "cc-starter vibe-code"
- Remove React.FC-specific pattern from extractComponentSignature
- Keep: TypeScript interface/type/enum extraction (works for any TS project)
- Keep: tree command (generalize default dir from "components" to "src")
- Keep: imports command (works for any JS/TS file)
- Keep: token savings calculation + auto-logging to .vibe-stats.json
- Add: `functions` command — extract function signatures (not just components)
- Broaden RELEVANT_EXTS: add `.py`, `.go`, `.rs`, `.java`, `.rb`
- For Python: extract class/def signatures
- For Go: extract func/type signatures

Commands:
```
node scripts/stats/vibe-code.js types <file>     # TS interfaces, types, enums
node scripts/stats/vibe-code.js tree [dir]        # Directory structure
node scripts/stats/vibe-code.js imports <file>    # Import statements
node scripts/stats/vibe-code.js functions <file>  # Function/method signatures
node scripts/stats/vibe-code.js help              # Show all commands
```

**Step 2: Commit**

```bash
git add template/scripts/ && git commit -m "feat: vibe-code.js — multi-language token-saving extraction"
```

---

## Task 6: vibe-stats.js (token savings tracker)

**Files:**
- Create: `template/scripts/stats/vibe-stats.js`

**Step 1: Copy and clean vibe-stats.js**

Changes from original:
- Remove "CareerOS" branding
- Rename to "cc-starter Token Tracker"
- Keep all commands: log, report, estimate, compare, reset
- Keep .vibe-stats.json format
- Improve: add `summary` command (one-liner for quick check)

**Step 2: Commit**

```bash
git add template/scripts/stats/vibe-stats.js && git commit -m "feat: vibe-stats.js — token savings tracker"
```

---

## Task 7: cocomo.js (COCOMO-II cost estimation)

**Files:**
- Create: `template/scripts/stats/cocomo.js`

**Step 1: Implement COCOMO-II estimation**

Features:
- Counts LOC by language (walks project tree, respects .gitignore)
- COCOMO-II Semi-Detached model:
  - Effort = a * (KLOC)^b where a=3.0, b=1.12
  - Schedule = c * (Effort)^d where c=2.5, d=0.35
  - Team = Effort / Schedule
- Reads hourly rate from `.cc-starter.json` config (set during wizard)
- Calculates: Person-Months, Schedule, Team Size, Estimated Cost

Output:
```
$ node scripts/stats/cocomo.js

  COCOMO-II Project Estimation
  ════════════════════════════

  Lines of Code:
    TypeScript    32,450
    CSS            4,210
    JSON           1,890
    ─────────────────────
    Total         38,550

  Estimation (Semi-Detached):
    Effort:       10.2 Person-Months
    Schedule:      6.1 Months
    Team Size:     1.7 Developers
    Cost:         €48,960 (at €80/h)

  Note: COCOMO-II estimates are rough approximations.
  Based on 168h/month at your configured rate.
```

**Step 2: Commit**

```bash
git add template/scripts/stats/cocomo.js && git commit -m "feat: cocomo.js — COCOMO-II project cost estimation"
```

---

## Task 8: project-report.js (HTML statistics)

**Files:**
- Create: `template/scripts/stats/project-report.js`

**Step 1: Implement HTML report generator**

Two modes based on `.cc-starter.json` config:

**Minimal mode (zero deps):**
- Generates self-contained HTML with inline CSS
- Bar charts rendered as CSS `width: N%` bars
- Sections: LOC by language, LOC by folder, largest files, COCOMO summary, token savings, git stats (if git repo)

**Fancy mode (chart.js):**
- Generates HTML that loads chart.js from CDN (no local install needed actually — CDN link)
- Treemap for folder sizes
- Doughnut chart for language breakdown
- Line chart for token savings over time
- Same data sections as minimal

Output: `stats/report.html` — opens in browser automatically

```
$ node scripts/stats/project-report.js

  Generating project report...
  ✓ LOC analysis complete
  ✓ COCOMO estimation included
  ✓ Token savings data loaded
  ✓ Git statistics collected

  Report saved to: stats/report.html
  Opening in browser...
```

**Step 2: Commit**

```bash
git add template/scripts/stats/project-report.js && git commit -m "feat: project-report.js — HTML statistics with minimal/fancy modes"
```

---

## Task 9: Scaffold Engine (lib/scaffold.js)

**Files:**
- Create: `lib/scaffold.js`

**Step 1: Implement scaffolding logic**

Takes wizard config and:
1. Creates `.claude/` directory structure
2. Copies rule files from template/
3. Renders CLAUDE.md.hbs with Handlebars (project name, tech stack)
4. Copies scripts/stats/ folder
5. Creates `.cc-starter.json` config file (hourly rate, report style)
6. Updates `.gitignore` (adds `.vibe-stats.json`, `stats/report.html`)
7. If fancy mode selected: notes that chart.js CDN will be used (no npm install needed)

Conflict resolution:
- If `.claude/` already exists: ask "Overwrite / Merge / Skip"
- If CLAUDE.md exists: ask "Overwrite / Append cc-starter section / Skip"
- Scripts always overwrite (they're tools, not config)

**Step 2: Commit**

```bash
git add lib/scaffold.js && git commit -m "feat: scaffold engine with conflict resolution"
```

---

## Task 10: Plugin Installer (lib/plugins.js)

**Files:**
- Create: `lib/plugins.js`

**Step 1: Implement plugin installation**

Logic:
1. Check if `claude` CLI is available (`which claude`)
2. If not: print instructions and skip plugin install
3. If yes: for each plugin in selected preset, run:
   ```bash
   claude plugins add <source>
   ```
4. Handle errors gracefully (network issues, auth required)
5. Update `.claude/settings.json` with enabled plugins

Note: Each plugin install will trigger Claude Code's security prompt — user must confirm. This is expected and documented.

**Step 2: Commit**

```bash
git add lib/plugins.js && git commit -m "feat: interactive plugin installer with presets"
```

---

## Task 11: CLI Entry Point (bin/cc-starter.js)

**Files:**
- Modify: `bin/cc-starter.js`

**Step 1: Wire everything together**

```javascript
#!/usr/bin/env node

import chalk from 'chalk'
import { wizard } from '../lib/wizard.js'
import { detect } from '../lib/detect.js'
import { scaffold } from '../lib/scaffold.js'
import { installPlugins } from '../lib/plugins.js'

// 1. Banner
console.log(chalk.cyan.bold(`
  ╔═══════════════════════════════════════╗
  ║        cc-starter v1.0.0              ║
  ║   Claude Code Project Kickstart       ║
  ╚═══════════════════════════════════════╝
`))

// 2. Auto-detect tech stack
const techStack = detect(process.cwd())

// 3. Interactive wizard
const config = await wizard(techStack)

// 4. Scaffold files
await scaffold(config)

// 5. Install plugins
await installPlugins(config.pluginPreset)

// 6. Summary
console.log(chalk.green.bold('\n  Done! Run `claude` to start coding.\n'))
```

**Step 2: Commit**

```bash
git add bin/ && git commit -m "feat: CLI entry point wiring all modules"
```

---

## Task 12: README.md (LinkedIn-ready)

**Files:**
- Create: `README.md`

**Step 1: Write README with these sections**

1. **Hero** — One-liner + badge (npm version, license, stars)
2. **The Problem** — "You open Claude Code and start from scratch every time. No rules, no memory, no structure."
3. **The Solution** — Screenshot of wizard + "One command. Full setup."
4. **What You Get** — Table of all scaffolded files with descriptions
5. **Token Savings** — Before/after comparison (read 500-line file vs. extract types = 90% savings)
6. **COCOMO** — Screenshot of terminal output showing project cost
7. **HTML Report** — Screenshot of the generated report
8. **Plugin Presets** — Table of Minimal/Standard/Full with what's included
9. **Installation** — `npx cc-starter`
10. **Comparison** — Feature matrix vs. other starter kits
11. **Contributing** — Standard
12. **License** — MIT

Key messaging for LinkedIn:
- "Stop wasting tokens reading entire files"
- "Know what your project is worth"
- "One command to set up Claude Code like a pro"

**Step 2: Commit**

```bash
git add README.md && git commit -m "docs: LinkedIn-ready README with screenshots"
```

---

## Task 13: Testing + Polish

**Step 1: Test locally**

```bash
cd F:/cc-starter
npm install
npm link
cd F:/tmp
mkdir test-project && cd test-project
npm init -y
cc-starter
```

Verify:
- [ ] Wizard runs without errors
- [ ] Tech stack detected correctly
- [ ] All files scaffolded
- [ ] CLAUDE.md rendered with correct project name
- [ ] vibe-code.js works: `node scripts/stats/vibe-code.js help`
- [ ] cocomo.js works: `node scripts/stats/cocomo.js`
- [ ] project-report.js works: `node scripts/stats/project-report.js`
- [ ] Plugin installation attempted (or gracefully skipped)

**Step 2: Fix any issues found**

**Step 3: Final commit + tag**

```bash
git add -A && git commit -m "chore: polish and testing"
git tag v1.0.0
```

---

## Task 14: GitHub + npm Publish

**Step 1: Create GitHub repo**

```bash
gh repo create LarsFanter/cc-starter --public --description "Claude Code Project Kickstart — token-saving scripts, COCOMO estimation, interactive plugin setup"
git remote add origin https://github.com/LarsFanter/cc-starter.git
git push -u origin main
```

**Step 2: Publish to npm**

```bash
npm login
npm publish
```

**Step 3: Verify**

```bash
npx cc-starter --help
```

---

## Summary

| Task | Description | Est. Size |
|------|-------------|-----------|
| 1 | Repo setup + package.json | Small |
| 2 | Interactive wizard | Medium |
| 3 | Tech stack auto-detection | Small |
| 4 | Template files (generalized rules) | Medium |
| 5 | vibe-code.js (multi-language) | Medium |
| 6 | vibe-stats.js (token tracker) | Small |
| 7 | cocomo.js (cost estimation) | Medium |
| 8 | project-report.js (HTML stats) | Large |
| 9 | Scaffold engine | Medium |
| 10 | Plugin installer | Small |
| 11 | CLI entry point | Small |
| 12 | README (LinkedIn-ready) | Medium |
| 13 | Testing + polish | Medium |
| 14 | GitHub + npm publish | Small |
