/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [公告中心的跑马灯↗](https://yapi.nbttfc365.com/project/82/interface/api/12429) 的 **请求类型**
 *
 * @分类 [公告模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_838)
 * @请求头 `GET /v1/im-helpCenter/horseLamp`
 * @更新时间 `2023-09-04 16:21:31`
 */
export interface YapiGetV1ImHelpCenterHorseLampApiRequest {}

/**
 * 接口 [公告中心的跑马灯↗](https://yapi.nbttfc365.com/project/82/interface/api/12429) 的 **返回类型**
 *
 * @分类 [公告模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_838)
 * @请求头 `GET /v1/im-helpCenter/horseLamp`
 * @更新时间 `2023-09-04 16:21:31`
 */
export interface YapiGetV1ImHelpCenterHorseLampApiResponse {
  lampList?: YapiGetV1ImHelpCenterHorseLampListLampList[]
}
export interface YapiGetV1ImHelpCenterHorseLampListLampList {
  /**
   * 公告的id
   */
  id: string
  /**
   * 标题
   */
  name: string
  /**
   * 创建的时间
   */
  pushTimeStramp: string
  /**
   * 父类ID
   */
  parentId: string
  /**
   * 1为强制弹窗
   */
  forceViewModal: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [公告中心的跑马灯↗](https://yapi.nbttfc365.com/project/82/interface/api/12429)
// **/
// export const getV1ImHelpCenterHorseLampApiRequest: MarkcoinRequest<
//   YapiGetV1ImHelpCenterHorseLampApiRequest,
//   YapiGetV1ImHelpCenterHorseLampApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im-helpCenter/horseLamp",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
