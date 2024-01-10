import Request, { MarkcoinRequest } from '@/plugins/request'
import {
  YapiGetV1ImHomeColumnGetListApiRequest,
  YapiGetV1ImHomeColumnGetListApiResponse,
} from '@/typings/yapi/ImHomeColumnGetListV1GetApi'
import {
  YapiGetV1ImHomeWebsiteGetDataApiRequest,
  YapiGetV1ImHomeWebsiteGetDataApiResponse,
} from '@/typings/yapi/ImHomeWebsiteGetDataV1GetApi'

export const getFooterApiData: MarkcoinRequest<
  YapiGetV1ImHomeColumnGetListApiRequest,
  YapiGetV1ImHomeColumnGetListApiResponse['data']
> = params => {
  return Request({
    path: '/v1/im-home/column/getList',
    method: 'GET',
    params,
    timeout: 3 * 1000,
  })
}

export const getBasicWebApiData: MarkcoinRequest<
  YapiGetV1ImHomeWebsiteGetDataApiRequest,
  YapiGetV1ImHomeWebsiteGetDataApiResponse['data']
> = params => {
  return Request({
    path: '/v1/im-home/website/getData',
    method: 'GET',
    params,
    timeout: 3 * 1000,
  })
}
