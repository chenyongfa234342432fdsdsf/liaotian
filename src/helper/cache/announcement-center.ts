import cacheUtils from 'store'

export const announcementInfo = 'ANNOUNCEMENT_INFO'

export function getAnnouncementInfo() {
  return cacheUtils.get(announcementInfo)
}

export function setAnnouncementInfo(val) {
  return cacheUtils.set(announcementInfo, val)
}

export function removeAnnouncementInfo() {
  return cacheUtils.set(announcementInfo, '')
}
