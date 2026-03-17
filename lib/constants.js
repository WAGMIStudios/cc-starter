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
    { name: 'ui-ux-pro-max', source: 'ui-ux-pro-max-skill', desc: 'AI design intelligence — 67 UI styles, 161 color palettes, 57 font pairings' }
  ]
};

export const ALL_PLUGINS = [
  { name: 'superpowers', source: 'superpowers-marketplace', desc: 'TDD, debugging, plans, brainstorming' },
  { name: 'feature-dev', source: 'claude-code-plugins', desc: 'Code explorer, architect, reviewer agents' },
  { name: 'pr-review-toolkit', source: 'claude-code-plugins', desc: 'PR reviews, silent-failure-hunter, type analyzer' },
  { name: 'frontend-design', source: 'claude-code-plugins', desc: 'UI/UX design skill for frontend projects' },
  { name: 'ui-ux-pro-max', source: 'ui-ux-pro-max-skill', desc: 'AI design intelligence — 67 UI styles, 161 color palettes, 57 font pairings' }
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
      custom: 'Individuell — einzelne Plugins wählen'
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
      custom: 'Custom — pick individual plugins'
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
    }
  }
};
