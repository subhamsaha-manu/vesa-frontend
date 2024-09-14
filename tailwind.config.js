const { nextui } = require('@nextui-org/react')

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#f5f5f5',
        default: {
          100: '#ffffff',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
