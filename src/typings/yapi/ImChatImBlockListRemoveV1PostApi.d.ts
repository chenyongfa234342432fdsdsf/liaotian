/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [黑名单-移除↗](https://yapi.nbttfc365.com/project/82/interface/api/11589) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imBlockList/remove`
 * @更新时间 `2023-08-03 19:09:41`
 */
export interface YapiPostV1ImChatImBlockListRemoveApiRequest {
  /**
   * 被拉黑用户
   */
  quiltUid?: number
}

/**
 * 接口 [黑名单-移除↗](https://yapi.nbttfc365.com/project/82/interface/api/11589) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imBlockList/remove`
 * @更新时间 `2023-08-03 19:09:41`
 */
export interface YapiPostV1ImChatImBlockListRemoveApiResponse {
  code: number
  message: string
  data: YapiPostV1ImChatImBlockRemoveData
}
export interface YapiPostV1ImChatImBlockRemoveData {
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [黑名单-移除↗](https://yapi.nbttfc365.com/project/82/interface/api/11589)
// **/
// export const postV1ImChatImBlockListRemoveApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatImBlockListRemoveApiRequest,
//   YapiPostV1ImChatImBlockListRemoveApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/imBlockList/remove",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
