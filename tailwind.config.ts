import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3f9',
          100: '#fee7f3',
          200: '#ffcce8',
          300: '#ffa0d2',
          400: '#fe64b2',
          500: '#f83794',
          600: '#e8166e',
          700: '#ca0a53',
          800: '#a70c45',
          900: '#8b0f3c',
        },
        secondary: {
          50: '#f6f5fd',
          100: '#eeedfb',
          200: '#dfddf8',
          300: '#c5bff2',
          400: '#a799e8',
          500: '#8b6fdc',
          600: '#764dcc',
          700: '#653cb6',
          800: '#543395',
          900: '#462c79',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config