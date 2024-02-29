import { interopDefault } from '../utils.js'
import type { ConfigItem } from '../types.js'

export async function adonisjs(): Promise<ConfigItem[]> {
  const adonisjsPlugin = await interopDefault(
    // @ts-expect-error missing types
    import('@adonisjs/eslint-plugin'),
  )

  return [
    {
      name: 'rlanz:adonisjs',
      plugins: {
        '@adonisjs': adonisjsPlugin,
      },
      rules: {
        '@adonisjs/prefer-lazy-controller-import': 'error',
        '@adonisjs/prefer-lazy-listener-import': 'error',
      },
    },
  ]
}
