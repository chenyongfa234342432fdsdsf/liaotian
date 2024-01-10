/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [助手-信息群发↗](https://yapi.nbttfc365.com/project/82/interface/api/11839) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imSendMassInfo/createCircle`
 * @更新时间 `2023-10-17 16:52:53`
 */
export interface YapiPostV1ImChatImSendMassInfoCreateCircleApiRequest {
  /**
   * 文字内容
   */
  contentChar?: string
  /**
   * 音频地址
   */
  audioUrl?: string
  /**
   * 视频地址
   */
  videoUrl?: string
  /**
   * 图片地址
   */
  pictureUrl?: string
  /**
   * 内容类型：1:音频 2:视频3:文字4:图片
   */
  sendContentType: number
  /**
   * 文件名称，格式建议为 “xxx.文件扩展名”，长度上限为 150 字节。
   */
  commFileName: string
  /**
   * 原图-图片的 URL 地址
   */
  originUrl?: string
  /**
   * 原图-图片宽度，单位为像素（px）
   */
  originWidth?: string
  /**
   * 原图-图片高度，单位为像素（px）
   */
  originHeight?: string
  /**
   * 仅当需要视频首帧时-缩略图的 URL 地址
   */
  thumbnailUrl?: string
  /**
   * 仅当需要视频首帧时-图片宽度，单位为像素（px）
   */
  thumbnaiWidth?: string
  /**
   * 仅当需要视频首帧时-图片高度，单位为像素（px）
   */
  thumbnaiNumber?: string
  /**
   * 文件数据大小，单位为字节
   */
  size?: string
  /**
   * 视频与音频时长，单位为秒
   */
  mediaDuration?: string
  /**
   * 被选用户集合
   */
  uIds: number[]
  /**
   * 配置名称
   */
  configName: string
  /**
   * 安卓URL本地存放地址
   */
  remarks?: string
}

/**
 * 接口 [助手-信息群发↗](https://yapi.nbttfc365.com/project/82/interface/api/11839) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/imSendMassInfo/createCircle`
 * @更新时间 `2023-10-17 16:52:53`
 */
export interface YapiPostV1ImChatImSendMassInfoCreateCircleApiResponse {
  /**
   * 成功用户ID
   */
  sucessUserIds: string[]
  /**
   * 失败的用户ID
   */
  failUserIds: string[]
  /**
   * 状态：0代表至少发送一位成功
   */
  sendSate: string
  /**
   * 备注信息
   */
  Message: string
  /**
   * 成功用户信息
   */
  successUser: YapiPostV1ImChatImSendMassInfoCreateCircleListSuccessUser[]
  /**
   * 失败用户信息
   */
  failUser: YapiPostV1ImChatImSendMassInfoCreateCircleListFailUser[]
}
export interface YapiPostV1ImChatImSendMassInfoCreateCircleListSuccessUser {
  /**
   * 用户ID
   */
  uid: number
  /**
   * 用户昵称
   */
  nickName: string
}
export interface YapiPostV1ImChatImSendMassInfoCreateCircleListFailUser {
  /**
   * 用户ID
   */
  uid: string
  /**
   * 用户昵称
   */
  nickName: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [助手-信息群发↗](https://yapi.nbttfc365.com/project/82/interface/api/11839)
// **/
// export const postV1ImChatImSendMassInfoCreateCircleApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatImSendMassInfoCreateCircleApiRequest,
//   YapiPostV1ImChatImSendMassInfoCreateCircleApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/imSendMassInfo/createCircle",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
