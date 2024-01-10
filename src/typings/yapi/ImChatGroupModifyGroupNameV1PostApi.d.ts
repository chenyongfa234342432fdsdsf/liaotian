/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [修改群名称↗](https://yapi.nbttfc365.com/project/82/interface/api/12149) 的 **请求类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/modifyGroupName`
 * @更新时间 `2023-08-22 11:07:57`
 */
export interface YapiPostV1ImChatGroupModifyGroupNameApiRequest {
  /**
   * 群组ID
   */
  groupId: string
  /**
   * 群名称
   */
  groupName: string
}

/**
 * 接口 [修改群名称↗](https://yapi.nbttfc365.com/project/82/interface/api/12149) 的 **返回类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/modifyGroupName`
 * @更新时间 `2023-08-22 11:07:57`
 */
export interface YapiPostV1ImChatGroupModifyGroupNameApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiPostV1ImChatGroupModifyGroupNameData
}
export interface YapiPostV1ImChatGroupModifyGroupNameData {
  /**
   * true，成功，false，失败
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [修改群名称↗](https://yapi.nbttfc365.com/project/82/interface/api/12149)
// **/
// export const postV1ImChatGroupModifyGroupNameApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatGroupModifyGroupNameApiRequest,
//   YapiPostV1ImChatGroupModifyGroupNameApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/group/modifyGroupName",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
