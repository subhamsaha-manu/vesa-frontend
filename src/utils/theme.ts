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
    },
  },
})
