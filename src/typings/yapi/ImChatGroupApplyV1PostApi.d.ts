/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [申请入群↗](https://yapi.nbttfc365.com/project/82/interface/api/12044) 的 **请求类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/apply`
 * @更新时间 `2023-08-22 11:09:50`
 */
export interface YapiPostV1ImChatGroupApplyApiRequest {
  /**
   * 群组ID
   */
  groupId: string
}

/**
 * 接口 [申请入群↗](https://yapi.nbttfc365.com/project/82/interface/api/12044) 的 **返回类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/apply`
 * @更新时间 `2023-08-22 11:09:50`
 */
export interface YapiPostV1ImChatGroupApplyApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiPostV1ImChatGroupApplyData
}
/**
 * 返回数据
 */
export interface YapiPostV1ImChatGroupApplyData {
  /**
   * true，成功，false，失败
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [申请入群↗](https://yapi.nbttfc365.com/project/82/interface/api/12044)
// **/
// export const postV1ImChatGroupApplyApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatGroupApplyApiRequest,
//   YapiPostV1ImChatGroupApplyApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/group/apply",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
