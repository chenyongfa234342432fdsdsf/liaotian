/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [获取所有备注的群组和好友列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11954) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imUserInfo/remarkList`
 * @更新时间 `2023-09-04 16:20:03`
 */
export interface YapiGetV1ImChatImUserInfoRemarkListApiRequest {}

/**
 * 接口 [获取所有备注的群组和好友列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11954) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imUserInfo/remarkList`
 * @更新时间 `2023-09-04 16:20:03`
 */
export interface YapiGetV1ImChatImUserInfoRemarkListApiResponse {
  /**
   * 200成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiGetV1ImChatImUserInfoRemarkData
}
export interface YapiGetV1ImChatImUserInfoRemarkData {
  /**
   * 群备注信息
   */
  groupList: YapiGetV1ImChatImUserInfoRemarkListGroupListData[]
  /**
   * 群组备注信息
   */
  friendList: YapiGetV1ImChatImUserInfoRemarkListFriendListData[]
}
export interface YapiGetV1ImChatImUserInfoRemarkListGroupListData {
  /**
   * 群组ID
   */
  groupId: string
  /**
   * 群备注
   */
  remark: string
}
export interface YapiGetV1ImChatImUserInfoRemarkListFriendListData {
  /**
   * 好友用户ID
   */
  uid: string
  /**
   * 好友备注
   */
  remark: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [获取所有备注的群组和好友列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11954)
// **/
// export const getV1ImChatImUserInfoRemarkListApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatImUserInfoRemarkListApiRequest,
//   YapiGetV1ImChatImUserInfoRemarkListApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/imUserInfo/remarkList",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
