import { interopDefault } from '../utils.js'
import type { ConfigItem } from '../types.js'

export async function perfectionist(): Promise<ConfigItem[]> {
  const pluginPerfectionist = await interopDefault(
    import('eslint-plugin-perfectionist'),
  )

  return [
    {
      name: 'rlanz:perfectionist',
      plugins: { perfectionist: pluginPerfectionist },
      rules: {
        'perfectionist/sort-imports': [
          'error',
          {
            'groups': [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'type',
            ],
            'newlines-between': 'never',
            'order': 'asc',
            'type': 'alphabetical',
          },
        ],
        'perfectionist/sort-objects': [
          'error',
          {
            order: 'asc',
            type: 'alphabetical',
          },
        ],
      },
    },
  ]
}
