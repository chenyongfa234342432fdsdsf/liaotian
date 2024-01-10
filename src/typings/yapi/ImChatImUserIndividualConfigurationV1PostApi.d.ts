/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [用户个性化-设置↗](https://yapi.nbttfc365.com/project/82/interface/api/11544) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imUserIndividual/configuration`
 * @更新时间 `2023-09-06 11:25:03`
 */
export interface YapiPostV1ImChatImUserIndividualConfigurationApiRequest {
  /**
   * 1、中文繁体 2、English
   */
  languageSet?: string
  /**
   * 1、白天模式 2、黑夜模式 3、跟随模式
   */
  themeSet?: number
  /**
   * 新消息通知 (是否)，1是，2否
   */
  messageSet?: number
  /**
   * 新声音通知(是否)，1是，2否
   */
  newSoundSet?: number
  /**
   * 声音开关(是否)，1是，2否
   */
  soundSwitch?: number
  /**
   * 是否开启签到提醒；1是，2否
   */
  isSignRemind?: number
  /**
   * 是否隐藏个人手机号码
   */
  mobileHideSet?: number
}

/**
 * 接口 [用户个性化-设置↗](https://yapi.nbttfc365.com/project/82/interface/api/11544) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imUserIndividual/configuration`
 * @更新时间 `2023-09-06 11:25:03`
 */
export interface YapiPostV1ImChatImUserIndividualConfigurationApiResponse {
  code: number
  message: string
  data: YapiPostV1ImChatImUserIndividualConfigurationData
}
export interface YapiPostV1ImChatImUserIndividualConfigurationData {
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [用户个性化-设置↗](https://yapi.nbttfc365.com/project/82/interface/api/11544)
// **/
// export const postV1ImChatImUserIndividualConfigurationApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatImUserIndividualConfigurationApiRequest,
//   YapiPostV1ImChatImUserIndividualConfigurationApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/imUserIndividual/configuration",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
