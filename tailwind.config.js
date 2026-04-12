/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        attain: {
          base:    '#1E1A2E',
          card:    '#252040',
          hover:   '#2D2750',
          primary: '#3B82F6',
          deep:    '#2563EB',
          blue:    '#3B82F6',
          emerald: '#10B981',
          lilac:   '#C4B5FD',
          muted:   '#AFADAD',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
      },
      boxShadow: {
        card: 'rgba(0, 0, 0, 0.2) 0px 1px 30px 0px',
        'card-hover': 'rgba(0, 0, 0, 0.35) 0px 4px 40px 0px',
        'card-glow-blue': '0 0 30px rgba(59, 130, 246, 0.15)',
        'card-glow-emerald': '0 0 30px rgba(16, 185, 129, 0.15)',
        'card-glow-green': '0 0 30px rgba(34, 197, 94, 0.15)',
        'card-glow-lilac': '0 0 30px rgba(196, 181, 253, 0.15)',
      },
    },
  },
  plugins: [],
}
