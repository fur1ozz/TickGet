import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './signup/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {"50":"#fff1f2","100":"#ffe4e6","200":"#fecdd3","300":"#fda4af","400":"#fb7185","500":"#f43f5e","600":"#e11d48","700":"#be123c","800":"#9f1239","900":"#881337","950":"#4c0519"},
        darkPrimary: "#09070D",
        secondary: {"100": "#ff2d2d", "200": "#ff1818", "300": "#770e0e"},
        event: "#f1ab1c",
        darken: "rgba(0,0,0,0.62)",
        shadowWhite: "rgba(255,255,255,0.2)",
        ticket: {"100": "#6ea16d", "200": "#c9b1cb", "300": "#f54545", "400": "#f5c345",},
        ticketBg: {"100": "#ECF8FE", "200": "#010d13", "300": "#03171f"},
      },
    },
  },
  plugins: [],
}
export default config

// 64abcf
// ff4646