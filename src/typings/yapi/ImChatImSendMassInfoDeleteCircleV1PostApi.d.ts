/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [助手-删除群发↗](https://yapi.nbttfc365.com/project/82/interface/api/11919) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imSendMassInfo/deleteCircle`
 * @更新时间 `2023-08-05 20:17:37`
 */
export interface YapiPostV1ImChatImSendMassInfoDeleteCircleApiRequest {
  /**
   * 主键ID
   */
  id: number
}

/**
 * 接口 [助手-删除群发↗](https://yapi.nbttfc365.com/project/82/interface/api/11919) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imSendMassInfo/deleteCircle`
 * @更新时间 `2023-08-05 20:17:37`
 */
export interface YapiPostV1ImChatImSendMassInfoDeleteCircleApiResponse {
  code?: number
  message?: string
  data?: YapiPostV1ImChatImSendMassInfoDeleteCircleData
}
export interface YapiPostV1ImChatImSendMassInfoDeleteCircleData {
  success?: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [助手-删除群发↗](https://yapi.nbttfc365.com/project/82/interface/api/11919)
// **/
// export const postV1ImChatImSendMassInfoDeleteCircleApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatImSendMassInfoDeleteCircleApiRequest,
//   YapiPostV1ImChatImSendMassInfoDeleteCircleApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/imSendMassInfo/deleteCircle",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
