import { getV1ImRedPackageGetPackageInfoApiRequest } from '@/apis/red-packet'
import { WsBizEnum, WsThrottleTimeEnum, WsTypesEnum } from '@/constants/ws'
import ws from '@/plugins/ws'
import { WSThrottleTypeEnum } from '@/plugins/ws/constants'
import { useRequest } from 'ahooks'
import { useEffect, useRef } from 'react'

export function useRedPacketInfo(id: number) {
  const req = useRequest(
    () =>
      getV1ImRedPackageGetPackageInfoApiRequest({
        packageId: String(id),
      }),
    {
      cacheKey: `getV1ImRedPackageGetPackageInfoApiRequest-${id}`,
    }
  )
  const refs = useRef({ req, id })
  refs.current = { req, id }
  useEffect(() => {
    const subs = {
      biz: WsBizEnum.im,
      type: WsTypesEnum.redPackageStatus,
    }
    const callback = (data: { packageId: string }) => {
      const { req, id } = refs.current
      if (data.packageId === String(id)) {
        req.refresh()
      }
    }
    ws.subscribe({
      subs,
      callback,
      throttleType: WSThrottleTypeEnum.increment,
      throttleTime: WsThrottleTimeEnum.Market,
    })
    return () => {
      ws.unsubscribe({
        subs,
        callback,
      })
    }
  }, [])
  return req
}
