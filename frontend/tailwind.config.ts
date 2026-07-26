import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // TODO (Module 2): Inject Neo-Brutalism color tokens (#F9F5F6 bg, #FFDB58 accent, etc.),
      // font families (Epilogue, Inter), and flat box-shadow scale here.
    },
  },
  plugins: [],
} satisfies Config
