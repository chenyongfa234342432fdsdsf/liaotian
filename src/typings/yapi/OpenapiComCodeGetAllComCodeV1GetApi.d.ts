/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [获取最新全量数据字典文件↗](https://yapi.nbttfc365.com/project/82/interface/api/12459) 的 **请求类型**
 *
 * @分类 [系统管理↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_840)
 * @请求头 `GET /v1/openapi/com/code/getAllComCode`
 * @更新时间 `2023-11-30 22:10:20`
 */
export interface YapiGetV1OpenapiComCodeGetAllComCodeApiRequest {
  /**
   * 语言类型，具体值可去console数据字典查询：语言类型lan_type_cd
   */
  lanType: string
}

/**
 * 接口 [获取最新全量数据字典文件↗](https://yapi.nbttfc365.com/project/82/interface/api/12459) 的 **返回类型**
 *
 * @分类 [系统管理↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_840)
 * @请求头 `GET /v1/openapi/com/code/getAllComCode`
 * @更新时间 `2023-11-30 22:10:20`
 */
export interface YapiGetV1OpenapiComCodeGetAllComCodeApiResponse {
  /**
   * 返回值
   */
  data?: YapiGetV1OpenapiComCodeGetAllComCodeListData[]
  /**
   * 返回CODE 200为成功
   */
  code?: number
  /**
   * 返回message
   */
  message?: string
}
export interface YapiGetV1OpenapiComCodeGetAllComCodeListData {
  /**
   * 文件版本，根据此字段判断是否需要更新本地文件
   */
  version: number
  /**
   * 文件URL
   */
  url: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [获取最新全量数据字典文件↗](https://yapi.nbttfc365.com/project/82/interface/api/12459)
// **/
// export const getV1OpenapiComCodeGetAllComCodeApiRequest: MarkcoinRequest<
//   YapiGetV1OpenapiComCodeGetAllComCodeApiRequest,
//   YapiGetV1OpenapiComCodeGetAllComCodeApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/openapi/com/code/getAllComCode",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
