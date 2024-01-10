import { getImToken } from '@/apis/zim'
import { imLogout, initIm } from '@/plugins/im'
import { getImInstance } from '@/plugins/im/core'
import { baseImStore } from '@/store/im'
import { baseUserStore } from '@/store/user'
import { ZIMErrorCode } from '@/plugins/im/constants'
import { Message } from '@nbit/arco'
import { t } from '@lingui/macro'
import {
  bindEventOnReceiveMessage,
  bindEventOnMessageSentStatsChange,
  binEventOnMessageDelete,
  binEventOnMessageRevoke,
  binEventOnMessageRead,
} from '../message'
import {
  bindEventOnCommandRevoke,
  bindEventOnEndLogin,
  bindEventOnGroupInfoUpdate,
  bindEventOnImStageChange,
  bindEventOnImUserInfoUpdate,
} from '../im'
import { bindEventOnConversationChange } from '../conversation'
import { bindEventOnGroupChange } from '../address-book'
import { bindEventOnCommand } from '../im/command'

export async function awaitImLoaded() {
  return new Promise(resolve => {
    const timer = setInterval(() => {
      if (getImInstance()) {
        clearInterval(timer)
        resolve(null)
      }
    }, 100)
  })
}

async function onLogin() {
  const res = await initIm({
    async getImToken() {
      return {
        token: baseUserStore.getState().zimToken,
      }
    },
    getUserInfo: () => {
      const { userInfo } = baseUserStore.getState()
      return {
        uid: userInfo.uid,
        nickname: userInfo.nickName,
      }
    },
  })
  if (!res) {
    return
  }

  if (res) {
    const { login } = res
    let err: any
    await login().catch(async error => {
      err = error
    })
    if (err) {
      if (![ZIMErrorCode.NetworkModuleTokenExpired, ZIMErrorCode.NetworkModuleTokenInvalid].includes(err.code)) {
        Message.error(t`helper_lifecycle_login_im_pq9_uant_x`)
        console.error(err)
        return Promise.reject(err)
      }
      // 只要登录失败，都认为是 token 不对
      const { data, message } = await getImToken({})
      if (!data) {
        return Promise.reject(message)
      }
      baseUserStore.getState().setZimToken(data.zeGoToken)
      imLogout()
      await onLogin()
      return
    }
    const { setImIsLogin } = baseImStore.getState()
    setImIsLogin(true)
  }
}
async function onLogout() {
  // 退出登录 im
  imLogout()
  const { setZimToken } = baseUserStore.getState()
  const { setImIsLogin, updateConversations, clearAllMessagesByConversation } = baseImStore.getState()
  // 清空已存储的会话和消息 TODO: 包括群组记录等
  updateConversations([], 'replace')
  clearAllMessagesByConversation()
  setImIsLogin(false)
  setZimToken('')
}
export function loginIm() {
  // 这些事件绑定一次即可，因为 im 退出登录后，不会收到回调
  bindEventOnReceiveMessage()
  bindEventOnMessageSentStatsChange()
  binEventOnMessageDelete()
  binEventOnMessageRevoke()
  binEventOnMessageRead()
  bindEventOnImStageChange()
  bindEventOnConversationChange()
  bindEventOnGroupChange()
  bindEventOnImUserInfoUpdate()
  bindEventOnEndLogin()
  bindEventOnCommandRevoke()
  bindEventOnCommand()
  bindEventOnGroupInfoUpdate()
  // 监听登录状态，登录后初始化 im 或者销毁
  baseUserStore.subscribe(
    state => state.isLogin,
    async isLogin => {
      if (isLogin) {
        onLogin()
      } else {
        onLogout()
      }
    }
  )
  if (baseUserStore.getState().isLogin) {
    onLogin()
  }
}
