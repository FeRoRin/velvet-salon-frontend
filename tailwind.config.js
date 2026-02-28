/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind scans these files to find used classes
  // If a class isn't found here, it won't be included in the CSS bundle
  content: [
    './index.html',
    './src/**/*.{vue,js}'
  ],
  theme: {
    extend: {
      colors: {
        // Custom Velvet Salon pink palette (velvet + admin)
        velvet: {
          50:  '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',   // ← main brand color 
          800: '#9d174d',
          900: '#831843',
        },
        // Admin purple palette
        admin: {
          50:  '#f5f3ff',
          100: '#ede9fe',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',   // ← main admin color 
          800: '#5b21b6',
          900: '#4c1d95',
        }
      },
      fontFamily: {
        sans:  ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    }
  },
  plugins: [],
}
