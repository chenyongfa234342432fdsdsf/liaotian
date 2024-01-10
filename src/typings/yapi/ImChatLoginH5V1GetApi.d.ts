/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [通过app登录token颁发h5token↗](https://yapi.nbttfc365.com/project/82/interface/api/12224) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/login/h5`
 * @更新时间 `2023-09-04 16:20:52`
 */
export interface YapiGetV1ImChatLoginH5ApiRequest {}

/**
 * 接口 [通过app登录token颁发h5token↗](https://yapi.nbttfc365.com/project/82/interface/api/12224) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/login/h5`
 * @更新时间 `2023-09-04 16:20:52`
 */
export interface YapiGetV1ImChatLoginH5ApiResponse {
  token: string
  userInfo: {}
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [通过app登录token颁发h5token↗](https://yapi.nbttfc365.com/project/82/interface/api/12224)
// **/
// export const getV1ImChatLoginH5ApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatLoginH5ApiRequest,
//   YapiGetV1ImChatLoginH5ApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/login/h5",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
