/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [发起提现↗](https://yapi.nbttfc365.com/project/82/interface/api/11474) 的 **请求类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `POST /v1/im/userBalance/withdraw`
 * @更新时间 `2023-09-06 18:56:13`
 */
export interface YapiPostV1ImUserBalanceWithdrawApiRequest {
  /**
   * 币种symbol
   */
  symbol: string
  /**
   * monkey平台UID
   */
  monkeyUid: number
  /**
   * 提现金额
   */
  amount: number
}

/**
 * 接口 [发起提现↗](https://yapi.nbttfc365.com/project/82/interface/api/11474) 的 **返回类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `POST /v1/im/userBalance/withdraw`
 * @更新时间 `2023-09-06 18:56:13`
 */
export interface YapiPostV1ImUserBalanceWithdrawApiResponse {
  /**
   * 200成功，其他均为失败
   */
  code: number
  message?: string
  data?: YapiPostV1ImUserBalanceWithdrawData
}
export interface YapiPostV1ImUserBalanceWithdrawData {
  /**
   * 业务是否处理成功：true-成功，false-失败
   */
  success?: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [发起提现↗](https://yapi.nbttfc365.com/project/82/interface/api/11474)
// **/
// export const postV1ImUserBalanceWithdrawApiRequest: MarkcoinRequest<
//   YapiPostV1ImUserBalanceWithdrawApiRequest,
//   YapiPostV1ImUserBalanceWithdrawApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/userBalance/withdraw",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
