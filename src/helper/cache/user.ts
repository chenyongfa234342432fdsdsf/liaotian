import multiWindowsCacheUtils from './multi-windows'

export const userInfo = 'USER_INFO'

export function getUserInfo() {
  return multiWindowsCacheUtils.get(userInfo)
}

export function setUserInfo(val) {
  return multiWindowsCacheUtils.set(userInfo, val)
}

export function removeUserInfo() {
  return multiWindowsCacheUtils.set(userInfo, '')
}

const zimTOken = 'ZIM_TOKEN'
export function getZimTokenCache(): string {
  return multiWindowsCacheUtils.get(zimTOken) || ''
}
export function setZimTokenCache(val: string) {
  return multiWindowsCacheUtils.set(zimTOken, val)
}

// 聊天个性化
const chatConfiguration = 'IM_CONFIG'
export function getChatConfiguration() {
  return multiWindowsCacheUtils.get(chatConfiguration) || ''
}
export function setChatConfiguration(val) {
  return multiWindowsCacheUtils.set(chatConfiguration, val)
}

export function removeChatConfiguration() {
  return multiWindowsCacheUtils.set(chatConfiguration, '')
}

const systemUid = 'SYSTEM_UID_CACHE'
export function getSystemUidCache(): string {
  return multiWindowsCacheUtils.get(systemUid) || ''
}
export function setSystemUidCache(val: string) {
  return multiWindowsCacheUtils.set(systemUid, val)
}
