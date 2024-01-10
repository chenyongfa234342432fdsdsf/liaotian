/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [更新用户签到提醒↗](https://yapi.nbttfc365.com/project/82/interface/api/11504) 的 **请求类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `POST /v1/im/signIn/updateSignRemind`
 * @更新时间 `2023-08-08 13:56:13`
 */
export interface YapiPostV1ImSignInUpdateSignRemindApiRequest {
  /**
   * 开启提醒状态：0关闭，1开启
   */
  signRemind: number
}

/**
 * 接口 [更新用户签到提醒↗](https://yapi.nbttfc365.com/project/82/interface/api/11504) 的 **返回类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `POST /v1/im/signIn/updateSignRemind`
 * @更新时间 `2023-08-08 13:56:13`
 */
export interface YapiPostV1ImSignInUpdateSignRemindApiResponse {
  /**
   * 200成功，其他均为失败
   */
  code: number
  message?: string
  data?: YapiPostV1ImSignInUpdateSignRemindData
}
export interface YapiPostV1ImSignInUpdateSignRemindData {
  /**
   * 业务处理状态：true-成功，false-失败
   */
  success?: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [更新用户签到提醒↗](https://yapi.nbttfc365.com/project/82/interface/api/11504)
// **/
// export const postV1ImSignInUpdateSignRemindApiRequest: MarkcoinRequest<
//   YapiPostV1ImSignInUpdateSignRemindApiRequest,
//   YapiPostV1ImSignInUpdateSignRemindApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/signIn/updateSignRemind",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
