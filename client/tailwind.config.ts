import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary:   '#0C0C14',
          elevated:  '#13131E',
          surface:   '#1C1C2A',
          hover:     '#242438',
          highlight: '#2A2A42',
        },
        brand: {
          '400': '#F76B84',
          '500': '#EF4565',
          '600': '#D93251',
          '900': '#2A0A12',
          glow:  'rgba(239, 69, 101, 0.15)',
        },
        secondary: {
          '400': '#7DB8FF',
          '500': '#5BA4FF',
          '600': '#3D8AEF',
          '900': '#0A1628',
        },
        success: '#34D884',
        warning: '#F5B731',
        error:   '#EF4565',
        text: {
          primary:   '#F0F0F8',
          secondary: '#B0B0C8',
          muted:     '#6B6B85',
          disabled:  '#4A4A62',
          brand:     '#EF4565',
          'on-brand': '#FFFFFF',
        },
        border: {
          subtle:  '#1E1E30',
          default: '#2A2A40',
          strong:  '#3A3A55',
          brand:   '#EF4565',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
        urdu:    ['"Noto Nastaliq Urdu"', '"Noto Sans Devanagari"', 'sans-serif'],
        serif:   ['"Instrument Serif"', 'serif'],
      },
      fontSize: {
        'xs':   ['0.75rem',    { lineHeight: '1rem' }],
        'sm':   ['0.875rem',   { lineHeight: '1.25rem' }],
        'base': ['1.0625rem',  { lineHeight: '1.75rem' }],
        'lg':   ['1.125rem',   { lineHeight: '1.75rem' }],
        'xl':   ['1.25rem',    { lineHeight: '1.75rem' }],
        '2xl':  ['1.5rem',     { lineHeight: '2rem' }],
        '3xl':  ['1.875rem',   { lineHeight: '2.25rem' }],
        '4xl':  ['2.25rem',    { lineHeight: '2.5rem' }],
        '5xl':  ['3rem',       { lineHeight: '1.15' }],
        'hero': ['3.75rem',    { lineHeight: '1.05' }],
      },
      boxShadow: {
        'glow-red':     '0 0 30px rgba(239, 69, 101, 0.2)',
        'glow-blue':    '0 0 30px rgba(91, 164, 255, 0.2)',
        'glow-success': '0 0 20px rgba(52, 216, 132, 0.15)',
      },
      animation: {},
      keyframes: {},
    },
  },
  plugins: [],
}

export default config
