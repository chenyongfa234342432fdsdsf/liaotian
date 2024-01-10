/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [添加银行卡↗](https://yapi.nbttfc365.com/project/82/interface/api/20740) 的 **请求类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `POST /v1/im/chat/user/bankCard/add`
 * @更新时间 `2023-12-13 16:21:16`
 */
export interface YapiPostV1ImChatUserBankCardAddApiRequest {
  /**
   * 卡号
   */
  cardNo: string
  /**
   * 银行名称
   */
  bankName: string
  /**
   * 开户银行
   */
  openBank: string
  /**
   * 持卡人
   */
  cardHolder: string
}

/**
 * 接口 [添加银行卡↗](https://yapi.nbttfc365.com/project/82/interface/api/20740) 的 **返回类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `POST /v1/im/chat/user/bankCard/add`
 * @更新时间 `2023-12-13 16:21:16`
 */
export interface YapiPostV1ImChatUserBankCardAddApiResponse {
  /**
   * 200，成功，其它失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiPostV1ImChatUserBankCardAddData
}
export interface YapiPostV1ImChatUserBankCardAddData {
  /**
   * true，成功，false，失败
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [添加银行卡↗](https://yapi.nbttfc365.com/project/82/interface/api/20740)
// **/
// export const postV1ImChatUserBankCardAddApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatUserBankCardAddApiRequest,
//   YapiPostV1ImChatUserBankCardAddApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/user/bankCard/add",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */