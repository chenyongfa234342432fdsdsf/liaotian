/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [公告中心搜索结果页↗](https://yapi.nbttfc365.com/project/82/interface/api/12189) 的 **请求类型**
 *
 * @分类 [公告模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_838)
 * @请求头 `GET /v1/im-es/announcement/getByKeyWord`
 * @更新时间 `2023-09-04 16:21:27`
 */
export interface YapiGetV1ImEsAnnouncementGetByKeyWordApiRequest {
  key: string
  page: string
  pageSize: string
}

/**
 * 接口 [公告中心搜索结果页↗](https://yapi.nbttfc365.com/project/82/interface/api/12189) 的 **返回类型**
 *
 * @分类 [公告模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_838)
 * @请求头 `GET /v1/im-es/announcement/getByKeyWord`
 * @更新时间 `2023-09-04 16:21:27`
 */
export interface YapiGetV1ImEsAnnouncementGetByKeyWordApiResponse {}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [公告中心搜索结果页↗](https://yapi.nbttfc365.com/project/82/interface/api/12189)
// **/
// export const getV1ImEsAnnouncementGetByKeyWordApiRequest: MarkcoinRequest<
//   YapiGetV1ImEsAnnouncementGetByKeyWordApiRequest,
//   YapiGetV1ImEsAnnouncementGetByKeyWordApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im-es/announcement/getByKeyWord",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
