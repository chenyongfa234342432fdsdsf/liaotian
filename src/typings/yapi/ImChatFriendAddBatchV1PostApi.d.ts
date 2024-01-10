/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [批量添加好友↗](https://yapi.nbttfc365.com/project/82/interface/api/11699) 的 **请求类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `POST /v1/im/chat/friend/addBatch`
 * @更新时间 `2023-08-22 11:09:04`
 */
export interface YapiPostV1ImChatFriendAddBatchApiRequest {
  /**
   * 批量添加好友数据
   */
  addUids: number[]
}

/**
 * 接口 [批量添加好友↗](https://yapi.nbttfc365.com/project/82/interface/api/11699) 的 **返回类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `POST /v1/im/chat/friend/addBatch`
 * @更新时间 `2023-08-22 11:09:04`
 */
export interface YapiPostV1ImChatFriendAddBatchApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiPostV1ImChatFriendAddBatchData
}
export interface YapiPostV1ImChatFriendAddBatchData {
  /**
   * true，成功，false，失败
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [批量添加好友↗](https://yapi.nbttfc365.com/project/82/interface/api/11699)
// **/
// export const postV1ImChatFriendAddBatchApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatFriendAddBatchApiRequest,
//   YapiPostV1ImChatFriendAddBatchApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/friend/addBatch",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
