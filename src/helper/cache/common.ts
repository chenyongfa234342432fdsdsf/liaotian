import multiWindowsCacheUtils from './multi-windows'
import { envIsClient, businessId } from '../env'
// 用于存交易线的红涨绿跌或者绿涨红跌
export const cssColor = 'CSS_COLOR'
export const TOKEN = 'AUTH_TOKEN'

export function getAllStorage() {
  let res = {}
  let keys = Object.keys(localStorage)
  let i = keys.length

  // eslint-disable-next-line no-plusplus
  while (i--) {
    res[keys[i]] = localStorage.getItem(keys[i])
  }

  return res
}

export function setAllStorage(_localStorage) {
  Object.keys(_localStorage).forEach(k => {
    localStorage[k] = _localStorage[k]
  })
}

export function setTokenCache(tokenObj: any | null) {
  multiWindowsCacheUtils.set(TOKEN, tokenObj)
}

export function getTokenCache() {
  return multiWindowsCacheUtils.get(TOKEN) as any | null
}

export function setLineCssColor(val) {
  return multiWindowsCacheUtils.set(cssColor, val)
}

export function getLineCssColor() {
  return multiWindowsCacheUtils.get(cssColor)
}

export const themeCache = 'themeCache'

export const themeTypeCache = 'themeTypeCache'

export function getThemeCache() {
  return multiWindowsCacheUtils.get(themeCache)
}

export function setThemeCache(val) {
  return multiWindowsCacheUtils.set(themeCache, val)
}

export function getThemeTypeCache() {
  return multiWindowsCacheUtils.get(themeTypeCache)
}

export function setThemeTypeCache(val) {
  return multiWindowsCacheUtils.set(themeTypeCache, val)
}

export const langCache = 'langCache'
export const lastLangCache = 'lastLangCache'

export function getLastLangCache() {
  return multiWindowsCacheUtils.get(lastLangCache)
}

export function setLastLangCache(val) {
  return multiWindowsCacheUtils.set(lastLangCache, val)
}
export function getLangCache() {
  if (envIsClient) {
    return sessionStorage.getItem(langCache) || getLastLangCache()
  }
}

export function setLangCache(val) {
  if (envIsClient) {
    sessionStorage.setItem(langCache, val)
    setLastLangCache(val)
  }
}

export const mergeModeCache = 'mergeModeCache'

export function setMergeModeCache(val: boolean) {
  return multiWindowsCacheUtils.set(mergeModeCache, val)
}

export function getMergeModeCache() {
  return multiWindowsCacheUtils.get(mergeModeCache)
}

export const businessIdCache = 'businessId'

export function setBusinessIdCache(val: string) {
  return multiWindowsCacheUtils.set(businessIdCache, val)
}

export function getBusinessIdCache() {
  return multiWindowsCacheUtils.get(businessIdCache) || businessId
}

export const accessKeyCache = 'accessKey'

export function setAccessKeyCache(val: string) {
  return multiWindowsCacheUtils.set(accessKeyCache, val)
}

export function getAccessKeyCache() {
  return multiWindowsCacheUtils.get(accessKeyCache)
}

/** 探测持久化储存 */
export function initCache() {
  if (!multiWindowsCacheUtils.enabled) {
    // eslint-disable-next-line no-alert
    alert(
      'Local storage is not supported by your browser. Please disabled "Private Mode", or upgrade to a modern browser'
    )
  }
}

export const headerShowCache = 'headerShowCache'

export function setHeaderShowCache(val: string) {
  if (envIsClient) {
    return multiWindowsCacheUtils.set(headerShowCache, val)
  }
}

export function getHeaderShowCache() {
  if (envIsClient) {
    return multiWindowsCacheUtils.get(headerShowCache)
  }
}

export const footerShowCache = 'footerShowCache'

export function setFooterShowCache(val: string) {
  if (envIsClient) {
    return multiWindowsCacheUtils.set(footerShowCache, val)
  }
}

export function getFooterShowCache() {
  if (envIsClient) {
    return multiWindowsCacheUtils.get(footerShowCache)
  }
}
