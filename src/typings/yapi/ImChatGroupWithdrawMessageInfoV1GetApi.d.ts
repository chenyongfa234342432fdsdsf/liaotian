/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [群撤回消息列表↗](https://yapi.nbttfc365.com/project/82/interface/api/20817) 的 **请求类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `GET /v1/im/chat/group/withdrawMessage/info`
 * @更新时间 `2023-12-15 15:45:05`
 */
export interface YapiGetV1ImChatGroupWithdrawMessageInfoApiRequest {
  /**
   * 群组ID
   */
  groupId: string
}

/**
 * 接口 [群撤回消息列表↗](https://yapi.nbttfc365.com/project/82/interface/api/20817) 的 **返回类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `GET /v1/im/chat/group/withdrawMessage/info`
 * @更新时间 `2023-12-15 15:45:05`
 */
export interface YapiGetV1ImChatGroupWithdrawMessageInfoApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  /**
   * 群成员数据
   */
  data: YapiGetV1ImChatGroupWithdrawMessageInfoListData[]
}
export interface YapiGetV1ImChatGroupWithdrawMessageInfoListData {
  /**
   * 消息撤回人ID
   */
  uid: number
  /**
   * 商户ID
   */
  businessId: number
  /**
   * 群组ID
   */
  groupId: number
  /**
   * 消息ID
   */
  messageId: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [群撤回消息列表↗](https://yapi.nbttfc365.com/project/82/interface/api/20817)
// **/
// export const getV1ImChatGroupWithdrawMessageInfoApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatGroupWithdrawMessageInfoApiRequest,
//   YapiGetV1ImChatGroupWithdrawMessageInfoApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/group/withdrawMessage/info",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
