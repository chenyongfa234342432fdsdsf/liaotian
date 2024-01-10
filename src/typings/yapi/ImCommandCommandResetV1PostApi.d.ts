/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [口令重置↗](https://yapi.nbttfc365.com/project/82/interface/api/19304) 的 **请求类型**
 *
 * @分类 [口令&发现模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_816)
 * @请求头 `POST /v1/im/command/commandReset`
 * @更新时间 `2023-11-03 16:45:11`
 */
export interface YapiPostV1ImCommandCommandResetApiRequest {
  /**
   * 口令，清空则为null
   */
  command?: string
}

/**
 * 接口 [口令重置↗](https://yapi.nbttfc365.com/project/82/interface/api/19304) 的 **返回类型**
 *
 * @分类 [口令&发现模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_816)
 * @请求头 `POST /v1/im/command/commandReset`
 * @更新时间 `2023-11-03 16:45:11`
 */
export interface YapiPostV1ImCommandCommandResetApiResponse {
  /**
   * 200成功，其他均为失败
   */
  code: number
  message?: string
  data?: YapiPostV1ImCommandCommandResetData
}
export interface YapiPostV1ImCommandCommandResetData {
  /**
   * 成功/失败
   */
  success?: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [口令重置↗](https://yapi.nbttfc365.com/project/82/interface/api/19304)
// **/
// export const postV1ImCommandCommandResetApiRequest: MarkcoinRequest<
//   YapiPostV1ImCommandCommandResetApiRequest,
//   YapiPostV1ImCommandCommandResetApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/command/commandReset",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
