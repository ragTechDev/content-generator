import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './templates/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          // ragTech palette
          lightLemon: '#fff3c2',
          lightRed: '#ffa3a6',
          pastelGrayCyan: '#9cd2d0',
          pastelOrange: '#eebf89',
          offWhite: '#faf9f5',
          gray: '#7d7c78',
        },
      },
      letterSpacing: { headline: '0.63em' },
      container: { center: true, padding: '1rem' }
    },
  },
  plugins: [],
}
export default config
