/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [获取聊天token↗](https://yapi.nbttfc365.com/project/82/interface/api/11974) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/zeGo/refreshToken`
 * @更新时间 `2023-09-07 14:49:21`
 */
export interface YapiPostV1ImChatZeGoRefreshTokenApiRequest {}

/**
 * 接口 [获取聊天token↗](https://yapi.nbttfc365.com/project/82/interface/api/11974) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/zeGo/refreshToken`
 * @更新时间 `2023-09-07 14:49:21`
 */
export interface YapiPostV1ImChatZeGoRefreshTokenApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiPostV1ImChatZeGoRefreshTokenData
}
export interface YapiPostV1ImChatZeGoRefreshTokenData {
  /**
   * 聊天token
   */
  zeGoToken: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [获取聊天token↗](https://yapi.nbttfc365.com/project/82/interface/api/11974)
// **/
// export const postV1ImChatZeGoRefreshTokenApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatZeGoRefreshTokenApiRequest,
//   YapiPostV1ImChatZeGoRefreshTokenApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/zeGo/refreshToken",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
