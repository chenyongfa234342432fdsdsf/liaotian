import Icon from '@/components/icon'
import {
  SafetyVerificationTypeEnum,
  enumValuesToOptions,
  getSafetyVerificationEnumLabel,
  getBindAccountRoutePath,
  IsOpenEnum,
} from '@/constants/my-wallet'
import { useState } from 'react'
import { filter, map } from 'lodash'
import UserCountDown from '@/features/users/count-down'
import { Input, Message } from '@nbit/arco'
import {
  postInnerV1ImChatBindCheckAndBindApiRequest,
  postInnerV1ImChatBindSendCheckApiRequest,
} from '@/apis/settings-center/wallet'
import { link } from '@/helper/link'
import { UserInformationDesensitization } from '@/features/users/user-operate'
import { t } from '@lingui/macro'
import { useUserStore } from '@/store/user'
import { UserLevenEnum } from '@/constants/user'
import NavigationBar from '../navigation-bar'
import styles from './index.module.css'

export default function SafetyVerification({ data }) {
  const [value, setValue] = useState('')
  // 获取已开通的安全验证方式
  const openedVerifyMethods = [
    data.isOpenEmailVerify === IsOpenEnum.Yes ? SafetyVerificationTypeEnum.Email : '',
    data.isOpenGoogleVerify === IsOpenEnum.Yes ? SafetyVerificationTypeEnum.Google : '',
    data.isOpenPhoneVerify === IsOpenEnum.Yes ? SafetyVerificationTypeEnum.Phone : '',
  ].filter(Boolean)
  const options = enumValuesToOptions(openedVerifyMethods, getSafetyVerificationEnumLabel)
  const [active, setActive] = useState(options[0]?.value)
  const otherOptions = filter(options, i => i.value !== active)

  const { userInfo } = useUserStore()

  // 发送验证码
  const setRegistorVerifyCode = async () => {
    const res = await postInnerV1ImChatBindSendCheckApiRequest({
      type: active,
      thirdUid: data.thirdUid,
      thirdBusinessId: data.businessId,
      ...(active === SafetyVerificationTypeEnum.Email && {
        email: data.email,
      }),
      ...(active === SafetyVerificationTypeEnum.Phone && {
        mobileCountryCode: data.mobileCountryCd,
        mobile: data.mobileNumber,
      }),
    })
    if (res.isOk) {
      Message.success(t`features_messenger_chat_input_chat_input_7lsyf7g0la`)
      return true
    }
  }

  // 绑定账户
  const handleBind = async () => {
    const res = await postInnerV1ImChatBindCheckAndBindApiRequest({
      type: active,
      thirdUid: data.thirdUid,
      thirdBusinessId: data.businessId,
      passWord: data.thirdPassword,
      verifyCode: value,
      uid: data.imUid,
      businessId: data.imBusinessId,
      userType: userInfo.userGrade === UserLevenEnum.advanced ? 'admin' : 'normal',
      // 邮箱验证时的必传参数
      ...(active === SafetyVerificationTypeEnum.Email && {
        email: data.email,
      }),
      // 手机验证时的必传参数
      ...(active === SafetyVerificationTypeEnum.Phone && {
        mobileCountryCode: data.mobileCountryCd,
        mobile: data.mobileNumber,
      }),
      // 修改绑定账户时的必传参数
      ...(data.bindId && {
        bindId: data.bindId,
      }),
    })
    if (res.isOk) {
      link(getBindAccountRoutePath())
    }
  }

  const renderPlaceholderByType = () => {
    const maps = {
      [SafetyVerificationTypeEnum.Email]: t({
        id: 'features_settings_center_safety_verification_index_h4_8w4unau',
        values: { 0: UserInformationDesensitization(data.email) },
      }),
      [SafetyVerificationTypeEnum.Phone]: t({
        id: 'features_settings_center_safety_verification_index_h4_8w4unau',
        values: { 0: `+${data.mobileCountryCd} ${UserInformationDesensitization(data.mobileNumber)}` },
      }),

      [SafetyVerificationTypeEnum.Google]: t`features_settings_center_safety_verification_index_dhjhvesvsb`,
    }
    return maps[active]
  }

  const handlePaste = async () => {
    // 请求剪贴板权限
    await navigator.clipboard.readText().then(content => {
      // 在这里处理剪贴板中的内容
      setValue(content)
    })
  }
  return (
    <div className={styles.scoped}>
      <NavigationBar
        label={t`features_settings_center_safety_verification_index_iqkohk9qdw`}
        url={getBindAccountRoutePath()}
      />
      <div className="p-6 bg-card_bg_color_03 mb-2.5">
        <label className="text-text_color_02">{renderPlaceholderByType()}</label>
        {active === SafetyVerificationTypeEnum.Google ? (
          <Input
            placeholder={t`features_settings_center_safety_verification_index_e1whu30m_i`}
            value={value}
            suffix={
              <div className="cursor-pointer text-brand_color font-medium px-2.5 text-base" onClick={handlePaste}>
                {t`features_settings_center_safety_verification_index_3fc0_dir66`}
              </div>
            }
            onChange={setValue}
          />
        ) : (
          <Input
            placeholder={
              active === SafetyVerificationTypeEnum.Email
                ? t`features_settings_center_verify_identidy_index_rwtzuuhnki`
                : t`features_settings_center_safety_verification_index_esp2dkik6z`
            }
            value={value}
            suffix={
              <UserCountDown
                defaultText={t`features_users_create_account_index_dlm0wqw8rw`}
                onSend={setRegistorVerifyCode}
              />
            }
            onChange={setValue}
          />
        )}
      </div>
      <div className="pl-6 bg-card_bg_color_03">
        {map(otherOptions, i => (
          <div
            className="py-6 cursor-pointer text-base text-brand_color border-b last:border-b-0 border-line_color_02"
            key={i.value}
            onClick={() => setActive(i.value)}
          >
            {i.label}
          </div>
        ))}
      </div>
      {value ? (
        <div
          onClick={handleBind}
          className="mt-8 text-2xl mx-auto w-11 h-11 rounded-full bg-brand_color flex items-center justify-center"
        >
          <Icon name="icon_chat_unread" className="submit-icon" />
        </div>
      ) : null}
    </div>
  )
}
