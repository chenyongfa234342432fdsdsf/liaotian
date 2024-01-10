/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [查询群组公告↗](https://yapi.nbttfc365.com/project/82/interface/api/18899) 的 **请求类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `GET /v1/im/chat/group/getGroupAnnouncement`
 * @更新时间 `2023-10-10 10:54:28`
 */
export interface YapiGetV1ImChatGroupGetGroupAnnouncementApiRequest {
  /**
   * 群组ID
   */
  groupId: string
}

/**
 * 接口 [查询群组公告↗](https://yapi.nbttfc365.com/project/82/interface/api/18899) 的 **返回类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `GET /v1/im/chat/group/getGroupAnnouncement`
 * @更新时间 `2023-10-10 10:54:28`
 */
export interface YapiGetV1ImChatGroupGetGroupAnnouncementApiResponse {
  /**
   * 200，成功，其它失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiGetV1ImChatGroupGetGroupAnnouncementData
}
export interface YapiGetV1ImChatGroupGetGroupAnnouncementData {
  /**
   * 群公告
   */
  announcement: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [查询群组公告↗](https://yapi.nbttfc365.com/project/82/interface/api/18899)
// **/
// export const getV1ImChatGroupGetGroupAnnouncementApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatGroupGetGroupAnnouncementApiRequest,
//   YapiGetV1ImChatGroupGetGroupAnnouncementApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/group/getGroupAnnouncement",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
