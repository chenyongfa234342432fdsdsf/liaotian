import request, { MarkcoinRequest, MarkcoinResponse } from '@/plugins/request'
import {
  YapiGetV1ImSignInGetUserSignInfoApiRequest,
  YapiGetV1ImSignInGetUserSignInfoApiResponse,
} from '@/typings/yapi/ImSignInGetUserSignInfoV1GetApi'
import {
  YapiPostV1ImSignInUpdateSignRemindApiRequest,
  YapiPostV1ImSignInUpdateSignRemindApiResponse,
} from '@/typings/yapi/ImSignInUpdateSignRemindV1PostApi'

import {
  YapiPostV1ImSignInSignInApiRequest,
  YapiPostV1ImSignInSignInApiResponse,
} from '@/typings/yapi/ImSignInSignInV1PostApi'

import {
  YapiGetV1ImSignInGetSignListApiRequest,
  YapiGetV1ImSignInGetSignListApiResponse,
} from '@/typings/yapi/ImSignInGetSignListV1GetApi'

/**
 * 接口 [更新用户签到提醒↗](https://yapi.nbttfc365.com/project/82/interface/api/11504) 的 **请求类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `POST /v1/im/signIn/updateSignRemind`
 * @更新时间 `2023-08-08 13:56:13`
 */
export const postV1ImChatImBlockListQueryList: MarkcoinRequest<
  YapiPostV1ImSignInUpdateSignRemindApiRequest,
  YapiPostV1ImSignInUpdateSignRemindApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/signIn/updateSignRemind',
    method: 'POST',
    data,
  })
}

/**
 * 接口 [获取用户签到信息↗](https://yapi.nbttfc365.com/project/82/interface/api/11494) 的 **请求类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `GET /v1/im/signIn/getUserSignInfo`
 * @更新时间 `2023-08-28 18:27:49`
 */
export const getV1ImSignInGetUserSignInfoApiRequest: MarkcoinRequest<
  Partial<YapiGetV1ImSignInGetUserSignInfoApiRequest>,
  YapiGetV1ImSignInGetUserSignInfoApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/signIn/getUserSignInfo',
    method: 'GET',
    params,
  })
}

/**
 * 接口 [每日签到↗](https://yapi.nbttfc365.com/project/82/interface/api/11509) 的 **请求类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `POST /v1/im/signIn/signIn`
 * @更新时间 `2023-08-28 17:59:12`
 */
export const postV1ImSignInSignInApiRequest: MarkcoinRequest<
  YapiPostV1ImSignInSignInApiRequest,
  YapiPostV1ImSignInSignInApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/signIn/signIn',
    method: 'POST',
    data,
  })
}

/**
 * 接口 [获取签到分页记录↗](https://yapi.nbttfc365.com/project/82/interface/api/11564) 的 **请求类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `GET /v1/im/signIn/getSignList`
 * @更新时间 `2023-08-08 13:56:21`
 */
export const getV1ImSignInGetSignListApiRequest: MarkcoinRequest<
  Partial<YapiGetV1ImSignInGetSignListApiRequest>,
  YapiGetV1ImSignInGetSignListApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/signIn/getSignList',
    method: 'GET',
    params,
  })
}
