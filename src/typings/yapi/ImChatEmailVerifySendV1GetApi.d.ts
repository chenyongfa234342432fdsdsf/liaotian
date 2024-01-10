/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [邮箱-发送验证码↗](https://yapi.nbttfc365.com/project/82/interface/api/15139) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/email/verify/send`
 * @更新时间 `2023-09-27 19:32:08`
 */
export interface YapiGetV1ImChatEmailVerifySendApiRequest {
  /**
   * 邮箱
   */
  email: string
  /**
   * 邮箱注册（1） 、登陆验证验证码（2）、个人身份验证（99）、用户注销（24）
   */
  typeCd: string
}

/**
 * 接口 [邮箱-发送验证码↗](https://yapi.nbttfc365.com/project/82/interface/api/15139) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/email/verify/send`
 * @更新时间 `2023-09-27 19:32:08`
 */
export interface YapiGetV1ImChatEmailVerifySendApiResponse {
  code: number
  message: string
  data: YapiGetV1ImChatEmailVerifySendData
}
export interface YapiGetV1ImChatEmailVerifySendData {
  success?: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [邮箱-发送验证码↗](https://yapi.nbttfc365.com/project/82/interface/api/15139)
// **/
// export const getV1ImChatEmailVerifySendApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatEmailVerifySendApiRequest,
//   YapiGetV1ImChatEmailVerifySendApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/email/verify/send",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
