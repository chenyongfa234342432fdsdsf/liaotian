/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [查询群组信息↗](https://yapi.nbttfc365.com/project/82/interface/api/11394) 的 **请求类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `GET /v1/im/chat/group/info`
 * @更新时间 `2023-12-15 10:39:41`
 */
export interface YapiGetV1ImChatGroupInfoApiRequest {
  /**
   * 群组ID
   */
  groupId: string
}

/**
 * 接口 [查询群组信息↗](https://yapi.nbttfc365.com/project/82/interface/api/11394) 的 **返回类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `GET /v1/im/chat/group/info`
 * @更新时间 `2023-12-15 10:39:41`
 */
export interface YapiGetV1ImChatGroupInfoApiResponse {
  /**
   * 200,成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiGetV1ImChatGroupInfoData
}
export interface YapiGetV1ImChatGroupInfoData {
  settingData: YapiGetV1ImChatGroupInfoSettingData
  groupData: YapiGetV1ImChatGroupInfoGroupData
}
/**
 * 我的群设置信息
 */
export interface YapiGetV1ImChatGroupInfoSettingData {
  /**
   * 群备注
   */
  groupRemark: string
  /**
   * 消息免打扰，1，关闭，2，打开
   */
  messageDisturb: number
  /**
   * 是否置顶，1，不置顶，2，置顶
   */
  isTop: number
  /**
   * 我在群里面的昵称
   */
  myNickName: string
  /**
   * 显示群成员昵称，1，不显示，2，显示
   */
  showMemberNickName: number
}
/**
 * 群组信息
 */
export interface YapiGetV1ImChatGroupInfoGroupData {
  /**
   * 群名称
   */
  groupName: string
  /**
   * 二维码
   */
  qrCode: string
  /**
   * 群头像
   */
  headImage: string
  /**
   * 群公告
   */
  announcement: string
  /**
   * 群主用户ID
   */
  lord: number
  /**
   * 群成员数量
   */
  number: number
  /**
   * 创建群用户ID
   */
  createUid: number
  /**
   * 创建人名称
   */
  createUserName: string
  /**
   * 创建时间，时间戳格式
   */
  createTime: number
  /**
   *  群组状态 ，1，被封，2，正常
   */
  groupStatus: number
  /**
   * 是否开启隐藏成员 1，已开启，2 未开启
   */
  isHideUser: number
  /**
   * 是否禁言，1，已禁言，2，未禁言
   */
  isBan: number
  /**
   * 群禁言，1，已禁言，2，未禁言
   */
  groupBan: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [查询群组信息↗](https://yapi.nbttfc365.com/project/82/interface/api/11394)
// **/
// export const getV1ImChatGroupInfoApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatGroupInfoApiRequest,
//   YapiGetV1ImChatGroupInfoApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/group/info",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
