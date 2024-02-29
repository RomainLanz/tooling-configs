import type { ConfigItem } from '../types.js'

export async function javascript(): Promise<ConfigItem[]> {
  return [
    {
      languageOptions: {
        ecmaVersion: 2022,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 2022,
          sourceType: 'module',
        },
        sourceType: 'module',
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },

      name: 'rlanz:javascript',

      rules: {
        'capitalized-comments': [
          'error',
          'always',
          {
            line: {
              ignoreConsecutiveComments: true,
              ignoreInlineComments: true,
              ignorePattern: '.*',
            },
          },
        ],
        'curly': ['error', 'all'],
        'eqeqeq': ['error', 'always'],
        'no-array-constructor': 'error',
        'no-caller': 'error',
        'no-cond-assign': ['error', 'always'],
        'no-console': 'warn',
        'no-constant-condition': 'warn',
        'no-control-regex': 'error',
        'no-debugger': 'error',
        'no-duplicate-case': 'error',
        'no-else-return': 'error',
        'no-eval': 'error',
        'no-ex-assign': 'error',
        'no-extra-boolean-cast': 'error',
        'no-fallthrough': 'error',
        'no-inner-declarations': 'error',
        'no-invalid-regexp': ['error', { allowConstructorFlags: ['u', 'y'] }],
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
        'no-new-wrappers': 'error',
        'no-proto': 'error',
        'no-regex-spaces': 'error',
        'no-self-assign': 'error',
        'no-self-compare': 'error',
        'no-sparse-arrays': 'error',
        'no-this-before-super': 'error',
        'no-undef-init': 'error',
        'no-unreachable': 'error',
        'no-unsafe-finally': 'error',
        'no-unsafe-negation': 'error',
        'no-unused-vars': 'warn',
        'no-with': 'error',
        'object-shorthand': [
          'error',
          'always',
          { avoidQuotes: true, ignoreConstructors: false },
        ],
        'one-var': ['error', 'never'],
        'prefer-const': 'error',
        'use-isnan': 'error',
        'valid-typeof': ['error', { requireStringLiterals: true }],
        'yoda': 'error',
      },
    },
  ]
}
