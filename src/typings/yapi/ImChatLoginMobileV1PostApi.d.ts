/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

/**
 * 接口 [登录-手机方式↗](https://yapi.nbttfc365.com/project/82/interface/api/11519) 的 **请求类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/login/mobile`
 * @更新时间 `2023-12-13 14:57:19`
 */
export interface YapiPostV1ImChatLoginMobileApiRequest {
  /**
   * 区号
   */
  mobileCountryCd: string
  /**
   * 手机
   */
  mobileNumber: string
  /**
   * 登录密码与验证码二选一
   */
  loginPassword: string
  /**
   * 登录密码与验证码二选一
   */
  mobileTelCode: string
}

/**
 * 接口 [登录-手机方式↗](https://yapi.nbttfc365.com/project/82/interface/api/11519) 的 **返回类型**
 *
 * @分类 [用户模块↗](https://yapi.nbttfc365.com/project/82/interface/api/cat_802)
 * @请求头 `POST /v1/im/chat/login/mobile`
 * @更新时间 `2023-12-13 14:57:19`
 */
export interface YapiPostV1ImChatLoginMobileApiResponse {
  /**
   * token
   */
  token?: string
  refreshToken?: null
  tokenExpireTime?: null
  refreshTokenExpireTime?: null
  userInfo?: YapiPostV1ImChatLoginMobileUserInfo
  usrMemberSettingsVO?: null
  imUserIndividual?: YapiPostV1ImChatLoginMobileImUserIndividual
  isWaiting?: boolean
  isSuccess?: boolean
  /**
   * zeGo聊天token
   */
  zeGoToken: string
  /**
   * 系统账号Uid
   */
  systemUid: string
}
/**
 * 用户基本信息
 */
export interface YapiPostV1ImChatLoginMobileUserInfo {
  /**
   * 商户ID
   */
  businessId?: number
  /**
   * 用户名称
   */
  userName?: null
  /**
   * 用户UID
   */
  uid?: number
  /**
   * 昵称
   */
  nickName?: string
  /**
   * 注册国籍字典表编码
   */
  regCountryCd?: null
  /**
   * 国籍字典表编码
   */
  kycCountryCd?: null
  /**
   * 手机区号
   */
  mobileCountryCd?: string
  /**
   * 手机号码
   */
  mobileNumber?: string
  /**
   * 账户
   */
  account?: string
  /**
   * 用户状态
   */
  statusInd?: number
  /**
   * 性别  1:男 2：女    数据字典 IM_user_sex
   */
  sex?: null
  /**
   * 出生日期
   */
  birthDate?: null
  /**
   * 用户等级 1：普通  2：会员  数据字典：IM_user_grade
   */
  userGrade?: number
  /**
   * 职业 (备用)
   */
  career?: null
  /**
   * 爱好(备用)
   */
  hobby?: null
  /**
   * 学历(备用)
   */
  education?: null
  /**
   * 注册时间
   */
  registerDate?: null
  /**
   * 注册时用户ip
   */
  registerIp?: string
  /**
   * 注册时用户Ip 地区
   */
  registerIpArea?: null
  /**
   * 是否启用手机验证  1 已开启 ， 2 未开启',
   */
  isOpenPhoneVerify?: number
  /**
   * 个性签名
   */
  personalSignature?: null
  createdByTime?: number
  createdById?: null
  updatedByTime?: number
  updatedById?: null
  isDelete?: number
  version?: number
  /**
   * 是否开启指纹识别
   */
  isOpenFingerprint?: number
  /**
   * 是否开启刷面识别
   */
  isOpenFace?: number
  /**
   * 是否开通图形识别
   */
  isOpenGraphical?: number
  id?: number
  /**
   * 靓号ID
   */
  fancyUid?: number
  /**
   * 头像地址
   */
  avatarPath?: null
  setNicknameInd?: number
  /**
   * 是否设置支付密码1：是2：否
   */
  isSetPayPassword: number
  deviceNoList?: string[]
}
/**
 * 个性化设置
 */
export interface YapiPostV1ImChatLoginMobileImUserIndividual {
  id?: number
  /**
   * 商户ID
   */
  businessId?: number
  /**
   * 语言设置 1、中文繁体 2、English
   */
  languageSet?: string
  /**
   * 主题设置 1、白天模式 2、黑夜模式 3、跟随模式
   */
  themeSet?: number
  /**
   * 新消息通知 (是否)
   */
  messageSet?: number
  /**
   * 新声音通知(是否)
   */
  newSoundSet?: number
  /**
   * 声音开关(是否)
   */
  soundSwitch?: number
  /**
   * 是否开启签到提醒；1是，2否
   */
  isSignRemind?: number
  /**
   * 用户UID
   */
  uid?: number
  /**
   * 运维模式：1、常规模式  2、约束模式
   */
  runmode?: number
  /**
   * 来信铃声
   */
  ringtone?: null
  createdByTime?: number
  createdById?: null
  updatedByTime?: null
  updatedById?: null
  isDelete?: number
  version?: number
  noticeModules?: null
}

// 以下为自动生成的 api 请求，需要使用的话请手动复制到相应模块的 api 请求层
// import request, { MarkcoinRequest } from '@/plugins/request'

// /**
// * [登录-手机方式↗](https://yapi.nbttfc365.com/project/82/interface/api/11519)
// **/
// export const postV1ImChatLoginMobileApiRequest: MarkcoinRequest<
//   YapiPostV1ImChatLoginMobileApiRequest,
//   YapiPostV1ImChatLoginMobileApiResponse['data']
// > = data => {
//   return request({
//     path: "/v1/im/chat/login/mobile",
//     method: "POST",
//     data
//   })
// }

/* prettier-ignore-end */
