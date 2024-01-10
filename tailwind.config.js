/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'jungle-green': {
          '50': '#ecfdf6',
          '100': '#d0fbe8',
          '200': '#a5f5d7',
          '300': '#6beac2',
          '400': '#2fd8a8',
          '500': '#0aaa82',
          '600': '#019a77',
          '700': '#017b62',
          '800': '#03624f',
          '900': '#045042',
          '950': '#012d27',
      },      
      }
    },
  },
  plugins: [],
}
