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
        primary: { value: '#0FEE0F' },
        secondary: { value: '#EE0F0F' },
        solid: { value: '#EE0F0F' },
      },
      radii: {
        button: { value: '40px' }, // Custom radius token
      },
    },
    recipes: {
      Button: {
        variants: {
          solid: {
            styles: {
              bg: '{colors.solid}', // Use the "solid" color token
              color: 'white',
              _hover: {
                bg: '{colors.secondary}', // Use the "secondary" color token
              },
            },
          },
        },
      },
    },
  },
})
