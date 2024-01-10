import request, { MarkcoinRequest } from '@/plugins/request'
import {
  YapiGetV1ImDiscoverGetDiscoverListApiRequest,
  YapiGetV1ImDiscoverGetDiscoverListApiResponse,
} from '@/typings/yapi/ImDiscoverGetDiscoverListV1GetApi'

/**
 * [获取发现栏目列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11594)
 * */
export const getV1ImDiscoverGetDiscoverListApiRequest: MarkcoinRequest<
  YapiGetV1ImDiscoverGetDiscoverListApiRequest,
  YapiGetV1ImDiscoverGetDiscoverListApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/discover/getDiscoverList',
    method: 'GET',
    params,
  })
}
