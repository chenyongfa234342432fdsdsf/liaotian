/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [修改支付密码(不需要旧密码)↗](https://yapi.nbttfc365.com/project/82/interface/api/12064) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imUserInfo/updatePayPasswordSingle`
 * @更新时间 `2023-08-17 09:39:34`
 */
export interface YapiPostV1ImChatImUserInfoUpdatePayPasswordSingleApiRequest {
  /**
   * 新密码
   */
  newPayPassword: string
}

/**
 * 接口 [修改支付密码(不需要旧密码)↗](https://yapi.nbttfc365.com/project/82/interface/api/12064) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imUserInfo/updatePayPasswordSingle`
 * @更新时间 `2023-08-17 09:39:34`
 */
export interface YapiPostV1ImChatImUserInfoUpdatePayPasswordSingleApiResponse {
  code?: number
  message?: string
  data?: YapiPostV1ImChatImUserInfoUpdatePayPasswordSingleData
}
export interface YapiPostV1ImChatImUserInfoUpdatePayPasswordSingleData {
  success?: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [修改支付密码(不需要旧密码)↗](https://yapi.nbttfc365.com/project/82/interface/api/12064)
// **/
// export const postV1ImChatImUserInfoUpdatePayPasswordSingleApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatImUserInfoUpdatePayPasswordSingleApiRequest,
//   YapiPostV1ImChatImUserInfoUpdatePayPasswordSingleApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/imUserInfo/updatePayPasswordSingle",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
