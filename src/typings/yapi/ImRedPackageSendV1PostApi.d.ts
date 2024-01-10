/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [发送红包接口↗](https://yapi.nbttfc365.com/project/82/interface/api/11454) 的 **请求类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `POST /v1/im/redPackage/send`
 * @更新时间 `2023-08-21 10:36:41`
 */
export interface YapiPostV1ImRedPackageSendApiRequest {
  /**
   * 红包类型：single-普通红包；group-normal -群普通红包；group-random  -群拼手气红包 数据字典：im_red_package_ref_type
   */
  refTypeCd: string
  /**
   * 接收人UID，类型为<single >时不能为空
   */
  receiveUid: number
  /**
   * 接收群组ID，类型为<group>时，不能为空
   */
  receiveGroupId: number
  /**
   * 红包金额
   */
  packageAmount: number
  /**
   * 红包数量，类型为<group>时，不能为空
   */
  packageCount?: number
  /**
   * remark
   */
  remark?: string
}

/**
 * 接口 [发送红包接口↗](https://yapi.nbttfc365.com/project/82/interface/api/11454) 的 **返回类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `POST /v1/im/redPackage/send`
 * @更新时间 `2023-08-21 10:36:41`
 */
export interface YapiPostV1ImRedPackageSendApiResponse {
  /**
   * 200成功，其他均为失败
   */
  code: number
  message?: string
  data?: YapiPostV1ImRedPackageSendData
}
export interface YapiPostV1ImRedPackageSendData {
  /**
   * true-成功，false-失败
   */
  success?: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [发送红包接口↗](https://yapi.nbttfc365.com/project/82/interface/api/11454)
// **/
// export const postV1ImRedPackageSendApiRequest: MarkcoinRequest<
//   YapiPostV1ImRedPackageSendApiRequest,
//   YapiPostV1ImRedPackageSendApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/redPackage/send",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
