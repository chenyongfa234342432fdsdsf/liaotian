/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [查询所有群组↗](https://yapi.nbttfc365.com/project/82/interface/api/12199) 的 **请求类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `GET /v1/im/chat/group/all`
 * @更新时间 `2023-11-03 16:58:44`
 */
export interface YapiGetV1ImChatGroupAllApiRequest {}

/**
 * 接口 [查询所有群组↗](https://yapi.nbttfc365.com/project/82/interface/api/12199) 的 **返回类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `GET /v1/im/chat/group/all`
 * @更新时间 `2023-11-03 16:58:44`
 */
export interface YapiGetV1ImChatGroupAllApiResponse {
  /**
   * 200成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  /**
   * 群组数据
   */
  data: YapiGetV1ImChatGroupAllListData[]
}
export interface YapiGetV1ImChatGroupAllListData {
  /**
   * 群组名称
   */
  groupName: string
  /**
   * 群头像
   */
  headImage: string
  /**
   * 群人数
   */
  number: number
  /**
   * 群组ID
   */
  groupId: string
  /**
   * 群公告
   */
  announcement: string
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
   * 显示群成员昵称，1，不显示，2，显示
   */
  showMemberNickName: number
  /**
   * 我在群里面的昵称
   */
  myNickName: string
  /**
   * 创建人uid
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
   * 群组状态 ，1，被封，2，正常
   */
  groupStatus: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [查询所有群组↗](https://yapi.nbttfc365.com/project/82/interface/api/12199)
// **/
// export const getV1ImChatGroupAllApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatGroupAllApiRequest,
//   YapiGetV1ImChatGroupAllApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/group/all",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
