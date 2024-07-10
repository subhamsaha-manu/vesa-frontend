import react from 'eslint-plugin-react'
import graphql from 'eslint-plugin-graphql'
import lodash from 'eslint-plugin-lodash'
import _import from 'eslint-plugin-import'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import reactHooks from 'eslint-plugin-react-hooks'
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import jestDom from 'eslint-plugin-jest-dom'
import testingLibrary from 'eslint-plugin-testing-library'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: [
      'node_modules/*',
      '**/*.generated.tsx',
      'src/types.ts',
      'src/types/app/index.d.ts',
    ],
  },
  ...compat.extends('eslint:recommended'),
  {
    plugins: {
      react: fixupPluginRules(react),
      graphql,
      lodash,
      import: fixupPluginRules(_import),
      typescriptEslint,
      'react-hooks': fixupPluginRules(reactHooks),
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.browser,
      },
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: tsParser,
    },
  },
  ...fixupConfigRules(
    compat.extends(
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
    ),
  ).map((config) => ({
    ...config,
    files: ['**/*.ts'],
  })),
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tsParser,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true, // Always try to resolve types under `@types` directory even it doesn't contain any source code, like `@types/unist`
        },
      },
    },
    rules: {
      'no-unsafe-optional-chaining': 'off',
      'no-restricted-imports': [
        'error',
        {
          name: '@alefeducation/ui-elements-library-core/',
          message:
            'Please use Eg: "import { Heading } from \'@alefeducation/ui-elements-library-core/lib/Heading\'" instead.',
        },
      ],
      'linebreak-style': ['error', 'unix'],
      'react/prop-types': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'index', 'sibling', 'parent', 'internal'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
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
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error', 'info'],
        },
      ],
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
  ...fixupConfigRules(compat.extends('plugin:jest-dom/recommended')).map((config) => ({
    ...config,
    files: ['**/*.test.{js,tsx}'],
  })),
  {
    files: ['**/*.test.{js,tsx}'],
    plugins: {
      'jest-dom': fixupPluginRules(jestDom),
      'testing-library': fixupPluginRules(testingLibrary),
    },
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
]
