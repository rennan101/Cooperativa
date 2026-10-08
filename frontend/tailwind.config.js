/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        uber: {
          black: '#000000',
          white: '#ffffff',
          gray: '#f6f6f6',
          'gray-hover': '#ececec',
          charcoal: '#333333',
          iron: '#767676',
          ash: '#afafaf',
          slate: '#5e5e5e',
          graphite: '#4b4b4b',
          teal: '#9dcdd6',
          border: '#e5e7eb',
          'border-dark': '#767676',
        },
        coop: {
          primary: '#000000',
          'primary-hover': '#1f1f1f',
          accent: '#000000',
          dark: '#000000',
          50: '#f6f6f6',
          100: '#ececec',
          500: '#000000',
          700: '#1f1f1f',
          900: '#000000',
          950: '#000000',
        },
        brand: {
          bg: '#ffffff',
          surface: '#ffffff',
          surfaceGray: '#f6f6f6',
          border: '#e5e7eb',
          borderDark: '#767676',
          text: '#000000',
          textMuted: '#5e5e5e',
          textLight: '#afafaf',
        }
      },
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '8px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
        'full': '9999px',
      }
    },
  },
  plugins: [],
}
