/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [查询群成员↗](https://yapi.nbttfc365.com/project/82/interface/api/11409) 的 **请求类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `GET /v1/im/chat/group/member`
 * @更新时间 `2023-12-16 13:38:35`
 */
export interface YapiGetV1ImChatGroupMemberApiRequest {
  /**
   * 群组ID
   */
  groupId: string
  /**
   * 1全部 2非全部
   */
  listType: string
}

/**
 * 接口 [查询群成员↗](https://yapi.nbttfc365.com/project/82/interface/api/11409) 的 **返回类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `GET /v1/im/chat/group/member`
 * @更新时间 `2023-12-16 13:38:35`
 */
export interface YapiGetV1ImChatGroupMemberApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  /**
   * 群成员数据
   */
  data: YapiGetV1ImChatGroupMemberListData[]
}
export interface YapiGetV1ImChatGroupMemberListData {
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
   * 是否是群主，true,是，false，不是
   */
  isLord: boolean
  /**
   * 是否是管理员，true,是，false，不是
   */
  isAdministrator: boolean
  /**
   * 真实昵称
   */
  realNickName: string
  /**
   * 1 已禁言  2 未禁言
   */
  isBan: number
  /**
   * 用户级别 1普通  2高级
   */
  userLevel: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [查询群成员↗](https://yapi.nbttfc365.com/project/82/interface/api/11409)
// **/
// export const getV1ImChatGroupMemberApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatGroupMemberApiRequest,
//   YapiGetV1ImChatGroupMemberApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/group/member",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
