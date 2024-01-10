/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [我的群组↗](https://yapi.nbttfc365.com/project/82/interface/api/11304) 的 **请求类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `GET /v1/im/chat/group/myGroup`
 * @更新时间 `2023-09-04 21:29:52`
 */
export interface YapiGetV1ImChatGroupMyGroupApiRequest {
  /**
   * 查询类型，1，已创建，2，已加入
   */
  queryType: string
}

/**
 * 接口 [我的群组↗](https://yapi.nbttfc365.com/project/82/interface/api/11304) 的 **返回类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `GET /v1/im/chat/group/myGroup`
 * @更新时间 `2023-09-04 21:29:52`
 */
export interface YapiGetV1ImChatGroupMyGroupApiResponse {
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
  data: YapiGetV1ImChatGroupMyGroupListData[]
}
export interface YapiGetV1ImChatGroupMyGroupListData {
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
// * [我的群组↗](https://yapi.nbttfc365.com/project/82/interface/api/11304)
// **/
// export const getV1ImChatGroupMyGroupApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatGroupMyGroupApiRequest,
//   YapiGetV1ImChatGroupMyGroupApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/group/myGroup",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
