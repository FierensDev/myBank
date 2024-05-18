/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D75A20',
        secondary: '#F2DED2',
        actions: '#262223',
        alternative: '#F6F2E7',
        alternative2: '#262223'
      },
      fontSize: {
        'h1': '48px',
        'h2': '28px',
        'h3': '24px',
        'p': '17px',
        'small': '14px',
        'info': '12px',
        'form': '10px'
      }
    },
  },
  plugins: [],
}

