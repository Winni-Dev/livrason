module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'bleuw': {
          400: '#2D5FFF', // Bleu turquoise
          500: '#244dcc', // Version plus foncée
        },
      },
      animation: {
        'typing': 'typing 3.5s steps(40, end)',
        'blink-caret': 'blink-caret 0.75s step-end infinite',
      },
      keyframes: {
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        'blink-caret': {
          from: { 'border-color': 'transparent' },
          to: { 'border-color': '#40E0D0' },
        },
      },
    },
  },
  plugins: [],
}