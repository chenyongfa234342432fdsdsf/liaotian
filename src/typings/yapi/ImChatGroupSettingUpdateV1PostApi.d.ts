/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [群设置信息更新↗](https://yapi.nbttfc365.com/project/82/interface/api/11634) 的 **请求类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/settingUpdate`
 * @更新时间 `2023-08-22 11:11:26`
 */
export interface YapiPostV1ImChatGroupSettingUpdateApiRequest {
  /**
   * 群组ID
   */
  groupId: string
  /**
   * 群备注
   */
  groupRemark?: string
  /**
   * 消息免打扰，1，关闭，2，打开
   */
  messageDisturb?: number
  /**
   * 是否置顶，1，不置顶，2，置顶
   */
  isTop?: number
  /**
   * 我在群里面的昵称
   */
  myNickName?: string
  /**
   * 显示群成员昵称，1，不显示，2，显示
   */
  showMemberNickName?: string
}

/**
 * 接口 [群设置信息更新↗](https://yapi.nbttfc365.com/project/82/interface/api/11634) 的 **返回类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/settingUpdate`
 * @更新时间 `2023-08-22 11:11:26`
 */
export interface YapiPostV1ImChatGroupSettingUpdateApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiPostV1ImChatGroupSettingUpdateData
}
export interface YapiPostV1ImChatGroupSettingUpdateData {
  /**
   * true，成功，false，失败
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [群设置信息更新↗](https://yapi.nbttfc365.com/project/82/interface/api/11634)
// **/
// export const postV1ImChatGroupSettingUpdateApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatGroupSettingUpdateApiRequest,
//   YapiPostV1ImChatGroupSettingUpdateApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/group/settingUpdate",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
