import cacheUtils from 'store'

export const helperCenterInfo = 'HELPER_CENTER_INFO'

export function getAnnouncementInfo() {
  return cacheUtils.get(helperCenterInfo)
}

export function setAnnouncementInfo(val) {
  return cacheUtils.set(helperCenterInfo, val)
}

export function removeAnnouncementInfo() {
  return cacheUtils.set(helperCenterInfo, '')
}
