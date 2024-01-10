/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [通过好友申请↗](https://yapi.nbttfc365.com/project/82/interface/api/12159) 的 **请求类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `POST /v1/im/chat/friend/passApply`
 * @更新时间 `2023-08-24 14:42:49`
 */
export interface YapiPostV1ImChatFriendPassApplyApiRequest {
  /**
   * 记录ID
   */
  recordId: string
}

/**
 * 接口 [通过好友申请↗](https://yapi.nbttfc365.com/project/82/interface/api/12159) 的 **返回类型**
 *
 * @分类 [通讯录模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_820)
 * @请求头 `POST /v1/im/chat/friend/passApply`
 * @更新时间 `2023-08-24 14:42:49`
 */
export interface YapiPostV1ImChatFriendPassApplyApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述消息
   */
  message: string
  data: YapiPostV1ImChatFriendPassApplyData
}
export interface YapiPostV1ImChatFriendPassApplyData {
  /**
   * true，成功，false，失败
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [通过好友申请↗](https://yapi.nbttfc365.com/project/82/interface/api/12159)
// **/
// export const postV1ImChatFriendPassApplyApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatFriendPassApplyApiRequest,
//   YapiPostV1ImChatFriendPassApplyApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/friend/passApply",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
