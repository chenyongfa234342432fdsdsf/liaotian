/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [移除群管理员↗](https://yapi.nbttfc365.com/project/82/interface/api/11529) 的 **请求类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/removeAdministrator`
 * @更新时间 `2023-08-22 11:11:09`
 */
export interface YapiPostV1ImChatGroupRemoveAdministratorApiRequest {
  /**
   * 要移除的用户UID的集合
   */
  removeUids: number[]
  /**
   * 群组ID
   */
  groupId: string
}

/**
 * 接口 [移除群管理员↗](https://yapi.nbttfc365.com/project/82/interface/api/11529) 的 **返回类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/removeAdministrator`
 * @更新时间 `2023-08-22 11:11:09`
 */
export interface YapiPostV1ImChatGroupRemoveAdministratorApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiPostV1ImChatGroupRemoveAdministratorData
}
export interface YapiPostV1ImChatGroupRemoveAdministratorData {
  /**
   * true,成功，false，失败
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [移除群管理员↗](https://yapi.nbttfc365.com/project/82/interface/api/11529)
// **/
// export const postV1ImChatGroupRemoveAdministratorApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatGroupRemoveAdministratorApiRequest,
//   YapiPostV1ImChatGroupRemoveAdministratorApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/group/removeAdministrator",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
