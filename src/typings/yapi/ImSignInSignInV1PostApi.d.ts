/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [每日签到↗](https://yapi.nbttfc365.com/project/82/interface/api/11509) 的 **请求类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `POST /v1/im/signIn/signIn`
 * @更新时间 `2023-08-28 17:59:12`
 */
export interface YapiPostV1ImSignInSignInApiRequest {}

/**
 * 接口 [每日签到↗](https://yapi.nbttfc365.com/project/82/interface/api/11509) 的 **返回类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `POST /v1/im/signIn/signIn`
 * @更新时间 `2023-08-28 17:59:12`
 */
export interface YapiPostV1ImSignInSignInApiResponse {
  /**
   * 200成功，其他均为失败
   */
  code: number
  message?: string
  data?: YapiPostV1ImSignInSignInData
}
export interface YapiPostV1ImSignInSignInData {
  /**
   * 业务处理状态：true-成功，false-失败
   */
  success?: boolean
  /**
   * 签到得到的积分
   */
  signAward?: number
  /**
   * 连续签到天数
   */
  signDays?: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [每日签到↗](https://yapi.nbttfc365.com/project/82/interface/api/11509)
// **/
// export const postV1ImSignInSignInApiRequest: MarkcoinRequest<
//   YapiPostV1ImSignInSignInApiRequest,
//   YapiPostV1ImSignInSignInApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/signIn/signIn",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
