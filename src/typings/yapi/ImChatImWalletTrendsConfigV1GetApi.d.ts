/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [IM动态配置列表↗](https://yapi.nbttfc365.com/project/82/interface/api/15144) 的 **请求类型**
 *
 * @分类 [系统管理↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_840)
 * @请求头 `GET /v1/im/chat/imWalletTrendsConfig`
 * @更新时间 `2023-09-10 15:41:52`
 */
export interface YapiGetV1ImChatImWalletTrendsConfigApiRequest {}

/**
 * 接口 [IM动态配置列表↗](https://yapi.nbttfc365.com/project/82/interface/api/15144) 的 **返回类型**
 *
 * @分类 [系统管理↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_840)
 * @请求头 `GET /v1/im/chat/imWalletTrendsConfig`
 * @更新时间 `2023-09-10 15:41:52`
 */
export interface YapiGetV1ImChatImWalletTrendsConfigApiResponse {
  code?: number
  data?: YapiGetV1ImChatImWalletTrendsConfigListData[]
  message?: string
}
export interface YapiGetV1ImChatImWalletTrendsConfigListData {
  /**
   * 配置项名称
   */
  configName?: string
  /**
   * 配置项类型
   */
  configType?: string
  /**
   * 配置值
   */
  configValue?: string
  /**
   * 启用状态 ，1启用2禁用
   */
  enabledInd?: number
  /**
   * 长度限制
   */
  lengthLimit?: number
  /**
   * 精度
   */
  accuracy?: number
  /**
   * 所属模块 （red：红包，wallet：钱包）
   */
  affiliationModule?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 字典值
   */
  codeVal?: string
  /**
   * 是否多语言，1：是，2：否
   */
  isLingo?: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [IM动态配置列表↗](https://yapi.nbttfc365.com/project/82/interface/api/15144)
// **/
// export const getV1ImChatImWalletTrendsConfigApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatImWalletTrendsConfigApiRequest,
//   YapiGetV1ImChatImWalletTrendsConfigApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/imWalletTrendsConfig",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
