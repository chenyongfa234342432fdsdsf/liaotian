/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [（批量）批量获取指定字典列表↗](https://yapi.nbttfc365.com/project/82/interface/api/12464) 的 **请求类型**
 *
 * @分类 [系统管理↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_840)
 * @请求头 `GET /v1/openapi/com/code/batchGetCodeDetailList`
 * @更新时间 `2023-09-04 16:21:16`
 */
export interface YapiGetV1OpenapiComCodeBatchGetCodeDetailListApiRequest {
  /**
   * 语言类型，具体值可去console数据字典查询：语言类型lan_type_cd
   */
  lanType: string
  /**
   * 查询的字典Code，多个用,号隔开
   */
  codeVals: string
}

/**
 * 接口 [（批量）批量获取指定字典列表↗](https://yapi.nbttfc365.com/project/82/interface/api/12464) 的 **返回类型**
 *
 * @分类 [系统管理↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_840)
 * @请求头 `GET /v1/openapi/com/code/batchGetCodeDetailList`
 * @更新时间 `2023-09-04 16:21:16`
 */
export interface YapiGetV1OpenapiComCodeBatchGetCodeDetailListApiResponse {
  code?: number
  data?: YapiGetV1OpenapiComCodeBatchGetCodeDetailData
  message?: string
}
export interface YapiGetV1OpenapiComCodeBatchGetCodeDetailData {
  查询的codeVals?: YapiGetV1OpenapiComCodeBatchGetCodeDetailCodeValsData
}
export interface YapiGetV1OpenapiComCodeBatchGetCodeDetailCodeValsData {
  查询的lanTypes?: YapiGetV1OpenapiComCodeBatchGetCodeDetailListLanTypesCodeValsData[]
}
export interface YapiGetV1OpenapiComCodeBatchGetCodeDetailListLanTypesCodeValsData {
  /**
   * 代码名
   */
  codeKey: string
  /**
   * 代码值
   */
  codeVal: string
  /**
   * 备注
   */
  remark: string | null
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [（批量）批量获取指定字典列表↗](https://yapi.nbttfc365.com/project/82/interface/api/12464)
// **/
// export const getV1OpenapiComCodeBatchGetCodeDetailListApiRequest: MarkcoinRequest<
//   YapiGetV1OpenapiComCodeBatchGetCodeDetailListApiRequest,
//   YapiGetV1OpenapiComCodeBatchGetCodeDetailListApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/openapi/com/code/batchGetCodeDetailList",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
