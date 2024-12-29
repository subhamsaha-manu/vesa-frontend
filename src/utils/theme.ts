import { createSystem, defaultConfig } from '@chakra-ui/react'

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Montserrat', sans-serif` },
        body: { value: `'Montserrat', sans-serif` },
      },
      breakpoints: {
        sm: { value: '30em' },
        md: { value: '48em' },
        lg: { value: '62em' },
        xl: { value: '80em' },
        '2xl': { value: '96em' },
      },
      colors: {
        brand: {
          50: { value: '#e6f2ff' },
          100: { value: '#e6f2ff' },
          200: { value: '#bfdeff' },
          300: { value: '#99caff' },
          // ...
          950: { value: '#001a33' },
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: '{colors.brand.500}' },
          contrast: { value: '{colors.brand.100}' },
          fg: { value: '{colors.brand.700}' },
          muted: { value: '{colors.brand.100}' },
          subtle: { value: '{colors.brand.200}' },
          emphasized: { value: '{colors.brand.300}' },
          focusRing: { value: '{colors.brand.500}' },
        },
      },
    },
  },
})
