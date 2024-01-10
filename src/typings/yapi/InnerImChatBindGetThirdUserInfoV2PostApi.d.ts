/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [获取三方用户信息↗](https://yapi.nbttfc365.com/project/82/interface/api/15174) 的 **请求类型**
 *
 * @分类 [三方平台绑定↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_976)
 * @请求头 `POST /inner/v1/im/chat/bind/getThirdUserInfoV2`
 * @更新时间 `2023-09-27 18:15:40`
 */
export interface YapiPostInnerV1ImChatBindGetThirdUserInfoV2ApiRequest {
  /**
   * 三方平台用户UID
   */
  thirdUid: string
  /**
   * 三方平台用户密码
   */
  thirdPassWord: string
  /**
   * IM用户ID
   */
  uid?: string
  /**
   * IM 商户ID
   */
  businessId?: string
}

/**
 * 接口 [获取三方用户信息↗](https://yapi.nbttfc365.com/project/82/interface/api/15174) 的 **返回类型**
 *
 * @分类 [三方平台绑定↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_976)
 * @请求头 `POST /inner/v1/im/chat/bind/getThirdUserInfoV2`
 * @更新时间 `2023-09-27 18:15:40`
 */
export interface YapiPostInnerV1ImChatBindGetThirdUserInfoV2ApiResponse {
  code: string
  message: string
  data: YapiPostInnerV1ImChatBindGetThirdUserInfoV2Data
}
export interface YapiPostInnerV1ImChatBindGetThirdUserInfoV2Data {
  /**
   * 商户id
   */
  businessId: number
  /**
   * 昵称
   */
  nickName: string
  /**
   * 是否开启谷歌校验1 已开启 ， 2 未开启
   */
  isOpenGoogleVerify: number
  /**
   * 是否开启手机号校验 1 已开启 ， 2 未开启
   */
  isOpenPhoneVerify: number
  /**
   * 是否开启邮箱校验 1 已开启 ， 2 未开启
   */
  isOpenEmailVerify: number
  /**
   * 手机号
   */
  mobileNumber?: string
  /**
   * 邮箱
   */
  email?: string
  /**
   * 手机区号
   */
  mobileCountryCd?: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [获取三方用户信息↗](https://yapi.nbttfc365.com/project/82/interface/api/15174)
// **/
// export const postInnerV1ImChatBindGetThirdUserInfoV2ApiRequest: MarkcoinRequest<
//   YapiPostInnerV1ImChatBindGetThirdUserInfoV2ApiRequest,
//   YapiPostInnerV1ImChatBindGetThirdUserInfoV2ApiResponse['data']
// > = data => {
//   return request({
//     path: "/inner/v1/im/chat/bind/getThirdUserInfoV2",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
