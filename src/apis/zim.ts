import request, { MarkcoinRequest } from '@/plugins/request'

/**
 * 获取 IM Token
 * https://yapi.nbttfc365.com/project/82/interface/api/11974
 */
export const getImToken: MarkcoinRequest<
  any,
  {
    zeGoToken: string
    appKey: string
  }
> = () => {
  return request({
    path: `/v1/im/chat/zeGo/refreshToken`,
    method: 'POST',
    data: {},
  })
}
