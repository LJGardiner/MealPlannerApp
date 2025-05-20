module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F9FAFB',
        'background-dark': '#1F2937',
        foreground: '#111827',
        'foreground-dark': '#F9FAFB',
        card: '#FFFFFF',
        'card-dark': '#111827',
        border: '#E5E7EB',
        'border-dark': '#374151',
        primary: '#3B82F6',
        'primary-dark': '#60A5FA',
      },
    },
  },
  plugins: [],
};
