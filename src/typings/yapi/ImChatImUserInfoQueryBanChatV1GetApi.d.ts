/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [查询用户是否禁言↗](https://yapi.nbttfc365.com/project/82/interface/api/18984) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imUserInfo/query/banChat`
 * @更新时间 `2023-10-24 11:03:09`
 */
export interface YapiGetV1ImChatImUserInfoQueryBanChatApiRequest {}

/**
 * 接口 [查询用户是否禁言↗](https://yapi.nbttfc365.com/project/82/interface/api/18984) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imUserInfo/query/banChat`
 * @更新时间 `2023-10-24 11:03:09`
 */
export interface YapiGetV1ImChatImUserInfoQueryBanChatApiResponse {
  /**
   * 200，成功，其它失败
   */
  code: number
  /**
   * 描述消息
   */
  message: string
  data: YapiGetV1ImChatImUserInfoQueryBanChatData
}
export interface YapiGetV1ImChatImUserInfoQueryBanChatData {
  /**
   * 1，禁言，2，非禁言
   */
  isBan: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [查询用户是否禁言↗](https://yapi.nbttfc365.com/project/82/interface/api/18984)
// **/
// export const getV1ImChatImUserInfoQueryBanChatApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatImUserInfoQueryBanChatApiRequest,
//   YapiGetV1ImChatImUserInfoQueryBanChatApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/imUserInfo/query/banChat",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
