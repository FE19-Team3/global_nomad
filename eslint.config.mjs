import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import storybook from "eslint-plugin-storybook";
import boundaries from 'eslint-plugin-boundaries';

const eslintConfig = defineConfig([
  // Base ESLint recommended rules
  js.configs.recommended,

  // Next.js configs (must come first to avoid plugin redefinition)
  ...nextVitals,
  ...nextTs,

  // Global ignores
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',
    'dist/**',
  ]),

  // Additional plugins and rules for TypeScript files
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: importPlugin,
      prettier,
      storybook,
      boundaries,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      'boundaries/elements': [
        { type: 'shared', pattern: 'src/shared/**' },
        { type: 'entities', pattern: 'src/entities/**' },
        { type: 'features', pattern: 'src/features/**' },
        { type: 'widgets', pattern: 'src/widgets/**' },
        { type: 'app', pattern: 'src/app/**' },
      ],
    },
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',
      ...prettierConfig.rules,

      // Airbnb-style rules
      // React rules (extending Next.js defaults)
      'react/prop-types': 'off', // Using TypeScript for prop validation
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.tsx', '.jsx'] },
      ],
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off', // TypeScript handles this
      'react/function-component-definition': [
        'warn',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],

      // Import rules
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/prefer-default-export': 'off',
      'import/no-unresolved': 'off', // TypeScript handles this
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      // General rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'off', // Use TypeScript version instead
      'prefer-const': 'error',
      'no-var': 'error',

      // Storybook rules
      ...storybook.configs.recommended.rules,

      // 레이어 단방향 의존성 강제
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'shared', allow: [] },
            { from: 'entities', allow: ['shared'] },
            { from: 'features', allow: ['entities', 'shared'] },
            { from: 'widgets', allow: ['features', 'entities', 'shared'] },
            { from: 'app', allow: ['widgets', 'features', 'entities', 'shared'] },
          ],
        },
      ],

      // internal 직접 import 금지
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@/shared/lib/internal/*'],
        },
      ],
    },
  },

  // Additional plugins and rules for JavaScript files
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      import: importPlugin,
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      ...prettierConfig.rules,
      'react/jsx-filename-extension': ['error', { extensions: ['.jsx'] }],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
        },
      ],
      'import/prefer-default-export': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
]);

export default eslintConfig;
