/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [创建房间↗](https://yapi.nbttfc365.com/project/82/interface/api/11669) 的 **请求类型**
 *
 * @分类 [房间模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_822)
 * @请求头 `POST /v1/im/chat/room/create`
 * @更新时间 `2023-08-22 11:09:41`
 */
export interface YapiPostV1ImChatRoomCreateApiRequest {
  /**
   * 房间类型，1，单聊，2，群聊
   */
  roomType: number
  /**
   * 房间绑定的用户ID或群聊ID
   */
  roomBindId: string
  /**
   *  房间流类型，1，音频，2，视频
   */
  roomFlowType: number
}

/**
 * 接口 [创建房间↗](https://yapi.nbttfc365.com/project/82/interface/api/11669) 的 **返回类型**
 *
 * @分类 [房间模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_822)
 * @请求头 `POST /v1/im/chat/room/create`
 * @更新时间 `2023-08-22 11:09:41`
 */
export interface YapiPostV1ImChatRoomCreateApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiPostV1ImChatRoomCreateData
}
export interface YapiPostV1ImChatRoomCreateData {
  /**
   * 房间号
   */
  roomNo: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [创建房间↗](https://yapi.nbttfc365.com/project/82/interface/api/11669)
// **/
// export const postV1ImChatRoomCreateApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatRoomCreateApiRequest,
//   YapiPostV1ImChatRoomCreateApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/room/create",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
