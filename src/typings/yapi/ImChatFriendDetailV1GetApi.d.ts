/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [查看好友信息↗](https://yapi.nbttfc365.com/project/82/interface/api/11584) 的 **请求类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `GET /v1/im/chat/friend/detail`
 * @更新时间 `2023-10-30 17:55:19`
 */
export interface YapiGetV1ImChatFriendDetailApiRequest {
  /**
   * 用户ID
   */
  uid: string
}

/**
 * 接口 [查看好友信息↗](https://yapi.nbttfc365.com/project/82/interface/api/11584) 的 **返回类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `GET /v1/im/chat/friend/detail`
 * @更新时间 `2023-10-30 17:55:19`
 */
export interface YapiGetV1ImChatFriendDetailApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiGetV1ImChatFriendDetailData
}
export interface YapiGetV1ImChatFriendDetailData {
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
   * 好友备注
   */
  friendRemark: string
  /**
   * 消息免打扰，1，关闭，2，打开
   */
  messageDisturb: number
  /**
   * 是否置顶，1，不置顶，2，置顶
   */
  isTop: number
  /**
   * 是否加入了黑名单，1，是，2，否
   */
  isBlack: number
  /**
   * 用户手机号
   */
  mobileNumber: string
  /**
   * 手机区号
   */
  mobileCountryCd: string
  /**
   * 用户邮箱
   */
  email: string
  /**
   * 手机号码是否隐藏
   */
  mobileHideSet: number
  /**
   *  是否注销，1，是，2，否
   */
  isCancel: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [查看好友信息↗](https://yapi.nbttfc365.com/project/82/interface/api/11584)
// **/
// export const getV1ImChatFriendDetailApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatFriendDetailApiRequest,
//   YapiGetV1ImChatFriendDetailApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/friend/detail",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
