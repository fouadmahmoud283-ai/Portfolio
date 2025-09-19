import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#2E97F7',
          purple: '#5C3EE8',
          teal: '#2a9d8f',
          orange: '#FF6F00',
        },
        gradient: {
          start: '#1a1a2e',
          middle: '#16213e',
          end: '#0f0f23',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'gradient': 'gradient 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
        'blink': 'blink 1s infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(-20px)'
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            'box-shadow': '0 0 5px rgba(46, 151, 247, 0.5)'
          },
          '50%': {
            'box-shadow': '0 0 20px rgba(46, 151, 247, 0.8), 0 0 30px rgba(46, 151, 247, 0.6)'
          },
        },
        blink: {
          '0%, 50%': {
            opacity: '1'
          },
          '51%, 100%': {
            opacity: '0'
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
export default config