/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [黑名单-拉黑↗](https://yapi.nbttfc365.com/project/82/interface/api/11854) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imBlockList/block`
 * @更新时间 `2023-08-03 19:08:00`
 */
export interface YapiPostV1ImChatImBlockListBlockApiRequest {
  /**
   * 被拉黑用户
   */
  quiltUid?: number
}

/**
 * 接口 [黑名单-拉黑↗](https://yapi.nbttfc365.com/project/82/interface/api/11854) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imBlockList/block`
 * @更新时间 `2023-08-03 19:08:00`
 */
export interface YapiPostV1ImChatImBlockListBlockApiResponse {
  code: number
  message: string
  data: YapiPostV1ImChatImBlockBlockData
}
export interface YapiPostV1ImChatImBlockBlockData {
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [黑名单-拉黑↗](https://yapi.nbttfc365.com/project/82/interface/api/11854)
// **/
// export const postV1ImChatImBlockListBlockApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatImBlockListBlockApiRequest,
//   YapiPostV1ImChatImBlockListBlockApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/imBlockList/block",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
