/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [领取红包↗](https://yapi.nbttfc365.com/project/82/interface/api/11689) 的 **请求类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `POST /v1/im/redPackage/receive`
 * @更新时间 `2023-08-14 11:33:50`
 */
export interface YapiPostV1ImRedPackageReceiveApiRequest {
  /**
   * 红包ID
   */
  packageId: number
}

/**
 * 接口 [领取红包↗](https://yapi.nbttfc365.com/project/82/interface/api/11689) 的 **返回类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `POST /v1/im/redPackage/receive`
 * @更新时间 `2023-08-14 11:33:50`
 */
export interface YapiPostV1ImRedPackageReceiveApiResponse {
  /**
   * 200为成功，其他均为失败
   */
  code: number
  message?: string
  data?: YapiPostV1ImRedPackageReceiveData
}
export interface YapiPostV1ImRedPackageReceiveData {
  /**
   * 红包ID
   */
  packageId?: number
  /**
   * 领取金额
   */
  receiveAmount?: number
  /**
   * 是否领取到红包：1-领取成功，2-领取失败(群红包手速慢的情况)，3-重复领取
   */
  ifReceive?: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [领取红包↗](https://yapi.nbttfc365.com/project/82/interface/api/11689)
// **/
// export const postV1ImRedPackageReceiveApiRequest: MarkcoinRequest<
//   YapiPostV1ImRedPackageReceiveApiRequest,
//   YapiPostV1ImRedPackageReceiveApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/redPackage/receive",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
