/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [公告中心列表页↗](https://yapi.nbttfc365.com/project/82/interface/api/12179) 的 **请求类型**
 *
 * @分类 [公告模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_838)
 * @请求头 `GET /v1/im-helpCenter/announcementList`
 * @更新时间 `2023-12-05 10:58:36`
 */
export interface YapiGetV1ImHelpCenterAnnouncementListApiRequest {}

/**
 * 接口 [公告中心列表页↗](https://yapi.nbttfc365.com/project/82/interface/api/12179) 的 **返回类型**
 *
 * @分类 [公告模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_838)
 * @请求头 `GET /v1/im-helpCenter/announcementList`
 * @更新时间 `2023-12-05 10:58:36`
 */
export interface YapiGetV1ImHelpCenterAnnouncementListApiResponse {
  message?: string
  code?: number
  data?: YapiGetV1ImHelpCenterAnnouncementData
}
export interface YapiGetV1ImHelpCenterAnnouncementData {
  /**
   * 目录的列表
   */
  dialogList?: YapiGetV1ImHelpCenterAnnouncementListDialogListData[]
  consequat1e?: boolean
}
export interface YapiGetV1ImHelpCenterAnnouncementListDialogListData {
  /**
   * 标题
   */
  name: string
  /**
   * logo
   */
  logo: string
  /**
   * 文章的列表
   */
  announcementTextVOList: YapiGetV1ImHelpCenterAnnouncementListAnnouncementTextVOListDialogListData[]
  /**
   * 目录的id
   */
  id: number
}
export interface YapiGetV1ImHelpCenterAnnouncementListAnnouncementTextVOListDialogListData {
  /**
   * 发布的时间，时间戳个你
   */
  pushTimeStramp: number
  /**
   * 文章的标题标题
   */
  name: string
  /**
   * id
   */
  id: number
  /**
   * 上一级的id
   */
  parentId: number
  /**
   * 上级标题名称
   */
  higherLeverName: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [公告中心列表页↗](https://yapi.nbttfc365.com/project/82/interface/api/12179)
// **/
// export const getV1ImHelpCenterAnnouncementListApiRequest: MarkcoinRequest<
//   YapiGetV1ImHelpCenterAnnouncementListApiRequest,
//   YapiGetV1ImHelpCenterAnnouncementListApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im-helpCenter/announcementList",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
