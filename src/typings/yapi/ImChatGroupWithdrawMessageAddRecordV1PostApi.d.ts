/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [群撤回消息记录保存↗](https://yapi.nbttfc365.com/project/82/interface/api/20810) 的 **请求类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/withdrawMessage/addRecord`
 * @更新时间 `2023-12-15 15:40:08`
 */
export interface YapiPostV1ImChatGroupWithdrawMessageAddRecordApiRequest {
  /**
   * 群组ID
   */
  groupId: number
  /**
   * 消息ID
   */
  messageId: string
}

/**
 * 接口 [群撤回消息记录保存↗](https://yapi.nbttfc365.com/project/82/interface/api/20810) 的 **返回类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/withdrawMessage/addRecord`
 * @更新时间 `2023-12-15 15:40:08`
 */
export interface YapiPostV1ImChatGroupWithdrawMessageAddRecordApiResponse {
  /**
   * 是否成功标识
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [群撤回消息记录保存↗](https://yapi.nbttfc365.com/project/82/interface/api/20810)
// **/
// export const postV1ImChatGroupWithdrawMessageAddRecordApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatGroupWithdrawMessageAddRecordApiRequest,
//   YapiPostV1ImChatGroupWithdrawMessageAddRecordApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/group/withdrawMessage/addRecord",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
