/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [客户端刷新TOKEN↗](https://yapi.nbttfc365.com/project/82/interface/api/12084) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imUserInfo/refresh`
 * @更新时间 `2023-09-04 16:19:49`
 */
export interface YapiPostV1ImChatImUserInfoRefreshApiRequest {}

/**
 * 接口 [客户端刷新TOKEN↗](https://yapi.nbttfc365.com/project/82/interface/api/12084) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imUserInfo/refresh`
 * @更新时间 `2023-09-04 16:19:49`
 */
export interface YapiPostV1ImChatImUserInfoRefreshApiResponse {
  code?: number
  message?: string
  data?: YapiPostV1ImChatImUserInfoRefreshData
}
export interface YapiPostV1ImChatImUserInfoRefreshData {
  /**
   * token
   */
  token: string
  /**
   * 刷新token
   */
  refreshToken: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [客户端刷新TOKEN↗](https://yapi.nbttfc365.com/project/82/interface/api/12084)
// **/
// export const postV1ImChatImUserInfoRefreshApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatImUserInfoRefreshApiRequest,
//   YapiPostV1ImChatImUserInfoRefreshApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/imUserInfo/refresh",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
