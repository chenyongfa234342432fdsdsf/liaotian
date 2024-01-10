/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [通过注册手机信息获取注册国↗](https://yapi.nbttfc365.com/project/82/interface/api/12119) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imAddress/getCountryinfoByMobile`
 * @更新时间 `2023-08-18 17:46:21`
 */
export interface YapiGetV1ImChatImAddressGetCountryinfoByMobileApiRequest {
  /**
   * 手机区号
   */
  mobileCountryCd: string
  /**
   * 手机号
   */
  mobileNumber: string
}

/**
 * 接口 [通过注册手机信息获取注册国↗](https://yapi.nbttfc365.com/project/82/interface/api/12119) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imAddress/getCountryinfoByMobile`
 * @更新时间 `2023-08-18 17:46:21`
 */
export interface YapiGetV1ImChatImAddressGetCountryinfoByMobileApiResponse {
  code?: number
  data?: YapiGetV1ImChatImAddressGetCountryinfoByMobileData
  message?: string
}
export interface YapiGetV1ImChatImAddressGetCountryinfoByMobileData {
  /**
   * 国家编号：86
   */
  countryEnCode?: string
  /**
   * 简称：CN
   */
  countryShortName?: string
  createdByTime?: string
  updatedByTime?: string
  enableInd?: number
  isDelete?: number
  /**
   * 商户
   */
  businessId?: number
  /**
   * 语言
   */
  language?: string
  updatedById?: number
  /**
   * 版本
   */
  version?: number
  /**
   * 国家的id
   */
  countryId?: number
  /**
   * 主键ID
   */
  id?: number
  /**
   * 国家的名称
   */
  countryName?: string
  /**
   * 国家的id
   */
  createdById?: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [通过注册手机信息获取注册国↗](https://yapi.nbttfc365.com/project/82/interface/api/12119)
// **/
// export const getV1ImChatImAddressGetCountryinfoByMobileApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatImAddressGetCountryinfoByMobileApiRequest,
//   YapiGetV1ImChatImAddressGetCountryinfoByMobileApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/imAddress/getCountryinfoByMobile",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
