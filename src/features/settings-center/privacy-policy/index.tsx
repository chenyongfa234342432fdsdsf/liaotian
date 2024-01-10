import React, { useState, useRef, useEffect } from 'react'
import Icon from '@/components/icon'
import { Radio, Image } from '@nbit/arco'
import PopBox from '@/components/pop-box'
import Link from '@/components/link'
import { t } from '@lingui/macro'
import NavigationBar from '../navigation-bar'
import Styles from './index.module.css'

function PrivacyPolicy() {
  return (
    <div className={Styles.scoped}>
      <NavigationBar label={t`features_settings_center_privacy_policy_index_oplkwstd9k`} url="/settings-center" />
      <div className="content">
        <div className="tipcontent"></div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
