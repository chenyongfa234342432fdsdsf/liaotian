/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [通过UID获取注册国家信息↗](https://yapi.nbttfc365.com/project/82/interface/api/15164) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imAddress/getCountryinfoByUid`
 * @更新时间 `2023-09-06 17:18:56`
 */
export interface YapiGetV1ImChatImAddressGetCountryinfoByUidApiRequest {
  /**
   * uid信息
   */
  uid: string
  /**
   * 商户ID
   */
  businessId: string
}

/**
 * 接口 [通过UID获取注册国家信息↗](https://yapi.nbttfc365.com/project/82/interface/api/15164) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imAddress/getCountryinfoByUid`
 * @更新时间 `2023-09-06 17:18:56`
 */
export interface YapiGetV1ImChatImAddressGetCountryinfoByUidApiResponse {
  code?: number
  data?: YapiGetV1ImChatImAddressGetCountryinfoByUidData
  message?: string
}
export interface YapiGetV1ImChatImAddressGetCountryinfoByUidData {
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
// * [通过UID获取注册国家信息↗](https://yapi.nbttfc365.com/project/82/interface/api/15164)
// **/
// export const getV1ImChatImAddressGetCountryinfoByUidApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatImAddressGetCountryinfoByUidApiRequest,
//   YapiGetV1ImChatImAddressGetCountryinfoByUidApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/imAddress/getCountryinfoByUid",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
