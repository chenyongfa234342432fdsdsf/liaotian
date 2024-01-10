import multiWindowsCacheUtils from './multi-windows'

const revokedMessageIdsCacheKey = 'REVOKED_MESSAGE_IDS_CACHE_KEY'

export function getRevokedMessageIdsFromCache(): Record<string, string[]> {
  return multiWindowsCacheUtils.get(revokedMessageIdsCacheKey) || {}
}
export function setRevokedMessageIdsToCache(val: Record<string, string[]>) {
  return multiWindowsCacheUtils.set(revokedMessageIdsCacheKey, val)
}
