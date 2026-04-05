import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {},
      fontFamily: {},
      animation: {},
      keyframes: {},
    },
  },
  plugins: [],
}

export default config
