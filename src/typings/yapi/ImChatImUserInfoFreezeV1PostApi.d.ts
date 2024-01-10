/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [冻结账号↗](https://yapi.nbttfc365.com/project/82/interface/api/11664) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imUserInfo/freeze`
 * @更新时间 `2023-08-03 17:52:20`
 */
export interface YapiPostV1ImChatImUserInfoFreezeApiRequest {
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
}

/**
 * 接口 [冻结账号↗](https://yapi.nbttfc365.com/project/82/interface/api/11664) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imUserInfo/freeze`
 * @更新时间 `2023-08-03 17:52:20`
 */
export interface YapiPostV1ImChatImUserInfoFreezeApiResponse {
  code: number
  message: string
  data: YapiPostV1ImChatImUserInfoFreezeData
}
export interface YapiPostV1ImChatImUserInfoFreezeData {
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [冻结账号↗](https://yapi.nbttfc365.com/project/82/interface/api/11664)
// **/
// export const postV1ImChatImUserInfoFreezeApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatImUserInfoFreezeApiRequest,
//   YapiPostV1ImChatImUserInfoFreezeApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/imUserInfo/freeze",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
