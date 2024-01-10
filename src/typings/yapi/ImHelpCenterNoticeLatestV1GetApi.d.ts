/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [公告中心-系统公告_最新一条↗](https://yapi.nbttfc365.com/project/82/interface/api/15094) 的 **请求类型**
 *
 * @分类 [公告模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_838)
 * @请求头 `GET /v1/im-helpCenter/noticeLatest`
 * @更新时间 `2023-09-04 16:21:34`
 */
export interface YapiGetV1ImHelpCenterNoticeLatestApiRequest {}

/**
 * 接口 [公告中心-系统公告_最新一条↗](https://yapi.nbttfc365.com/project/82/interface/api/15094) 的 **返回类型**
 *
 * @分类 [公告模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_838)
 * @请求头 `GET /v1/im-helpCenter/noticeLatest`
 * @更新时间 `2023-09-04 16:21:34`
 */
export interface YapiGetV1ImHelpCenterNoticeLatestApiResponse {
  /**
   * 公告ID
   */
  id: string
  /**
   * 标题
   */
  name: string
  /**
   * 发布时间
   */
  pushTimeStramp: number
  /**
   * 父ID
   */
  parentId: string
  /**
   * 内容
   */
  content: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [公告中心-系统公告_最新一条↗](https://yapi.nbttfc365.com/project/82/interface/api/15094)
// **/
// export const getV1ImHelpCenterNoticeLatestApiRequest: MarkcoinRequest<
//   YapiGetV1ImHelpCenterNoticeLatestApiRequest,
//   YapiGetV1ImHelpCenterNoticeLatestApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im-helpCenter/noticeLatest",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
