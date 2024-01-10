import React, { useEffect, useState } from 'react'
import Link from '@/components/link'
import { link } from '@/helper/link'
import { Switch, Message } from '@nbit/arco'
import Icon from '@/components/icon'
import { useUserStore } from '@/store/user'
import {
  postV1ImChatImUserIndividualConfigurationApiRequest,
  getV1ImChatImUserIndividualQueryEntityApiRequest,
} from '@/apis/settings-center'
import { YapiPostV1ImChatImUserIndividualConfigurationApiRequest } from '@/typings/yapi/ImChatImUserIndividualConfigurationV1PostApi'
import { t } from '@lingui/macro'
import DisplayList from '../display-list'
import NavigationBar from '../navigation-bar'
import Styles from './index.module.css'

function AccountSecurity() {
  const { userInfo } = useUserStore()
  const [mobileHideSet, setMobileHideSet] = useState(false)

  // 设置手机号隐藏
  const configuration = (mobileHideSet: boolean) => {
    let data: YapiPostV1ImChatImUserIndividualConfigurationApiRequest = { mobileHideSet: mobileHideSet ? 1 : 2 }
    postV1ImChatImUserIndividualConfigurationApiRequest(data).then(res => {
      if (res.isOk && res.data) {
        console.log(res.data)
      }
    })
  }
  const onChangeSwitch = (value: boolean) => {
    setMobileHideSet(value)
    configuration(value)
  }

  // 查询默认是否隐藏手机号
  const getQueryEntity = () => {
    getV1ImChatImUserIndividualQueryEntityApiRequest({}).then(res => {
      if (res.isOk && res.data) {
        let { mobileHideSet } = res.data
        setMobileHideSet(mobileHideSet === 1)
      }
    })
  }
  // 跳转
  const navTo = (url: string) => {
    if (!userInfo.mobileNumber) {
      return Message.error(t`features_settings_center_account_security_index_6kecjoklxy`)
    }
    link(`/verify-identidy?url=${url}`)
  }

  useEffect(() => {
    getQueryEntity()
  }, [])
  return (
    <div className={Styles.scoped}>
      <NavigationBar label={t`features_settings_center_account_security_index_ttnbvtobp7`} url="/settings-center" />
      <div className="account-box">
        <DisplayList label={t`features_settings_center_account_security_index_b_vtomrwck`}>
          <Link className="flex justify-end items-center cursor-pointer w-full h-full" href="/bind-mobile">
            <span className="bind mr-2">
              {userInfo.mobileNumber
                ? t`features_settings_center_account_security_index_dahsi8wmax`
                : t`features_settings_center_account_security_index_rhmdrkqvjh`}
            </span>
            <Icon name="icon_chat_arrow" fontSize={16} className="arrow-icon" />
          </Link>
        </DisplayList>
        {userInfo.mobileNumber && (
          <DisplayList label={t`features_settings_center_account_security_index_f1vpl5n4c2`}>
            <div className="flex justify-end items-center cursor-pointer">
              <Switch className="switch-bg" checked={mobileHideSet} onChange={onChangeSwitch} />
            </div>
          </DisplayList>
        )}
        <DisplayList
          label={t`features_settings_center_account_security_index_nerlqzeh2i`}
          style={{ marginTop: '10px' }}
        >
          <div
            className="flex justify-end items-center cursor-pointer w-full h-full"
            onClick={() => navTo('/change-password')}
          >
            <Icon name="icon_chat_arrow" fontSize={16} className="arrow-icon" />
          </div>
        </DisplayList>
        <DisplayList label={t`features_settings_center_account_security_index_pjf7yxwuko`}>
          <div
            className="flex justify-end items-center cursor-pointer w-full h-full"
            onClick={() => navTo('/payment-password')}
          >
            <Icon name="icon_chat_arrow" fontSize={16} className="arrow-icon" />
          </div>
        </DisplayList>
        <DisplayList label={t`features_settings_center_account_security_index_cvvt11wwte`}>
          <Link className="flex justify-end items-center cursor-pointer w-full h-full" href="/devices">
            <Icon name="icon_chat_arrow" fontSize={16} className="arrow-icon" />
          </Link>
        </DisplayList>
        <DisplayList
          label={t`features_settings_center_account_security_index_kkqlfhbqu1`}
          style={{ marginTop: '10px' }}
        >
          <Link className="flex justify-end items-center cursor-pointer w-full h-full" href="/logout">
            <Icon name="icon_chat_arrow" fontSize={16} className="arrow-icon" />
          </Link>
        </DisplayList>
      </div>
    </div>
  )
}

export default AccountSecurity
