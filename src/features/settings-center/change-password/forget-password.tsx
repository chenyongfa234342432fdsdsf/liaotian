import React, { useState, useRef, useEffect } from 'react'
import Icon from '@/components/icon'
import { link } from '@/helper/link'
import { Message } from '@nbit/arco'
import { useUserStore } from '@/store/user'
import { postV1ImChatImUserInfoUpdateLoginPasswordSingleApiRequest } from '@/apis/settings-center'
import { YapiPostV1ImChatImUserInfoUpdateLoginPasswordSingleApiRequest } from '@/typings/yapi/ImChatImUserInfoUpdateLoginPasswordSingleV1PostApi.d'
import { t } from '@lingui/macro'
import { passwordRules } from '@/constants/setting'
import NavigationBar from '../navigation-bar'
import PasswordInput from './password-input'
import Styles from './index.module.css'

function ChangePassword() {
  const { clearUserCacheData } = useUserStore()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const passwordErrorText = t`features_settings_center_change_password_forget_password_tdz9knypav`

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
    let data: YapiPostV1ImChatImUserInfoUpdateLoginPasswordSingleApiRequest = {
      newPassword,
    }
    postV1ImChatImUserInfoUpdateLoginPasswordSingleApiRequest(data).then(res => {
      if (res.isOk && res.data) {
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
      <NavigationBar label={t`features_settings_center_account_security_index_nerlqzeh2i`} url="/change-password" />
      <div className="password-box">
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
      {newPassword && confirmPassword && (
        <button type="button" className="commit-btn" onClick={updateLoginPassword}>
          <Icon name="icon_set_confirm" fontSize={24} className="commit-icon" />
        </button>
      )}
    </div>
  )
}

export default ChangePassword
