/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [删除用户登录前历史token↗](https://yapi.nbttfc365.com/project/82/interface/api/18484) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imUserInfo/delHistoryToken`
 * @更新时间 `2023-09-13 18:48:00`
 */
export interface YapiGetV1ImChatImUserInfoDelHistoryTokenApiRequest {}

/**
 * 接口 [删除用户登录前历史token↗](https://yapi.nbttfc365.com/project/82/interface/api/18484) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imUserInfo/delHistoryToken`
 * @更新时间 `2023-09-13 18:48:00`
 */
export interface YapiGetV1ImChatImUserInfoDelHistoryTokenApiResponse {
  code: number
  message: string
  data: YapiGetV1ImChatImUserInfoDelHistoryTokenData
}
export interface YapiGetV1ImChatImUserInfoDelHistoryTokenData {
  success?: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [删除用户登录前历史token↗](https://yapi.nbttfc365.com/project/82/interface/api/18484)
// **/
// export const getV1ImChatImUserInfoDelHistoryTokenApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatImUserInfoDelHistoryTokenApiRequest,
//   YapiGetV1ImChatImUserInfoDelHistoryTokenApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/imUserInfo/delHistoryToken",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
