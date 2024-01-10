/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [修改登录密码（不需要旧密码）↗](https://yapi.nbttfc365.com/project/82/interface/api/12059) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imUserInfo/updateLoginPasswordSingle`
 * @更新时间 `2023-08-17 12:58:35`
 */
export interface YapiPostV1ImChatImUserInfoUpdateLoginPasswordSingleApiRequest {
  newPassword: string
}

/**
 * 接口 [修改登录密码（不需要旧密码）↗](https://yapi.nbttfc365.com/project/82/interface/api/12059) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imUserInfo/updateLoginPasswordSingle`
 * @更新时间 `2023-08-17 12:58:35`
 */
export interface YapiPostV1ImChatImUserInfoUpdateLoginPasswordSingleApiResponse {
  code?: number
  message?: string
  data?: YapiPostV1ImChatImUserInfoUpdateLoginPasswordSingleData
}
export interface YapiPostV1ImChatImUserInfoUpdateLoginPasswordSingleData {
  success?: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [修改登录密码（不需要旧密码）↗](https://yapi.nbttfc365.com/project/82/interface/api/12059)
// **/
// export const postV1ImChatImUserInfoUpdateLoginPasswordSingleApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatImUserInfoUpdateLoginPasswordSingleApiRequest,
//   YapiPostV1ImChatImUserInfoUpdateLoginPasswordSingleApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/imUserInfo/updateLoginPasswordSingle",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
