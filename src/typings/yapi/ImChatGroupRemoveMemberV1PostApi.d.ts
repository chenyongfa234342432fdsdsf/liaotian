/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [移除成员↗](https://yapi.nbttfc365.com/project/82/interface/api/11429) 的 **请求类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/removeMember`
 * @更新时间 `2023-08-22 11:10:12`
 */
export interface YapiPostV1ImChatGroupRemoveMemberApiRequest {
  /**
   * 移除的成员集合
   */
  removeUids: number[]
  /**
   * 群组ID
   */
  groupId: string
}

/**
 * 接口 [移除成员↗](https://yapi.nbttfc365.com/project/82/interface/api/11429) 的 **返回类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/removeMember`
 * @更新时间 `2023-08-22 11:10:12`
 */
export interface YapiPostV1ImChatGroupRemoveMemberApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiPostV1ImChatGroupRemoveMemberData
}
export interface YapiPostV1ImChatGroupRemoveMemberData {
  /**
   * true，成功，false，失败
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [移除成员↗](https://yapi.nbttfc365.com/project/82/interface/api/11429)
// **/
// export const postV1ImChatGroupRemoveMemberApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatGroupRemoveMemberApiRequest,
//   YapiPostV1ImChatGroupRemoveMemberApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/group/removeMember",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
