/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [好友信息更新↗](https://yapi.nbttfc365.com/project/82/interface/api/11619) 的 **请求类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `POST /v1/im/chat/friend/update`
 * @更新时间 `2023-08-22 11:08:56`
 */
export interface YapiPostV1ImChatFriendUpdateApiRequest {
  /**
   * 好友备注
   */
  friendRemark?: string
  /**
   * 消息免打扰，1，关闭，2，打开
   */
  messageDisturb?: number
  /**
   * 是否置顶，1，不置顶，2，置顶
   */
  isTop?: number
  /**
   * 好友用户UID
   */
  uid: number
}

/**
 * 接口 [好友信息更新↗](https://yapi.nbttfc365.com/project/82/interface/api/11619) 的 **返回类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `POST /v1/im/chat/friend/update`
 * @更新时间 `2023-08-22 11:08:56`
 */
export interface YapiPostV1ImChatFriendUpdateApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiPostV1ImChatFriendUpdateData
}
export interface YapiPostV1ImChatFriendUpdateData {
  /**
   * true，成功，其他失败
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [好友信息更新↗](https://yapi.nbttfc365.com/project/82/interface/api/11619)
// **/
// export const postV1ImChatFriendUpdateApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatFriendUpdateApiRequest,
//   YapiPostV1ImChatFriendUpdateApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/friend/update",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
