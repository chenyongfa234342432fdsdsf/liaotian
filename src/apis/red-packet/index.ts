import request, { MarkcoinRequest } from '@/plugins/request'
import {
  YapiGetV1ImRedPackageGetPackageInfoApiRequest,
  YapiGetV1ImRedPackageGetPackageInfoApiResponse,
} from '@/typings/yapi/ImRedPackageGetPackageInfoV1GetApi'
import {
  YapiPostV1ImRedPackageReceiveApiRequest,
  YapiPostV1ImRedPackageReceiveApiResponse,
} from '@/typings/yapi/ImRedPackageReceiveV1PostApi'
import {
  YapiPostV1ImRedPackageSendApiRequest,
  YapiPostV1ImRedPackageSendApiResponse,
} from '@/typings/yapi/ImRedPackageSendV1PostApi'

/**
 * [发送红包接口↗](https://yapi.nbttfc365.com/project/82/interface/api/11454)
 * */
export const postV1ImRedPackageSendApiRequest: MarkcoinRequest<
  YapiPostV1ImRedPackageSendApiRequest,
  YapiPostV1ImRedPackageSendApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/redPackage/send',
    method: 'POST',
    data,
  })
}

/**
 * [领取红包↗](https://yapi.nbttfc365.com/project/82/interface/api/11689)
 * */
export const postV1ImRedPackageReceiveApiRequest: MarkcoinRequest<
  YapiPostV1ImRedPackageReceiveApiRequest,
  YapiPostV1ImRedPackageReceiveApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/redPackage/receive',
    method: 'POST',
    data,
  })
}

/**
 * [查看红包详情↗](https://yapi.nbttfc365.com/project/82/interface/api/11459)
 * */
export const getV1ImRedPackageGetPackageInfoApiRequest: MarkcoinRequest<
  YapiGetV1ImRedPackageGetPackageInfoApiRequest,
  YapiGetV1ImRedPackageGetPackageInfoApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/redPackage/getPackageInfo',
    method: 'GET',
    params,
  })
}
