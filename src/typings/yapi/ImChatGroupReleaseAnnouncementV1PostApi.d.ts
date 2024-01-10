/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [发布群公告↗](https://yapi.nbttfc365.com/project/82/interface/api/11439) 的 **请求类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/releaseAnnouncement`
 * @更新时间 `2023-08-22 11:10:33`
 */
export interface YapiPostV1ImChatGroupReleaseAnnouncementApiRequest {
  /**
   * 群组ID
   */
  groupId: string
  /**
   * 群公告
   */
  announcement: string
}

/**
 * 接口 [发布群公告↗](https://yapi.nbttfc365.com/project/82/interface/api/11439) 的 **返回类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/releaseAnnouncement`
 * @更新时间 `2023-08-22 11:10:33`
 */
export interface YapiPostV1ImChatGroupReleaseAnnouncementApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiPostV1ImChatGroupReleaseAnnouncementData
}
export interface YapiPostV1ImChatGroupReleaseAnnouncementData {
  /**
   * true，成功，false，失败
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [发布群公告↗](https://yapi.nbttfc365.com/project/82/interface/api/11439)
// **/
// export const postV1ImChatGroupReleaseAnnouncementApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatGroupReleaseAnnouncementApiRequest,
//   YapiPostV1ImChatGroupReleaseAnnouncementApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/group/releaseAnnouncement",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
