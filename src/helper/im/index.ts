import { ImGlobalConfig } from '@/plugins/im'
import {
  CommandTypeEnum,
  ZIMConnectionEvent,
  ZIMConnectionState,
  ZIMConversationType,
  ZIMEventEnum,
  ZIMMessageType,
} from '@/plugins/im/constants'
import { getImInstance } from '@/plugins/im/core'
import { addEventListenerOnIm } from '@/plugins/im/event'
import { baseImStore } from '@/store/im'
import { t } from '@lingui/macro'
import { baseUserStore } from '@/store/user'
import { IIMMessage } from '@/plugins/im/types'
import { popBoxConfirm } from '@/components/pop-box'
import { link } from '../link'
import { fetchAndUpdateUserInfo } from '../auth'
import { getIsEndLoginCommand, getRevokeCommandMessageIds, subscribeCommandMessage } from './command'
import { deleteMessages } from '../message'
import { updateGroupDetail, updateGroupMembers } from '../address-book'

function logout() {
  popBoxConfirm(t`helper_message_fugvl05ct4`, t`helper_im_index_rtmbybaskj`)
  baseUserStore.getState().clearUserCacheData()
  link('/login', {
    overwriteLastHistoryEntry: true,
  })
}
/** 处理 im 登录态变化 */
export function bindEventOnImStageChange() {
  addEventListenerOnIm(ZIMEventEnum.connectionStateChanged, (_, { state, event, extendedData }) => {
    const { setImIsOnline } = baseImStore.getState()
    setImIsOnline(state === ZIMConnectionState.Connected)
    if (event === ZIMConnectionEvent.KickedOut) {
      logout()
    }
  })
  // 网络离线时，不会触发上述事件，所以需要单独处理
  window.addEventListener('offline', () => {
    const { setImIsOnline } = baseImStore.getState()
    setImIsOnline(false)
  })
  // 可以认为，只要有网络，就是在线，其它情况 sdk 可以处理
  window.addEventListener('online', () => {
    const { setImIsOnline, imIsLogin } = baseImStore.getState()
    setImIsOnline(imIsLogin)
  })
  /** 断开重连 */
  addEventListenerOnIm(ZIMEventEnum.connectionStateChanged, function (_, { state, event, extendedData }) {
    // 当长时间网络连接断开导致 SDK 内部登出时，需要重新登录
    if (
      state === ZIMConnectionState.Disconnected &&
      event !== ZIMConnectionEvent.Success &&
      event !== ZIMConnectionEvent.KickedOut &&
      // 前提是已经登录了才触发重新登录
      ImGlobalConfig.isLogin
    ) {
      const { login } = ImGlobalConfig.initRes
      login()
    }
  })
  addEventListenerOnIm(ZIMEventEnum.tokenWillExpire, async function (_, { second }) {
    // 可以在这里调用 renewToken 接口来更新 token
    const { settings } = ImGlobalConfig.initRes
    const res = await getImInstance().renewToken(settings.token)
    if (res.token) {
      // 更新 token
      settings.token = res.token
    }
  })
}
/** 处理个人信息更新 */
export function bindEventOnImUserInfoUpdate() {
  addEventListenerOnIm(ZIMEventEnum.userInfoUpdated, () => {
    fetchAndUpdateUserInfo()
  })
}

/** 处理多端登录 */
export function bindEventOnEndLogin() {
  subscribeCommandMessage(CommandTypeEnum.login, command => {
    if (getIsEndLoginCommand(command)) {
      logout()
    }
  })
}
/** 处理信令撤回消息 */
export function bindEventOnCommandRevoke() {
  subscribeCommandMessage(CommandTypeEnum.revoke, (command, message) => {
    const revokedMessageIds = getRevokeCommandMessageIds(command).filter(a => a.length > 0)
    baseImStore.getState().setRevokedMessageIds(message.conversationID, revokedMessageIds)
  })
}
function runWithCurrentGroupConversationId(fn: (groupId: string) => void) {
  const currentConversation = baseImStore.getState().currentConversation
  const isGroup = currentConversation?.type === ZIMConversationType.Group
  if (!isGroup) return
  fn(currentConversation.conversationID)
}
/** 处理需要更新当前群信息的情况 */
export function bindEventOnGroupInfoUpdate() {
  subscribeCommandMessage(CommandTypeEnum.groupMemberShowSetting, () => {
    runWithCurrentGroupConversationId(updateGroupMembers)
  })
  subscribeCommandMessage(CommandTypeEnum.groupAdminChange, () => {
    runWithCurrentGroupConversationId(updateGroupMembers)
  })
  subscribeCommandMessage(CommandTypeEnum.groupMuteStatus, () => {
    runWithCurrentGroupConversationId(updateGroupDetail)
  })
  subscribeCommandMessage(CommandTypeEnum.userLevelChange, () => {
    fetchAndUpdateUserInfo()
    runWithCurrentGroupConversationId(updateGroupDetail)
  })
}
