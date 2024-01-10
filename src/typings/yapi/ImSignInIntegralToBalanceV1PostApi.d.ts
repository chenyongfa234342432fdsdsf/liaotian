/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [签到积分转换为资金余额↗](https://yapi.nbttfc365.com/project/82/interface/api/11579) 的 **请求类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `POST /v1/im/signIn/integralToBalance`
 * @更新时间 `2023-08-08 13:56:24`
 */
export interface YapiPostV1ImSignInIntegralToBalanceApiRequest {
  /**
   * 需要兑换的积分数量
   */
  integralAmount: number
}

/**
 * 接口 [签到积分转换为资金余额↗](https://yapi.nbttfc365.com/project/82/interface/api/11579) 的 **返回类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `POST /v1/im/signIn/integralToBalance`
 * @更新时间 `2023-08-08 13:56:24`
 */
export interface YapiPostV1ImSignInIntegralToBalanceApiResponse {
  /**
   * 200成功，其他均为失败
   */
  code: number
  message?: string
  data?: YapiPostV1ImSignInIntegralToBalanceData
}
export interface YapiPostV1ImSignInIntegralToBalanceData {
  /**
   * 业务处理状态：true-成功；false-失败
   */
  success?: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [签到积分转换为资金余额↗](https://yapi.nbttfc365.com/project/82/interface/api/11579)
// **/
// export const postV1ImSignInIntegralToBalanceApiRequest: MarkcoinRequest<
//   YapiPostV1ImSignInIntegralToBalanceApiRequest,
//   YapiPostV1ImSignInIntegralToBalanceApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/signIn/integralToBalance",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
