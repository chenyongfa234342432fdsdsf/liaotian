/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [群用户隐藏设置↗](https://yapi.nbttfc365.com/project/82/interface/api/20670) 的 **请求类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/userHideUpdate`
 * @更新时间 `2023-12-12 13:48:26`
 */
export interface YapiPostV1ImChatGroupUserHideUpdateApiRequest {
  /**
   * 群组ID
   */
  groupId: number
  /**
   * 是否开启隐藏成员 1，已开启，2，未开启
   */
  isHideUser: number
}

/**
 * 接口 [群用户隐藏设置↗](https://yapi.nbttfc365.com/project/82/interface/api/20670) 的 **返回类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/userHideUpdate`
 * @更新时间 `2023-12-12 13:48:26`
 */
export interface YapiPostV1ImChatGroupUserHideUpdateApiResponse {
  /**
   * 成功标识
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [群用户隐藏设置↗](https://yapi.nbttfc365.com/project/82/interface/api/20670)
// **/
// export const postV1ImChatGroupUserHideUpdateApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatGroupUserHideUpdateApiRequest,
//   YapiPostV1ImChatGroupUserHideUpdateApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/group/userHideUpdate",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
