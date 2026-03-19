# AI Operating System — Personalization Feature

**Date:** 2026-03-19
**Status:** Approved
**Approach:** Inline in existing wizard (Ansatz 1)

---

## Summary

Add an optional personalization step at the end of the cc-starter wizard that creates a developer profile. Based on role, experience level, and communication preference, Claude auto-derives smart behavioral guidelines. The profile is saved as a user memory file — not committed to git.

Inspired by the "AI Operating System" concept: giving AI persistent context about identity, working style, and preferences to produce better, more tailored responses.

---

## 1. Wizard Flow

After plugin selection, the wizard presents an optional personalization block:

1. **Confirm** — "Personalize Claude?" (yes/no, default: no → skip)
2. **Role** — List selection: Frontend Developer, Backend Developer, Fullstack Developer, Tech Lead / Architect, DevOps / SRE, Data Scientist / ML Engineer, Student / Learning, Other
3. **Specialization** — Free text, optional (e.g. "React + Next.js", "Kubernetes", "NLP/PyTorch"). Enter to skip.
4. **Experience Level** — List selection: Beginner (< 1 year), Intermediate (1-3 years), Experienced (3-7 years), Senior (7+ years)
5. **Communication Style** — List selection:
   - Short & direct — code and results, minimal explanations
   - Balanced — brief explanations when needed
   - Detailed — explain decisions and alternatives

All prompts are bilingual (EN/DE) via the existing I18N system. The confirm question at the start ensures the "30 second setup" claim is not compromised for users who don't want a profile.

---

## 2. Derivation Logic

A function `derivePreferences(role, level, commStyle, lang)` in `constants.js` returns a `string[]` of auto-derived behavioral guidelines.

### Rules

| Condition | Derived Preference (EN) | Derived Preference (DE) |
|---|---|---|
| Level >= Experienced | No beginner explanations for standard concepts | Keine Anfaenger-Erklaerungen bei Standardkonzepten |
| Level >= Senior | No repetition of basics, expect independent judgment | Keine Wiederholung von Grundlagen, erwarte eigenstaendiges Urteil |
| Comm = "short" | No summaries at the end, no introductions | Keine Zusammenfassungen am Ende, keine Einleitungen |
| Comm = "detailed" | Always provide alternatives and trade-offs | Alternativen und Trade-offs immer mitliefern |
| Role = Student | Explain concepts, suggest learning resources | Konzepte erklaeren, Lernressourcen vorschlagen |
| Role = Tech Lead | Prioritize architecture perspective, consider team impact | Architektur-Perspektive priorisieren, Team-Impact beruecksichtigen |
| Role = DevOps | Think about infrastructure, security, and monitoring | Infrastruktur, Sicherheit und Monitoring mitdenken |

Multiple rules can apply simultaneously. The result is a list of strings written into the profile.

---

## 3. Output Format

Generated file: `.claude/memory/user_profile.md`

```markdown
---
name: User Profile
description: Role, experience level, communication preferences and auto-derived guidelines
type: user
---

## Role
Fullstack Developer — React + Next.js

## Experience
Senior (7+ years)

## Communication Style
Short & direct

## Preferences
- No beginner explanations for standard concepts
- No repetition of basics, expect independent judgment
- No summaries at the end, no introductions
```

Additionally, an entry is appended to `.claude/memory/MEMORY.md`:

```markdown
- [User Profile](user_profile.md) — Role, experience, communication preferences
```

The profile language follows the wizard language selection (DE/EN).

If `.claude/memory/user_profile.md` already exists, the user is asked: Overwrite or Skip (same pattern as CLAUDE.md conflict handling).

---

## 4. Code Changes

Three files modified, no new files:

### `lib/constants.js`
- New I18N keys for the personalization block (roles, levels, communication styles, derived preferences — DE/EN)
- New constants: `ROLES`, `EXPERIENCE_LEVELS`, `COMM_STYLES`
- New function: `derivePreferences(role, level, commStyle, lang) → string[]`

### `lib/wizard.js`
- After plugin selection: confirm prompt "Personalize Claude?"
- If yes: 4 additional prompts (role, specialization, level, communication)
- Return object gets an optional `profile` field containing `{ role, specialization, level, commStyle }`

### `lib/scaffold.js`
- New step between step 4 (.cc-starter.json) and step 5 (.gitignore): write profile
- Checks if `config.profile` exists
- If yes: calls `derivePreferences()`, renders `user_profile.md`, appends MEMORY.md entry
- If profile file already exists: Overwrite/Skip dialog

No new template file. The profile is assembled as a string in `scaffold.js` — too simple for Handlebars.

---

## 5. README & Landing Page Updates

### `README.md`

- New row in "What You Get" table:

  | What | Description |
  |---|---|
  | AI Operating System | Optional developer profile — role, experience, communication style |

- New section after "Plugin Presets":

  ```markdown
  ## AI Operating System (optional)

  Personalize Claude to your working style. The wizard asks for your
  role, experience level, and communication preference — then auto-derives
  smart defaults (no beginner explanations for seniors, architecture focus
  for tech leads, etc.).

  Saved as `.claude/memory/user_profile.md` — not committed to git.
  ```

- "How It Works" flow gets a new line:
  ```
  ├─ Optional: personalize Claude (role, style)
  ```

- Comparison table: new row `AI Operating System` — cc-starter = yes, others = no

### `docs/index.html`

- New feature card in the "What You Get" grid (same style as existing cards, bilingual EN/DE)
- Title: "AI Operating System" / "KI-Betriebssystem"
- Short description: Role, experience, communication style — Claude adapts to you

No structural changes to the landing page, only an additional card in the existing grid.

---

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Where in flow | End of existing wizard | Minimal disruption, skip with one keypress |
| Separate command | No | Keep it simple, one flow |
| Role granularity | List + free text specialization | Structured base + flexibility |
| Communication style | Single choice from 3 presets | Easy to understand, avoids checkbox fatigue |
| "What to avoid" | Auto-derived from role + level | Fewer questions, smarter defaults |
| Output location | .claude/memory/user_profile.md | Not committed to git, auto-loaded by Claude |
| Profile format | String assembly in scaffold.js | Too simple for Handlebars templates |
