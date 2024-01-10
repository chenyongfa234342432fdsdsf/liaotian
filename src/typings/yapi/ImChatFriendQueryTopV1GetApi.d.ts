/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [查询好友\/群组是否置顶↗](https://yapi.nbttfc365.com/project/82/interface/api/18314) 的 **请求类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `GET /v1/im/chat/friend/queryTop`
 * @更新时间 `2023-09-12 17:39:48`
 */
export interface YapiGetV1ImChatFriendQueryTopApiRequest {
  /**
   * 1，用户查询，2，群组查询
   */
  queryType: string
  /**
   * 用户ID，queryType=1的时候必传
   */
  uid?: string
  /**
   * 群组ID，queryType=2的时候必传
   */
  groupId?: string
}

/**
 * 接口 [查询好友\/群组是否置顶↗](https://yapi.nbttfc365.com/project/82/interface/api/18314) 的 **返回类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `GET /v1/im/chat/friend/queryTop`
 * @更新时间 `2023-09-12 17:39:48`
 */
export interface YapiGetV1ImChatFriendQueryTopApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述消息
   */
  message: string
  data: YapiGetV1ImChatFriendQueryTopData
}
export interface YapiGetV1ImChatFriendQueryTopData {
  /**
   * 1，不置顶，2，置顶
   */
  isTop: number
  /**
   * 是否是群组成员，true，是，false，不是
   */
  isGroupMember: boolean
  /**
   * 查询的用户ID
   */
  uid: number
  /**
   * 查询的群组ID
   */
  groupId: string
  /**
   * 1，用户查询，2，群组查询
   */
  queryType: number
  /**
   * 群组是否被封，1，封禁，2，正常
   */
  groupStatus: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [查询好友/群组是否置顶↗](https://yapi.nbttfc365.com/project/82/interface/api/18314)
// **/
// export const getV1ImChatFriendQueryTopApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatFriendQueryTopApiRequest,
//   YapiGetV1ImChatFriendQueryTopApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/friend/queryTop",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
