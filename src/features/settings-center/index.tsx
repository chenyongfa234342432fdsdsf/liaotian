import { useState, useEffect } from 'react'
import { useMount } from 'ahooks'
import Link from '@/components/link'
import { link } from '@/helper/link'
import Icon from '@/components/icon'
import { Switch, Image, List } from '@nbit/arco'
import LazyImage from '@/components/lazy-image'
import ChatAvatar from '@/components/chat-avatar'
import { oss_svg_image_domain_address } from '@/constants/oss'
import { baseUserStore } from '@/store/user'
import I18nSelectModal from '@/components/i18n-select-modal'
import { SelectTheme } from '@/components/select-theme'
import { t } from '@lingui/macro'
import { useHelpCenterUrlTemp } from '@/hooks/use-help-center-url'
import { openNewWindow } from '@/helper/window'
import { isPlatformDeskTop } from '@/helper/env'
import { updateVersion } from '@/helper/version-update'
import NavigationBar from './navigation-bar'
// import { getQueryUserInfo } from '@/apis/settings-center'
// import { YapiGetV1ImChatImUserInfoQueryUserInfoListData } from '@/typings/yapi/ImChatImUserInfoQueryUserInfoV1GetApi'
import Styles from './index.module.css'

function RibbonItem({ item }) {
  const handleItemClick = () => {
    if (item.url) {
      link(item.url)
      return
    }
    if (item.callback) {
      item.callback()
    }
  }

  return (
    <div className="ribbon-item cursor-pointer" onClick={handleItemClick}>
      <Icon name={item.icon} fontSize={item.size || 24} className="ribbon-icon" />
      <span className="ribbon-label">{item.name}</span>
    </div>
  )
}

function SettingsCenter() {
  const { openI18nSelect } = I18nSelectModal()
  const helpUrl = `${useHelpCenterUrlTemp('privacy_policy')}?redirect=/settings-center`
  const [themevisible, setThemeVisible] = useState(false)
  const ribbonList = [
    { icon: 'icon_set_wallet', name: t`features_settings_center_my_wallet_index_qhfusz53li`, url: '/my-wallet' },
    {
      icon: 'icon_set_safety',
      name: t`features_settings_center_account_security_index_ttnbvtobp7`,
      url: '/account-security',
    },
    {
      icon: 'icon_set_bulk_sending',
      name: t`features_group_sending_assistant_index_ajodzou9tp`,
      url: '/group-sending',
    },
    {
      icon: 'icon_set_multi_language',
      name: t`features_settings_center_index_ld6ousylmy`,
      callback: () => {
        openI18nSelect()
      },
    },
    {
      icon: 'icon_set_theme',
      name: t`components_select_theme_index__2kufy39sf`,
      callback: () => setThemeVisible(true),
    },
    isPlatformDeskTop
      ? {
          icon: 'icon_set_open_windows',
          name: t`features_settings_center_index_7ozn3rbjqq`,
          callback: () => {
            openNewWindow()
          },
        }
      : {},
    {
      icon: 'icon_chat_set',
      name: t`features_settings_center_chat_settings_index_sa8qxgpqqy`,
      url: '/chat-settings',
    },
    {
      icon: 'icon_set_about',
      name: t`features_settings_center_about_us_index_2tumy_yot9`,
      url: '/about-us',
      size: 20,
    },
    {
      icon: 'icon_set_privacy',
      name: t`features_settings_center_privacy_policy_index_oplkwstd9k`,
      url: helpUrl,
    },
    // eslint-disable-next-line no-constant-condition
    isPlatformDeskTop && false
      ? {
          icon: 'icon_set_update',
          name: t`features_settings_center_index_a9pp4wif4j`,
          callback: () => {
            updateVersion()
          },
        }
      : {},
  ]
  const handlePensonlClick = () => {
    return link('/personal-information?redirect=/settings-center')
  }
  const { userInfo } = baseUserStore.getState()
  // const [userInfoData, setUserInfoData] = useState({nickName:'',uid:''})
  // useMount(() => {
  //   getQueryUserInfo({uid:userInfo.uid}).then(res => {
  //     if (res.isOk && res.data) {
  //       setUserInfoData(res.data[0])
  //     }
  //   })
  // })
  return (
    <div className={Styles.scoped}>
      <NavigationBar label={t`features_settings_center_chat_settings_index_sa8qxgpqqy`} url="/" />
      <div className="setting-content">
        <div className="user-box">
          <div className="user-left" onClick={handlePensonlClick}>
            <ChatAvatar size={80} className="overflow-hidden flex-shrink-0 headurl" src={userInfo.avatarPath} />
            <div className="user-name-box">
              <span className="user-name">{userInfo.nickName || t`features_settings_center_index_06mq_dgqgg`}</span>
              <div className="flex items-center">
                <span className="user-uid">{userInfo.fancyUid ? userInfo.fancyUid : `UID ${userInfo.uid}`}</span>
                {userInfo.fancyUid && (
                  <LazyImage src={`${oss_svg_image_domain_address}liang.png`} width={16} height={16} className="ml-1" />
                )}
              </div>
            </div>
          </div>
          <div className="user-right">
            <Link href="/my-qrcode">
              <Icon name="icon_set_qr_code" fontSize={16} />
            </Link>
          </div>
        </div>

        <div className="ribbon">
          {ribbonList
            .filter(v => v?.name)
            .map((item, index) => (
              <RibbonItem item={item} key={index} />
            ))}
        </div>
      </div>
      {themevisible && (
        <SelectTheme visible onClose={() => setThemeVisible(false)} onCommit={() => setThemeVisible(false)} />
      )}
    </div>
  )
}

export default SettingsCenter
