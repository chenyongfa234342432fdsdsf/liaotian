import { useMount } from 'ahooks'
import { t } from '@lingui/macro'

interface RegexpList {
  emailExp: RegExp
  emoiExp: RegExp
  spaceExp: RegExp
  norNumberExp: RegExp
}

export const RegexpList: RegexpList = {
  /**
   * 邮箱验证
   */
  emailExp: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  /**
   * 非数字验证
   */
  norNumberExp: /[^0-9]+/g,
  /**
   * 空格验证
   */
  spaceExp: /\s+/gi,

  /**
   * 表情验证
   */
  emoiExp:
    /[\uD800-\uDBFF][\uDC00-\uDFFF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2000-\u3300][\uFE00-\uFEFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|\uD83E[\uDD00-\uDDFF]|\uD83E[\uDD70-\uDDFF]/g,
}

const emailExp = /^([A-Za-z0-9_\-.\u4e00-\u9fa5])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,8})$/
const cnExp = /[\u4e00-\u9fa5]/g
const ValidateType = {
  containUppercaseAndLowercaseLetters: /(?=.*?[A-Z])(?=.*?[a-z])/,
  containsNumbers: /(?=.*?[0-9])/,
  // containsSpecialsymbols: /(?=.*?[#?!@$%^&*()=+-.])/,
  passwordLength: /^.{8,16}$/,
  containsWhitespace: /(?=.*[\s])/,
}

enum TabOption {
  Email = 'email',
  Phone = 'phone',
}

enum TabOptionRequest {
  Email = 2,
  Phone = 1,
}

enum CodeType {
  // 注册
  register = 1,
  // 修改密码
  ModifyPassword = 4,
}

const accountValidate = () => {
  return {
    required: true,
    validator: (value: string | undefined, cb) => {
      const regExp = /@/g
      const isEmail = value && value.match(regExp)
      if (!value) return cb(t`features_users_login_index_zmstcluaog`)
      if (cnExp.test(value)) return cb(t`features_users_user_operate_piljrn9erd`)
      if (isEmail && !emailExp.test(value)) {
        return cb(t`features_users_user_operate_piljrn9erd`)
      }
      return cb()
    },
  }
}

const emailValidate = () => {
  return {
    required: true,
    validator: (value: string | undefined, cb) => {
      if (!value) return cb(t`features_users_create_account_index_jgkp094fey`)
      if (cnExp.test(value)) return cb(t`features_users_create_account_index_avyrhqp5cu`)
      if (value && !emailExp.test(value)) {
        return cb(t`features_users_create_account_index_avyrhqp5cu`)
      }
      return cb()
    },
  }
}

const phoneValidate = () => {
  return {
    validator: (value: Record<'phone' | 'areacode', string> | undefined, cb) => {
      if (!value?.phone || !value?.areacode) return cb(t`features_users_user_operate_5bcuxqw55v`)
      return cb()
    },
  }
}

const passwordValidateAll = value => {
  return Object.keys(ValidateType).every(item => {
    if (['containsWhitespace'].includes(item)) {
      return !ValidateType[item].test(value)
    } else {
      return ValidateType[item].test(value)
    }
  })
}

const passwordValidate = () => {
  return {
    validator: (value: string | undefined, cb) => {
      if (!value) return cb(t`features_users_user_operate_ks3axfq_kb`)
      if (!ValidateType.passwordLength.test(value)) return cb(t`features_users_user_operate_cv5dk6euse`)
      if (!ValidateType.containUppercaseAndLowercaseLetters.test(value))
        return cb(t`features_users_user_operate_mjravtuxcs`)
      if (!ValidateType.containsNumbers.test(value)) return cb(t`features_users_user_operate_b3gyumoljq`)
      // if (ValidateType.containsSpecialsymbols.test(value)) return cb('不能有特殊字符')
      if (ValidateType.containsWhitespace.test(value)) return cb(t`features_users_user_operate_ptpwq0azh_`)
      return cb()
    },
  }
}

const confirmPasswordValidate = (password: string) => {
  return {
    validator: (value: string | undefined, cb) => {
      if (!value) return cb(t`features_users_user_operate_qis08sffmc`)
      if (value && value !== password) {
        return cb(t`features_users_user_operate_qis08sffmc`)
      }

      return cb()
    },
  }
}

const verificationCode = (senVerificationCode?: boolean) => {
  return {
    required: true,
    validator: (value: string | undefined, cb) => {
      if (!value) return cb(t`features_users_user_operate_bjx5ocebrz`)
      // if (!senVerificationCode) return cb(t`features_users_user_operate_jlkdza9284`)
      if (!/^\d{6}$/.test(value)) {
        return cb(t`features_users_user_operate_4nqmx9kyut`)
      }

      return cb()
    },
  }
}

function UserInformationDesensitization(str: string): string {
  if (str === '' || str === undefined || str === null) return ''

  const regExp = /@/g
  const numberExp = /^[\d]+$/
  const isEmail = str.match(regExp)
  const isPhone = str.match(numberExp)

  if (isEmail) {
    const email = str.split('@')
    const emailExp = email[0].length < 3 ? /(?:.{1})[^@]+(?=@)/ : /(?:.{2})[^@]+(?=.{2}@)/
    return str.replace(emailExp, '****')
  }

  if (isPhone) {
    const phoneExp = /(\d{3})\d*(\d{4})/
    return str.replace(phoneExp, '$1****$2')
  }

  return ''
}

const useGetAreacode = form => {
  useMount(() => {
    form.setFieldsValue({ phone: { areacode: '86' } })
  })
}

const removeEmojis = inputString => {
  // 使用正则表达式替换表情符号为空字符串
  const cleanString = inputString?.replace(RegexpList.emoiExp, '')

  return cleanString
}

export {
  accountValidate,
  emailValidate,
  CodeType,
  emailExp,
  TabOption,
  TabOptionRequest,
  passwordValidate,
  cnExp,
  confirmPasswordValidate,
  passwordValidateAll,
  phoneValidate,
  verificationCode,
  UserInformationDesensitization,
  useGetAreacode,
  removeEmojis,
}
