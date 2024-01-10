/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [获取APP版本接口↗](https://yapi.nbttfc365.com/project/82/interface/api/12169) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/common/app/version/getNewVersion`
 * @更新时间 `2023-12-19 16:42:22`
 */
export interface YapiGetV1ImChatCommonAppVersionGetNewVersionApiRequest {}

/**
 * 接口 [获取APP版本接口↗](https://yapi.nbttfc365.com/project/82/interface/api/12169) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/common/app/version/getNewVersion`
 * @更新时间 `2023-12-19 16:42:22`
 */
export interface YapiGetV1ImChatCommonAppVersionGetNewVersionApiResponse {
  id: string
  businessId: string
  createdByTime?: string
  updatedByTime?: string
  createdById?: string
  updateById?: string
  isDelete?: string
  /**
   * 语言类型 zh-CN
   */
  lanTypeCd: string
  /**
   * 类型  1、红点+弹窗、2、红点、3、强制升级（包含红点+弹窗）
   */
  type: number
  /**
   * 版本
   */
  appVersion: string
  /**
   * 程序比对使用的版本code
   */
  versionCode: number
  /**
   * 版本描述
   */
  remark?: string
  /**
   * 下载地址
   */
  downloadUrl: string
  /**
   * 客户端类型
   */
  clientType?: string
  /**
   * 芯片架构
   */
  chipCrchitecture: string
  /**
   * 签名
   */
  sign: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [获取APP版本接口↗](https://yapi.nbttfc365.com/project/82/interface/api/12169)
// **/
// export const getV1ImChatCommonAppVersionGetNewVersionApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatCommonAppVersionGetNewVersionApiRequest,
//   YapiGetV1ImChatCommonAppVersionGetNewVersionApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/common/app/version/getNewVersion",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
