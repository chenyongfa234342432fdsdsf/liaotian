/** 密码验证正则 密码必须包含至少一个小写字母、一个大写字母和一个数字，且长度至少为 8 个字符 */
export const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
// 数字验证
export const numberRegex = /^\d+$/
// 邮箱验证
export const emailRules = /^([A-Za-z0-9_\-.\u4e00-\u9fa5])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,8})$/

// 用户个性化查询 -声音开关
export enum SoundSwitch {
  /** 开 */
  OPEN = 1,
  /** 关 */
  CLOSE = 2,
}

// 用户个性化查询 -新消息通知
export enum MessageSet {
  /** 开 */
  OPEN = 1,
  /** 关 */
  CLOSE = 2,
}

// 用户个性化查询 -  视频美颜
export enum VideoSwitch {
  /** 开 */
  OPEN = 1,
  /** 关 */
  CLOSE = 2,
}

// 短信验证人员身份
export enum TypeCdEnum {
  /** 邮箱注册 */
  EMAILREGISTER = '1',
  /** 登陆验证验证码 */
  LOGINCODE = '2',
  /** 个人身份验证 */
  PERSONAL = '99',
  /** 用户注销 */
  USERLAYOUT = '24',
}

// 用户签到提醒状态
export enum signRemindEnum {
  /** 开 */
  OPEN = 1,
  /** 关 */
  CLOSE = 0,
}
