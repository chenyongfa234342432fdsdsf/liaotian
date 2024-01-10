/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [获取资金详情↗](https://yapi.nbttfc365.com/project/82/interface/api/11464) 的 **请求类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `GET /v1/im/userBalance/getBalanceInfo`
 * @更新时间 `2023-09-05 11:10:32`
 */
export interface YapiGetV1ImUserBalanceGetBalanceInfoApiRequest {}

/**
 * 接口 [获取资金详情↗](https://yapi.nbttfc365.com/project/82/interface/api/11464) 的 **返回类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `GET /v1/im/userBalance/getBalanceInfo`
 * @更新时间 `2023-09-05 11:10:32`
 */
export interface YapiGetV1ImUserBalanceGetBalanceInfoApiResponse {
  /**
   * 200成功，其他均为失败
   */
  code: number
  message?: string
  data?: YapiGetV1ImUserBalanceGetBalanceInfoData
}
export interface YapiGetV1ImUserBalanceGetBalanceInfoData {
  /**
   * uid
   */
  uid?: number
  /**
   * 资金余额
   */
  balance?: number
  /**
   * 冻结资金
   */
  locked?: number
  /**
   * 积分签到余额
   */
  signIntegral?: number
  /**
   * 发送红包单个最小金额
   */
  redPackageMinAmount?: number
  /**
   * 余额单位：USD
   */
  balanceUnit?: string
  /**
   * 余额符号：$
   */
  balanceSymbol?: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [获取资金详情↗](https://yapi.nbttfc365.com/project/82/interface/api/11464)
// **/
// export const getV1ImUserBalanceGetBalanceInfoApiRequest: MarkcoinRequest<
//   YapiGetV1ImUserBalanceGetBalanceInfoApiRequest,
//   YapiGetV1ImUserBalanceGetBalanceInfoApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/userBalance/getBalanceInfo",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
