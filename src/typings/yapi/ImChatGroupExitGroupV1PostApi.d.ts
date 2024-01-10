/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [退出群组↗](https://yapi.nbttfc365.com/project/82/interface/api/11444) 的 **请求类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/exitGroup`
 * @更新时间 `2023-08-22 11:10:40`
 */
export interface YapiPostV1ImChatGroupExitGroupApiRequest {
  /**
   * 群组ID
   */
  groupId: string
}

/**
 * 接口 [退出群组↗](https://yapi.nbttfc365.com/project/82/interface/api/11444) 的 **返回类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/exitGroup`
 * @更新时间 `2023-08-22 11:10:40`
 */
export interface YapiPostV1ImChatGroupExitGroupApiResponse {
  /**
   * 200，成功，其实失败
   */
  code: number
  /**
   * 描述是信息
   */
  message: string
  data: YapiPostV1ImChatGroupExitGroupData
}
export interface YapiPostV1ImChatGroupExitGroupData {
  /**
   * true，成功，false，失败
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [退出群组↗](https://yapi.nbttfc365.com/project/82/interface/api/11444)
// **/
// export const postV1ImChatGroupExitGroupApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatGroupExitGroupApiRequest,
//   YapiPostV1ImChatGroupExitGroupApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/group/exitGroup",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
