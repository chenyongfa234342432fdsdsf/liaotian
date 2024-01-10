/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [投诉↗](https://yapi.nbttfc365.com/project/82/interface/api/11694) 的 **请求类型**
 *
 * @分类 [投诉模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_824)
 * @请求头 `POST /v1/im/chat/complaint/create`
 * @更新时间 `2023-09-06 17:18:49`
 */
export interface YapiPostV1ImChatComplaintCreateApiRequest {
  /**
   * 投诉类型，1，用户投诉，2，群组投诉
   */
  complaintType: number
  /**
   * 投诉原因
   */
  complaintReason: string
  /**
   * 投诉图片，多张图片以逗号分隔
   */
  complaintImage?: string
  /**
   * 被投诉人用户ID，complaintType=1必填
   */
  complaintUid?: number
  /**
   * 被投诉群组ID，complaintType=2必填
   */
  complaintGroupId?: string
}

/**
 * 接口 [投诉↗](https://yapi.nbttfc365.com/project/82/interface/api/11694) 的 **返回类型**
 *
 * @分类 [投诉模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_824)
 * @请求头 `POST /v1/im/chat/complaint/create`
 * @更新时间 `2023-09-06 17:18:49`
 */
export interface YapiPostV1ImChatComplaintCreateApiResponse {
  /**
   * 200，成功，其他失败
   */
  code: number
  /**
   * 描述信息
   */
  message: string
  data: YapiPostV1ImChatComplaintCreateData
}
export interface YapiPostV1ImChatComplaintCreateData {
  /**
   * true，成功，false,失败
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [投诉↗](https://yapi.nbttfc365.com/project/82/interface/api/11694)
// **/
// export const postV1ImChatComplaintCreateApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatComplaintCreateApiRequest,
//   YapiPostV1ImChatComplaintCreateApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/complaint/create",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
