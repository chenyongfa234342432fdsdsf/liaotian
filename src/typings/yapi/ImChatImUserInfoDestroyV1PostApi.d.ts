/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [注销账号↗](https://yapi.nbttfc365.com/project/82/interface/api/18679) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imUserInfo/destroy`
 * @更新时间 `2023-09-27 19:49:18`
 */
export interface YapiPostV1ImChatImUserInfoDestroyApiRequest {
  /**
   * 邮箱账号，邮箱验证码验证必传
   */
  email?: string
  /**
   * 手机区号，短信验证码验证必传
   */
  mobileCountryCd?: string
  /**
   * 手机号，短信验证码验证必传
   */
  mobileNumber?: string
  /**
   * 验证码
   */
  verifyCode: string
}

/**
 * 接口 [注销账号↗](https://yapi.nbttfc365.com/project/82/interface/api/18679) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imUserInfo/destroy`
 * @更新时间 `2023-09-27 19:49:18`
 */
export interface YapiPostV1ImChatImUserInfoDestroyApiResponse {
  /**
   * 200，成功，其它失败
   */
  code: number
  /**
   * 描述消息
   */
  message: string
  data: YapiPostV1ImChatImUserInfoDestroyData
}
/**
 * 返回数据
 */
export interface YapiPostV1ImChatImUserInfoDestroyData {
  /**
   * true，成功，false，失败
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [注销账号↗](https://yapi.nbttfc365.com/project/82/interface/api/18679)
// **/
// export const postV1ImChatImUserInfoDestroyApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatImUserInfoDestroyApiRequest,
//   YapiPostV1ImChatImUserInfoDestroyApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/imUserInfo/destroy",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
