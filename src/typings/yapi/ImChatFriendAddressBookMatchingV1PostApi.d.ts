/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [通讯录匹配↗](https://yapi.nbttfc365.com/project/82/interface/api/11999) 的 **请求类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `POST /v1/im/chat/friend/addressBookMatching`
 * @更新时间 `2023-08-24 18:11:00`
 */
export interface YapiPostV1ImChatFriendAddressBookMatchingApiRequest {
  /**
   * 通讯录集合
   */
  addressBook: YapiPostV1ImChatFriendAddressBookMatchingApiRequestListAddressBook[]
}
export interface YapiPostV1ImChatFriendAddressBookMatchingApiRequestListAddressBook {
  /**
   * 手机号码
   */
  mobileNumber: string
}

/**
 * 接口 [通讯录匹配↗](https://yapi.nbttfc365.com/project/82/interface/api/11999) 的 **返回类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `POST /v1/im/chat/friend/addressBookMatching`
 * @更新时间 `2023-08-24 18:11:00`
 */
export interface YapiPostV1ImChatFriendAddressBookMatchingApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  /**
   * 匹配数据
   */
  data: YapiPostV1ImChatFriendAddressBookMatchingListData[]
}
export interface YapiPostV1ImChatFriendAddressBookMatchingListData {
  /**
   * 手机号
   */
  mobileNumber: string
  /**
   * 是否注册，true，是，false,否
   */
  isRegister: boolean
  /**
   * 是否是好友，true，是，false,否
   */
  isFriend: boolean
  /**
   * 用户ID，用户注册了后返回
   */
  uid?: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [通讯录匹配↗](https://yapi.nbttfc365.com/project/82/interface/api/11999)
// **/
// export const postV1ImChatFriendAddressBookMatchingApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatFriendAddressBookMatchingApiRequest,
//   YapiPostV1ImChatFriendAddressBookMatchingApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/friend/addressBookMatching",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
