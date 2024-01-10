import React, { useState, useRef, useEffect } from 'react'
import Icon from '@/components/icon'
import Link from '@/components/link'
import { link } from '@/helper/link'
import { Message } from '@nbit/arco'
import { useUserStore } from '@/store/user'
import { passwordRules } from '@/constants/setting'
import { postV1ImChatImUserInfoUpdateLoginPasswordApiRequest } from '@/apis/settings-center'
import { YapiPostV1ImChatImUserInfoUpdateLoginPasswordApiRequest } from '@/typings/yapi/ImChatImUserInfoUpdateLoginPasswordV1PostApi'
import { t } from '@lingui/macro'
import NavigationBar from '../navigation-bar'
import PasswordInput from './password-input'
import Styles from './index.module.css'

function ChangePassword() {
  const { clearUserCacheData } = useUserStore()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const passwordErrorText = t`features_settings_center_change_password_forget_password_tdz9knypav`

  const handleOldInputChange = (value: string) => {
    setOldPassword(value)
  }

  const handleNewInputChange = (value: string) => {
    setNewPassword(value)
  }

  const handleNewConfirmInputChange = (value: string) => {
    setConfirmPassword(value)
  }

  const updateLoginPassword = () => {
    if (newPassword !== confirmPassword) {
      Message.error(t`features_settings_center_change_password_forget_password_yjvyizzite`)
      return
    }
    let data: YapiPostV1ImChatImUserInfoUpdateLoginPasswordApiRequest = {
      oldPassword,
      newPassword,
    }
    postV1ImChatImUserInfoUpdateLoginPasswordApiRequest(data).then(async res => {
      if (res.isOk && res.data?.success) {
        Message.success(t`features_settings_center_change_password_forget_password_w4hjhe1wxu`)
        setTimeout(() => {
          clearUserCacheData()
          link('/login')
        }, 500)
      }
    })
  }

  return (
    <div className={Styles.scoped}>
      <NavigationBar label={t`features_settings_center_account_security_index_nerlqzeh2i`} url="/account-security" />
      <div onSubmit={updateLoginPassword} className="password-box">
        <PasswordInput
          type="password"
          placeholder={t`features_settings_center_change_password_index_f68xwfqfh8`}
          onChange={handleOldInputChange}
        />

        <PasswordInput
          type="password"
          placeholder={t`features_settings_center_change_password_forget_password_4jgk6y87nv`}
          onChange={handleNewInputChange}
          rules={passwordRules}
          errorText={passwordErrorText}
        />

        <PasswordInput
          type="password"
          placeholder={t`features_settings_center_change_password_forget_password_h_nqvmznqd`}
          onChange={handleNewConfirmInputChange}
          rules={passwordRules}
          errorText={passwordErrorText}
        />
      </div>
      <Link href="/forget-password" className="forget-password">
        <p>{t`features_settings_center_change_password_index_5id5pjb9gm`}</p>
      </Link>
      {oldPassword && newPassword && confirmPassword && (
        <button type="button" className="commit-btn" onClick={updateLoginPassword}>
          <Icon name="icon_set_confirm" fontSize={24} className="commit-icon" />
        </button>
      )}
    </div>
  )
}

export default ChangePassword
