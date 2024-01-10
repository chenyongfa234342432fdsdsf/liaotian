import request, { MarkcoinRequest } from '@/plugins/request'
import {
  YapiGetV1ImChatEmailVerifySendApiRequest,
  YapiGetV1ImChatEmailVerifySendApiResponse,
} from '@/typings/yapi/ImChatEmailVerifySendV1GetApi'
import {
  YapiGetV1ImChatImUserInfoGetMobileTelCodeApiRequest,
  YapiGetV1ImChatImUserInfoGetMobileTelCodeApiResponse,
} from '@/typings/yapi/ImChatImUserInfoGetMobileTelCodeV1GetApi'
import {
  YapiPostV1ImChatLoginEmailApiRequest,
  YapiPostV1ImChatLoginEmailApiResponse,
} from '@/typings/yapi/ImChatLoginEmailV1PostApi'
import {
  YapiPostV1ImChatLoginMobileApiRequest,
  YapiPostV1ImChatLoginMobileApiResponse,
} from '@/typings/yapi/ImChatLoginMobileV1PostApi'
import { YapiPostV1ImChatRegisterEmailApiRequest } from '@/typings/yapi/ImChatRegisterEmailV1PostApi'
import { YapiPostV1ImChatRegisterMobileApiRequest } from '@/typings/yapi/ImChatRegisterMobileV1PostApi'
import {
  YapiPostV1ImChatRegisterEmailApiNewResponse,
  YapiPostV1ImChatLoginScanApiNewRequest,
} from '@/typings/apis/user'
import { YapiPostV1ImChatLoginScanApiResponse } from '@/typings/yapi/ImChatLoginScanV1PostApi'

import {
  YapiPostV1ImChatLoginGenerateQrcodeTokenApiRequest,
  YapiPostV1ImChatLoginGenerateQrcodeTokenApiResponse,
} from '@/typings/yapi/ImChatLoginGenerateQrcodeTokenV1PostApi'

import {
  YapiGetV1ImChatLoginSetScaneedSignalApiRequest,
  YapiGetV1ImChatLoginSetScaneedSignalApiResponse,
} from '@/typings/yapi/ImChatLoginSetScaneedSignalV1GetApi'

import {
  YapiGetV1ImChatLoginDetermineApiRequest,
  YapiGetV1ImChatLoginDetermineApiResponse,
} from '@/typings/yapi/ImChatLoginDetermineV1GetApi'

import {
  YapiPostV1ImChatLoginAccountApiRequest,
  YapiPostV1ImChatLoginAccountApiResponse,
} from '@/typings/yapi/ImChatLoginAccountV1PostApi'

export const postRegisterValidMobileRequest: MarkcoinRequest<
  YapiPostV1ImChatRegisterMobileApiRequest,
  YapiPostV1ImChatRegisterEmailApiNewResponse
> = data => {
  return request({
    path: '/v1/im/chat/register/mobile',
    method: 'POST',
    data,
    signature: true,
  })
}

export const postRegisterValidEmailRequest: MarkcoinRequest<
  YapiPostV1ImChatRegisterEmailApiRequest,
  YapiPostV1ImChatRegisterEmailApiNewResponse
> = data => {
  return request({
    path: '/v1/im/chat/register/email',
    method: 'POST',
    data,
    signature: true,
  })
}

export const postMemberRegisterEmailCodeRequest: MarkcoinRequest<
  YapiGetV1ImChatEmailVerifySendApiRequest,
  YapiGetV1ImChatEmailVerifySendApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/chat/email/verify/send',
    method: 'GET',
    params,
  })
}

/**
 * 接口 [发送验证码（手机短信）↗](https://yapi.nbttfc365.com/project/82/interface/api/11744) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imUserInfo/getMobileTelCode`
 * @更新时间 `2023-09-27 17:10:16`
 */
export const getV1ImChatImUserInfoGetMobileTelCodeApiRequest: MarkcoinRequest<
  YapiGetV1ImChatImUserInfoGetMobileTelCodeApiRequest,
  YapiGetV1ImChatImUserInfoGetMobileTelCodeApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/chat/imUserInfo/getMobileTelCode',
    method: 'GET',
    params,
  })
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [登录 - 手机方式↗](https://yapi.nbttfc365.com/project/82/interface/api/11519)
// **/
export const postLoginMobileApiRequest: MarkcoinRequest<
  YapiPostV1ImChatLoginMobileApiRequest,
  YapiPostV1ImChatLoginMobileApiResponse
> = data => {
  return request({
    path: '/v1/im/chat/login/mobile',
    method: 'POST',
    signature: true,
    data,
  })
}

// /**
// * [邮箱 - 登录↗](https://yapi.nbttfc365.com/project/82/interface/api/15129)
// **/
export const postLoginEmailApiRequest: MarkcoinRequest<
  YapiPostV1ImChatLoginEmailApiRequest,
  YapiPostV1ImChatLoginEmailApiResponse
> = data => {
  return request({
    path: '/v1/im/chat/login/email',
    method: 'POST',
    signature: true,
    data,
  })
}

/**
 * 接口 [登录 - 账户方式↗](https://yapi.nbttfc365.com/project/82/interface/api/11754) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/login/account`
 * @更新时间 `2023-08-29 15:46:33`
 */
export const postV1ImChatLoginAccountApiRequest: MarkcoinRequest<
  YapiPostV1ImChatLoginAccountApiRequest,
  YapiPostV1ImChatLoginAccountApiResponse
> = data => {
  return request({
    path: '/v1/im/chat/login/account',
    method: 'POST',
    signature: true,
    data,
  })
}
// /**
// * [扫码登录↗](https://yapi.nbttfc365.com/project/82/interface/api/20243)
// **/
export const postImChatLoginScan: MarkcoinRequest<
  YapiPostV1ImChatLoginScanApiNewRequest,
  YapiPostV1ImChatLoginScanApiResponse
> = data => {
  return request({
    path: '/v1/im/chat/login/scan',
    method: 'POST',
    signature: true,
    data,
  })
}

// /**
// * [获取扫码登录二维码](https://yapi.nbttfc365.com/project/82/interface/api/20257)
// **/
export const postImChatLoginGenerateQrcodeTokenApiRequest: MarkcoinRequest<
  YapiPostV1ImChatLoginGenerateQrcodeTokenApiRequest,
  YapiPostV1ImChatLoginGenerateQrcodeTokenApiResponse
> = data => {
  return request({
    path: '/v1/im/chat/login/generate_qrcode_token',
    method: 'POST',
    signature: true,
    data,
  })
}

/**
 * 接口 [扫码后的状态确定↗](https://yapi.nbttfc365.com/project/82/interface/api/20264) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/login/set_scaneed_signal`
 * @更新时间 `2023-12-06 11:49:43`
 */
export const getImChatLoginSetScaneedSignal: MarkcoinRequest<
  YapiGetV1ImChatLoginSetScaneedSignalApiRequest,
  YapiGetV1ImChatLoginSetScaneedSignalApiResponse
> = params => {
  return request({
    path: '/v1/im/chat/login/set_scaneed_signal',
    method: 'GET',
    params,
  })
}

/**
 * 接口 [扫码绑定的接口↗](https://yapi.nbttfc365.com/project/82/interface/api/20271) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/login/determine`
 * @更新时间 `2023-12-06 11:49:49`
 */
export const getV1ImChatLoginDetermine: MarkcoinRequest<
  YapiGetV1ImChatLoginDetermineApiRequest,
  YapiGetV1ImChatLoginDetermineApiResponse
> = params => {
  return request({
    path: '/v1/im/chat/login/determine',
    method: 'GET',
    params,
  })
}
