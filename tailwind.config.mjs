/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Neon Spectrum (hardcoded values from brand)
        sunrise: '#FF9D00',
        'warm-orange': '#FF6B00',
        'hot-pink': '#FF0066',
        'electric-magenta': '#FF006B',
        'deep-magenta': '#D600AA',
        'vivid-purple': '#7700FF',
        'cyber-blue': '#0066FF',

        // Neutrals
        'br-black': '#000000',
        'deep-black': '#050505',
        charcoal: '#0D0D0D',
        slate: '#141414',
        'br-white': '#FFFFFF',

        // Semantic
        action: '#FF9D00',
        creativity: '#FF0066',
        intelligence: '#7700FF',
        trust: '#0066FF',
        focus: '#FF006B',
        depth: '#D600AA',

        // Surfaces (CSS variable based)
        'br-bg': 'var(--br-bg)',
        'br-surface': 'var(--br-surface)',
        'br-surface-2': 'var(--br-surface-2)',
        'br-border': 'var(--br-border)',

        // Text
        'br-text': 'var(--br-text)',
        'br-text-muted': 'var(--br-text-muted)',

        // Brand palette (CSS variable based)
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

        // Surface objects
        surface: {
          base: '#000000',
          elevated: '#050505',
          card: '#0D0D0D',
          panel: '#141414',
        },
      },
      fontFamily: {
        display: ['Inter Tight', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'glow-orange': '0 0 30px rgba(255, 157, 0, 0.4)',
        'glow-pink': '0 0 24px rgba(255, 0, 102, 0.45)',
        'glow-purple': '0 0 24px rgba(119, 0, 255, 0.45)',
        'glow-blue': '0 0 30px rgba(0, 102, 255, 0.4)',
        'glow-magenta': '0 0 30px rgba(255, 0, 107, 0.4)',
        card: '0 14px 32px rgba(0, 0, 0, 0.9)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(180deg, #FF9D00 0%, #FF6B00 50%, #FF0066 100%)',
        'gradient-os': 'linear-gradient(180deg, #FF0066 0%, #D600AA 33%, #7700FF 66%, #0066FF 100%)',
        'gradient-brand-h': 'linear-gradient(90deg, #FF9D00 0%, #FF6B00 50%, #FF0066 100%)',
        'gradient-os-h': 'linear-gradient(90deg, #FF0066 0%, #D600AA 33%, #7700FF 66%, #0066FF 100%)',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--br-text)',
            '--tw-prose-headings': 'white',
            '--tw-prose-links': 'var(--br-hot-pink)',
            '--tw-prose-pre-bg': 'var(--br-surface)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
