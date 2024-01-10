/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [解绑设备↗](https://yapi.nbttfc365.com/project/82/interface/api/11834) 的 **请求类型**
 *
 * @分类 [生物验证↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_830)
 * @请求头 `POST /v1/im/chat/imSecurityVerify/unbinding`
 * @更新时间 `2023-08-02 21:11:26`
 */
export interface YapiPostV1ImChatImSecurityVerifyUnbindingApiRequest {
  /**
   * 设备编号
   */
  deviceNo: string
}

/**
 * 接口 [解绑设备↗](https://yapi.nbttfc365.com/project/82/interface/api/11834) 的 **返回类型**
 *
 * @分类 [生物验证↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_830)
 * @请求头 `POST /v1/im/chat/imSecurityVerify/unbinding`
 * @更新时间 `2023-08-02 21:11:26`
 */
export interface YapiPostV1ImChatImSecurityVerifyUnbindingApiResponse {}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [解绑设备↗](https://yapi.nbttfc365.com/project/82/interface/api/11834)
// **/
// export const postV1ImChatImSecurityVerifyUnbindingApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatImSecurityVerifyUnbindingApiRequest,
//   YapiPostV1ImChatImSecurityVerifyUnbindingApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/imSecurityVerify/unbinding",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
