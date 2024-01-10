/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [用户退出↗](https://yapi.nbttfc365.com/project/82/interface/api/12089) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/login/loginOut`
 * @更新时间 `2023-08-16 13:32:58`
 */
export interface YapiGetV1ImChatLoginLoginOutApiRequest {}

/**
 * 接口 [用户退出↗](https://yapi.nbttfc365.com/project/82/interface/api/12089) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/login/loginOut`
 * @更新时间 `2023-08-16 13:32:58`
 */
export interface YapiGetV1ImChatLoginLoginOutApiResponse {
  code: number
  message: string
  data: YapiGetV1ImChatLoginLoginOutData
}
export interface YapiGetV1ImChatLoginLoginOutData {
  /**
   * 设置是否成功
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [用户退出↗](https://yapi.nbttfc365.com/project/82/interface/api/12089)
// **/
// export const getV1ImChatLoginLoginOutApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatLoginLoginOutApiRequest,
//   YapiGetV1ImChatLoginLoginOutApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/login/loginOut",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
