/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coop: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
          950: '#052E16',
          primary: '#008744',
          'primary-hover': '#006B36',
          dark: '#0B3B24',
          emerald: '#059669',
        },
        brand: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          surfaceDark: '#0B3B24',
          border: '#E2E8F0',
          borderDark: '#CBD5E1',
          text: '#0F172A',
          textMuted: '#475569',
          textLight: '#64748B',
        }
      },
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '6px',
        'md': '6px',
        'lg': '8px',
        'xl': '10px',
      }
    },
  },
  plugins: [],
}
