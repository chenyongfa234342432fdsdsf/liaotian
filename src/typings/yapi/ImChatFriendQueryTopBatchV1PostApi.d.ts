/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [批量查询好友\/群组是否置顶↗](https://yapi.nbttfc365.com/project/82/interface/api/18319) 的 **请求类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `POST /v1/im/chat/friend/queryTopBatch`
 * @更新时间 `2023-09-12 17:40:14`
 */
export interface YapiPostV1ImChatFriendQueryTopBatchApiRequest {
  /**
   * 查询的参数
   */
  queryList: YapiPostV1ImChatFriendQueryTopBatchApiRequestListQueryList[]
}
export interface YapiPostV1ImChatFriendQueryTopBatchApiRequestListQueryList {
  /**
   * 查询类型，1，用户，2，群组
   */
  queryType: number
  /**
   * 用户ID，queryType=1必传
   */
  uid?: number
  /**
   * 群组ID，queryType=2必传
   */
  groupId?: string
}

/**
 * 接口 [批量查询好友\/群组是否置顶↗](https://yapi.nbttfc365.com/project/82/interface/api/18319) 的 **返回类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `POST /v1/im/chat/friend/queryTopBatch`
 * @更新时间 `2023-09-12 17:40:14`
 */
export interface YapiPostV1ImChatFriendQueryTopBatchApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiPostV1ImChatFriendQueryTopBatchListData[]
}
export interface YapiPostV1ImChatFriendQueryTopBatchListData {
  /**
   * 用户I D
   */
  uid: number
  /**
   * 群组ID
   */
  groupId: string
  /**
   * 查询类型，1，用户，2，群组
   */
  queryType: number
  /**
   * 是否置顶，1，不置顶，2，置顶
   */
  isTop: number
  /**
   * 是否是群组成员，true，是，false，不是
   */
  isGroupMember: boolean
  /**
   * 群组是否被封，1，封禁，2，正常
   */
  groupStatus: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [批量查询好友/群组是否置顶↗](https://yapi.nbttfc365.com/project/82/interface/api/18319)
// **/
// export const postV1ImChatFriendQueryTopBatchApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatFriendQueryTopBatchApiRequest,
//   YapiPostV1ImChatFriendQueryTopBatchApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/friend/queryTopBatch",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
