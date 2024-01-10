/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [注册↗](https://yapi.nbttfc365.com/project/82/interface/api/11484) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/register/mobile`
 * @更新时间 `2023-12-13 14:59:22`
 */
export interface YapiPostV1ImChatRegisterMobileApiRequest {
  /**
   * 手机区号
   */
  mobileCountryCd: string
  /**
   * 手机号码
   */
  mobileNumber: string
  /**
   * 登录密码
   */
  loginPassword: string
  /**
   * 验证码
   */
  mobileTelCode: string
  /**
   * 注册国简码 中国：CN
   */
  regCountry: string
}

/**
 * 接口 [注册↗](https://yapi.nbttfc365.com/project/82/interface/api/11484) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/register/mobile`
 * @更新时间 `2023-12-13 14:59:22`
 */
export interface YapiPostV1ImChatRegisterMobileApiResponse {
  token?: string
  userInfo?: YapiPostV1ImChatRegisterMobileUserInfo
  /**
   * 系统账号UID
   */
  systemUid: string
}
export interface YapiPostV1ImChatRegisterMobileUserInfo {
  /**
   * 主键
   */
  id?: number
  /**
   * 商户ID
   */
  businessId?: string
  /**
   * 用户UID
   */
  uid?: string
  /**
   * 头像路径
   */
  avatarPath?: null
  /**
   * 昵称
   */
  nickName?: string
  /**
   * 注册国籍字典表编码
   */
  regCountryCd?: null
  /**
   * 国籍字典表编码
   */
  kycCountryCd?: null
  /**
   * 是否启用手机验证  1 已开启 ， 2 未开启',
   */
  isOpenPhoneVerify?: number
  /**
   * 手机区号
   */
  mobileCountryCd?: string
  /**
   * 手机号码
   */
  mobileNumber?: string
  /**
   * 创建时间
   */
  createdByTime?: number
  /**
   * 靓号ID
   */
  fancyUid?: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [注册↗](https://yapi.nbttfc365.com/project/82/interface/api/11484)
// **/
// export const postV1ImChatRegisterMobileApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatRegisterMobileApiRequest,
//   YapiPostV1ImChatRegisterMobileApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/register/mobile",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
