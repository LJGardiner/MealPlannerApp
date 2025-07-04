/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  safelist: [
    'bg-slate-100',
    'bg-white',
    'bg-slate-800',
    'bg-slate-950',
    'dark:bg-slate-800',
    'dark:bg-slate-950'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        card: 'var(--card)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        'border-default': 'var(--border-default)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
