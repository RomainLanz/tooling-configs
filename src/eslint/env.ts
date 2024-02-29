import { isPackageExists } from 'local-pkg'

export const hasTypeScript = isPackageExists('typescript')
export const hasAdonisJS = isPackageExists('@adonisjs/core')
