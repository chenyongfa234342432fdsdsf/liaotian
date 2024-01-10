/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [查询自己是群主的群↗](https://yapi.nbttfc365.com/project/82/interface/api/18694) 的 **请求类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `GET /v1/im/chat/group/queryLordGroup`
 * @更新时间 `2023-09-28 10:30:28`
 */
export interface YapiGetV1ImChatGroupQueryLordGroupApiRequest {}

/**
 * 接口 [查询自己是群主的群↗](https://yapi.nbttfc365.com/project/82/interface/api/18694) 的 **返回类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `GET /v1/im/chat/group/queryLordGroup`
 * @更新时间 `2023-09-28 10:30:28`
 */
export interface YapiGetV1ImChatGroupQueryLordGroupApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述消息
   */
  message: string
  /**
   * 群组数据
   */
  data: YapiGetV1ImChatGroupQueryLordGroupListData[]
}
export interface YapiGetV1ImChatGroupQueryLordGroupListData {
  /**
   * 群组ID
   */
  groupId: string
  /**
   * 群组名称
   */
  groupName: string
  /**
   * 群头像
   */
  headImage: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [查询自己是群主的群↗](https://yapi.nbttfc365.com/project/82/interface/api/18694)
// **/
// export const getV1ImChatGroupQueryLordGroupApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatGroupQueryLordGroupApiRequest,
//   YapiGetV1ImChatGroupQueryLordGroupApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/group/queryLordGroup",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
