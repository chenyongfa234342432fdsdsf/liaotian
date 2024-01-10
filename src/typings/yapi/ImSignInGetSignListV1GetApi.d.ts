/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [获取签到分页记录↗](https://yapi.nbttfc365.com/project/82/interface/api/11564) 的 **请求类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `GET /v1/im/signIn/getSignList`
 * @更新时间 `2023-08-08 13:56:21`
 */
export interface YapiGetV1ImSignInGetSignListApiRequest {
  /**
   * 分页页标
   */
  pageNum?: string
  /**
   * 分页大小
   */
  pageSize?: string
}

/**
 * 接口 [获取签到分页记录↗](https://yapi.nbttfc365.com/project/82/interface/api/11564) 的 **返回类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `GET /v1/im/signIn/getSignList`
 * @更新时间 `2023-08-08 13:56:21`
 */
export interface YapiGetV1ImSignInGetSignListApiResponse {
  /**
   * 200成功，其他均为失败
   */
  code: number
  message?: string
  data?: YapiGetV1ImSignInGetSignData
}
export interface YapiGetV1ImSignInGetSignData {
  /**
   * 分页页标
   */
  pageNum?: number
  /**
   * 分页大小
   */
  pageSize?: number
  /**
   * 数据总条数
   */
  total?: number
  /**
   * 数据集合
   */
  list?: YapiGetV1ImSignInGetSignListData[]
}
export interface YapiGetV1ImSignInGetSignListData {
  /**
   * 签到奖励
   */
  signAward?: number
  /**
   * 签到时间
   */
  signTime?: number
  /**
   * 签到说明 例：连续第4天签到
   */
  remark?: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [获取签到分页记录↗](https://yapi.nbttfc365.com/project/82/interface/api/11564)
// **/
// export const getV1ImSignInGetSignListApiRequest: MarkcoinRequest<
//   YapiGetV1ImSignInGetSignListApiRequest,
//   YapiGetV1ImSignInGetSignListApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/signIn/getSignList",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
