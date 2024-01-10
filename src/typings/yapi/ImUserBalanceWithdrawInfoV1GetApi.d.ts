/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [提现记录详情↗](https://yapi.nbttfc365.com/project/82/interface/api/11489) 的 **请求类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `GET /v1/im/userBalance/withdrawInfo`
 * @更新时间 `2023-08-08 13:56:08`
 */
export interface YapiGetV1ImUserBalanceWithdrawInfoApiRequest {
  /**
   * 提现记录数据ID
   */
  id: string
}

/**
 * 接口 [提现记录详情↗](https://yapi.nbttfc365.com/project/82/interface/api/11489) 的 **返回类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `GET /v1/im/userBalance/withdrawInfo`
 * @更新时间 `2023-08-08 13:56:08`
 */
export interface YapiGetV1ImUserBalanceWithdrawInfoApiResponse {
  /**
   * 200成功，其他均为失败
   */
  code: number
  message?: string
  data?: YapiGetV1ImUserBalanceWithdrawInfoData
}
export interface YapiGetV1ImUserBalanceWithdrawInfoData {
  /**
   * 数据ID
   */
  id?: number
  /**
   * UID
   */
  uid?: number
  /**
   * 系统订单号
   */
  orderNo?: string
  /**
   * 币种标识
   */
  symbol?: string
  /**
   * 币种名称
   */
  coinName?: string
  /**
   * 币种icon
   */
  coinIcon?: string
  /**
   * 提现地址
   */
  toAddress?: string
  /**
   * 提现数量
   */
  amount?: number
  /**
   * 提现手续费
   */
  fee?: number
  /**
   * 提现状态：created=已创建，apply=审核通过，reject=已拒绝，failed=失败，success=成功；数据字典：im_withdraw_status
   */
  statusCd?: string
  /**
   * 交易hash
   */
  txHash?: string
  /**
   * 审核意见
   */
  applyRemark?: string
  /**
   * 审核时间
   */
  applyTime?: number
  /**
   * 创建时间
   */
  createdByTime?: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [提现记录详情↗](https://yapi.nbttfc365.com/project/82/interface/api/11489)
// **/
// export const getV1ImUserBalanceWithdrawInfoApiRequest: MarkcoinRequest<
//   YapiGetV1ImUserBalanceWithdrawInfoApiRequest,
//   YapiGetV1ImUserBalanceWithdrawInfoApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/userBalance/withdrawInfo",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
