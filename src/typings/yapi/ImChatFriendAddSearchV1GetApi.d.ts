/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [搜索用户\/群组↗](https://yapi.nbttfc365.com/project/82/interface/api/11994) 的 **请求类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `GET /v1/im/chat/friend/addSearch`
 * @更新时间 `2023-08-22 11:09:16`
 */
export interface YapiGetV1ImChatFriendAddSearchApiRequest {
  /**
   * 搜索关键词
   */
  keyword: string
}

/**
 * 接口 [搜索用户\/群组↗](https://yapi.nbttfc365.com/project/82/interface/api/11994) 的 **返回类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `GET /v1/im/chat/friend/addSearch`
 * @更新时间 `2023-08-22 11:09:16`
 */
export interface YapiGetV1ImChatFriendAddSearchApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiGetV1ImChatFriendAddSearchData
}
/**
 * 搜索数据
 */
export interface YapiGetV1ImChatFriendAddSearchData {
  /**
   * 用户数据
   */
  userData: YapiGetV1ImChatFriendAddSearchListUserData[]
  /**
   * 群组数据
   */
  groupData: YapiGetV1ImChatFriendAddSearchListGroupData[]
}
export interface YapiGetV1ImChatFriendAddSearchListUserData {
  /**
   * 用户ID
   */
  uid: number
  /**
   * 用户昵称
   */
  nickName: string
  /**
   * 头像
   */
  avatarPath: string
  /**
   * 是否已添加，true，添加，false，未添加
   */
  alreadyAdd: boolean
}
export interface YapiGetV1ImChatFriendAddSearchListGroupData {
  /**
   * 群组ID
   */
  groupId: string
  /**
   * 群组名称
   */
  groupName: string
  /**
   * 群组头像
   */
  headImage: string
  /**
   * 是否已添加，true，添加，false，未添加
   */
  alreadyAdd: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [搜索用户/群组↗](https://yapi.nbttfc365.com/project/82/interface/api/11994)
// **/
// export const getV1ImChatFriendAddSearchApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatFriendAddSearchApiRequest,
//   YapiGetV1ImChatFriendAddSearchApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/friend/addSearch",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
