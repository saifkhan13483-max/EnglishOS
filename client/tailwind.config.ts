import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0A0A0F',
        'bg-secondary': '#111118',
        'bg-tertiary': '#1A1A28',
        'border-subtle': '#2A2A3E',
        'border-strong': '#3A3A5A',
        'brand-red': '#E94560',
        'brand-blue': '#4A9EFF',
        'brand-gold': '#F5B014',
        'brand-green': '#2ECC71',
        'text-primary': '#FFFFFF',
        'text-secondary': '#C8C8E0',
        'text-muted': '#6A6A8A',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {},
      keyframes: {},
    },
  },
  plugins: [],
}

export default config
