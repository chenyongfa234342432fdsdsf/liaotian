/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [用户基本信息-修改↗](https://yapi.nbttfc365.com/project/82/interface/api/11534) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imUserInfo/editUserInfo`
 * @更新时间 `2023-08-03 20:56:52`
 */
export interface YapiPostV1ImChatImUserInfoEditUserInfoApiRequest {
  /**
   * 用户名称
   */
  userName?: string
  /**
   * 头像地址
   */
  avatarPath?: string
  /**
   * 昵称
   */
  nickName?: string
  /**
   * 注册国籍字典表编码
   */
  regCountryCd?: string
  /**
   * 手机区号
   */
  mobileCountryCd?: string
  /**
   * 手机号码
   */
  mobileNumber?: string
  /**
   * 口令
   */
  command?: string
  /**
   * 是否启用手机验证
   */
  isOpenPhoneVerify?: string
  /**
   * 个性签名
   */
  personalSignature?: string
}

/**
 * 接口 [用户基本信息-修改↗](https://yapi.nbttfc365.com/project/82/interface/api/11534) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imUserInfo/editUserInfo`
 * @更新时间 `2023-08-03 20:56:52`
 */
export interface YapiPostV1ImChatImUserInfoEditUserInfoApiResponse {
  code: number
  message: string
  data: YapiPostV1ImChatImUserInfoEditUserInfoData
}
export interface YapiPostV1ImChatImUserInfoEditUserInfoData {
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [用户基本信息-修改↗](https://yapi.nbttfc365.com/project/82/interface/api/11534)
// **/
// export const postV1ImChatImUserInfoEditUserInfoApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatImUserInfoEditUserInfoApiRequest,
//   YapiPostV1ImChatImUserInfoEditUserInfoApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/imUserInfo/editUserInfo",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
