/* eslint-disable prefer-promise-reject-errors */
import { ZIMConnectionEvent, ZIMConnectionState, ZIMEventEnum } from './constants'
import { getImInstance } from './core'
import { addEventListenerOnIm } from './event'

type IUserInfo = {
  uid: string
  nickname: string
}
type IGetImTokenRes = {
  token: string
}
type IInitImParams = {
  /** 获取用户信息 */
  getUserInfo: () => IUserInfo
  /** 获取 IM token 的方法 */
  getImToken: () => Promise<IGetImTokenRes>
}

// 导出的全局信息，可以认为只有 1 个实例
export const ImGlobalConfig = {
  initParams: {} as IInitImParams,
  initRes: {
    settings: {} as IGetImTokenRes,
    login: async () => {},
  },
  isLogin: false,
}

/** 初始化 im，返回 登录函数和 token 配置 */
export async function initIm(params: IInitImParams) {
  if (ImGlobalConfig.initRes.settings.token) {
    console.info('IM 已初始化')
    return ImGlobalConfig.initRes
  }
  let { getUserInfo, getImToken } = params
  /** 获取配置信息 */
  const settings = await getImToken()
  function login() {
    const userInfo = getUserInfo()
    const uid = userInfo?.uid
    return getImInstance()
      .login(
        {
          userID: `${uid}`,
          userName: userInfo.nickname,
        },
        ImGlobalConfig.initRes.settings.token
      )
      .then(() => {
        ImGlobalConfig.isLogin = true
      })
  }
  const result = {
    settings,
    login,
  }

  ImGlobalConfig.initParams = params
  ImGlobalConfig.initRes = result
  return result
}
/** 发送消息前置事件，因为发送消息函数众多，需要发送消息前手动调用 */
export function beforeSend() {
  if (!ImGlobalConfig.isLogin) {
    return Promise.reject('IM 未登录')
  }

  return Promise.resolve()
}

export function imLogout() {
  ImGlobalConfig.initRes = {
    settings: {} as IGetImTokenRes,
    login: async () => {},
  }
  if (ImGlobalConfig.isLogin) {
    getImInstance().logout()
    ImGlobalConfig.isLogin = false
  }
}
