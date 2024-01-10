/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [用户基本信息-查询↗](https://yapi.nbttfc365.com/project/82/interface/api/11539) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imUserInfo/queryUserInfo`
 * @更新时间 `2023-12-13 14:59:55`
 */
export interface YapiGetV1ImChatImUserInfoQueryUserInfoApiRequest {
  /**
   * 账户
   */
  account?: string
  /**
   * 手机号码
   */
  mobileNumber?: string
  /**
   * 昵称
   */
  nickName?: string
  /**
   * 姓名
   */
  userName?: string
  /**
   * 用户UID
   */
  uid?: string
}

/**
 * 接口 [用户基本信息-查询↗](https://yapi.nbttfc365.com/project/82/interface/api/11539) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imUserInfo/queryUserInfo`
 * @更新时间 `2023-12-13 14:59:55`
 */
export interface YapiGetV1ImChatImUserInfoQueryUserInfoApiResponse {
  code?: number
  message?: string
  data?: YapiGetV1ImChatImUserInfoQueryUserInfoListData[]
}
export interface YapiGetV1ImChatImUserInfoQueryUserInfoListData {
  /**
   * 主键ID
   */
  id: string
  /**
   * 用户名称
   */
  userName?: string
  /**
   * 头像地址
   */
  avatarPath?: string
  /**
   * 昵称
   */
  nickName?: string
  /**
   * 注册国籍字典表编码
   */
  regCountryCd?: string
  /**
   * 国籍字典表编码
   */
  kycCountryCd?: string
  /**
   * 手机区号
   */
  mobileCountryCd?: string
  /**
   * 手机号码
   */
  mobileNumber?: string
  /**
   * 用户状态
   */
  statusInd?: string
  /**
   * 性别
   */
  sex?: string
  /**
   * 出生日期
   */
  birthDate?: string
  /**
   * 用户等级
   */
  userGrade?: string
  /**
   * 职业
   */
  career?: string
  /**
   * 爱好
   */
  hobby?: string
  /**
   * 学历
   */
  education?: string
  /**
   * 口令
   */
  command?: string
  /**
   * 是否启用手机验证
   */
  isOpenPhoneVerify?: string
  /**
   * 支付密码
   */
  payPassword?: string
  /**
   * 创建时间
   */
  createdByTime?: string
  /**
   * 创建人
   */
  createdById?: string
  /**
   * 更新时间
   */
  updatedByTime?: string
  /**
   * 是否删除，1，已删除，2，未删除
   */
  isDelete?: string
  /**
   * 版本号
   */
  version?: string
  /**
   * 账户
   */
  account?: string
  /**
   * 商户ID
   */
  businessId: string
  /**
   * 用户UID
   */
  uid: string
  /**
   * 靓号ID
   */
  fancyUid?: number
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [用户基本信息-查询↗](https://yapi.nbttfc365.com/project/82/interface/api/11539)
// **/
// export const getV1ImChatImUserInfoQueryUserInfoApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatImUserInfoQueryUserInfoApiRequest,
//   YapiGetV1ImChatImUserInfoQueryUserInfoApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/imUserInfo/queryUserInfo",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
