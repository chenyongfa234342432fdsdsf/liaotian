/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [修改登录密码↗](https://yapi.nbttfc365.com/project/82/interface/api/11524) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imUserInfo/updateLoginPassword`
 * @更新时间 `2023-08-16 11:49:36`
 */
export interface YapiPostV1ImChatImUserInfoUpdateLoginPasswordApiRequest {
  /**
   * 旧密码
   */
  oldPassword?: string
  /**
   * 新密码
   */
  newPassword: string
}

/**
 * 接口 [修改登录密码↗](https://yapi.nbttfc365.com/project/82/interface/api/11524) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imUserInfo/updateLoginPassword`
 * @更新时间 `2023-08-16 11:49:36`
 */
export interface YapiPostV1ImChatImUserInfoUpdateLoginPasswordApiResponse {
  code?: number
  message?: string
  data?: YapiPostV1ImChatImUserInfoUpdateLoginPasswordData
}
export interface YapiPostV1ImChatImUserInfoUpdateLoginPasswordData {
  success?: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [修改登录密码↗](https://yapi.nbttfc365.com/project/82/interface/api/11524)
// **/
// export const postV1ImChatImUserInfoUpdateLoginPasswordApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatImUserInfoUpdateLoginPasswordApiRequest,
//   YapiPostV1ImChatImUserInfoUpdateLoginPasswordApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/imUserInfo/updateLoginPassword",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
