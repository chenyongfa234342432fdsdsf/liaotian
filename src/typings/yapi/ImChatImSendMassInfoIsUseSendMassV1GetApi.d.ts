/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [助手-用户是否使用过群发↗](https://yapi.nbttfc365.com/project/82/interface/api/12144) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imSendMassInfo/isUseSendMass`
 * @更新时间 `2023-08-21 19:07:32`
 */
export interface YapiGetV1ImChatImSendMassInfoIsUseSendMassApiRequest {}

/**
 * 接口 [助手-用户是否使用过群发↗](https://yapi.nbttfc365.com/project/82/interface/api/12144) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imSendMassInfo/isUseSendMass`
 * @更新时间 `2023-08-21 19:07:32`
 */
export interface YapiGetV1ImChatImSendMassInfoIsUseSendMassApiResponse {
  code?: number
  message?: string
  data?: YapiGetV1ImChatImSendMassInfoIsUseSendMassData
}
export interface YapiGetV1ImChatImSendMassInfoIsUseSendMassData {
  /**
   * 使用过 true
   */
  success?: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [助手-用户是否使用过群发↗](https://yapi.nbttfc365.com/project/82/interface/api/12144)
// **/
// export const getV1ImChatImSendMassInfoIsUseSendMassApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatImSendMassInfoIsUseSendMassApiRequest,
//   YapiGetV1ImChatImSendMassInfoIsUseSendMassApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/imSendMassInfo/isUseSendMass",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
