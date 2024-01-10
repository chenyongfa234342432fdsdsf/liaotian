import { ThemeOptionEnum } from '@/constants/base'
import { applyTheme, baseCommonStore } from '@/store/common'

export function initTheme() {
  const { themeOption } = baseCommonStore.getState()

  applyTheme(themeOption)
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', ({ matches }) => {
    if (baseCommonStore.getState().themeOption === ThemeOptionEnum.system) {
      applyTheme(ThemeOptionEnum.system)
    }
  })
}
