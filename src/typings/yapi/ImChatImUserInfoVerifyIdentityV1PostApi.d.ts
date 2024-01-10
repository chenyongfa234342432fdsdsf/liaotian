/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [短信验证人员身份↗](https://yapi.nbttfc365.com/project/82/interface/api/12079) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imUserInfo/verifyIdentity`
 * @更新时间 `2023-11-20 17:12:55`
 */
export interface YapiPostV1ImChatImUserInfoVerifyIdentityApiRequest {
  /**
   * 短信验证码
   */
  mobileTelCode: string
  /**
   * 邮箱注册（1） 、登陆验证验证码（2）、个人身份验证（不传）、用户注销（24）
   */
  typeCd: number
}

/**
 * 接口 [短信验证人员身份↗](https://yapi.nbttfc365.com/project/82/interface/api/12079) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imUserInfo/verifyIdentity`
 * @更新时间 `2023-11-20 17:12:55`
 */
export interface YapiPostV1ImChatImUserInfoVerifyIdentityApiResponse {
  code: number
  message: string
  data: YapiPostV1ImChatImUserInfoVerifyIdentityData
}
export interface YapiPostV1ImChatImUserInfoVerifyIdentityData {
  /**
   * 设置是否成功
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [短信验证人员身份↗](https://yapi.nbttfc365.com/project/82/interface/api/12079)
// **/
// export const postV1ImChatImUserInfoVerifyIdentityApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatImUserInfoVerifyIdentityApiRequest,
//   YapiPostV1ImChatImUserInfoVerifyIdentityApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/imUserInfo/verifyIdentity",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
