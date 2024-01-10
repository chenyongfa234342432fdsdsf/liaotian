import { I18nsEnum } from '@/constants/i18n'
import { baseCommonStore } from '@/store/common'
import { navigate } from 'vike/client/router'
import { open } from '@tauri-apps/api/shell'
import { isAbsoluteUrl } from './common'
import { removeLocale } from './i18n'
import { isPlatformDeskTop } from './env'

export interface ILinkConfig {
  /** 保持登录位置 */
  keepScrollPosition?: boolean | undefined
  /** 不要在浏览器的历史记录中创建新条目；新 URL 将替换当前 URL（这有效地从历史记录中删除当前 URL */
  overwriteLastHistoryEntry?: boolean | undefined
  /** 打开新页面 */
  target?: boolean
}
export const link = (url?: string, goConfig?: ILinkConfig) => {
  const lang = ''
  const sanitisedUrl = removeLocale(url) || ''
  let _url = `${lang}${sanitisedUrl}`

  // 防止后端设置为 null
  if (!url) _url = ''
  if (isAbsoluteUrl(url)) {
    _url = url as string
  }

  if (goConfig?.target) {
    if (isPlatformDeskTop) {
      open(_url)
      return
    }
    return window.open(_url, 'target')
  }

  return navigate(_url, {
    overwriteLastHistoryEntry: !!goConfig?.overwriteLastHistoryEntry,
    keepScrollPosition: !!goConfig?.keepScrollPosition,
  })
}
