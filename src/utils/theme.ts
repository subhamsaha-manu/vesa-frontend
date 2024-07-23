import { extendTheme } from '@chakra-ui/react'

const colors = {
  primary: {
    10: '#ECEDEF',
    100: '#485465',
    200: '#27EF96',
    300: '#10DE82',
    400: '#0EBE6F',
    500: '#0CA25F',
    600: '#0A864F',
    700: '#086F42',
    800: '#075C37',
    900: '#064C2E',
  },
}

const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
}

const fonts = {
  heading: `'Montserrat', sans-serif`,
  body: `'Montserrat', sans-serif`,
}
const customTheme = extendTheme({ colors, fonts, breakpoints })

export default customTheme
