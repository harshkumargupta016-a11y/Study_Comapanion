/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        bg2: 'var(--bg2)',
        ink: 'var(--ink)',
        mut: 'var(--mut)',
        deep: 'var(--deep)',
        teal: 'var(--teal)',
        coral: 'var(--coral)',
        amber: 'var(--amber)',
        line: 'var(--line)',
        modality: {
          video: 'var(--coral)',
          pdf: 'var(--teal)',
          slide: 'var(--amber)',
        }
      },
      fontFamily: {
        sans: ['Calibri', 'Segoe UI', 'system-ui', 'sans-serif'],
        head: ['Cambria', 'Georgia', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
