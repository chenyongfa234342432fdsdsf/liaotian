import { addGlobalLibrary } from '@/helper/externals'
import { setAutoFreeze } from 'immer'
import { logGitCommitId } from '../common'
import { initSentry } from './utils/sentry'
import { getDeviceId } from './utils/client-device-id'
import { initCache } from '../cache/common'
import { initWS } from './utils/init-ws'
import { initClientApi } from './utils/init-api'
import { initThemeColor } from '../theme'
import { initObserver } from './utils/init-observer'
import { awaitImLoaded, loginIm } from './login-im'
import { registerOnLoginChange } from './login-change'
import { initVConsoleOnDev } from '../log'
import { initTheme } from '../init-theme'
import { initializeLayoutStore } from '../layout'

setAutoFreeze(false)

/**
 * 初始化 客户端能力，例如注册 ws
 */
export const onInstallForClient = async (pageContext: PageContext) => {
  /** 探测持久化储存 */
  initCache()
  initTheme()
  /** 注册 sentry */
  initSentry()
  initObserver()

  /** 获取设置唯一 id */
  await getDeviceId()
  // 实际上很快
  await awaitImLoaded()

  /** 添加全局库 */
  addGlobalLibrary()
  /** 注册 WS */
  initWS()
  /** 注册 api */
  initClientApi()
  /** 额外功能 */
  logGitCommitId()
  /** 是否融合模式设置 Okx 皮肤 */
  initThemeColor()
  registerOnLoginChange()
  loginIm()
  initVConsoleOnDev()

  /** layout store */
  initializeLayoutStore()
}
