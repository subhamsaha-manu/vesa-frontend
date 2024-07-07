import { TOGGLE_PREFIX } from './constants'

import { AppConfig } from '@/types/app'

const appConfig = window.AppConfig

const featureToggles = Object.keys(appConfig)
  .filter((item) => {
    return item.startsWith(TOGGLE_PREFIX)
  })
  .map((item) => ({ [item.replace(TOGGLE_PREFIX, '')]: appConfig[item as keyof AppConfig] }))

export default featureToggles
