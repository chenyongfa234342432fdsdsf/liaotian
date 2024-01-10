/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [获取商户配置信息↗](https://yapi.nbttfc365.com/project/82/interface/api/18279) 的 **请求类型**
 *
 * @分类 [系统管理↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_840)
 * @请求头 `GET /v1/im/chat/imBusinessConfig/getEntityByBusinessId`
 * @更新时间 `2023-09-07 16:46:11`
 */
export interface YapiGetV1ImChatImBusinessConfigGetEntityByBusinessIdApiRequest {
  /**
   * 商户ID
   */
  businessId: string
}

/**
 * 接口 [获取商户配置信息↗](https://yapi.nbttfc365.com/project/82/interface/api/18279) 的 **返回类型**
 *
 * @分类 [系统管理↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_840)
 * @请求头 `GET /v1/im/chat/imBusinessConfig/getEntityByBusinessId`
 * @更新时间 `2023-09-07 16:46:11`
 */
export interface YapiGetV1ImChatImBusinessConfigGetEntityByBusinessIdApiResponse {
  id?: number
  /**
   * 商户ID
   */
  businessId?: number
  /**
   * 签到类型：连续-continuous，重置-reset 字典表：im_sign_type
   */
  signType?: string
  /**
   * 签到积分转余额比例
   */
  signToBalanceRate?: number
  /**
   * 签到积分兑换余额最小兑换数量
   */
  signToBalanceMinAmount?: number
  /**
   * 签到基础分
   */
  signDefaultIntegral?: number
  /**
   * 单个红包最小金额
   */
  redPackageMinAmount?: number
  /**
   * 到周期模式：week-周模式，month-月模式  字典表：im_sign_period_type
   */
  signPeriodType?: string
  /**
   * remark
   */
  remark?: null
  /**
   * 创建时间
   */
  createdByTime?: null
  /**
   * 创建人
   */
  createdById?: null
  /**
   * 更新时间
   */
  updateByTime?: number
  /**
   * 更新人
   */
  updatedById?: number
  /**
   * 是否删除，1，已删除，2，未删除
   */
  isDelete?: number
  /**
   * 版本号
   */
  version?: number
  balanceUnit?: string
  balanceSymbol?: string
  /**
   * 群名长度设置，默认10
   */
  groupNameLength?: number
  /**
   * 群组最大人数，默认100
   */
  groupMaxNumber?: number
  /**
   * 是否关闭语音服务 2：关闭，1：打开
   */
  isVoice?: null
  /**
   * 是否关闭视频服务 2：关闭，1：打开
   */
  isVideo?: number
  /**
   * 是否关闭直播功能 2：关闭，1：打开
   */
  isLive?: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [获取商户配置信息↗](https://yapi.nbttfc365.com/project/82/interface/api/18279)
// **/
// export const getV1ImChatImBusinessConfigGetEntityByBusinessIdApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatImBusinessConfigGetEntityByBusinessIdApiRequest,
//   YapiGetV1ImChatImBusinessConfigGetEntityByBusinessIdApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/imBusinessConfig/getEntityByBusinessId",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
