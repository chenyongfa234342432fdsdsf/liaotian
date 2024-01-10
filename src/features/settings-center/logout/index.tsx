import React, { useState, useRef, useEffect } from 'react'
import Icon from '@/components/icon'
import { Radio } from '@nbit/arco'
import Link from '@/components/link'
import { link } from '@/helper/link'
import { t } from '@lingui/macro'
import { useHelpCenterUrlTemp } from '@/hooks/use-help-center-url'
import NavigationBar from '../navigation-bar'
import Styles from './index.module.css'

function Logout() {
  const [radioChecked, setRadioChecked] = useState(false) // 选择同意条款

  // 选择同意条款
  const handleRadioChange = () => {
    setRadioChecked(!radioChecked)
  }

  const handleCommitLogout = () => {
    link(`/verify-identidy?url=/logout`)
  }
  const helpUrl = `${useHelpCenterUrlTemp('terms_service')}?redirect=/logout`

  return (
    <div className={Styles.scoped}>
      <NavigationBar label={t`features_settings_center_account_security_index_kkqlfhbqu1`} url="/account-security" />
      <div className="content">
        <Icon name="icon_set_logout" fontSize={50} className="logout-icon" />
        <h3>{t`features_settings_center_logout_index_hmzpqadnns`}</h3>
        <div className="tipcontent">
          <p className="text-text_color_02 text-sm">{t`features_settings_center_logout_index_v30bcal5da`}</p>
          <div className="flex justify-start items-start mt-4">
            <span className="num">1</span>
            <div className="flex flex-col items-start">
              <p className="text-text_color_01 text-sm h-6 items-center flex">{t`features_settings_center_logout_index_gin4asdotd`}</p>
              <p className="text-text_color_02 text-sm">{t`features_settings_center_logout_index_9o6iefyqaz`}</p>
            </div>
          </div>
          <div className="flex justify-start items-start mt-4">
            <span className="num">2</span>
            <div className="flex flex-col items-start">
              <p className="text-text_color_01 text-sm h-6 items-center flex">{t`features_settings_center_logout_index_cc3gokt2e9`}</p>
              <p className="text-text_color_02 text-sm">{t`features_settings_center_logout_index_eb1kdh1c39`}</p>
            </div>
          </div>
          <div className="flex justify-start items-start mt-4">
            <span className="num">3</span>
            <div className="flex flex-col items-start">
              <p className="text-text_color_01 text-sm h-6 items-start flex">{t`features_settings_center_logout_index_bgpt0uu4bn`}</p>
              <p className="text-text_color_02 text-sm"></p>
            </div>
          </div>
        </div>

        <div className="flex mt-4 justify-start ml-6 mb-3 w-auto">
          <Icon
            name={radioChecked ? 'icon_register_single_selected' : 'icon_register_single_unselected'}
            fontSize={16}
            className={radioChecked ? 'country-icon-active' : 'country-icon text-icon_color'}
            onClick={handleRadioChange}
          />
          <p className="text-sm text-text_color_02">
            {t`features_settings_center_logout_index_g9lscxwdky`}
            <Link href={helpUrl} className="text-brand_color">
              {t`features_settings_center_logout_index_zladk_meh5`}
            </Link>
          </p>
        </div>
        {radioChecked && (
          <div className="commit-btn" onClick={handleCommitLogout}>
            <Icon name="icon_set_next_step" fontSize={34} className="commit-icon" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Logout
