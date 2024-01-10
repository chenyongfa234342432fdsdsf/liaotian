/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [获取已输入的口令信息↗](https://yapi.nbttfc365.com/project/82/interface/api/11604) 的 **请求类型**
 *
 * @分类 [口令&发现模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_816)
 * @请求头 `GET /v1/im/command/getUserCommandInfo`
 * @更新时间 `2023-09-07 10:45:03`
 */
export interface YapiGetV1ImCommandGetUserCommandInfoApiRequest {}

/**
 * 接口 [获取已输入的口令信息↗](https://yapi.nbttfc365.com/project/82/interface/api/11604) 的 **返回类型**
 *
 * @分类 [口令&发现模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_816)
 * @请求头 `GET /v1/im/command/getUserCommandInfo`
 * @更新时间 `2023-09-07 10:45:03`
 */
export interface YapiGetV1ImCommandGetUserCommandInfoApiResponse {
  /**
   * 200成功，其他均为失败
   */
  code: number
  message?: string
  data?: YapiGetV1ImCommandGetUserCommandInfoData
}
export interface YapiGetV1ImCommandGetUserCommandInfoData {
  /**
   * 口令
   */
  command?: string
  /**
   * 跳转链接
   */
  linkUrl?: string
  /**
   * 口令名称
   */
  commandName?: string
  /**
   * 口令图标
   */
  commandIcon?: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [获取已输入的口令信息↗](https://yapi.nbttfc365.com/project/82/interface/api/11604)
// **/
// export const getV1ImCommandGetUserCommandInfoApiRequest: MarkcoinRequest<
//   YapiGetV1ImCommandGetUserCommandInfoApiRequest,
//   YapiGetV1ImCommandGetUserCommandInfoApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/command/getUserCommandInfo",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
