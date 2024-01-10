/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [邮箱注册-手机绑定接口↗](https://yapi.nbttfc365.com/project/82/interface/api/18324) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/email/bindingMobile`
 * @更新时间 `2023-09-11 18:15:20`
 */
export interface YapiPostV1ImChatEmailBindingMobileApiRequest {
  /**
   * 注册国籍字典表编码
   */
  regCountryCd: string
  /**
   * 手机区号
   */
  mobileCountryCd: string
  /**
   * 手机号码
   */
  mobileNumber: string
  /**
   * 手机验证码
   */
  mobileCode: string
}

/**
 * 接口 [邮箱注册-手机绑定接口↗](https://yapi.nbttfc365.com/project/82/interface/api/18324) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/email/bindingMobile`
 * @更新时间 `2023-09-11 18:15:20`
 */
export interface YapiPostV1ImChatEmailBindingMobileApiResponse {
  code: number
  message: string
  data: YapiPostV1ImChatEmailBindingMobileData
}
export interface YapiPostV1ImChatEmailBindingMobileData {
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [邮箱注册-手机绑定接口↗](https://yapi.nbttfc365.com/project/82/interface/api/18324)
// **/
// export const postV1ImChatEmailBindingMobileApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatEmailBindingMobileApiRequest,
//   YapiPostV1ImChatEmailBindingMobileApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/email/bindingMobile",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
