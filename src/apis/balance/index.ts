import request, { MarkcoinRequest } from '@/plugins/request'
import {
  YapiGetV1ImUserBalanceGetBalanceInfoApiRequest,
  YapiGetV1ImUserBalanceGetBalanceInfoApiResponse,
} from '@/typings/yapi/ImUserBalanceGetBalanceInfoV1GetApi'

/**
 * [获取资金详情↗](https://yapi.nbttfc365.com/project/82/interface/api/11464)
 * */
export const getV1ImUserBalanceGetBalanceInfoApiRequest: MarkcoinRequest<
  YapiGetV1ImUserBalanceGetBalanceInfoApiRequest,
  YapiGetV1ImUserBalanceGetBalanceInfoApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/userBalance/getBalanceInfo',
    method: 'GET',
    params,
  })
}
