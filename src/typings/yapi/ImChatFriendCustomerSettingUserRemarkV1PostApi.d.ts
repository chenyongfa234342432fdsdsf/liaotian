/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [客服对用户备注设置↗](https://yapi.nbttfc365.com/project/82/interface/api/19309) 的 **请求类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `POST /v1/im/chat/friend/customer/settingUserRemark`
 * @更新时间 `2023-11-05 18:21:23`
 */
export interface YapiPostV1ImChatFriendCustomerSettingUserRemarkApiRequest {
  /**
   * 用户ID
   */
  uid: number
  /**
   * 备注
   */
  remark: string
}

/**
 * 接口 [客服对用户备注设置↗](https://yapi.nbttfc365.com/project/82/interface/api/19309) 的 **返回类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `POST /v1/im/chat/friend/customer/settingUserRemark`
 * @更新时间 `2023-11-05 18:21:23`
 */
export interface YapiPostV1ImChatFriendCustomerSettingUserRemarkApiResponse {
  /**
   * 200成功，其它成功
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiPostV1ImChatFriendCustomerSettingUserRemarkData
}
export interface YapiPostV1ImChatFriendCustomerSettingUserRemarkData {
  /**
   * true，成功，false，失败
   */
  success: {}
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [客服对用户备注设置↗](https://yapi.nbttfc365.com/project/82/interface/api/19309)
// **/
// export const postV1ImChatFriendCustomerSettingUserRemarkApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatFriendCustomerSettingUserRemarkApiRequest,
//   YapiPostV1ImChatFriendCustomerSettingUserRemarkApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/friend/customer/settingUserRemark",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
