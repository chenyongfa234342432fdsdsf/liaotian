import React, { useState, useEffect } from 'react'
import { Modal } from '@nbit/arco'
import Icon from '@/components/icon'
import LazyImage from '@/components/lazy-image'
import { oss_svg_image_domain_address } from '@/constants/oss'
import { t } from '@lingui/macro'
import { YapiPostV1ImSignInSignInData } from '@/typings/yapi/ImSignInSignInV1PostApi'
import Styles from './sign-success.module.css'

interface SignSuccessProps {
  visible: boolean
  signInData: YapiPostV1ImSignInSignInData
  onCommit: () => void
}
function SignSuccess({ visible, signInData, onCommit }: SignSuccessProps) {
  useEffect(() => {}, [])

  return (
    <Modal className={Styles.scoped} simple footer={null} style={{}} title="" visible={visible}>
      <div className="sign-box">
        <LazyImage className="sign-top" src={`${oss_svg_image_domain_address}signtop.png`} />
        <LazyImage className="sign-content" src={`${oss_svg_image_domain_address}signcontent.png`} />
        <div className="flex w-full justify-center items-center text-base font-medium text-text_color_02 mt-4">
          <span>{t`features_checkin_center_sign_success_mt0nnw09ac`}</span>
          <span className="text-text_color_special_07"> +{signInData.signAward}</span>
          <span>
            {t`features_checkin_center_sign_success_aeqliseceh`}
            {signInData.signDays}
            {t`features_checkin_center_sign_success_zgtfcnhyqe`}
          </span>
        </div>
        <div className="signinnow" onClick={onCommit}>
          <span>{t`components_pop_box_index_xjmp7i51ci`}</span>
        </div>
      </div>
    </Modal>
  )
}
export default SignSuccess
