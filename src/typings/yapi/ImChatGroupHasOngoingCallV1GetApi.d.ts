/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [查询群组是否有进行中的群聊↗](https://yapi.nbttfc365.com/project/82/interface/api/18909) 的 **请求类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `GET /v1/im/chat/group/hasOngoingCall`
 * @更新时间 `2023-10-10 17:53:46`
 */
export interface YapiGetV1ImChatGroupHasOngoingCallApiRequest {
  /**
   * 群组ID
   */
  groupId: string
}

/**
 * 接口 [查询群组是否有进行中的群聊↗](https://yapi.nbttfc365.com/project/82/interface/api/18909) 的 **返回类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `GET /v1/im/chat/group/hasOngoingCall`
 * @更新时间 `2023-10-10 17:53:46`
 */
export interface YapiGetV1ImChatGroupHasOngoingCallApiResponse {
  /**
   * 200，成功，其它失败
   */
  code: number
  /**
   * 描述消息
   */
  message: string
  data: YapiGetV1ImChatGroupHasOngoingCallData
}
export interface YapiGetV1ImChatGroupHasOngoingCallData {
  /**
   * true，有，false，没有
   */
  hasOngoingCall: boolean
  /**
   * 当hasOngoingCall=true时有值
   */
  roomId: string
  /**
   * 通话人数
   */
  roomNumber: number
  /**
   * 房间流类型，1，音频，2，视频
   */
  roomFlowType: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [查询群组是否有进行中的群聊↗](https://yapi.nbttfc365.com/project/82/interface/api/18909)
// **/
// export const getV1ImChatGroupHasOngoingCallApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatGroupHasOngoingCallApiRequest,
//   YapiGetV1ImChatGroupHasOngoingCallApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/group/hasOngoingCall",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
