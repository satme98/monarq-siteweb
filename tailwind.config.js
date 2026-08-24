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
          'paper-soft': '#F6F2E9',
          'paper-dark': '#EDE7DB',
          white: '#FFFFFF',
          ink: '#141210',
          black: '#0A0A0A',
          'ink-soft': '#3D352E',
          'ink-muted': '#685C50',
          gold: '#9E8050',
          'gold-light': '#D4C29E',
          'gold-deep': '#785A2D',
          line: '#E5DFD3',
          'line-strong': '#CBC3B3',
          chili: '#D83023',
        }
      },
      fontFamily: {
        serif: ['"Cormorant SC"', '"Cormorant Garamond"', '"Bodoni Moda"', 'Georgia', 'serif'],
        editorial: ['"Cormorant Garamond"', '"Bodoni Moda"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Cormorant SC"', '"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 7vw, 5.8rem)', { lineHeight: '1.08', letterSpacing: '0.02em' }],
        'display-lg': ['clamp(2.4rem, 5vw, 4.2rem)', { lineHeight: '1.12', letterSpacing: '0.02em' }],
        'display-md': ['clamp(1.8rem, 3.6vw, 3rem)', { lineHeight: '1.18', letterSpacing: '0.03em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'body-base': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.65' }],
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
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(-18px)' },
          '50%': { transform: 'translateY(0px)' },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-reverse': 'float-reverse 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
