/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [上报撤回、删除的消息↗](https://yapi.nbttfc365.com/project/82/interface/api/12444) 的 **请求类型**
 *
 * @分类 [消息模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_850)
 * @请求头 `POST /v1/im/chat/record/reportRecord`
 * @更新时间 `2023-08-29 14:53:04`
 */
export interface YapiPostV1ImChatRecordReportRecordApiRequest {
  /**
   * 上报的消息
   */
  recordList: YapiPostV1ImChatRecordReportRecordApiRequestListRecordList[]
}
export interface YapiPostV1ImChatRecordReportRecordApiRequestListRecordList {
  /**
   * 消息ID
   */
  msgId: string
  /**
   * 2，撤回消息，3，删除消息
   */
  status: number
}

/**
 * 接口 [上报撤回、删除的消息↗](https://yapi.nbttfc365.com/project/82/interface/api/12444) 的 **返回类型**
 *
 * @分类 [消息模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_850)
 * @请求头 `POST /v1/im/chat/record/reportRecord`
 * @更新时间 `2023-08-29 14:53:04`
 */
export interface YapiPostV1ImChatRecordReportRecordApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiPostV1ImChatRecordReportRecordData
}
export interface YapiPostV1ImChatRecordReportRecordData {
  /**
   * true，成功，false，失败
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [上报撤回、删除的消息↗](https://yapi.nbttfc365.com/project/82/interface/api/12444)
// **/
// export const postV1ImChatRecordReportRecordApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatRecordReportRecordApiRequest,
//   YapiPostV1ImChatRecordReportRecordApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/record/reportRecord",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
