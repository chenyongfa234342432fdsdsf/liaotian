/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [扫码后的状态确定↗](https://yapi.nbttfc365.com/project/82/interface/api/20264) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/login/set_scaneed_signal`
 * @更新时间 `2023-12-06 11:49:43`
 */
export interface YapiGetV1ImChatLoginSetScaneedSignalApiRequest {
  /**
   * 二维码
   */
  qrCodeToken: string
}

/**
 * 接口 [扫码后的状态确定↗](https://yapi.nbttfc365.com/project/82/interface/api/20264) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/login/set_scaneed_signal`
 * @更新时间 `2023-12-06 11:49:43`
 */
export interface YapiGetV1ImChatLoginSetScaneedSignalApiResponse {}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [扫码后的状态确定↗](https://yapi.nbttfc365.com/project/82/interface/api/20264)
// **/
// export const getV1ImChatLoginSetScaneedSignalApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatLoginSetScaneedSignalApiRequest,
//   YapiGetV1ImChatLoginSetScaneedSignalApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/login/set_scaneed_signal",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
