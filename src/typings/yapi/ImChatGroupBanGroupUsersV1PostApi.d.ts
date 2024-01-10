/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [群用户禁言↗](https://yapi.nbttfc365.com/project/82/interface/api/20803) 的 **请求类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/banGroupUsers`
 * @更新时间 `2023-12-15 09:51:20`
 */
export interface YapiPostV1ImChatGroupBanGroupUsersApiRequest {
  /**
   * 群组ID
   */
  groupId: number
  /**
   * 禁言类型 1 全部  2 指定 会员ID
   */
  banType: number
  /**
   * 会员ID列表
   */
  memberUid?: number[]
  /**
   * 1 已禁言  2 未禁言
   */
  ban: number
}

/**
 * 接口 [群用户禁言↗](https://yapi.nbttfc365.com/project/82/interface/api/20803) 的 **返回类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/banGroupUsers`
 * @更新时间 `2023-12-15 09:51:20`
 */
export interface YapiPostV1ImChatGroupBanGroupUsersApiResponse {
  /**
   * 是否成功标识
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [群用户禁言↗](https://yapi.nbttfc365.com/project/82/interface/api/20803)
// **/
// export const postV1ImChatGroupBanGroupUsersApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatGroupBanGroupUsersApiRequest,
//   YapiPostV1ImChatGroupBanGroupUsersApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/group/banGroupUsers",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
