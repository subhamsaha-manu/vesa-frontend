module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/*.stories.mdx'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@chakra-ui/storybook-addon'],
  typescript: { reactDocgen: false },
  framework: '@storybook/react',
}
