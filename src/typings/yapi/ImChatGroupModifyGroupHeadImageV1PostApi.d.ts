/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [修改群组头像↗](https://yapi.nbttfc365.com/project/82/interface/api/18874) 的 **请求类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/modifyGroupHeadImage`
 * @更新时间 `2023-10-09 17:10:08`
 */
export interface YapiPostV1ImChatGroupModifyGroupHeadImageApiRequest {
  /**
   * 群组ID
   */
  groupId: string
  /**
   * 群头像
   */
  headImage: string
}

/**
 * 接口 [修改群组头像↗](https://yapi.nbttfc365.com/project/82/interface/api/18874) 的 **返回类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/modifyGroupHeadImage`
 * @更新时间 `2023-10-09 17:10:08`
 */
export interface YapiPostV1ImChatGroupModifyGroupHeadImageApiResponse {
  /**
   * 200，成功，其它失败
   */
  code: number
  /**
   * 描述消息
   */
  message: string
  data: YapiPostV1ImChatGroupModifyGroupHeadImageData
}
export interface YapiPostV1ImChatGroupModifyGroupHeadImageData {
  /**
   * true，成功，false，失败
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [修改群组头像↗](https://yapi.nbttfc365.com/project/82/interface/api/18874)
// **/
// export const postV1ImChatGroupModifyGroupHeadImageApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatGroupModifyGroupHeadImageApiRequest,
//   YapiPostV1ImChatGroupModifyGroupHeadImageApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/group/modifyGroupHeadImage",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
