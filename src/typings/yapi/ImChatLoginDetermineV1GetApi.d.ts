/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [扫码绑定的接口↗](https://yapi.nbttfc365.com/project/82/interface/api/20271) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/login/determine`
 * @更新时间 `2023-12-08 15:18:46`
 */
export interface YapiGetV1ImChatLoginDetermineApiRequest {
  /**
   * 二维吗唯一性编码
   */
  qrCodeToken: string
}

/**
 * 接口 [扫码绑定的接口↗](https://yapi.nbttfc365.com/project/82/interface/api/20271) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/login/determine`
 * @更新时间 `2023-12-08 15:18:46`
 */
export interface YapiGetV1ImChatLoginDetermineApiResponse {}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [扫码绑定的接口↗](https://yapi.nbttfc365.com/project/82/interface/api/20271)
// **/
// export const getV1ImChatLoginDetermineApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatLoginDetermineApiRequest,
//   YapiGetV1ImChatLoginDetermineApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/login/determine",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
