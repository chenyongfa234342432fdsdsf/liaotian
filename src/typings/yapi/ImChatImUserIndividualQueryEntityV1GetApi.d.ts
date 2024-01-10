/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [用户个性化-查询↗](https://yapi.nbttfc365.com/project/82/interface/api/11569) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imUserIndividual/queryEntity`
 * @更新时间 `2023-09-06 14:54:58`
 */
export interface YapiGetV1ImChatImUserIndividualQueryEntityApiRequest {}

/**
 * 接口 [用户个性化-查询↗](https://yapi.nbttfc365.com/project/82/interface/api/11569) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imUserIndividual/queryEntity`
 * @更新时间 `2023-09-06 14:54:58`
 */
export interface YapiGetV1ImChatImUserIndividualQueryEntityApiResponse {
  id?: number
  /**
   * 商户ID
   */
  businessId?: number
  /**
   * 语言设置 1、中文繁体 2、English
   */
  languageSet?: string
  /**
   * 主题设置 1、白天模式 2、黑夜模式 3、跟随模式
   */
  themeSet?: number
  /**
   * 新消息通知 (是否)
   */
  messageSet?: number
  /**
   * 新声音通知(是否)
   */
  newSoundSet?: number
  /**
   * 声音开关(是否)
   */
  soundSwitch?: number
  /**
   * 是否开启签到提醒；1是，2否
   */
  isSignRemind?: number
  /**
   * 用户UID
   */
  uid?: number
  /**
   * 运维模式：1、常规模式  2、约束模式
   */
  runmode?: number
  /**
   * 来信铃声
   */
  ringtone?: null
  /**
   * 创建时间
   */
  createdByTime?: number
  /**
   * 创建人
   */
  createdById?: null
  /**
   * 更新时间
   */
  updatedByTime?: null
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
  /**
   * 站内信模块
   */
  noticeModules?: null
  /**
   * 手机是否隐藏1是2否
   */
  mobileHideSet: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [用户个性化-查询↗](https://yapi.nbttfc365.com/project/82/interface/api/11569)
// **/
// export const getV1ImChatImUserIndividualQueryEntityApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatImUserIndividualQueryEntityApiRequest,
//   YapiGetV1ImChatImUserIndividualQueryEntityApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/imUserIndividual/queryEntity",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
