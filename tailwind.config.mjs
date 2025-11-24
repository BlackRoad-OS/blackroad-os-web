/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      colors: {
        'br-night': '#0b1220',
        'br-dawn': '#0ea5e9',
      },
      typography: {
        'br-day-night': {
          css: {
            '--tw-prose-body': 'rgb(226 232 240)',
            '--tw-prose-headings': 'white',
            '--tw-prose-links': '#67e8f9',
            '--tw-prose-pre-bg': 'rgb(15 23 42)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
