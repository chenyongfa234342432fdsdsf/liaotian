/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [用户常用设备-删除↗](https://yapi.nbttfc365.com/project/82/interface/api/12129) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imUserDevice/delete`
 * @更新时间 `2023-08-18 18:31:53`
 */
export interface YapiGetV1ImChatImUserDeviceDeleteApiRequest {
  /**
   * 设备编码
   */
  deviceNo: string
}

/**
 * 接口 [用户常用设备-删除↗](https://yapi.nbttfc365.com/project/82/interface/api/12129) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imUserDevice/delete`
 * @更新时间 `2023-08-18 18:31:53`
 */
export interface YapiGetV1ImChatImUserDeviceDeleteApiResponse {
  code: number
  message: string
  data: YapiGetV1ImChatImUserDeviceDeleteData
}
export interface YapiGetV1ImChatImUserDeviceDeleteData {
  /**
   * 设置是否成功
   */
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [用户常用设备-删除↗](https://yapi.nbttfc365.com/project/82/interface/api/12129)
// **/
// export const getV1ImChatImUserDeviceDeleteApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatImUserDeviceDeleteApiRequest,
//   YapiGetV1ImChatImUserDeviceDeleteApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/imUserDevice/delete",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
