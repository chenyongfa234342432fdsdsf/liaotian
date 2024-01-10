/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [发送验证码（手机短信）↗](https://yapi.nbttfc365.com/project/82/interface/api/11744) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imUserInfo/getMobileTelCode`
 * @更新时间 `2023-09-27 17:10:16`
 */
export interface YapiGetV1ImChatImUserInfoGetMobileTelCodeApiRequest {
  /**
   * 电话号码
   */
  mobileNumber: string
  /**
   * 手机区号
   */
  mobileCountryCd: string
  /**
   * 手机号注册（1） 、登陆验证验证码（2）、个人身份验证（99）、账号注销（24）
   */
  typeCd: string
}

/**
 * 接口 [发送验证码（手机短信）↗](https://yapi.nbttfc365.com/project/82/interface/api/11744) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imUserInfo/getMobileTelCode`
 * @更新时间 `2023-09-27 17:10:16`
 */
export interface YapiGetV1ImChatImUserInfoGetMobileTelCodeApiResponse {
  code: number
  message: string
  data: YapiGetV1ImChatImUserInfoGetMobileTelCodeData
}
export interface YapiGetV1ImChatImUserInfoGetMobileTelCodeData {
  success?: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [发送验证码（手机短信）↗](https://yapi.nbttfc365.com/project/82/interface/api/11744)
// **/
// export const getV1ImChatImUserInfoGetMobileTelCodeApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatImUserInfoGetMobileTelCodeApiRequest,
//   YapiGetV1ImChatImUserInfoGetMobileTelCodeApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/imUserInfo/getMobileTelCode",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
