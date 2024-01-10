/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [删除好友↗](https://yapi.nbttfc365.com/project/82/interface/api/11599) 的 **请求类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `POST /v1/im/chat/friend/delete`
 * @更新时间 `2023-08-22 11:08:40`
 */
export interface YapiPostV1ImChatFriendDeleteApiRequest {
  /**
   * 用户ID
   */
  uid: number
}

/**
 * 接口 [删除好友↗](https://yapi.nbttfc365.com/project/82/interface/api/11599) 的 **返回类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `POST /v1/im/chat/friend/delete`
 * @更新时间 `2023-08-22 11:08:40`
 */
export interface YapiPostV1ImChatFriendDeleteApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiPostV1ImChatFriendDeleteData
}
export interface YapiPostV1ImChatFriendDeleteData {
  /**
   * true，成功，false，失败
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [删除好友↗](https://yapi.nbttfc365.com/project/82/interface/api/11599)
// **/
// export const postV1ImChatFriendDeleteApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatFriendDeleteApiRequest,
//   YapiPostV1ImChatFriendDeleteApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/friend/delete",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
