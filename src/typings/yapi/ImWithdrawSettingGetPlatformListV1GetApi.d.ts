/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [获取地址平台列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11624) 的 **请求类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `GET /v1/im/withdrawSetting/getPlatformList`
 * @更新时间 `2023-08-27 17:59:27`
 */
export interface YapiGetV1ImWithdrawSettingGetPlatformListApiRequest {
  /**
   * 语言类型
   */
  lanTypeCd: string
}

/**
 * 接口 [获取地址平台列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11624) 的 **返回类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `GET /v1/im/withdrawSetting/getPlatformList`
 * @更新时间 `2023-08-27 17:59:27`
 */
export interface YapiGetV1ImWithdrawSettingGetPlatformListApiResponse {
  /**
   * 200成功，其他均为失败
   */
  code: number
  message?: string
  data?: YapiGetV1ImWithdrawSettingGetPlatformListData[]
}
export interface YapiGetV1ImWithdrawSettingGetPlatformListData {
  /**
   * 平台名称
   */
  platformName?: string
  /**
   * 用户绑定地址ID
   */
  withdrawConfigId?: number
  /**
   * 平台图标
   */
  platformIcon?: string
  /**
   * 语言类型
   */
  lanTypeCd?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 平台ID
   */
  platformId?: number
  /**
   * 用户绑定的地址
   */
  address?: string
  /**
   * 用户绑定地址的symbol
   */
  coinSymbol?: string
  /**
   * 平台图标
   */
  coinLogo?: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [获取地址平台列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11624)
// **/
// export const getV1ImWithdrawSettingGetPlatformListApiRequest: MarkcoinRequest<
//   YapiGetV1ImWithdrawSettingGetPlatformListApiRequest,
//   YapiGetV1ImWithdrawSettingGetPlatformListApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/withdrawSetting/getPlatformList",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
