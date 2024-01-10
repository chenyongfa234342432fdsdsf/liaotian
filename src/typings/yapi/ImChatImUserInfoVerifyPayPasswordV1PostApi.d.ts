/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [验证支付密码↗](https://yapi.nbttfc365.com/project/82/interface/api/12074) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imUserInfo/verifyPayPassword`
 * @更新时间 `2023-08-17 09:36:55`
 */
export interface YapiPostV1ImChatImUserInfoVerifyPayPasswordApiRequest {
  /**
   * 支付密码
   */
  payPassword: string
}

/**
 * 接口 [验证支付密码↗](https://yapi.nbttfc365.com/project/82/interface/api/12074) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imUserInfo/verifyPayPassword`
 * @更新时间 `2023-08-17 09:36:55`
 */
export interface YapiPostV1ImChatImUserInfoVerifyPayPasswordApiResponse {
  code: number
  message: string
  data: YapiPostV1ImChatImUserInfoVerifyPayPasswordData
}
export interface YapiPostV1ImChatImUserInfoVerifyPayPasswordData {
  /**
   * 设置是否成功
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [验证支付密码↗](https://yapi.nbttfc365.com/project/82/interface/api/12074)
// **/
// export const postV1ImChatImUserInfoVerifyPayPasswordApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatImUserInfoVerifyPayPasswordApiRequest,
//   YapiPostV1ImChatImUserInfoVerifyPayPasswordApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/imUserInfo/verifyPayPassword",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
