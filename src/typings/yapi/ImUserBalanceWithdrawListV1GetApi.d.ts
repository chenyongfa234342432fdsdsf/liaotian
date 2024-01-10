/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [提现记录分页列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11479) 的 **请求类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `GET /v1/im/userBalance/withdrawList`
 * @更新时间 `2023-08-08 13:56:04`
 */
export interface YapiGetV1ImUserBalanceWithdrawListApiRequest {
  /**
   * 分页页标
   */
  pageNum?: string
  /**
   * 分页大小
   */
  pageSize?: string
}

/**
 * 接口 [提现记录分页列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11479) 的 **返回类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `GET /v1/im/userBalance/withdrawList`
 * @更新时间 `2023-08-08 13:56:04`
 */
export interface YapiGetV1ImUserBalanceWithdrawListApiResponse {
  /**
   * 200成功，其他均为失败
   */
  code: number
  message?: string
  data?: YapiGetV1ImUserBalanceWithdrawData
}
export interface YapiGetV1ImUserBalanceWithdrawData {
  /**
   * 分页页标
   */
  pageNum?: number
  /**
   * 分页大小
   */
  pageSize?: number
  /**
   * 数据总条数
   */
  total?: number
  /**
   * 数据集合
   */
  list?: YapiGetV1ImUserBalanceWithdrawListData[]
}
export interface YapiGetV1ImUserBalanceWithdrawListData {
  /**
   * UID
   */
  uid?: number
  /**
   * 数据ID
   */
  id?: number
  /**
   * 系统订单号
   */
  orderNo?: string
  /**
   * 币种symbol
   */
  symbol?: string
  /**
   * 币种名称
   */
  coinName?: string
  /**
   * 币种图标
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
// * [提现记录分页列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11479)
// **/
// export const getV1ImUserBalanceWithdrawListApiRequest: MarkcoinRequest<
//   YapiGetV1ImUserBalanceWithdrawListApiRequest,
//   YapiGetV1ImUserBalanceWithdrawListApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/userBalance/withdrawList",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
