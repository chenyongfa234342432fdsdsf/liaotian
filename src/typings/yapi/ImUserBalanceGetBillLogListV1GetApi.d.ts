/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [财务记录分页列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11469) 的 **请求类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `GET /v1/im/userBalance/getBillLogList`
 * @更新时间 `2023-08-08 13:56:00`
 */
export interface YapiGetV1ImUserBalanceGetBillLogListApiRequest {
  /**
   * 分页页标
   */
  pageNum?: string
  /**
   * 分页大小
   */
  pageSize?: string
  /**
   * 收支类型:add-收入，sub-支出，不传默认返回全部
   */
  type?: string
}

/**
 * 接口 [财务记录分页列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11469) 的 **返回类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `GET /v1/im/userBalance/getBillLogList`
 * @更新时间 `2023-08-08 13:56:00`
 */
export interface YapiGetV1ImUserBalanceGetBillLogListApiResponse {
  /**
   * 200成功，其他均为失败
   */
  code: number
  message?: string
  data?: YapiGetV1ImUserBalanceGetBillLogData
}
export interface YapiGetV1ImUserBalanceGetBillLogData {
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
  list?: YapiGetV1ImUserBalanceGetBillLogListData[]
}
export interface YapiGetV1ImUserBalanceGetBillLogListData {
  /**
   * UID
   */
  uid?: number
  /**
   * 变更前余额
   */
  balanceBefore?: number
  /**
   * 变更前冻结
   */
  lockedBefore?: number
  /**
   * 变更后余额
   */
  balanceAfter?: number
  /**
   * 变更后冻结
   */
  lockedAfter?: number
  /**
   * 总变更金额
   */
  totalChanged?: number
  /**
   * 业务类型：sign_in-签到增加；withdraw-资金转移；sign_to_balance签到积分转余额； red_packet_receive-接收红包；red_packet_send-发出红包 数据字典：im_bill_log_type
   */
  typeCd?: string
  /**
   * 变更类型：add 增加，sub 减少
   */
  refType?: string
  /**
   * 业务说明-例：红包-来自xxx
   */
  refRemark?: string
  /**
   * 变更时间
   */
  createdByTime?: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [财务记录分页列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11469)
// **/
// export const getV1ImUserBalanceGetBillLogListApiRequest: MarkcoinRequest<
//   YapiGetV1ImUserBalanceGetBillLogListApiRequest,
//   YapiGetV1ImUserBalanceGetBillLogListApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/userBalance/getBillLogList",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
