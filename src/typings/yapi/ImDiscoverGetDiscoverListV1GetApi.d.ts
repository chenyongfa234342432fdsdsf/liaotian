/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [获取发现栏目列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11594) 的 **请求类型**
 *
 * @分类 [口令&发现模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_816)
 * @请求头 `GET /v1/im/discover/getDiscoverList`
 * @更新时间 `2023-08-08 17:09:17`
 */
export interface YapiGetV1ImDiscoverGetDiscoverListApiRequest {
  /**
   * 语言类型
   */
  lanTypeCd: string
}

/**
 * 接口 [获取发现栏目列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11594) 的 **返回类型**
 *
 * @分类 [口令&发现模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_816)
 * @请求头 `GET /v1/im/discover/getDiscoverList`
 * @更新时间 `2023-08-08 17:09:17`
 */
export interface YapiGetV1ImDiscoverGetDiscoverListApiResponse {
  /**
   * 200成功，其他均为失败
   */
  code: number
  message?: string
  data?: YapiGetV1ImDiscoverGetDiscoverListData[]
}
export interface YapiGetV1ImDiscoverGetDiscoverListData {
  /**
   * 栏目名称
   */
  columnName?: string
  /**
   * 栏目图标  例：热门后面加了一个火的标识
   */
  columnIcon?: string
  /**
   * 语言类型
   */
  lanTypeCd?: string
  /**
   * 栏目发现功能列表
   */
  list?: YapiGetV1ImDiscoverGetDiscoverListListData[]
}
export interface YapiGetV1ImDiscoverGetDiscoverListListData {
  /**
   * 功能名称
   */
  discoverTitle?: string
  /**
   * 功能图标
   */
  discoverIcon?: string
  /**
   * 语言类型
   */
  lanTypeCd?: string
  /**
   * 跳转链接
   */
  linkUrl?: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [获取发现栏目列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11594)
// **/
// export const getV1ImDiscoverGetDiscoverListApiRequest: MarkcoinRequest<
//   YapiGetV1ImDiscoverGetDiscoverListApiRequest,
//   YapiGetV1ImDiscoverGetDiscoverListApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/discover/getDiscoverList",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
