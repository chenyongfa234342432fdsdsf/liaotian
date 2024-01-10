/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [删除银行卡↗](https://yapi.nbttfc365.com/project/82/interface/api/20754) 的 **请求类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `POST /v1/im/chat/user/bankCard/delete`
 * @更新时间 `2023-12-13 17:36:18`
 */
export interface YapiPostV1ImChatUserBankCardDeleteApiRequest {
  /**
   * 银行卡ID
   */
  id: string
}

/**
 * 接口 [删除银行卡↗](https://yapi.nbttfc365.com/project/82/interface/api/20754) 的 **返回类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `POST /v1/im/chat/user/bankCard/delete`
 * @更新时间 `2023-12-13 17:36:18`
 */
export interface YapiPostV1ImChatUserBankCardDeleteApiResponse {
  /**
   * 200，成功，其它失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiPostV1ImChatUserBankCardDeleteData
}
export interface YapiPostV1ImChatUserBankCardDeleteData {
  /**
   * true，成功，false，失败
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [删除银行卡↗](https://yapi.nbttfc365.com/project/82/interface/api/20754)
// **/
// export const postV1ImChatUserBankCardDeleteApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatUserBankCardDeleteApiRequest,
//   YapiPostV1ImChatUserBankCardDeleteApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/user/bankCard/delete",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
