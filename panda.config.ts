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
          // Primary colors
          primary: { value: '#000000' },
          white: { value: '#FFFFFF' },

          // Accent colors
          accent: { value: '#00BCD4' },
          modelOverlay: { value: '#8B4844' },

          // Semantic colors
          success: { value: '#059669' },
          error: { value: '#DC2626' },
          info: { value: '#3B82F6' },
          warning: { value: '#F59E0B' },

          // Grayscale
          gray: {
            50: { value: '#FAFAFA' },
            100: { value: '#F5F5F5' },
            200: { value: '#E5E5E5' },
            300: { value: '#D4D4D4' },
            400: { value: '#A3A3A3' },
            500: { value: '#737373' },
            600: { value: '#525252' },
            700: { value: '#404040' },
            800: { value: '#262626' },
            900: { value: '#171717' },
          },

          // Legacy brand colors (기존 호환성 유지)
          brand: {
            50: { value: '#FAFAFA' },
            100: { value: '#F5F5F5' },
            200: { value: '#E5E5E5' },
            300: { value: '#D4D4D4' },
            400: { value: '#A3A3A3' },
            500: { value: '#737373' },
            600: { value: '#525252' },
            700: { value: '#404040' },
            800: { value: '#262626' },
            900: { value: '#171717' },
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
          '4xl': { value: '6rem' },
        },
        fontSizes: {
          xs: { value: '0.75rem' },
          sm: { value: '0.875rem' },
          base: { value: '1rem' },
          lg: { value: '1.125rem' },
          xl: { value: '1.25rem' },
          '2xl': { value: '1.5rem' },
          '3xl': { value: '2rem' },
          '4xl': { value: '2.5rem' },
          '5xl': { value: '3rem' },
          '6xl': { value: '4rem' },
          hero: { value: '6rem' },
        },
        fontWeights: {
          light: { value: '300' },
          normal: { value: '400' },
          medium: { value: '500' },
          semibold: { value: '600' },
          bold: { value: '700' },
          black: { value: '900' },
        },
        lineHeights: {
          tight: { value: '1.2' },
          normal: { value: '1.5' },
          relaxed: { value: '1.6' },
          loose: { value: '1.8' },
        },
        radii: {
          none: { value: '0' },
          sm: { value: '0.125rem' },
          md: { value: '0.25rem' },
          lg: { value: '0.375rem' },
          xl: { value: '0.5rem' },
          '2xl': { value: '1rem' },
          full: { value: '9999px' },
        },
        shadows: {
          sm: { value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
          md: { value: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' },
          lg: { value: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' },
          xl: { value: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' },
          '2xl': { value: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' },
        },
        durations: {
          fast: { value: '0.2s' },
          normal: { value: '0.3s' },
          slow: { value: '0.6s' },
          verySlow: { value: '1s' },
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },

  outdir: 'styled-system',
})