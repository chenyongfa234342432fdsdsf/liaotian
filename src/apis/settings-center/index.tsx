import request, { MarkcoinRequest, MarkcoinResponse } from '@/plugins/request'
import {
  YapiGetV1ImChatImUserInfoQueryUserInfoApiRequest,
  YapiGetV1ImChatImUserInfoQueryUserInfoApiResponse,
} from '@/typings/yapi/ImChatImUserInfoQueryUserInfoV1GetApi'

import {
  YapiPostV1ImChatImUserInfoEditUserInfoApiRequest,
  YapiPostV1ImChatImUserInfoEditUserInfoApiResponse,
} from '@/typings/yapi/ImChatImUserInfoEditUserInfoV1PostApi'
import {
  YapiGetV1ImChatLoginLoginOutApiRequest,
  YapiGetV1ImChatLoginLoginOutApiResponse,
} from '@/typings/yapi/ImChatLoginLoginOutV1GetApi'
import {
  YapiPostV1ImChatComplaintCreateApiRequest,
  YapiPostV1ImChatComplaintCreateApiResponse,
} from '@/typings/yapi/ImChatComplaintCreateV1PostApi'

import {
  YapiGetV1ImChatImBusinessCountryInfoQueryListApiRequest,
  YapiGetV1ImChatImBusinessCountryInfoQueryListApiResponse,
} from '@/typings/yapi/ImChatImBusinessCountryInfoQueryListV1GetApi'
import {
  YapiPostV1ImChatEmailBindingMobileApiRequest,
  YapiPostV1ImChatEmailBindingMobileApiResponse,
} from '@/typings/yapi/ImChatEmailBindingMobileV1PostApi'
import {
  YapiGetV1ImChatImUserInfoGetAddressByIpApiRequest,
  YapiGetV1ImChatImUserInfoGetAddressByIpApiResponse,
} from '@/typings/yapi/ImChatImUserInfoGetAddressByIpV1GetApi'
import {
  YapiPostV1ImChatImUserIndividualConfigurationApiRequest,
  YapiPostV1ImChatImUserIndividualConfigurationApiResponse,
} from '@/typings/yapi/ImChatImUserIndividualConfigurationV1PostApi'
import { YapiGetV1ImChatImUserIndividualQueryEntityApiRequest } from '@/typings/yapi/ImChatImUserIndividualQueryEntityV1GetApi'
import {
  YapiGetV1ImChatImUserIndividualQueryEntityApiNewResponse,
  YapiGetV1ImChatImBusinessCountryInfoQueryNewData,
} from '@/typings/apis/setting'
import {
  YapiPostV1ImChatImUserInfoUpdateLoginPasswordApiRequest,
  YapiPostV1ImChatImUserInfoUpdateLoginPasswordApiResponse,
} from '@/typings/yapi/ImChatImUserInfoUpdateLoginPasswordV1PostApi'
import {
  YapiPostV1ImChatImUserInfoUpdateLoginPasswordSingleApiRequest,
  YapiPostV1ImChatImUserInfoUpdateLoginPasswordSingleApiResponse,
} from '@/typings/yapi/ImChatImUserInfoUpdateLoginPasswordSingleV1PostApi'
import {
  YapiGetV1ImChatImAddressGetCountryinfoByMobileApiRequest,
  YapiGetV1ImChatImAddressGetCountryinfoByMobileApiResponse,
} from '@/typings/yapi/ImChatImAddressGetCountryinfoByMobileV1GetApi'

import {
  YapiPostV1ImChatImUserInfoVerifyIdentityApiRequest,
  YapiPostV1ImChatImUserInfoVerifyIdentityApiResponse,
} from '@/typings/yapi/ImChatImUserInfoVerifyIdentityV1PostApi'

import {
  YapiPostV1ImChatImUserInfoUpdatePayPasswordSingleApiRequest,
  YapiPostV1ImChatImUserInfoUpdatePayPasswordSingleApiResponse,
} from '@/typings/yapi/ImChatImUserInfoUpdatePayPasswordSingleV1PostApi'

import {
  YapiPostV1ImChatImUserInfoVerifyPayPasswordApiRequest,
  YapiPostV1ImChatImUserInfoVerifyPayPasswordApiResponse,
  YapiPostV1ImChatImUserInfoVerifyPayPasswordData,
} from '@/typings/yapi/ImChatImUserInfoVerifyPayPasswordV1PostApi'

import {
  YapiGetV1ImChatImUserDeviceQueryListApiRequest,
  YapiGetV1ImChatImUserDeviceQueryListApiResponse,
} from '@/typings/yapi/ImChatImUserDeviceQueryListV1GetApi'

import {
  YapiGetV1ImChatImUserDeviceDeleteApiRequest,
  YapiGetV1ImChatImUserDeviceDeleteApiResponse,
} from '@/typings/yapi/ImChatImUserDeviceDeleteV1GetApi'

import {
  YapiGetV1ImChatGroupQueryLordGroupApiRequest,
  YapiGetV1ImChatGroupQueryLordGroupApiResponse,
} from '@/typings/yapi/ImChatGroupQueryLordGroupV1GetApi'

import {
  YapiPostV1ImChatImUserInfoDestroyApiRequest,
  YapiPostV1ImChatImUserInfoDestroyApiResponse,
} from '@/typings/yapi/ImChatImUserInfoDestroyV1PostApi'

import {
  YapiGetV1ImHomeWebsiteGetDataApiRequest,
  YapiGetV1ImHomeWebsiteGetDataApiResponse,
} from '@/typings/yapi/ImHomeWebsiteGetDataV1GetApi'
import {
  YapiGetV1ImChatImUserInfoQueryBanChatApiRequest,
  YapiGetV1ImChatImUserInfoQueryBanChatApiResponse,
} from '@/typings/yapi/ImChatImUserInfoQueryBanChatV1GetApi'

import {
  YapiGetV1ImChatImBlockListQueryListApiRequest,
  YapiGetV1ImChatImBlockListQueryListApiResponse,
} from '@/typings/yapi/ImChatImBlockListQueryListV1GetApi.d'

import {
  YapiPostV1ImChatImBlockListRemoveApiRequest,
  YapiPostV1ImChatImBlockListRemoveApiResponse,
} from '@/typings/yapi/ImChatImBlockListRemoveV1PostApi.d'

import {
  YapiGetV1ImChatRegisterValidCheckEmailCodeApiRequest,
  YapiGetV1ImChatRegisterValidCheckEmailCodeApiResponse,
} from '@/typings/yapi/ImChatRegisterValidCheckEmailCodeV1GetApi'

/**
 * 用户基本信息 - 查询
 * https://yapi.nbttfc365.com/project/82/interface/api/11539
 */
export const getQueryUserInfo: MarkcoinRequest<
  Partial<YapiGetV1ImChatImUserInfoQueryUserInfoApiRequest>,
  YapiGetV1ImChatImUserInfoQueryUserInfoApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/chat/imUserInfo/queryUserInfo',
    method: 'GET',
    params,
  })
}

/**
 * 用户基本信息 - 修改
 * https://yapi.nbttfc365.com/project/82/interface/api/11534
 */
export const editUserInfo: MarkcoinRequest<
  Partial<YapiPostV1ImChatImUserInfoEditUserInfoApiRequest>,
  YapiPostV1ImChatImUserInfoEditUserInfoApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/imUserInfo/editUserInfo',
    method: 'POST',
    data,
  })
}

/**
 * 用户基本信息 - 用户退出
 * https://yapi.nbttfc365.com/project/82/interface/api/12089
 */
export const getloginOut: MarkcoinRequest<
  Partial<YapiGetV1ImChatLoginLoginOutApiRequest>,
  YapiGetV1ImChatLoginLoginOutApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/chat/login/loginOut',
    method: 'GET',
    params,
  })
}

/**
 * [投诉↗](https://yapi.nbttfc365.com/project/82/interface/api/11694)
 * */
export const postV1ImChatComplaintCreateApiRequest: MarkcoinRequest<
  YapiPostV1ImChatComplaintCreateApiRequest,
  YapiPostV1ImChatComplaintCreateApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/complaint/create',
    method: 'POST',
    data,
  })
}
/**
 * 国家信息查询
 * https://yapi.nbttfc365.com/project/82/interface/api/11819
 */
export const businessCountryInfo: MarkcoinRequest<
  Partial<YapiGetV1ImChatImBusinessCountryInfoQueryListApiRequest>,
  YapiGetV1ImChatImBusinessCountryInfoQueryNewData
> = params => {
  return request({
    path: '/v1/im/chat/imBusinessCountryInfo/queryList',
    method: 'GET',
    params,
  })
}

/**
 * 手机绑定接口
 * https://yapi.nbttfc365.com/project/82/interface/api/18324
 */
export const postV1ImChatEmailBindingMobileApiRequest: MarkcoinRequest<
  Partial<YapiPostV1ImChatEmailBindingMobileApiRequest>,
  YapiPostV1ImChatEmailBindingMobileApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/email/bindingMobile',
    method: 'POST',
    data,
  })
}

/**
 * 根据 IP 获取地址
 * https://yapi.nbttfc365.com/project/82/interface/api/11924
 */
export const getV1ImChatImUserInfoGetAddressByIpApiRequest: MarkcoinRequest<
  Partial<YapiGetV1ImChatImUserInfoGetAddressByIpApiRequest>,
  YapiGetV1ImChatImUserInfoGetAddressByIpApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/chat/imUserInfo/getAddressByIP',
    method: 'GET',
    params,
  })
}

/**
 * 用户个性化 - 设置
 * https://yapi.nbttfc365.com/project/82/interface/api/11544
 */
export const postV1ImChatImUserIndividualConfigurationApiRequest: MarkcoinRequest<
  Partial<YapiPostV1ImChatImUserIndividualConfigurationApiRequest>,
  YapiPostV1ImChatImUserIndividualConfigurationApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/imUserIndividual/configuration',
    method: 'POST',
    data,
  })
}

/**
 * 用户个性化 - 查询
 * https://yapi.nbttfc365.com/project/82/interface/api/11569
 */
export const getV1ImChatImUserIndividualQueryEntityApiRequest: MarkcoinRequest<
  Partial<YapiGetV1ImChatImUserIndividualQueryEntityApiRequest>,
  YapiGetV1ImChatImUserIndividualQueryEntityApiNewResponse
> = params => {
  return request({
    path: '/v1/im/chat/imUserIndividual/queryEntity',
    method: 'GET',
    params,
  })
}

/**
 * 修改登录密码
 * https://yapi.nbttfc365.com/project/82/interface/api/11524
 */
export const postV1ImChatImUserInfoUpdateLoginPasswordApiRequest: MarkcoinRequest<
  Partial<YapiPostV1ImChatImUserInfoUpdateLoginPasswordApiRequest>,
  YapiPostV1ImChatImUserInfoUpdateLoginPasswordApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/imUserInfo/updateLoginPassword',
    method: 'POST',
    data,
    signature: true,
  })
}

/**
 * 修改登录密码（不需要旧密码）
 * https://yapi.nbttfc365.com/project/82/interface/api/12059
 */
export const postV1ImChatImUserInfoUpdateLoginPasswordSingleApiRequest: MarkcoinRequest<
  Partial<YapiPostV1ImChatImUserInfoUpdateLoginPasswordSingleApiRequest>,
  YapiPostV1ImChatImUserInfoUpdateLoginPasswordSingleApiResponse
> = data => {
  return request({
    path: '/v1/im/chat/imUserInfo/updateLoginPasswordSingle',
    method: 'POST',
    data,
    signature: true,
  })
}

/**
 * 通过注册手机信息获取注册国
 * https://yapi.nbttfc365.com/project/82/interface/api/12119
 */
export const getV1ImChatImAddressGetCountryinfoByMobileApiRequest: MarkcoinRequest<
  Partial<YapiGetV1ImChatImAddressGetCountryinfoByMobileApiRequest>,
  YapiGetV1ImChatImAddressGetCountryinfoByMobileApiResponse
> = params => {
  return request({
    path: '/v1/im/chat/imAddress/getCountryinfoByMobile',
    method: 'GET',
    params,
  })
}

/**
 * 短信验证人员身份
 * https://yapi.nbttfc365.com/project/82/interface/api/12079
 */
export const postV1ImChatImUserInfoVerifyIdentityApiRequest: MarkcoinRequest<
  Partial<YapiPostV1ImChatImUserInfoVerifyIdentityApiRequest>,
  YapiPostV1ImChatImUserInfoVerifyIdentityApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/imUserInfo/verifyIdentity',
    method: 'POST',
    data,
    signature: true,
  })
}

/**
 * 修改支付密码 (不需要旧密码)
 * https://yapi.nbttfc365.com/project/82/interface/api/12064
 */
export const postV1ImChatImUserInfoUpdatePayPasswordSingleApiRequest: MarkcoinRequest<
  Partial<YapiPostV1ImChatImUserInfoUpdatePayPasswordSingleApiRequest>,
  YapiPostV1ImChatImUserInfoUpdatePayPasswordSingleApiResponse
> = data => {
  return request({
    path: '/v1/im/chat/imUserInfo/updatePayPasswordSingle',
    method: 'POST',
    data,
    signature: true,
  })
}

/**
 * 验证支付密码
 * https://yapi.nbttfc365.com/project/82/interface/api/12074
 */
export const postV1ImChatImUserInfoVerifyPayPasswordApiRequest: MarkcoinRequest<
  Partial<YapiPostV1ImChatImUserInfoVerifyPayPasswordApiRequest>,
  YapiPostV1ImChatImUserInfoVerifyPayPasswordApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/imUserInfo/verifyPayPassword',
    method: 'POST',
    data,
    signature: true,
  })
}

/**
 * 用户常用设备 - 列表查询
 * https://yapi.nbttfc365.com/project/82/interface/api/12129
 */
export const getV1ImChatImUserDeviceQueryListApiRequest: MarkcoinRequest<
  Partial<YapiGetV1ImChatImUserDeviceQueryListApiRequest>,
  YapiGetV1ImChatImUserDeviceQueryListApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/chat/imUserDevice/queryList',
    method: 'GET',
    params,
  })
}

/**
 * 用户常用设备 - 删除
 * https://yapi.nbttfc365.com/project/82/interface/api/12129
 */
export const getV1ImChatImUserDeviceDeleteApiRequest: MarkcoinRequest<
  Partial<YapiGetV1ImChatImUserDeviceDeleteApiRequest>,
  YapiGetV1ImChatImUserDeviceDeleteApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/chat/imUserDevice/delete',
    method: 'GET',
    params,
  })
}

/**
 * 查询自己是群主的群
 * https://yapi.nbttfc365.com/project/82/interface/api/18694
 */
export const getV1ImChatGroupQueryLordGroupApiRequest: MarkcoinRequest<
  Partial<YapiGetV1ImChatGroupQueryLordGroupApiRequest>,
  YapiGetV1ImChatGroupQueryLordGroupApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/chat/group/queryLordGroup',
    method: 'GET',
    params,
  })
}

/**
 * 注销账号
 * https://yapi.nbttfc365.com/project/82/interface/api/18679
 */
export const postV1ImChatImUserInfoDestroyApiRequest: MarkcoinRequest<
  Partial<YapiPostV1ImChatImUserInfoDestroyApiRequest>,
  YapiPostV1ImChatImUserInfoDestroyApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/imUserInfo/destroy',
    method: 'POST',
    data,
  })
}

/**
 * 接口 [邮箱-验证码校验↗](https://yapi.nbttfc365.com/project/82/interface/api/15134) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/register/valid/checkEmailCode`
 * @更新时间 `2023-09-05 17:43:30`
 */

export const getV1ImChatRegisterValidCheckEmailCode: MarkcoinRequest<
  Partial<YapiGetV1ImChatRegisterValidCheckEmailCodeApiRequest>,
  YapiGetV1ImChatRegisterValidCheckEmailCodeApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/chat/register/valid/checkEmailCode',
    method: 'GET',
    params,
  })
}

/**
 * 获取网站配置信息
 * https://yapi.nbttfc365.com/project/82/interface/api/12434
 */
export const getV1ImHomeWebsiteGetDataApiRequest: MarkcoinRequest<
  Partial<YapiGetV1ImHomeWebsiteGetDataApiRequest>,
  YapiGetV1ImHomeWebsiteGetDataApiResponse['data']
> = params => {
  return request({
    path: '/v1/im-home/website/getData',
    method: 'GET',
    params,
  })
}
// /**
// * [查询用户是否禁言↗](https://yapi.nbttfc365.com/project/82/interface/api/18984)
// **/
export const getV1ImChatImUserInfoQueryBanChatApiRequest: MarkcoinRequest<
  YapiGetV1ImChatImUserInfoQueryBanChatApiRequest,
  YapiGetV1ImChatImUserInfoQueryBanChatApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/chat/imUserInfo/query/banChat',
    method: 'GET',
    params,
  })
}

/**
 * 接口 [黑名单-列表信息↗](https://yapi.nbttfc365.com/project/82/interface/api/11849) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imBlockList/queryList`
 * @更新时间 `2023-08-21 14:57:15`
 */
export const getV1ImChatImBlockListQueryList: MarkcoinRequest<
  YapiGetV1ImChatImBlockListQueryListApiRequest
> = params => {
  return request({
    path: '/v1/im/chat/imBlockList/queryList',
    method: 'GET',
    params,
  })
}

/**
 * 接口 [黑名单-移除↗](https://yapi.nbttfc365.com/project/82/interface/api/11589) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imBlockList/remove`
 * @更新时间 `2023-08-03 19:09:41`
 */
export const postV1ImChatImBlockListRemoveApiRequest: MarkcoinRequest<
  Partial<YapiPostV1ImChatImBlockListRemoveApiRequest>,
  YapiPostV1ImChatImBlockListRemoveApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/imBlockList/remove',
    method: 'POST',
    data,
  })
}
