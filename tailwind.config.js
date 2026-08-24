/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        monarq: {
          paper: '#FDFAF5',
          'paper-soft': '#F5F2EB',
          'paper-dark': '#EBE7DE',
          white: '#FFFFFF',
          ink: '#1A1714',
          black: '#0A0A0A',
          'ink-soft': '#5C5248',
          'ink-muted': '#8A7E72',
          gold: '#A7916C',
          'gold-light': '#C5B392',
          'gold-deep': '#8B6A3D',
          line: '#E5E1D8',
          'line-strong': '#CBC6BA',
          chili: '#E63B2E',
        }
      },
      fontFamily: {
        serif: ['"Cormorant SC"', '"Cormorant Garamond"', '"Bodoni Moda"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Cormorant SC"', '"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.8rem, 7vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'display-lg': ['clamp(2.2rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '0em' }],
        'display-md': ['clamp(1.6rem, 3.5vw, 2.8rem)', { lineHeight: '1.15', letterSpacing: '0.01em' }],
      },
      boxShadow: {
        'luxury': '0 4px 20px -4px rgba(24, 21, 18, 0.06), 0 1px 3px rgba(24, 21, 18, 0.04)',
        'luxury-lg': '0 20px 50px -12px rgba(24, 21, 18, 0.12), 0 4px 12px rgba(24, 21, 18, 0.04)',
        'luxury-xl': '0 30px 60px -15px rgba(24, 21, 18, 0.15)',
        'inner-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)',
        'gold-glow': '0 0 30px -5px rgba(167, 145, 108, 0.3)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      transitionTimingFunction: {
        'monarch': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
