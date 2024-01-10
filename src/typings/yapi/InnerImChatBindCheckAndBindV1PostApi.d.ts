/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [验证码校验及绑定↗](https://yapi.nbttfc365.com/project/82/interface/api/15184) 的 **请求类型**
 *
 * @分类 [三方平台绑定↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_976)
 * @请求头 `POST /inner/v1/im/chat/bind/checkAndBind`
 * @更新时间 `2023-09-11 15:53:33`
 */
export interface YapiPostInnerV1ImChatBindCheckAndBindApiRequest {
  /**
   * 校验类型：phone-手机、email-邮箱、google-谷歌
   */
  type: string
  /**
   * 三方用户UID
   */
  thirdUid: string
  /**
   * 三方商户ID
   */
  thirdBusinessId: string
  /**
   * 三方用户密码
   */
  passWord: string
  /**
   * 邮箱，type=email时候必填
   */
  email?: string
  /**
   * 手机号，type=phone时候必填
   */
  mobile?: string
  /**
   * 手机号区号，type=phone时候必填
   */
  mobileCountryCode?: string
  /**
   * 验证码
   */
  verifyCode: string
  /**
   * 用户类型：normal-普通用户、admin-管理员用户
   */
  userType: string
  /**
   * IM用户UID
   */
  uid: number
  /**
   * IM商户ID
   */
  businessId: number
  /**
   * 当用户修改绑定数据的时候，必填
   */
  bindId?: number
}

/**
 * 接口 [验证码校验及绑定↗](https://yapi.nbttfc365.com/project/82/interface/api/15184) 的 **返回类型**
 *
 * @分类 [三方平台绑定↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_976)
 * @请求头 `POST /inner/v1/im/chat/bind/checkAndBind`
 * @更新时间 `2023-09-11 15:53:33`
 */
export interface YapiPostInnerV1ImChatBindCheckAndBindApiResponse {
  /**
   * 200成功，其他失败
   */
  code: number
  /**
   * 返回信息
   */
  messsage: string
  data: YapiPostInnerV1ImChatBindCheckAndBindData
}
/**
 * 返回数据
 */
export interface YapiPostInnerV1ImChatBindCheckAndBindData {
  /**
   * true成功，false,失败
   */
  isSuccess: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [验证码校验及绑定↗](https://yapi.nbttfc365.com/project/82/interface/api/15184)
// **/
// export const postInnerV1ImChatBindCheckAndBindApiRequest: MarkcoinRequest<
//   YapiPostInnerV1ImChatBindCheckAndBindApiRequest,
//   YapiPostInnerV1ImChatBindCheckAndBindApiResponse['data']
// > = data => {
//   return request({
//     path: "/inner/v1/im/chat/bind/checkAndBind",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
