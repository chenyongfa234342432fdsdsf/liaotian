/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [按根据ID获取用户↗](https://yapi.nbttfc365.com/project/82/interface/api/11704) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imUserInfo/getMyUserInfo`
 * @更新时间 `2023-08-18 10:12:05`
 */
export interface YapiGetV1ImChatImUserInfoGetMyUserInfoApiRequest {}

/**
 * 接口 [按根据ID获取用户↗](https://yapi.nbttfc365.com/project/82/interface/api/11704) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `GET /v1/im/chat/imUserInfo/getMyUserInfo`
 * @更新时间 `2023-08-18 10:12:05`
 */
export interface YapiGetV1ImChatImUserInfoGetMyUserInfoApiResponse {
  code?: number
  message?: string
  data?: YapiGetV1ImChatImUserInfoGetMyUserInfoData
}
export interface YapiGetV1ImChatImUserInfoGetMyUserInfoData {
  /**
   * 主键ID
   */
  id: string
  /**
   * 用户名称
   */
  userName: string
  /**
   * 用户UID
   */
  uid: string
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
  mobileCountryCd: string
  /**
   * 手机号码
   */
  mobileNumber: string
  /**
   * 账户
   */
  account: string
  /**
   * 密码更新时间
   */
  pwdUpdTime?: string
  /**
   * 用户状态
   */
  statusInd?: string
  /**
   * 密码加密盐
   */
  salt: string
  /**
   * 性别  1:男 2：女    数据字典 IM_user_sex
   */
  sex?: string
  /**
   * 出生日期
   */
  birthDate?: string
  /**
   * 用户等级 1：普通  2：会员  数据字典：IM_user_grade
   */
  userGrade?: string
  /**
   * 职业 (备用)
   */
  career?: string
  /**
   * 爱好(备用)
   */
  hobby?: string
  /**
   * 学历(备用)
   */
  education?: string
  /**
   * 注册时间
   */
  registerDate?: string
  /**
   * 口令
   */
  command?: string
  /**
   * 是否启用手机验证  1 已开启 ， 2 未开启'',
   */
  isOpenPhoneVerify?: string
  /**
   * 登录密码
   */
  loginPassword?: string
  /**
   * 个性签名
   */
  personalSignature?: string
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
   * 更新人
   */
  updatedById?: string
  /**
   * 是否删除，1，已删除，2，未删除
   */
  isDelete?: string
  /**
   * 版本号
   */
  version?: string
  /**
   * 是否设置支付密码1：是2：否
   */
  isSetPayPassword: string
  /**
   * 商户ID
   */
  businessId: string
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [按根据ID获取用户↗](https://yapi.nbttfc365.com/project/82/interface/api/11704)
// **/
// export const getV1ImChatImUserInfoGetMyUserInfoApiRequest: MarkcoinRequest<
//   YapiGetV1ImChatImUserInfoGetMyUserInfoApiRequest,
//   YapiGetV1ImChatImUserInfoGetMyUserInfoApiResponse['data']
// > = params => {
//   return request({
//     path: "/v1/im/chat/imUserInfo/getMyUserInfo",
//     method: "GET",
//     params
//   })
// }

/* prettier-ignore-end */
