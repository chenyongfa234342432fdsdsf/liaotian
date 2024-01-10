import { YapiPostInnerV1ImChatBindGetThirdUserInfoV2Data } from '@/typings/yapi/InnerImChatBindGetThirdUserInfoV2PostApi'
import { t } from '@lingui/macro'

/** 我的钱包 */
export function getMyWalletRoutePath() {
  return '/my-wallet'
}

/** 安全验证 */
export function getSafetyVerificationRoutePath() {
  return '/safety-verification'
}
export function getSafetyVerificationUrlPath(methods: string, email: string, phone: string) {
  return `/safety-verification?methods=${methods}&email=${email}&phone=${phone}`
}
/** 添加账户 */
export function getBindAccountRoutePath() {
  return '/bind-account'
}

export function getAddAccountRoutePath(id?: number | string, uid?: number | string) {
  let url = '/add-account'
  if (id) url = `${url}?id=${id}`
  if (uid) url = url.includes('?') ? `${url}&uid=${uid}` : `${url}?uid=${uid}`
  return url
}

export function getAddBankCardRoutePath(id?: string) {
  let url = '/add-bank-card'
  if (id) url = `${url}?id=${id}`
  return url
}

/** 添加绑定账户类型 */
export enum BindAccountTypeEnum {
  Third = 'third', // 第三方账户
  Bank = 'bank', // 银行卡
}
export function getBindAccountTypeEnumLabel(value: BindAccountTypeEnum) {
  return {
    [BindAccountTypeEnum.Third]: t`features_settings_center_bind_account_index_ooh7tnooc0`,
    [BindAccountTypeEnum.Bank]: t`features_settings_center_add_bank_card_index_exccjj3i9b`,
  }[value]
}

/**
 * 将 id 数组转为可用的 options
 * @param values [1, 2]
 * @param getNameFn 根据 id 获取名称的函数，如 (id) => ({ 1: '1}[id])
 */
export function enumValuesToOptions(values: any[], getNameFn: (value: any) => string) {
  return values.map(value => ({
    value,
    label: getNameFn(value),
  }))
}

/** 安全验证类型 */
export enum SafetyVerificationTypeEnum {
  Email = 'email',
  Google = 'google', // 谷歌验证器
  Phone = 'phone',
}
export function getSafetyVerificationEnumLabel(value: SafetyVerificationTypeEnum) {
  return {
    [SafetyVerificationTypeEnum.Google]: t`constants_my_wallet_y8qrmhb4_0`,
    [SafetyVerificationTypeEnum.Phone]: t`constants_my_wallet_oujsodkjs5`,
    [SafetyVerificationTypeEnum.Email]: t`constants_my_wallet_ro5harrofe`,
  }[value]
}

/** 财务记录类型 */
export enum BillLogTypeEnum {
  Sub = 'sub', // 支出
  Add = 'add', // 收入
  All = 'all', // 全部
}

export const PAGE_SIZE = 10 // 分页大小
export const PAGE_NUM = 1 // 分页大小

/** 是否开启类型 */
export enum IsOpenEnum {
  Yes = 1,
  No = 2,
}

export interface ISafetyVerificationProps extends YapiPostInnerV1ImChatBindGetThirdUserInfoV2Data {
  thirdUid: number
  thirdPassword: string
  imUid: string
  imBusinessId: string
  bindId?: string
}
