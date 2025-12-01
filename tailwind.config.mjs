/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Surfaces
        'br-bg': 'var(--br-bg)',
        'br-surface': 'var(--br-surface)',
        'br-surface-2': 'var(--br-surface-2)',
        'br-border': 'var(--br-border)',
        // Text
        'br-text': 'var(--br-text)',
        'br-text-muted': 'var(--br-text-muted)',
        // Brand palette
        'br-sunrise-orange': 'var(--br-sunrise-orange)',
        'br-warm-orange': 'var(--br-warm-orange)',
        'br-hot-pink': 'var(--br-hot-pink)',
        'br-electric-magenta': 'var(--br-electric-magenta)',
        'br-deep-magenta': 'var(--br-deep-magenta)',
        'br-vivid-purple': 'var(--br-vivid-purple)',
        'br-cyber-blue': 'var(--br-cyber-blue)',
        // Legacy aliases
        'br-night': 'var(--br-bg)',
        'br-dawn': 'var(--br-hot-pink)',
      },
      typography: {
        'br-day-night': {
          css: {
            '--tw-prose-body': 'var(--br-text)',
            '--tw-prose-headings': 'white',
            '--tw-prose-links': 'var(--br-hot-pink)',
            '--tw-prose-pre-bg': 'var(--br-surface)',
          },
        },
      },
      boxShadow: {
        'glow-pink': '0 0 24px rgba(255, 0, 102, 0.45)',
        'glow-purple': '0 0 24px rgba(119, 0, 255, 0.45)',
        card: '0 14px 32px rgba(0, 0, 0, 0.9)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
