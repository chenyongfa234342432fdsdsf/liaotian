/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [获取用户签到信息↗](https://yapi.nbttfc365.com/project/82/interface/api/11494) 的 **请求类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `GET /v1/im/signIn/getUserSignInfo`
 * @更新时间 `2023-08-28 18:27:49`
 */
export interface YapiGetV1ImSignInGetUserSignInfoApiRequest {
  /**
   * 开始时间时间戳(秒)
   */
  startTimestamp: string
  /**
   * 结束时间时间戳(秒)
   */
  endTimestamp: string
}

/**
 * 接口 [获取用户签到信息↗](https://yapi.nbttfc365.com/project/82/interface/api/11494) 的 **返回类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `GET /v1/im/signIn/getUserSignInfo`
 * @更新时间 `2023-08-28 18:27:49`
 */
export interface YapiGetV1ImSignInGetUserSignInfoApiResponse {
  /**
   * 200成功，其他均为失败
   */
  code: number
  message?: string
  data?: YapiGetV1ImSignInGetUserSignInfoData
}
export interface YapiGetV1ImSignInGetUserSignInfoData {
  /**
   * UID
   */
  uid?: number
  /**
   * 今日是否签到：true-是，false-否
   */
  todayIfSign?: boolean
  /**
   * 是否开启签到提醒：true-是，false-否
   */
  signRemind?: boolean
  /**
   * 签到积分余额
   */
  goldCount?: number
  /**
   * 签到积分兑换为账户余额比例
   */
  signIntegralToBalanceRate?: number
  /**
   * 签到积分兑换余额 最小兑换数量
   */
  signIntegralToBalanceMinAmount?: number
  /**
   * 签到列表
   */
  signInfoList?: YapiGetV1ImSignInGetUserSignInfoListSignInfoListData[]
}
export interface YapiGetV1ImSignInGetUserSignInfoListSignInfoListData {
  /**
   * 连续签到第几天
   */
  signCount?: number
  /**
   * 签到奖励
   */
  signAward?: number
  /**
   * 是否已签到：true-是，false-否
   */
  ifSign?: boolean
  /**
   * 当天的毫秒时间戳
   */
  signTimestamp?: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [获取用户签到信息↗](https://yapi.nbttfc365.com/project/82/interface/api/11494)
// **/
// export const getV1ImSignInGetUserSignInfoApiRequest: MarkcoinRequest<
//   YapiGetV1ImSignInGetUserSignInfoApiRequest,
//   YapiGetV1ImSignInGetUserSignInfoApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/signIn/getUserSignInfo",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
