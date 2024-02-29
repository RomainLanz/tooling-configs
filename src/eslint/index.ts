import { existsSync } from 'node:fs'
import { adonisjs } from './configs/adonisjs.js'
import { javascript } from './configs/javascript.js'
import { perfectionist } from './configs/perfectionist.js'
import { stylisticTs } from './configs/stylistic_ts.js'
import { typescript } from './configs/typescript.js'
import { hasAdonisJS, hasTypeScript } from './env.js'
import { combine, interopDefault } from './utils.js'
import type {
  Awaitable,
  ConfigItem,
  RlanzOptions,
  UserConfigItem,
} from './types.js'

export async function rlanz(
  options: RlanzOptions = {},
  ...userConfigs: Awaitable<UserConfigItem | UserConfigItem[]>[]
) {
  const {
    adonisjs: enableAdonisJS = hasAdonisJS,
    enableGitIgnore = true,
    typescript: enableTypescript = hasTypeScript,
  } = options

  const configs: Awaitable<ConfigItem[]>[] = []

  if (enableGitIgnore) {
    const plugin = await interopDefault(import('eslint-config-flat-gitignore'))

    if (typeof enableGitIgnore !== 'boolean') {
      // @ts-expect-error - ignore
      configs.push(plugin(enableGitIgnore))
    } else if (existsSync('.gitignore')) {
      // @ts-expect-error - ignore
      configs.push(plugin())
    }
  }

  configs.push(javascript(), perfectionist())

  if (enableTypescript) {
    configs.push(typescript(), stylisticTs())
  }

  if (enableAdonisJS) {
    configs.push(adonisjs())
  }

  const resolved = await Promise.all(configs)
  return combine(...resolved, ...userConfigs)
}
