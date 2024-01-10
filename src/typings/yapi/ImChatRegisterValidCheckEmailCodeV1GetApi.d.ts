/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [邮箱-验证码校验↗](https://yapi.nbttfc365.com/project/82/interface/api/15134) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/register/valid/checkEmailCode`
 * @更新时间 `2023-09-05 17:43:30`
 */
export interface YapiGetV1ImChatRegisterValidCheckEmailCodeApiRequest {
  /**
   * 电话号码
   */
  email: string
  /**
   * 邮箱验证码
   */
  verifyCode: string
}

/**
 * 接口 [邮箱-验证码校验↗](https://yapi.nbttfc365.com/project/82/interface/api/15134) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/register/valid/checkEmailCode`
 * @更新时间 `2023-09-05 17:43:30`
 */
export interface YapiGetV1ImChatRegisterValidCheckEmailCodeApiResponse {
  code: number
  message: string
  data: YapiGetV1ImChatRegisterValidCheckEmailCodeData
}
export interface YapiGetV1ImChatRegisterValidCheckEmailCodeData {
  success?: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [邮箱-验证码校验↗](https://yapi.nbttfc365.com/project/82/interface/api/15134)
// **/
// export const getV1ImChatRegisterValidCheckEmailCodeApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatRegisterValidCheckEmailCodeApiRequest,
//   YapiGetV1ImChatRegisterValidCheckEmailCodeApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/register/valid/checkEmailCode",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
