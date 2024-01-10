/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [查询客服好友列表↗](https://yapi.nbttfc365.com/project/82/interface/api/19299) 的 **请求类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `GET /v1/im/chat/friend/customerList`
 * @更新时间 `2023-11-03 16:42:46`
 */
export interface YapiGetV1ImChatFriendCustomerListApiRequest {}

/**
 * 接口 [查询客服好友列表↗](https://yapi.nbttfc365.com/project/82/interface/api/19299) 的 **返回类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `GET /v1/im/chat/friend/customerList`
 * @更新时间 `2023-11-03 16:42:46`
 */
export interface YapiGetV1ImChatFriendCustomerListApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 接口描述信息
   */
  message: string
  data: YapiGetV1ImChatFriendCustomerListData[]
}
export interface YapiGetV1ImChatFriendCustomerListData {
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
// * [查询客服好友列表↗](https://yapi.nbttfc365.com/project/82/interface/api/19299)
// **/
// export const getV1ImChatFriendCustomerListApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatFriendCustomerListApiRequest,
//   YapiGetV1ImChatFriendCustomerListApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/friend/customerList",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
