/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [三方平台安全校验发送↗](https://yapi.nbttfc365.com/project/82/interface/api/15179) 的 **请求类型**
 *
 * @分类 [三方平台绑定↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_976)
 * @请求头 `POST /inner/v1/im/chat/bind/sendCheck`
 * @更新时间 `2023-09-06 19:01:24`
 */
export interface YapiPostInnerV1ImChatBindSendCheckApiRequest {
  /**
   * 校验类型：phone-手机、email-邮箱、google-谷歌
   */
  type: string
  /**
   * 三方用户UID
   */
  thirdUid: number
  /**
   * 三方商户ID
   */
  thirdBusinessId: number
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
}

/**
 * 接口 [三方平台安全校验发送↗](https://yapi.nbttfc365.com/project/82/interface/api/15179) 的 **返回类型**
 *
 * @分类 [三方平台绑定↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_976)
 * @请求头 `POST /inner/v1/im/chat/bind/sendCheck`
 * @更新时间 `2023-09-06 19:01:24`
 */
export type YapiPostInnerV1ImChatBindSendCheckApiResponse = any

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [三方平台安全校验发送↗](https://yapi.nbttfc365.com/project/82/interface/api/15179)
// **/
// export const postInnerV1ImChatBindSendCheckApiRequest: MarkcoinRequest<
//   YapiPostInnerV1ImChatBindSendCheckApiRequest,
//   YapiPostInnerV1ImChatBindSendCheckApiResponse['data']
// > = data => {
//   return request({
//     path: "/inner/v1/im/chat/bind/sendCheck",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
