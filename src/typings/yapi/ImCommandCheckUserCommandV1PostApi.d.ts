/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [验证口令↗](https://yapi.nbttfc365.com/project/82/interface/api/11614) 的 **请求类型**
 *
 * @分类 [口令&发现模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_816)
 * @请求头 `POST /v1/im/command/checkUserCommand`
 * @更新时间 `2023-08-08 17:09:21`
 */
export interface YapiPostV1ImCommandCheckUserCommandApiRequest {
  /**
   * 口令
   */
  command: string
}

/**
 * 接口 [验证口令↗](https://yapi.nbttfc365.com/project/82/interface/api/11614) 的 **返回类型**
 *
 * @分类 [口令&发现模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_816)
 * @请求头 `POST /v1/im/command/checkUserCommand`
 * @更新时间 `2023-08-08 17:09:21`
 */
export interface YapiPostV1ImCommandCheckUserCommandApiResponse {
  /**
   * 200成功，其他均为失败
   */
  code: number
  message?: string
  data?: YapiPostV1ImCommandCheckUserCommandData
}
export interface YapiPostV1ImCommandCheckUserCommandData {
  /**
   * 成功后返回跳转地址
   */
  linkUrl?: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [验证口令↗](https://yapi.nbttfc365.com/project/82/interface/api/11614)
// **/
// export const postV1ImCommandCheckUserCommandApiRequest: MarkcoinRequest<
//   YapiPostV1ImCommandCheckUserCommandApiRequest,
//   YapiPostV1ImCommandCheckUserCommandApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/command/checkUserCommand",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
