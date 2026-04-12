/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        attain: {
          base:    '#0D0D12',
          card:    '#141418',
          hover:   '#1A1A20',
          primary: '#00FF88',
          deep:    '#00CC6A',
          blue:    '#22D3EE',
          emerald: '#00FF88',
          lilac:   '#22D3EE',
          muted:   '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '6px',
      },
      boxShadow: {
        card: 'rgba(0, 0, 0, 0.3) 0px 1px 30px 0px',
        'card-hover': 'rgba(0, 0, 0, 0.45) 0px 4px 40px 0px',
        'card-glow-blue': '0 0 30px rgba(34, 211, 238, 0.15)',
        'card-glow-emerald': '0 0 30px rgba(0, 255, 136, 0.15)',
        'card-glow-green': '0 0 30px rgba(0, 255, 136, 0.15)',
        'card-glow-lilac': '0 0 30px rgba(34, 211, 238, 0.15)',
      },
    },
  },
  plugins: [],
}
