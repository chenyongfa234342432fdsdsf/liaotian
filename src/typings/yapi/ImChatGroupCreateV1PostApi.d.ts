/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [创建群组↗](https://yapi.nbttfc365.com/project/82/interface/api/11284) 的 **请求类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/create`
 * @更新时间 `2023-08-22 11:08:10`
 */
export interface YapiPostV1ImChatGroupCreateApiRequest {
  /**
   * 群组名称
   */
  groupName: string
  /**
   * 群头像
   */
  headImage?: string
  /**
   * 群成员
   */
  member?: number[]
}

/**
 * 接口 [创建群组↗](https://yapi.nbttfc365.com/project/82/interface/api/11284) 的 **返回类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/create`
 * @更新时间 `2023-08-22 11:08:10`
 */
export interface YapiPostV1ImChatGroupCreateApiResponse {
  /**
   * 200,成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiPostV1ImChatGroupCreateData
}
export interface YapiPostV1ImChatGroupCreateData {
  /**
   * 群组ID
   */
  groupId: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [创建群组↗](https://yapi.nbttfc365.com/project/82/interface/api/11284)
// **/
// export const postV1ImChatGroupCreateApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatGroupCreateApiRequest,
//   YapiPostV1ImChatGroupCreateApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/group/create",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
