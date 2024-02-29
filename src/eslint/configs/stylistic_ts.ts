import { interopDefault } from '../utils.js'
import type { ConfigItem } from '../types.js'

export async function stylisticTs(): Promise<ConfigItem[]> {
  const stylisticTs = await interopDefault(
    import('@stylistic/eslint-plugin-ts'),
  )

  return [
    {
      name: 'rlanz:stylisticTs',
      plugins: { '@stylistic/ts': stylisticTs as any },
      rules: {
        '@stylistic/ts/block-spacing': 'error',
        '@stylistic/ts/comma-dangle': ['error', 'always-multiline'],
        '@stylistic/ts/comma-spacing': [
          'error',
          { after: true, before: false },
        ],
        '@stylistic/ts/indent': ['error', 2],
        '@stylistic/ts/key-spacing': 'error',
        '@stylistic/ts/object-curly-spacing': ['error', 'always'],
        '@stylistic/ts/quote-props': ['error', 'consistent-as-needed'],
        '@stylistic/ts/quotes': ['error', 'single'],
        '@stylistic/ts/semi': ['error', 'never'],
        '@stylistic/ts/space-before-blocks': 'error',
        '@stylistic/ts/space-infix-ops': 'error',
        '@stylistic/ts/type-annotation-spacing': [
          'error',
          { after: true, before: false },
        ],
      },
    },
  ]
}
