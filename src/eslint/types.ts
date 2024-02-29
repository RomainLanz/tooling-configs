import type {
  FlatESLintConfigItem,
  ParserOptions,
} from '@antfu/eslint-define-config'
import type { Linter } from 'eslint'
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore'

export type ConfigItem = FlatESLintConfigItem & {
  name?: string;
}

export type UserConfigItem = ConfigItem | Linter.FlatConfig

export type Awaitable<T> = T | Promise<T>

export interface OptionsTypeScriptWithTypes {
  /**
   * When this options is provided, type aware rules will be enabled.
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  tsconfigPath?: string | string[];
}

export interface OptionsTypeScriptParserOptions {
  /**
   * Additional parser options for TypeScript.
   */
  parserOptions?: Partial<ParserOptions>;
}

export type RlanzOptions = {
  /**
   * If enabled, all files specified in `.gitignore` will be ignored
   * by eslint
   */
  enableGitIgnore?: boolean | FlatGitignoreOptions;

  /**
   * Enable AdonisJS lint rules
   *
   * Enabled by default if AdonisJS is detected in dependencies
   */
  adonisjs?: boolean;

  /**
   * Enable Typescript lint rules
   *
   * Enabled by default if `typescript` is detected in dependencies
   */
  typescript?:
    | boolean
    | ((OptionsTypeScriptWithTypes | OptionsTypeScriptParserOptions) & {
      typeAwareRules?: boolean;
    });
}
