/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [新的朋友↗](https://yapi.nbttfc365.com/project/82/interface/api/12164) 的 **请求类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `GET /v1/im/chat/friend/applyList`
 * @更新时间 `2023-09-27 15:15:47`
 */
export interface YapiGetV1ImChatFriendApplyListApiRequest {}

/**
 * 接口 [新的朋友↗](https://yapi.nbttfc365.com/project/82/interface/api/12164) 的 **返回类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `GET /v1/im/chat/friend/applyList`
 * @更新时间 `2023-09-27 15:15:47`
 */
export interface YapiGetV1ImChatFriendApplyListApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiGetV1ImChatFriendApplyListData[]
}
export interface YapiGetV1ImChatFriendApplyListData {
  /**
   * 用户ID
   */
  uid: number
  /**
   * 用户昵称
   */
  nickName: string
  /**
   * 用户头像
   */
  avatarPath: string
  /**
   * 申请状态，1，待添加，2，已添加，3，已过期
   */
  applyStatus: number
  /**
   * 是否主动添加,true，是，false，否
   */
  initiativeAdd: boolean
  /**
   * 申请时间
   */
  applyTime: number
  /**
   * 申请记录ID
   */
  recordId: string
  /**
   * 要添加好友的用户ID
   */
  targetUid: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [新的朋友↗](https://yapi.nbttfc365.com/project/82/interface/api/12164)
// **/
// export const getV1ImChatFriendApplyListApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatFriendApplyListApiRequest,
//   YapiGetV1ImChatFriendApplyListApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/friend/applyList",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
