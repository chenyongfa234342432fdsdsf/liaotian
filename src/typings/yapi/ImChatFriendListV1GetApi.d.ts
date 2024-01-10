/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [查看好友列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11549) 的 **请求类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `GET /v1/im/chat/friend/list`
 * @更新时间 `2023-10-30 17:54:51`
 */
export interface YapiGetV1ImChatFriendListApiRequest {}

/**
 * 接口 [查看好友列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11549) 的 **返回类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `GET /v1/im/chat/friend/list`
 * @更新时间 `2023-10-30 17:54:51`
 */
export interface YapiGetV1ImChatFriendListApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 接口描述信息
   */
  message: string
  data: YapiGetV1ImChatFriendListData[]
}
export interface YapiGetV1ImChatFriendListData {
  /**
   * 用户ID
   */
  uid: number
  /**
   * 用户昵称
   */
  nickName: string
  /**
   * 头像地址
   */
  avatarPath: string
  /**
   * 好友备注
   */
  friendRemark: string
  /**
   * 好友手机号
   */
  mobileNumber: string
  /**
   * 消息免打扰，1，关闭，2，打开
   */
  messageDisturb: number
  /**
   * 是否置顶，1，不置顶，2，置顶
   */
  isTop: number
  /**
   *  是否加入了黑名单，1，是，2，否
   */
  isBlack: number
  /**
   * 手机区号
   */
  mobileCountryCd: string
  /**
   *  是否注销，1，是，2，否
   */
  isCancel: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [查看好友列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11549)
// **/
// export const getV1ImChatFriendListApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatFriendListApiRequest,
//   YapiGetV1ImChatFriendListApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/friend/list",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
