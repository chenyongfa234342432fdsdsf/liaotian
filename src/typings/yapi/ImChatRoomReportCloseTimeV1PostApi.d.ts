/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [上报房间结束时间↗](https://yapi.nbttfc365.com/project/82/interface/api/12319) 的 **请求类型**
 *
 * @分类 [房间模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_822)
 * @请求头 `POST /v1/im/chat/room/reportCloseTime`
 * @更新时间 `2023-08-27 15:33:54`
 */
export interface YapiPostV1ImChatRoomReportCloseTimeApiRequest {
  /**
   * 房间号
   */
  roomNo: string
  /**
   * 房间结束时间，时间戳格式
   */
  closeTime: number
}

/**
 * 接口 [上报房间结束时间↗](https://yapi.nbttfc365.com/project/82/interface/api/12319) 的 **返回类型**
 *
 * @分类 [房间模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_822)
 * @请求头 `POST /v1/im/chat/room/reportCloseTime`
 * @更新时间 `2023-08-27 15:33:54`
 */
export interface YapiPostV1ImChatRoomReportCloseTimeApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiPostV1ImChatRoomReportCloseTimeData
}
export interface YapiPostV1ImChatRoomReportCloseTimeData {
  /**
   * true,成功，false，失败
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [上报房间结束时间↗](https://yapi.nbttfc365.com/project/82/interface/api/12319)
// **/
// export const postV1ImChatRoomReportCloseTimeApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatRoomReportCloseTimeApiRequest,
//   YapiPostV1ImChatRoomReportCloseTimeApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/room/reportCloseTime",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
