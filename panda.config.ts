import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  include: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  jsxFramework: 'react',

  theme: {
    extend: {
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      tokens: {
        colors: {
          brand: {
            50: { value: '#fafafa' },
            100: { value: '#f4f4f5' },
            200: { value: '#e4e4e7' },
            300: { value: '#d4d4d8' },
            400: { value: '#a1a1aa' },
            500: { value: '#71717a' },
            600: { value: '#52525b' },
            700: { value: '#3f3f46' },
            800: { value: '#27272a' },
            900: { value: '#18181b' },
          },
        },
        spacing: {
          xs: { value: '0.25rem' },
          sm: { value: '0.5rem' },
          md: { value: '1rem' },
          lg: { value: '1.5rem' },
          xl: { value: '2rem' },
          '2xl': { value: '3rem' },
          '3xl': { value: '4rem' },
        },
      },
    },
  },

  outdir: 'styled-system',
})