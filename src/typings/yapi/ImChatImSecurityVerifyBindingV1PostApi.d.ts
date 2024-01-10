/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [绑定生物验证↗](https://yapi.nbttfc365.com/project/82/interface/api/11554) 的 **请求类型**
 *
 * @分类 [生物验证↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_830)
 * @请求头 `POST /v1/im/chat/imSecurityVerify/binding`
 * @更新时间 `2023-08-02 20:54:53`
 */
export interface YapiPostV1ImChatImSecurityVerifyBindingApiRequest {
  /**
   * 设备MEID
   */
  deviceNo: string
  /**
   * 设备名称
   */
  deviceName: string
  /**
   * 登录设备类型  1 ios,2 android
   */
  deviceTypeInd: number
  /**
   * 设备安装app版本
   */
  appVersion?: string
  /**
   * 生物认证状态[1] true，[2] false
   */
  isBiometricVerify: number
  /**
   * 生物认证类型[1] faceid，[2] 指纹,[3] 手势
   */
  biometricVerifyType: number
  /**
   * 验证秘钥
   */
  verifyKey?: string
}

/**
 * 接口 [绑定生物验证↗](https://yapi.nbttfc365.com/project/82/interface/api/11554) 的 **返回类型**
 *
 * @分类 [生物验证↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_830)
 * @请求头 `POST /v1/im/chat/imSecurityVerify/binding`
 * @更新时间 `2023-08-02 20:54:53`
 */
export interface YapiPostV1ImChatImSecurityVerifyBindingApiResponse {
  code: number
  message: string
  data: YapiPostV1ImChatImSecurityVerifyBindingData
}
export interface YapiPostV1ImChatImSecurityVerifyBindingData {
  success: boolean
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [绑定生物验证↗](https://yapi.nbttfc365.com/project/82/interface/api/11554)
// **/
// export const postV1ImChatImSecurityVerifyBindingApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatImSecurityVerifyBindingApiRequest,
//   YapiPostV1ImChatImSecurityVerifyBindingApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/imSecurityVerify/binding",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
