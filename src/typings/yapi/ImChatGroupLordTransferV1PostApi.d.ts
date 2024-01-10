/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [群主转让↗](https://yapi.nbttfc365.com/project/82/interface/api/11419) 的 **请求类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/lordTransfer`
 * @更新时间 `2023-08-22 11:10:25`
 */
export interface YapiPostV1ImChatGroupLordTransferApiRequest {
  /**
   * 要转让的用户UID
   */
  uid: number
  /**
   * 群组ID
   */
  groupId: string
}

/**
 * 接口 [群主转让↗](https://yapi.nbttfc365.com/project/82/interface/api/11419) 的 **返回类型**
 *
 * @分类 [群组模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_812)
 * @请求头 `POST /v1/im/chat/group/lordTransfer`
 * @更新时间 `2023-08-22 11:10:25`
 */
export interface YapiPostV1ImChatGroupLordTransferApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiPostV1ImChatGroupLordTransferData
}
export interface YapiPostV1ImChatGroupLordTransferData {
  /**
   * true，成功，false，失败
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [群主转让↗](https://yapi.nbttfc365.com/project/82/interface/api/11419)
// **/
// export const postV1ImChatGroupLordTransferApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatGroupLordTransferApiRequest,
//   YapiPostV1ImChatGroupLordTransferApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/group/lordTransfer",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
