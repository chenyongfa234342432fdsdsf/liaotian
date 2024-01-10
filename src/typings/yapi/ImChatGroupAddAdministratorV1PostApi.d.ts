/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [添加群管理员↗](https://yapi.nbttfc365.com/project/82/interface/api/11514) 的 **请求类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/addAdministrator`
 * @更新时间 `2023-08-22 11:11:02`
 */
export interface YapiPostV1ImChatGroupAddAdministratorApiRequest {
  /**
   * 要添加的用户ID集合
   */
  addUids: number[]
  /**
   * 群组ID
   */
  groupId: string
}

/**
 * 接口 [添加群管理员↗](https://yapi.nbttfc365.com/project/82/interface/api/11514) 的 **返回类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/addAdministrator`
 * @更新时间 `2023-08-22 11:11:02`
 */
export interface YapiPostV1ImChatGroupAddAdministratorApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiPostV1ImChatGroupAddAdministratorData
}
export interface YapiPostV1ImChatGroupAddAdministratorData {
  /**
   * true，成功，其他失败
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [添加群管理员↗](https://yapi.nbttfc365.com/project/82/interface/api/11514)
// **/
// export const postV1ImChatGroupAddAdministratorApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatGroupAddAdministratorApiRequest,
//   YapiPostV1ImChatGroupAddAdministratorApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/group/addAdministrator",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
