/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [根据IP获取地址↗](https://yapi.nbttfc365.com/project/82/interface/api/11924) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imUserInfo/getAddressByIP`
 * @更新时间 `2023-08-08 16:16:34`
 */
export interface YapiGetV1ImChatImUserInfoGetAddressByIpApiRequest {}

/**
 * 接口 [根据IP获取地址↗](https://yapi.nbttfc365.com/project/82/interface/api/11924) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imUserInfo/getAddressByIP`
 * @更新时间 `2023-08-08 16:16:34`
 */
export interface YapiGetV1ImChatImUserInfoGetAddressByIpApiResponse {
  code?: number
  data?: YapiGetV1ImChatImUserInfoGetAddressByIpData
  message?: string
}
export interface YapiGetV1ImChatImUserInfoGetAddressByIpData {
  /**
   * 国家的代码名称
   */
  countryEnCode?: string
  /**
   * 国家的英文简称
   */
  countryShortName?: string
  createdByTime?: null
  updatedByTime?: null
  /**
   *  状态: 1正常，2冻结'
   */
  enableInd?: number
  /**
   * 是否删除，1，已删除，2，未删除
   */
  isDelete?: number
  /**
   * 商户ID
   */
  businessId?: number
  updatedById?: null
  version?: number
  /**
   * 国家的id
   */
  countryId?: number
  id?: number
  /**
   * 国家的名称
   */
  countryName?: string
  createdById?: null
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [根据IP获取地址↗](https://yapi.nbttfc365.com/project/82/interface/api/11924)
// **/
// export const getV1ImChatImUserInfoGetAddressByIpApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatImUserInfoGetAddressByIpApiRequest,
//   YapiGetV1ImChatImUserInfoGetAddressByIpApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/imUserInfo/getAddressByIP",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
