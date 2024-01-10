/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [公告中心正文页↗](https://yapi.nbttfc365.com/project/82/interface/api/12184) 的 **请求类型**
 *
 * @分类 [公告模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_838)
 * @请求头 `GET /v1/im-helpCenter/announcement/content`
 * @更新时间 `2023-09-22 16:53:04`
 */
export interface YapiGetV1ImHelpCenterAnnouncementContentApiRequest {
  /**
   * 870266
   */
  announceContentId: string
}

/**
 * 接口 [公告中心正文页↗](https://yapi.nbttfc365.com/project/82/interface/api/12184) 的 **返回类型**
 *
 * @分类 [公告模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_838)
 * @请求头 `GET /v1/im-helpCenter/announcement/content`
 * @更新时间 `2023-09-22 16:53:04`
 */
export interface YapiGetV1ImHelpCenterAnnouncementContentApiResponse {
  code?: number
  data?: YapiGetV1ImHelpCenterAnnouncementContentData
  message?: string
}
export interface YapiGetV1ImHelpCenterAnnouncementContentData {
  /**
   * 上级的id
   */
  parentId?: number
  /**
   * 目录的列表
   */
  catalogVOList?: YapiGetV1ImHelpCenterAnnouncementContentListCatalogVOListData[]
  /**
   * 公告的列表
   */
  announcementList?: YapiGetV1ImHelpCenterAnnouncementContentListAnnouncementListData[]
  /**
   * 正文的内容
   */
  content?: string
}
export interface YapiGetV1ImHelpCenterAnnouncementContentListCatalogVOListData {
  /**
   * 标题
   */
  name?: string
  /**
   * ID
   */
  id?: number
}
export interface YapiGetV1ImHelpCenterAnnouncementContentListAnnouncementListData {
  /**
   * 正文
   */
  content: string
  /**
   * id
   */
  id: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [公告中心正文页↗](https://yapi.nbttfc365.com/project/82/interface/api/12184)
// **/
// export const getV1ImHelpCenterAnnouncementContentApiRequest: MarkcoinRequest<
//   YapiGetV1ImHelpCenterAnnouncementContentApiRequest,
//   YapiGetV1ImHelpCenterAnnouncementContentApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im-helpCenter/announcement/content",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
