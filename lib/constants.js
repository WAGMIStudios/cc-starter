export const PLUGIN_PRESETS = {
  minimal: [
    { name: 'superpowers', source: 'superpowers-marketplace', desc: 'TDD, debugging, plans, brainstorming' }
  ],
  standard: [
    { name: 'superpowers', source: 'superpowers-marketplace', desc: 'TDD, debugging, plans, brainstorming' },
    { name: 'feature-dev', source: 'claude-code-plugins', desc: 'Code explorer, architect, reviewer agents' },
    { name: 'pr-review-toolkit', source: 'claude-code-plugins', desc: 'PR reviews, silent-failure-hunter, type analyzer' }
  ],
  full: [
    { name: 'superpowers', source: 'superpowers-marketplace', desc: 'TDD, debugging, plans, brainstorming' },
    { name: 'feature-dev', source: 'claude-code-plugins', desc: 'Code explorer, architect, reviewer agents' },
    { name: 'pr-review-toolkit', source: 'claude-code-plugins', desc: 'PR reviews, silent-failure-hunter, type analyzer' },
    { name: 'frontend-design', source: 'claude-code-plugins', desc: 'UI/UX design skill for frontend projects' },
    { name: 'ui-ux-pro-max', source: 'ui-ux-pro-max-skill', desc: 'AI design intelligence — 67 UI styles, 161 color palettes, 57 font pairings' },
    { name: 'claude-seo', source: 'claude-seo', desc: 'SEO audits, E-E-A-T analysis, schema markup, Core Web Vitals, AI search optimization' }
  ]
};

export const ALL_PLUGINS = [
  { name: 'superpowers', source: 'superpowers-marketplace', desc: 'TDD, debugging, plans, brainstorming' },
  { name: 'feature-dev', source: 'claude-code-plugins', desc: 'Code explorer, architect, reviewer agents' },
  { name: 'pr-review-toolkit', source: 'claude-code-plugins', desc: 'PR reviews, silent-failure-hunter, type analyzer' },
  { name: 'frontend-design', source: 'claude-code-plugins', desc: 'UI/UX design skill for frontend projects' },
  { name: 'ui-ux-pro-max', source: 'ui-ux-pro-max-skill', desc: 'AI design intelligence — 67 UI styles, 161 color palettes, 57 font pairings' },
  { name: 'claude-seo', source: 'claude-seo', desc: 'SEO audits, E-E-A-T analysis, schema markup, Core Web Vitals, AI search optimization' }
];

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

export const REPORT_STYLES = {
  minimal: { label: 'Minimal — zero dependencies, plain HTML with CSS bars', packages: [] },
  fancy: { label: 'Fancy — visual charts via chart.js CDN (no npm install needed)', packages: [] }
};

export const DEFAULT_HOURLY_RATE = 80;

export const I18N = {
  de: {
    wizard: {
      title: 'cc-starter — Projekt-Kickstart Assistent',
      langQuestion: 'Sprache / Language:',
      projectName: 'Projektname:',
      projectDescription: 'Kurze Projektbeschreibung (z.B. Landing Page, SaaS-App, E-Commerce Shop, Blog, Portfolio, Dashboard, API):',
      hourlyRate: 'Stundensatz für COCOMO-Schätzung (€):',
      reportStyle: 'Report-Stil:',
      pluginPreset: 'Plugin-Auswahl:',
      selectPlugins: 'Plugins auswählen:',
      detectedStack: 'Erkannter Tech-Stack: ',
      custom: 'Individuell — einzelne Plugins wählen',
      personalize: 'Claude personalisieren?',
      role: 'Deine Rolle:',
      specialization: 'Spezialisierung / Schwerpunkt (optional, max 100 Zeichen):',
      experienceLevel: 'Erfahrungslevel:',
      commStyle: 'Kommunikationsstil:'
    },
    scaffold: {
      scaffolding: 'Projekt wird eingerichtet...',
      existingClaude: 'Vorhandenes .claude/ gefunden. Was soll passieren?',
      overwrite: 'Überschreiben — alle Dateien ersetzen',
      merge: 'Zusammenführen — bestehende behalten, fehlende ergänzen',
      skip: 'Überspringen — .claude/ nicht ändern',
      existingClaudeMd: 'Vorhandene CLAUDE.md gefunden. Was soll passieren?',
      overwriteMd: 'Überschreiben — durch cc-starter Version ersetzen',
      appendMd: 'Anhängen — cc-starter Abschnitt am Ende einfügen',
      skipMd: 'Überspringen — CLAUDE.md nicht ändern',
      created: 'erstellt',
      skipped: 'übersprungen',
      appended: 'angehängt',
      updated: 'aktualisiert',
      alreadyUpToDate: 'bereits aktuell',
      done: 'Fertig!',
      files: 'Dateien'
    },
    plugins: {
      installing: 'Plugins werden installiert...',
      noPlugins: 'Keine Plugins ausgewählt.',
      cliNotFound: 'Claude Code CLI nicht gefunden. Plugin-Installation übersprungen.',
      installFirst: 'Installiere zuerst Claude Code: https://claude.ai/download',
      manualInstall: 'Dann installiere Plugins manuell:',
      installed: 'installiert',
      manualNeeded: 'manuelle Installation nötig:',
      pluginsInstalled: 'Plugin(s) installiert',
      pluginsManual: 'Plugin(s) brauchen manuelle Installation'
    },
    summary: {
      done: "Fertig! Starte mit 'claude' zum Coden.",
      quickCommands: 'Schnellbefehle:',
      costEstimate: 'Projekt-Kostenschätzung',
      tokenTools: 'Token-sparende Tools',
      htmlStats: 'HTML-Statistiken'
    },
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
  },
  en: {
    wizard: {
      title: 'cc-starter — project kickstart wizard',
      langQuestion: 'Sprache / Language:',
      projectName: 'Project name:',
      projectDescription: 'Short project description (e.g. Landing Page, SaaS App, E-Commerce Store, Blog, Portfolio, Dashboard, API):',
      hourlyRate: 'Hourly rate for COCOMO estimation (€):',
      reportStyle: 'Report style:',
      pluginPreset: 'Plugin preset:',
      selectPlugins: 'Select plugins:',
      detectedStack: 'Detected tech stack: ',
      custom: 'Custom — pick individual plugins',
      personalize: 'Personalize Claude?',
      role: 'Your role:',
      specialization: 'Specialization / focus (optional, max 100 chars):',
      experienceLevel: 'Experience level:',
      commStyle: 'Communication style:'
    },
    scaffold: {
      scaffolding: 'Scaffolding project...',
      existingClaude: 'Existing .claude/ found. What should we do?',
      overwrite: 'Overwrite — replace all files',
      merge: 'Merge — keep existing, add missing files only',
      skip: 'Skip — leave .claude/ untouched',
      existingClaudeMd: 'Existing CLAUDE.md found. What should we do?',
      overwriteMd: 'Overwrite — replace with cc-starter version',
      appendMd: 'Append — add cc-starter section at the end',
      skipMd: 'Skip — leave CLAUDE.md untouched',
      created: 'created',
      skipped: 'skipped',
      appended: 'appended',
      updated: 'updated',
      alreadyUpToDate: 'already up to date',
      done: 'Done!',
      files: 'files'
    },
    plugins: {
      installing: 'Installing plugins...',
      noPlugins: 'No plugins selected.',
      cliNotFound: 'Claude Code CLI not found. Skipping plugin installation.',
      installFirst: 'Install Claude Code first: https://claude.ai/download',
      manualInstall: 'Then install plugins manually:',
      installed: 'installed',
      manualNeeded: 'manual install needed:',
      pluginsInstalled: 'plugin(s) installed',
      pluginsManual: 'plugin(s) need manual installation'
    },
    summary: {
      done: "Done! Run 'claude' to start coding.",
      quickCommands: 'Quick commands:',
      costEstimate: 'Project cost estimate',
      tokenTools: 'Token-saving tools',
      htmlStats: 'HTML statistics'
    },
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
  }
};

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
