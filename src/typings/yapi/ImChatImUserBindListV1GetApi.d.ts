/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [用户绑定账户列表↗](https://yapi.nbttfc365.com/project/82/interface/api/15194) 的 **请求类型**
 *
 * @分类 [三方平台绑定↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_976)
 * @请求头 `GET /v1/im/chat/imUserBind/list`
 * @更新时间 `2023-12-19 18:55:19`
 */
export interface YapiGetV1ImChatImUserBindListApiRequest {}

/**
 * 接口 [用户绑定账户列表↗](https://yapi.nbttfc365.com/project/82/interface/api/15194) 的 **返回类型**
 *
 * @分类 [三方平台绑定↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_976)
 * @请求头 `GET /v1/im/chat/imUserBind/list`
 * @更新时间 `2023-12-19 18:55:19`
 */
export interface YapiGetV1ImChatImUserBindListApiResponse {
  /**
   * 200成功，其他失败
   */
  code: number
  /**
   * 返回信息
   */
  messsage: string
  /**
   * 返回数据
   */
  data: YapiGetV1ImChatImUserBindListData[]
}
export interface YapiGetV1ImChatImUserBindListData {
  /**
   * bindId
   */
  id: string
  /**
   * 三方账号UID
   */
  thirdUid: number
  /**
   * 三方账号昵称
   */
  thirdNickName: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [用户绑定账户列表↗](https://yapi.nbttfc365.com/project/82/interface/api/15194)
// **/
// export const getV1ImChatImUserBindListApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatImUserBindListApiRequest,
//   YapiGetV1ImChatImUserBindListApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/imUserBind/list",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
