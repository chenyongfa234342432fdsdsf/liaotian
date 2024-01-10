/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [帮助中心正文详情↗](https://yapi.nbttfc365.com/project/82/interface/api/12194) 的 **请求类型**
 *
 * @分类 [公告模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_838)
 * @请求头 `GET /v1/im-helpCenter/help/content`
 * @更新时间 `2023-09-04 16:21:30`
 */
export interface YapiGetV1ImHelpCenterHelpContentApiRequest {
  contentId: string
}

/**
 * 接口 [帮助中心正文详情↗](https://yapi.nbttfc365.com/project/82/interface/api/12194) 的 **返回类型**
 *
 * @分类 [公告模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_838)
 * @请求头 `GET /v1/im-helpCenter/help/content`
 * @更新时间 `2023-09-04 16:21:30`
 */
export interface YapiGetV1ImHelpCenterHelpContentApiResponse {
  data?: YapiGetV1ImHelpCenterHelpContentData
  message?: string
  code?: number
}
export interface YapiGetV1ImHelpCenterHelpContentData {
  /**
   * 目录的列表
   */
  catelogList?: YapiGetV1ImHelpCenterHelpContentListCatelogListData[]
  helpCenterText?: YapiGetV1ImHelpCenterHelpContentHelpCenterTextData
  articleList?: string[]
}
export interface YapiGetV1ImHelpCenterHelpContentListCatelogListData {
  catalogVOList: YapiGetV1ImHelpCenterHelpContentListCatalogVOListCatelogListData[]
  id: number
  name: string
}
export interface YapiGetV1ImHelpCenterHelpContentListCatalogVOListCatelogListData {
  catalogVOList: string[]
  name: string
  id: number
}
/**
 * 正文
 */
export interface YapiGetV1ImHelpCenterHelpContentHelpCenterTextData {
  /**
   * 正文
   */
  content?: string
  /**
   * 创建的时间
   */
  createdByTime?: string
  /**
   * 上一级的id
   */
  parentId?: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [帮助中心正文详情↗](https://yapi.nbttfc365.com/project/82/interface/api/12194)
// **/
// export const getV1ImHelpCenterHelpContentApiRequest: MarkcoinRequest<
//   YapiGetV1ImHelpCenterHelpContentApiRequest,
//   YapiGetV1ImHelpCenterHelpContentApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im-helpCenter/help/content",
//     method: "GET",
//     params
//   })
// }

/**
 * 接口 [帮助中心文章详情↗](https://yapi.nbttfc365.com/project/82/interface/api/20185) 的 **请求类型**
 *
 * @分类 [公告模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_838)
 * @请求头 `GET /v1/im/helpCenter/help/content`
 * @更新时间 `2023-11-30 19:07:08`
 */
export interface YapiGetV1ImHelpCenterHelpContentApiRequest {}

/**
 * 接口 [帮助中心文章详情↗](https://yapi.nbttfc365.com/project/82/interface/api/20185) 的 **返回类型**
 *
 * @分类 [公告模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_838)
 * @请求头 `GET /v1/im/helpCenter/help/content`
 * @更新时间 `2023-11-30 19:07:08`
 */
export interface YapiGetV1ImHelpCenterHelpContentApiResponse {}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [帮助中心文章详情↗](https://yapi.nbttfc365.com/project/82/interface/api/20185)
// **/
// export const getV1ImHelpCenterHelpContentApiRequest: MarkcoinRequest<
//   YapiGetV1ImHelpCenterHelpContentApiRequest,
//   YapiGetV1ImHelpCenterHelpContentApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/helpCenter/help/content",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
