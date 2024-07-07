module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    jest: true,
    browser: true,
  },
  parserOptions: { ecmaVersion: 8, sourceType: 'module' },
  ignorePatterns: [
    'node_modules/*',
    '**/*.generated.tsx',
    'src/types.ts',
    'src/types/app/index.d.ts',
  ],
  plugins: [
    'react',
    'graphql',
    'lodash',
    'import',
    'prettier',
    '@typescript-eslint',
    'react-hooks',
  ],
  extends: ['eslint:recommended'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        react: { version: 'detect' },
        'import/resolver': {
          typescript: {},
        },
      },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
        'plugin:testing-library/react',
        'plugin:jest-dom/recommended',
      ],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: ['@/features/*/**/*.ts', '@/features/*/**/*.tsx'],
          },
        ],
        'linebreak-style': ['error', 'unix'],
        'react/prop-types': 'off',

        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'index', 'sibling', 'parent', 'internal'],
            'newlines-between': 'always',
            alphabetize: { order: 'asc', caseInsensitive: true },
          },
        ],
        'import/default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-named-as-default': 'off',

        'react/react-in-jsx-scope': 'off',

        'jsx-a11y/anchor-is-valid': 'off',

        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-function-return-type': ['off'],
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
        '@typescript-eslint/no-empty-function': ['off'],
        '@typescript-eslint/no-explicit-any': ['off'],

        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      },
    },
    {
      files: ['**/*.generated.tsx'],
      rules: {
        '@typescript-eslint/ban-types': 'off',
        'import/no-duplicates': 'off',
        'graphql/template-strings': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      files: ['**/*.test.{js,tsx}'],
      extends: ['plugin:jest-dom/recommended'],
      plugins: ['jest-dom', 'testing-library'],
      rules: {
        'react/display-name': 'off',
        'jest/no-disabled-tests': 'off',
        'testing-library/no-await-sync-query': 'error',
        'jest-dom/prefer-to-have-text-content': 'error',
        'testing-library/no-debug': 'error',
      },
    },
    {
      files: ['src/types.ts', 'src/types/app/index.d.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        camelcase: 'off',
      },
    },
  ],
}
