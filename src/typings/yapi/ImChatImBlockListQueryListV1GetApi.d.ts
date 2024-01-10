/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [黑名单-列表信息↗](https://yapi.nbttfc365.com/project/82/interface/api/11849) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imBlockList/queryList`
 * @更新时间 `2023-08-21 14:57:15`
 */
export interface YapiGetV1ImChatImBlockListQueryListApiRequest {}

/**
 * 接口 [黑名单-列表信息↗](https://yapi.nbttfc365.com/project/82/interface/api/11849) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imBlockList/queryList`
 * @更新时间 `2023-08-21 14:57:15`
 */
export interface YapiGetV1ImChatImBlockListQueryListApiResponse {
  /**
   * 主键ID
   */
  id?: number
  /**
   * 用户ID
   */
  uid?: number
  /**
   * 被拉黑的用户ID
   */
  quiltUid?: number
  /**
   * 拉黑时间
   */
  blockDate?: string
  /**
   * 创建时间
   */
  createdByTime?: string
  /**
   * 创建人
   */
  createdById?: number
  /**
   * 更新时间
   */
  updatedByTime?: string
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
   * 商户ID
   */
  businessId?: number
  /**
   * 用户名称
   */
  nickName: string
  /**
   * 头像路径
   */
  avatarPath: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [黑名单-列表信息↗](https://yapi.nbttfc365.com/project/82/interface/api/11849)
// **/
// export const getV1ImChatImBlockListQueryListApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatImBlockListQueryListApiRequest,
//   YapiGetV1ImChatImBlockListQueryListApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/imBlockList/queryList",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
