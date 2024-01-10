/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [其他方注销账号↗](https://yapi.nbttfc365.com/project/82/interface/api/18739) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imUserInfo/otherSide/destroy`
 * @更新时间 `2023-10-07 16:48:33`
 */
export interface YapiPostV1ImChatImUserInfoOtherSideDestroyApiRequest {
  /**
   * 邮箱账号，邮箱验证必填
   */
  email?: string
  /**
   * 手机区号，手机号验证必填
   */
  mobileCountryCd?: string
  /**
   * 手机号，手机号验证必填
   */
  mobileNumber?: string
  /**
   * 验证码
   */
  verifyCode: string
}

/**
 * 接口 [其他方注销账号↗](https://yapi.nbttfc365.com/project/82/interface/api/18739) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imUserInfo/otherSide/destroy`
 * @更新时间 `2023-10-07 16:48:33`
 */
export interface YapiPostV1ImChatImUserInfoOtherSideDestroyApiResponse {
  /**
   * 200，成功，其它失败
   */
  code: number
  /**
   * 描述消息
   */
  message: string
  data: YapiPostV1ImChatImUserInfoOtherSideDestroyData
}
/**
 * 返回数据
 */
export interface YapiPostV1ImChatImUserInfoOtherSideDestroyData {
  /**
   * true，成功，false，失败
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [其他方注销账号↗](https://yapi.nbttfc365.com/project/82/interface/api/18739)
// **/
// export const postV1ImChatImUserInfoOtherSideDestroyApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatImUserInfoOtherSideDestroyApiRequest,
//   YapiPostV1ImChatImUserInfoOtherSideDestroyApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/imUserInfo/otherSide/destroy",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
