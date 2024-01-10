/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [获取用户已保存地址列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11629) 的 **请求类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `GET /v1/im/withdrawSetting/getUserAddressList`
 * @更新时间 `2023-08-08 13:56:35`
 */
export interface YapiGetV1ImWithdrawSettingGetUserAddressListApiRequest {
  /**
   * 语言类型
   */
  lanTypeCd: string
}

/**
 * 接口 [获取用户已保存地址列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11629) 的 **返回类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `GET /v1/im/withdrawSetting/getUserAddressList`
 * @更新时间 `2023-08-08 13:56:35`
 */
export interface YapiGetV1ImWithdrawSettingGetUserAddressListApiResponse {
  /**
   * 200成功，其他均为失败
   */
  code: number
  message?: string
  data?: YapiGetV1ImWithdrawSettingGetUserAddressListData[]
}
export interface YapiGetV1ImWithdrawSettingGetUserAddressListData {
  /**
   * UID
   */
  uid?: number
  /**
   * 数据ID
   */
  id?: string
  /**
   * 地址
   */
  address?: string
  /**
   * 币种symbol
   */
  coinSymbol?: string
  /**
   * 币种名称
   */
  coinName?: string
  /**
   * 平台名称
   */
  platformName?: string
  /**
   * 平台图标
   */
  platformIcon?: string
  /**
   * 备注名称
   */
  remark?: string
  /**
   * 创建时间
   */
  createdByTime?: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [获取用户已保存地址列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11629)
// **/
// export const getV1ImWithdrawSettingGetUserAddressListApiRequest: MarkcoinRequest<
//   YapiGetV1ImWithdrawSettingGetUserAddressListApiRequest,
//   YapiGetV1ImWithdrawSettingGetUserAddressListApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/withdrawSetting/getUserAddressList",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
