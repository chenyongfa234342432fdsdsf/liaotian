/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [获取可用币种列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11644) 的 **请求类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `GET /v1/im/withdrawSetting/getCoinList`
 * @更新时间 `2023-08-08 13:56:39`
 */
export interface YapiGetV1ImWithdrawSettingGetCoinListApiRequest {}

/**
 * 接口 [获取可用币种列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11644) 的 **返回类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `GET /v1/im/withdrawSetting/getCoinList`
 * @更新时间 `2023-08-08 13:56:39`
 */
export interface YapiGetV1ImWithdrawSettingGetCoinListApiResponse {
  /**
   * 200成功，其他均为失败
   */
  code: number
  message?: string
  data?: YapiGetV1ImWithdrawSettingGetCoinListData[]
}
export interface YapiGetV1ImWithdrawSettingGetCoinListData {
  /**
   * 系统币种ID
   */
  systemCoinId?: number
  /**
   * 币种名称
   */
  coinName?: string
  /**
   * 币种symbol
   */
  coinSymbol?: string
  /**
   * 币种图标
   */
  coinIcon?: string
  /**
   * 充值比例
   */
  rechargeRate?: number
  /**
   * 提现比例
   */
  withdrawRate?: number
  /**
   * 充值平台手续费
   */
  recahrgeFee?: number
  /**
   * 提现平台手续费
   */
  withdrawFee?: number
  /**
   * 子币集合
   */
  children?: YapiGetV1ImWithdrawSettingGetCoinListChildrenListData[]
}
export interface YapiGetV1ImWithdrawSettingGetCoinListChildrenListData {
  /**
   * 系统币种ID
   */
  systemCoinId?: number
  /**
   * 币种名称
   */
  coinName?: string
  /**
   * 币种symbol
   */
  coinSymbol?: string
  /**
   * 币种图标
   */
  coinIcon?: string
  /**
   * 主链类型 例：ERC20
   */
  mainType?: string
  /**
   * 充值比例
   */
  rechargeRate?: number
  /**
   * 提现比例
   */
  withdrawRate?: number
  /**
   * 充值平台手续费
   */
  recahrgeFee?: number
  /**
   * 提现平台手续费
   */
  withdrawFee?: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [获取可用币种列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11644)
// **/
// export const getV1ImWithdrawSettingGetCoinListApiRequest: MarkcoinRequest<
//   YapiGetV1ImWithdrawSettingGetCoinListApiRequest,
//   YapiGetV1ImWithdrawSettingGetCoinListApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/withdrawSetting/getCoinList",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
