/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [银行卡体现↗](https://yapi.nbttfc365.com/project/82/interface/api/20775) 的 **请求类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `POST /v1/im/userBalance/bankCard/withdraw`
 * @更新时间 `2023-12-14 15:08:10`
 */
export interface YapiPostV1ImUserBalanceBankCardWithdrawApiRequest {
  /**
   * 银行卡ID
   */
  cardId: string
  /**
   * 积分提现数量
   */
  amount: number
}

/**
 * 接口 [银行卡体现↗](https://yapi.nbttfc365.com/project/82/interface/api/20775) 的 **返回类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `POST /v1/im/userBalance/bankCard/withdraw`
 * @更新时间 `2023-12-14 15:08:10`
 */
export interface YapiPostV1ImUserBalanceBankCardWithdrawApiResponse {
  /**
   * 200，成功，其它失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiPostV1ImUserBalanceBankCardWithdrawData
}
export interface YapiPostV1ImUserBalanceBankCardWithdrawData {
  /**
   * true，成功，false，失败
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [银行卡体现↗](https://yapi.nbttfc365.com/project/82/interface/api/20775)
// **/
// export const postV1ImUserBalanceBankCardWithdrawApiRequest: MarkcoinRequest<
//   YapiPostV1ImUserBalanceBankCardWithdrawApiRequest,
//   YapiPostV1ImUserBalanceBankCardWithdrawApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/userBalance/bankCard/withdraw",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
