/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [助手-查询用户群发消息↗](https://yapi.nbttfc365.com/project/82/interface/api/11914) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imSendMassInfo/queryList`
 * @更新时间 `2023-10-17 17:59:04`
 */
export interface YapiGetV1ImChatImSendMassInfoQueryListApiRequest {}

/**
 * 接口 [助手-查询用户群发消息↗](https://yapi.nbttfc365.com/project/82/interface/api/11914) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imSendMassInfo/queryList`
 * @更新时间 `2023-10-17 17:59:04`
 */
export interface YapiGetV1ImChatImSendMassInfoQueryListApiResponse {
  id: number
  /**
   * 商户ID
   */
  businessId: number
  /**
   * 用户UID
   */
  uid: number
  /**
   * 配置名称
   */
  configName?: string
  /**
   * 发送时间
   */
  sendTime: number
  /**
   * 群人数
   */
  groupSize: number
  /**
   * 文字内容
   */
  contentChar?: string
  /**
   * 音频地址
   */
  audioUrl?: null
  /**
   * 视频地址
   */
  videoUrl?: null
  /**
   * 图片地址
   */
  pictureUrl?: null
  /**
   * 备注
   */
  remarks?: null
  /**
   * 创建时间
   */
  createdByTime?: number
  /**
   * 创建人
   */
  createdById?: number
  /**
   * 更新时间
   */
  updatedByTime?: number
  /**
   * 更新人
   */
  updatedById?: number
  /**
   * 是否删除，1，已删除，2，未删除
   */
  isDelete?: number
  /**
   * 版本号
   */
  version?: number
  /**
   * 内容类型：1:音频 2:视频3:文字4:图片
   */
  sendContentType: number
  /**
   * 数组，被发的用户集
   */
  quiltUids: string
  /**
   * 文件数据大小，单位为字节
   */
  size: string
  /**
   *  视频与音频时长，单位为秒。
   */
  mediaDuration: string
  /**
   * 缩略图的 URL 地址
   */
  originUrl: string
  /**
   * 图片宽度，单位为像素（px）
   */
  originWidth: string
  /**
   * 图片高度，单位为像素（px）
   */
  originHeight: string
  /**
   * 视频首帧URL 地址，
   */
  thumbnailUrl: string
  /**
   * 宽度，单位为像素（px）
   */
  thumbnaiWidth: string
  /**
   * 高度，单位为像素（px）
   */
  thumbnaiNumber: string
  /**
   * 文件名称，格式建议为 “xxx.文件扩展名”，长度上限为 150 字节
   */
  commFileName: string
  /**
   * 1是2否
   */
  isSendSucessText: string
  quiltUser: YapiGetV1ImChatImSendMassInfoQueryListQuiltUser[]
}
export interface YapiGetV1ImChatImSendMassInfoQueryListQuiltUser {
  /**
   * 用户ID
   */
  uid: number
  /**
   * 用户昵称
   */
  nickName: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [助手-查询用户群发消息↗](https://yapi.nbttfc365.com/project/82/interface/api/11914)
// **/
// export const getV1ImChatImSendMassInfoQueryListApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatImSendMassInfoQueryListApiRequest,
//   YapiGetV1ImChatImSendMassInfoQueryListApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/imSendMassInfo/queryList",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
