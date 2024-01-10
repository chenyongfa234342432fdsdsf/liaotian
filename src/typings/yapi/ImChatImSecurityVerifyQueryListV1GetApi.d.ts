/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [安全验证设备-查询↗](https://yapi.nbttfc365.com/project/82/interface/api/11559) 的 **请求类型**
 *
 * @分类 [生物验证↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_830)
 * @请求头 `GET /v1/im/chat/imSecurityVerify/queryList`
 * @更新时间 `2023-08-02 21:11:11`
 */
export interface YapiGetV1ImChatImSecurityVerifyQueryListApiRequest {}

/**
 * 接口 [安全验证设备-查询↗](https://yapi.nbttfc365.com/project/82/interface/api/11559) 的 **返回类型**
 *
 * @分类 [生物验证↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_830)
 * @请求头 `GET /v1/im/chat/imSecurityVerify/queryList`
 * @更新时间 `2023-08-02 21:11:11`
 */
export interface YapiGetV1ImChatImSecurityVerifyQueryListApiResponse {
  /**
   * 主键
   */
  id?: number
  /**
   * 用户ID
   */
  uid?: number
  /**
   * 商户ID
   */
  businessId?: number
  /**
   * 设备MEID
   */
  deviceNo?: string
  /**
   * 设备名称
   */
  deviceName?: string
  /**
   * 登录设备类型  1 ios,2 android
   */
  deviceTypeInd?: number
  /**
   * 设备安装app版本
   */
  appVersion?: string
  /**
   * 最近登录属地
   */
  recentlyLoginAddress?: null
  /**
   * 最近登录IP
   */
  recentlyLoginIp?: string
  /**
   * 最近登录时间
   */
  recentlyLoginTime?: number
  /**
   * 生物认证状态[1] true，[2] false
   */
  isBiometricVerify?: number
  /**
   * 生物认证类型[1] faceid，[2] 指纹,[3] 手势
   */
  biometricVerifyType?: number
  /**
   * 验证秘钥
   */
  verifyKey?: null
  /**
   * 创建时间
   */
  createdByTime?: number
  /**
   * 创建人
   */
  createdById?: number
  /**
   * 更新时间
   */
  updatedByTime?: number
  /**
   * 更新人
   */
  updatedById?: null
  /**
   * 是否删除，1，已删除，2，未删除
   */
  isDelete?: number
  /**
   * 版本号
   */
  version?: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [安全验证设备-查询↗](https://yapi.nbttfc365.com/project/82/interface/api/11559)
// **/
// export const getV1ImChatImSecurityVerifyQueryListApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatImSecurityVerifyQueryListApiRequest,
//   YapiGetV1ImChatImSecurityVerifyQueryListApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/imSecurityVerify/queryList",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
