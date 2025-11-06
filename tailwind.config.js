/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',    // Bleu Parions Sport
        secondary: '#1e40af',  // Bleu foncé
        success: '#10b981',    // Vert
        danger: '#ef4444',     // Rouge
        warning: '#f59e0b',    // Orange
      },
    },
  },
  plugins: [],
}
