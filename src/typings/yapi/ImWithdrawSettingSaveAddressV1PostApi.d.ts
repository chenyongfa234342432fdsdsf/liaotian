/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [保存用户地址信息↗](https://yapi.nbttfc365.com/project/82/interface/api/11649) 的 **请求类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `POST /v1/im/withdrawSetting/saveAddress`
 * @更新时间 `2023-08-28 10:15:53`
 */
export interface YapiPostV1ImWithdrawSettingSaveAddressApiRequest {
  /**
   * 地址
   */
  address: string
  /**
   * 更新时需要。对应getPlatformList接口里面的withdrawConfigId
   */
  id: number
  /**
   * 币种symbol
   */
  coinSymbol: string
  /**
   * 平台Id
   */
  platformId: number
  remark?: string
}

/**
 * 接口 [保存用户地址信息↗](https://yapi.nbttfc365.com/project/82/interface/api/11649) 的 **返回类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `POST /v1/im/withdrawSetting/saveAddress`
 * @更新时间 `2023-08-28 10:15:53`
 */
export interface YapiPostV1ImWithdrawSettingSaveAddressApiResponse {
  /**
   * 200成功，其他均为失败
   */
  code: number
  message?: string
  data?: YapiPostV1ImWithdrawSettingSaveAddressData
}
export interface YapiPostV1ImWithdrawSettingSaveAddressData {
  /**
   * 业务处理状态：true-成功，false-失败
   */
  success?: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [保存用户地址信息↗](https://yapi.nbttfc365.com/project/82/interface/api/11649)
// **/
// export const postV1ImWithdrawSettingSaveAddressApiRequest: MarkcoinRequest<
//   YapiPostV1ImWithdrawSettingSaveAddressApiRequest,
//   YapiPostV1ImWithdrawSettingSaveAddressApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/withdrawSetting/saveAddress",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
