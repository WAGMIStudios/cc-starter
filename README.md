# cc-starter

**Claude Code Project Kickstart** — One command to set up Claude Code like a pro.

[![npm version](https://img.shields.io/npm/v/cc-starter)](https://www.npmjs.com/package/cc-starter)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## The Problem

> You open Claude Code on a new project and start from scratch. No rules, no memory, no structure. Every session you re-explain the same things. You read entire files when you only need the types. You have no idea what your project costs.

## The Solution

```bash
npx cc-starter
```

One command. Interactive wizard. Full setup in 30 seconds.

---

## 📦 What You Get

| What | Description |
|------|-------------|
| `.claude/rules/` | Battle-tested working rules (task tracking, verification, git discipline) |
| `.claude/memory/` | Persistent memory system — Claude remembers across sessions |
| `CLAUDE.md` | Auto-generated project overview with detected tech stack |
| `scripts/stats/vibe-code.js` | Token-saving extraction tool (types, tree, imports, functions) |
| `scripts/stats/vibe-stats.js` | Track and measure your token savings |
| `scripts/stats/cocomo.js` | COCOMO-II project cost estimation |
| `scripts/stats/project-report.js` | Visual HTML statistics report |
| Plugin presets | One-click installation of best Claude Code plugins |

---

## 🔥 Token Savings — The Killer Feature

```
Traditional: Read entire 500-line file          → ~2,000 tokens
cc-starter:  Extract only types and signatures  → ~200 tokens

That's 90% savings per file read. Over a session, that's thousands of tokens.
```

Instead of Claude reading entire files, `vibe-code.js` extracts only what matters:

```bash
node scripts/stats/vibe-code.js types src/api.ts      # Just the interfaces
node scripts/stats/vibe-code.js tree src/              # Directory overview
node scripts/stats/vibe-code.js imports src/app.tsx    # Dependency graph
node scripts/stats/vibe-code.js functions lib/utils.ts # Function signatures
```

---

## 📊 COCOMO Estimation

Know what your project is worth — before the client asks.

```
COCOMO-II Project Estimation
════════════════════════════════

Lines of Code:
  TypeScript    32,450
  CSS            4,210
  ─────────────────────────
  Total         36,660

Estimation (Semi-Detached):
  Effort:        9.8 Person-Months
  Schedule:      5.9 Months
  Team Size:     1.7 Developers
  Cost:       €47,040 (at €80/h)
```

---

## 🔌 Plugin Presets

| Preset | Plugins | Best For |
|--------|---------|----------|
| Minimal | superpowers | Solo devs, getting started |
| Standard | + feature-dev, pr-review-toolkit | Most projects |
| Full | + frontend-design, ui-ux-pro-max | Frontend-heavy projects |
| Custom | Pick your own | Power users |

Plugins are installed via `claude mcp add` — no manual config needed.

---

## 🚀 Installation

```bash
# New project
mkdir my-app && cd my-app
npx cc-starter

# Existing project
cd my-existing-project
npx cc-starter
```

**Requirements:** Node.js 18+, Claude Code CLI (optional, for plugin installation)

---

## ⚔️ Comparison

| Feature | cc-starter | TheDecipherist | serpro69 | cloudnative-co |
|---------|:---:|:---:|:---:|:---:|
| Token-saving scripts | ✅ | ❌ | ❌ | ❌ |
| COCOMO estimation | ✅ | ❌ | ❌ | ❌ |
| HTML project report | ✅ | ❌ | ❌ | ❌ |
| Interactive wizard | ✅ | ✅ | ❌ | ✅ |
| Plugin installation | ✅ | ❌ | ❌ | ❌ |
| Memory system | ✅ | ❌ | ❌ | ❌ |
| Tech stack detection | ✅ | ❌ | ❌ | ✅ |
| Zero dependencies in output | ✅ | ✅ | ❌ | ✅ |

---

## 🔍 How It Works

```
npx cc-starter
├─ Detect tech stack (TypeScript, Next.js, ...)
├─ Interactive wizard (name, rate, plugins)
├─ Scaffold .claude/ + scripts/ + CLAUDE.md
├─ Install selected plugins
└─ Ready to code!
```

The wizard detects your project's language, framework, and package manager — then generates a tailored `CLAUDE.md` and rule set. All output files are plain text with zero runtime dependencies.

---

## 🤝 Contributing

PRs welcome. See [LICENSE](LICENSE) for details.

---

## Author

Built by [Lars Fanter](https://www.linkedin.com/in/larsfanter/) — from real-world experience building production apps with Claude Code.
