/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [根据code查询数据字典子项单个详情↗](https://yapi.nbttfc365.com/project/82/interface/api/12454) 的 **请求类型**
 *
 * @分类 [系统管理↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_840)
 * @请求头 `GET /v1/im/openapi/com/code/getCodeDetail`
 * @更新时间 `2023-11-30 22:09:58`
 */
export interface YapiGetV1ImOpenapiComCodeGetCodeDetailApiRequest {
  /**
   * 语言类型，具体值可去console数据字典查询：语言类型lan_type_cd
   */
  lanType: string
  /**
   * 所属字典code
   */
  codeVal: string
  /**
   * 	查询字典值
   */
  belongCode: string
}

/**
 * 接口 [根据code查询数据字典子项单个详情↗](https://yapi.nbttfc365.com/project/82/interface/api/12454) 的 **返回类型**
 *
 * @分类 [系统管理↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_840)
 * @请求头 `GET /v1/im/openapi/com/code/getCodeDetail`
 * @更新时间 `2023-11-30 22:09:58`
 */
export interface YapiGetV1ImOpenapiComCodeGetCodeDetailApiResponse {
  /**
   * 返回值
   */
  data?: YapiGetV1ImOpenapiComCodeGetCodeDetailListData[]
  /**
   * 返回CODE 200为成功
   */
  code?: number
  /**
   * 返回message
   */
  message?: string
}
export interface YapiGetV1ImOpenapiComCodeGetCodeDetailListData {
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
// * [根据code查询数据字典子项单个详情↗](https://yapi.nbttfc365.com/project/82/interface/api/12454)
// **/
// export const getV1ImOpenapiComCodeGetCodeDetailApiRequest: MarkcoinRequest<
//   YapiGetV1ImOpenapiComCodeGetCodeDetailApiRequest,
//   YapiGetV1ImOpenapiComCodeGetCodeDetailApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/openapi/com/code/getCodeDetail",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
