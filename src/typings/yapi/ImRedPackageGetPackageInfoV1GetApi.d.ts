/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [查看红包详情↗](https://yapi.nbttfc365.com/project/82/interface/api/11459) 的 **请求类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `GET /v1/im/redPackage/getPackageInfo`
 * @更新时间 `2023-08-30 15:48:49`
 */
export interface YapiGetV1ImRedPackageGetPackageInfoApiRequest {
  /**
   * 红包ID
   */
  packageId: string
}

/**
 * 接口 [查看红包详情↗](https://yapi.nbttfc365.com/project/82/interface/api/11459) 的 **返回类型**
 *
 * @分类 [资金&红包模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_814)
 * @请求头 `GET /v1/im/redPackage/getPackageInfo`
 * @更新时间 `2023-08-30 15:48:49`
 */
export interface YapiGetV1ImRedPackageGetPackageInfoApiResponse {
  /**
   * 200成功，其他均为失败
   */
  code: number
  message?: string
  data?: YapiGetV1ImRedPackageGetPackageInfoData
}
export interface YapiGetV1ImRedPackageGetPackageInfoData {
  /**
   * 红包类型：single-普通红包；group-normal -群普通红包；group-random  -群拼手气红包 数据字典：im_red_package_ref_type
   */
  refTypeCd?: string
  /**
   * 红包ID
   */
  packageId: string
  /**
   * 红包金额
   */
  packageAmount?: number
  /**
   * 本人是否已领取：true-是，false-否
   */
  selfIfReceive?: boolean
  /**
   * 发送人UID
   */
  uid?: number
  /**
   * 发送人昵称
   */
  nickName?: string
  /**
   * 头像地址
   */
  avatarPath?: string
  /**
   * 红包数量
   */
  packageCount?: number
  /**
   * 已领取红包数量
   */
  yetCount?: number
  /**
   * 剩余红包金额
   */
  residueAmount?: number
  /**
   * 红包过期时间
   */
  expireationTime?: number
  /**
   * 红包状态：已发出待领取-1，已领完-2，已过期-3 数据字典：im_red_package_status
   */
  statusInd?: number
  /**
   * 红包备注
   */
  remark?: string
  /**
   * 已退还金额
   */
  refundAmount?: number
  /**
   * 红包创建时间
   */
  createdByTime?: number
  /**
   * 红包领取完成时间
   */
  complateTime?: number
  /**
   * 领取记录
   */
  receiveList?: YapiGetV1ImRedPackageGetPackageInfoListReceiveListData[]
}
export interface YapiGetV1ImRedPackageGetPackageInfoListReceiveListData {
  /**
   * UID
   */
  uid?: number
  /**
   * 昵称
   */
  nickName?: string
  /**
   * 头像
   */
  avatarPath?: string
  /**
   * 是否是手气王：true-是，false-否
   */
  isLucky?: boolean
  /**
   * 红包ID
   */
  packageId?: number
  /**
   * 领取金额
   */
  receiveAmount?: number
  /**
   * 领取时间
   */
  createdByTime?: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [查看红包详情↗](https://yapi.nbttfc365.com/project/82/interface/api/11459)
// **/
// export const getV1ImRedPackageGetPackageInfoApiRequest: MarkcoinRequest<
//   YapiGetV1ImRedPackageGetPackageInfoApiRequest,
//   YapiGetV1ImRedPackageGetPackageInfoApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/redPackage/getPackageInfo",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
