import { GLOB_SRC } from '../globs.js'
import { interopDefault, toArray } from '../utils.js'
import type {
  ConfigItem,
  OptionsTypeScriptParserOptions,
  OptionsTypeScriptWithTypes,
} from '../types.js'

export async function typescript(
  options?: OptionsTypeScriptWithTypes &
    OptionsTypeScriptParserOptions & {
      typeAwareRules?: boolean;
      enableForVue?: boolean;
    },
): Promise<ConfigItem[]> {
  const { parserOptions = {} } = options ?? {}

  const tsconfigPath = options?.tsconfigPath
    ? toArray(options.tsconfigPath)
    : undefined

  const [pluginTs, parserTs] = await Promise.all([
    interopDefault(import('@typescript-eslint/eslint-plugin')),
    interopDefault(import('@typescript-eslint/parser')),
  ] as const)

  const typeAwareRules: ConfigItem['rules'] = {
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-implied-eval': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/no-throw-literal': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unsafe-argument': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/restrict-plus-operands': 'error',
    '@typescript-eslint/restrict-template-expressions': 'error',
    '@typescript-eslint/unbound-method': 'error',
    'dot-notation': 'off',
    'no-implied-eval': 'off',
    'no-throw-literal': 'off',
  }

  return [
    {
      name: 'rlanz:typescript:setup',
      plugins: { '@typescript-eslint': pluginTs as any },
    },
    {
      files: [GLOB_SRC],
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          sourceType: 'module',
          ...(tsconfigPath
            ? {
              project: tsconfigPath,
              tsconfigRootDir: process.cwd(),
            }
            : {}),
          ...(parserOptions as any),
        },
      },
      name: 'rlanz:typescript',

      rules: {
        ...pluginTs.configs['eslint-recommended']!.overrides![0]!.rules,
        ...pluginTs.configs['strict']!.rules,
        '@typescript-eslint/ban-ts-comment': [
          'error',
          { 'ts-ignore': 'allow-with-description' },
        ],
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/consistent-indexed-object-style': 'off',
        // Off
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/consistent-type-imports': [
          'error',
          { disallowTypeAnnotations: false, prefer: 'type-imports' },
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        '@typescript-eslint/lines-between-class-members': [
          'error',
          'always',
          { exceptAfterSingleLine: true },
        ],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            selector: 'variable',
          },
          {
            format: ['PascalCase'],
            selector: 'typeLike',
          },
          {
            format: ['PascalCase'],
            selector: 'class',
          },
          {
            custom: {
              match: false,
              regex: '^I[A-Z]',
            },
            format: ['PascalCase'],
            selector: 'interface',
          },
        ],

        '@typescript-eslint/no-dupe-class-members': 'error',
        '@typescript-eslint/no-empty-function': 'off',

        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',

        '@typescript-eslint/no-loss-of-precision': 'error',
        '@typescript-eslint/no-namespace': 'off',

        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-redeclare': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_' },
        ],

        '@typescript-eslint/no-use-before-define': [
          'error',
          { classes: false, functions: false, variables: true },
        ],
        '@typescript-eslint/padding-line-between-statements': [
          'error',
          {
            blankLine: 'always',
            next: ['interface', 'type'],
            prev: '*',
          },
        ],
        '@typescript-eslint/parameter-properties': 'off',
        '@typescript-eslint/prefer-ts-expect-error': 'error',
        '@typescript-eslint/triple-slash-reference': 'off',
        'lines-between-class-members': 'off',
        'no-dupe-class-members': 'off',
        'no-loss-of-precision': 'off',
        'no-redeclare': 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',

        ...(tsconfigPath && options?.typeAwareRules ? typeAwareRules : {}),
      },
    },
  ]
}
