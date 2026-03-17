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
    { name: 'frontend-design', source: 'claude-code-plugins', desc: 'UI/UX design skill for frontend projects' }
  ]
};

export const ALL_PLUGINS = [
  { name: 'superpowers', source: 'superpowers-marketplace', desc: 'TDD, debugging, plans, brainstorming' },
  { name: 'feature-dev', source: 'claude-code-plugins', desc: 'Code explorer, architect, reviewer agents' },
  { name: 'pr-review-toolkit', source: 'claude-code-plugins', desc: 'PR reviews, silent-failure-hunter, type analyzer' },
  { name: 'frontend-design', source: 'claude-code-plugins', desc: 'UI/UX design skill for frontend projects' }
];

export const REPORT_STYLES = {
  minimal: { label: 'Minimal — zero dependencies, plain HTML with CSS bars', packages: [] },
  fancy: { label: 'Fancy — visual charts via chart.js CDN (no npm install needed)', packages: [] }
};

export const DEFAULT_HOURLY_RATE = 80;
