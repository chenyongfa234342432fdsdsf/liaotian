import { useLayoutStore } from '@/store/layout'

export function useHelpCenterUrl(key: any) {
  const dataByCd = useLayoutStore().columnsDataByCd
  const url = dataByCd[key]?.webUrl || ''

  return `${url?.startsWith('/') ? '' : '/'}${url}`
}

export function useHelpCenterUid(key: any) {
  const dataByCd = useLayoutStore().columnsDataByCd
  const url = dataByCd[key]?.webUrl || ''
  // 先用 id 代替
  return url?.split('/').pop() || ''
}
/** 临时使用 */
export function useHelpCenterUrlTemp(key: any) {
  const id = useHelpCenterUid(key)
  return `/support${id ? `?id=${id}` : ''}`
}
