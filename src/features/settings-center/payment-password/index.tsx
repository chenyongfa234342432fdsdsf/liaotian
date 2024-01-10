import React, { useState, useRef, useEffect } from 'react'
import { Image, Button, Message } from '@nbit/arco'
import { link } from '@/helper/link'
import Icon from '@/components/icon'
import { useUserStore } from '@/store/user'
import { popBoxConfirm } from '@/components/pop-box'
import {
  postV1ImChatImUserInfoUpdatePayPasswordSingleApiRequest,
  postV1ImChatImUserInfoVerifyPayPasswordApiRequest,
} from '@/apis/settings-center'
import decryption from '@/helper/ASE_RSA'
import { YapiPostV1ImChatImUserInfoVerifyPayPasswordData } from '@/typings/yapi/ImChatImUserInfoVerifyPayPasswordV1PostApi'
import { t } from '@lingui/macro'
import PayPasswordComponent from './pay-password-component'
import NavigationBar from '../navigation-bar'
import Styles from './index.module.css'

enum Step {
  EnterOldPassword = 1,
  EnterNewPassword = 2,
  ConfirmNewPassword = 3,
}

function PaymentPassword() {
  const { userInfo, setUserInfo } = useUserStore()
  const [step, setStep] = useState(userInfo.isSetPayPassword)
  const [oldPassword, setOldPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')
  const handPasswordComplete = (password: string) => {
    console.log(password)
    if (step === Step.EnterOldPassword) {
      setOldPassword(password)
    } else if (step === Step.EnterNewPassword) {
      setNewPassword(password)
    } else if (step === Step.ConfirmNewPassword) {
      setConfirmNewPassword(password)
    }
  }

  const handleCommitClick = () => {
    if (step === Step.EnterOldPassword) {
      verifyPayPassword()
    } else if (step === Step.EnterNewPassword) {
      setStep(Step.ConfirmNewPassword)
    } else if (step === Step.ConfirmNewPassword) {
      if (newPassword === confirmNewPassword) {
        updatePayPasswordSingle()
      } else {
        Message.error(t`features_settings_center_payment_password_index_owexdwtjn1`)

        // 两次输入的新密码不一致的处理逻辑
      }
    }
  }

  const isPasswordComplete = (password: string) => {
    return password.length === 6
  }

  // 验证新密码
  const updatePayPasswordSingle = () => {
    postV1ImChatImUserInfoUpdatePayPasswordSingleApiRequest({
      newPayPassword: decryption.encryptAES(confirmNewPassword, true),
    }).then(res => {
      if (res.isOk && res.data) {
        const updatedUserInfo = {
          ...userInfo,
          isSetPayPassword: 1,
        }
        setUserInfo(updatedUserInfo)
        Message.success(t`features_settings_center_payment_password_index_d33sm6ilif`)
        link('/account-security')
      }
    })
  }

  // 验证旧密码
  const verifyPayPassword = () => {
    postV1ImChatImUserInfoVerifyPayPasswordApiRequest({ payPassword: decryption.encryptAES(oldPassword, true) }).then(
      async res => {
        if (res.isOk && res.data) {
          if (res.data?.success) {
            setStep(Step.EnterNewPassword)
          } else {
            await popBoxConfirm(
              t`helper_message_fugvl05ct4`,
              t`features_settings_center_payment_password_index_6nfwnl8vww`
            )
          }
        }
      }
    )
  }

  return (
    <div className={Styles.scoped}>
      <NavigationBar label={t`features_settings_center_account_security_index_pjf7yxwuko`} url="/account-security" />
      {step === Step.EnterOldPassword && (
        <div className="password-box">
          <p className="text-text_color_01 text-sm mb-8">{t`features_settings_center_payment_password_index_xtjkevmaup`}</p>
          <PayPasswordComponent onComplete={handPasswordComplete} />
        </div>
      )}
      {step === Step.EnterNewPassword && (
        <div className="password-box">
          <p className="text-text_color_01 text-sm mb-8">{t`features_settings_center_payment_password_index_x3wuxeeqqh`}</p>
          <PayPasswordComponent onComplete={handPasswordComplete} />
        </div>
      )}
      {step === Step.ConfirmNewPassword && (
        <div className="password-box">
          <p className="text-text_color_01 text-sm mb-8">{t`features_settings_center_payment_password_index_nb4lzojj89`}</p>
          <PayPasswordComponent onComplete={handPasswordComplete} />
        </div>
      )}
      {(isPasswordComplete(oldPassword) ||
        isPasswordComplete(newPassword) ||
        isPasswordComplete(confirmNewPassword)) && (
        <div className="commit-btn" onClick={handleCommitClick}>
          <Icon name="icon_set_confirm" fontSize={24} className="commit-icon" />
        </div>
      )}
    </div>
  )
}

export default PaymentPassword
