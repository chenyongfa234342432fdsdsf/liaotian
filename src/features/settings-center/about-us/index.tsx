import React, { useState, useRef, useEffect } from 'react'
import Icon from '@/components/icon'
import { Radio, Image } from '@nbit/arco'
import PopBox from '@/components/pop-box'
import Link from '@/components/link'
import LazyImage from '@/components/lazy-image'
import { baseCommonStore } from '@/store/common'
import { isChainstar } from '@/helper/env'
import { oss_svg_image_domain_address } from '@/constants/oss'
import { getV1ImHomeWebsiteGetDataApiRequest } from '@/apis/settings-center'
import { YapiGetV1ImHomeWebsiteGetDataApiRequest } from '@/typings/yapi/ImHomeWebsiteGetDataV1GetApi'
import { t } from '@lingui/macro'
import { useLayoutStore } from '@/store/layout'
import NavigationBar from '../navigation-bar'
import Styles from './index.module.css'

function AboutUs() {
  const { columnsDataByCd, layoutProps } = useLayoutStore()
  const commonStore = baseCommonStore.getState()
  const [appInfo, setAppInfo] = useState('')
  const [visible, setVisible] = useState(false)
  const hanleModalClose = () => {
    setVisible(false)
  }
  const handleCommit = () => {
    setVisible(false)
  }
  const handleDeleteClick = equipment => {
    setVisible(true)
  }

  // const getDataAbout = () => {
  //   let data: YapiGetV1ImHomeWebsiteGetDataApiRequest = {
  //     businessId: commonStore.businessId,
  //     lanType: commonStore.locale,
  //   }
  //   getV1ImHomeWebsiteGetDataApiRequest(data).then(res => {
  //     if (res.isOk && res.data) {
  //       setAppInfo(res.data.appInfo || '')
  //     }
  //   })
  // }
  useEffect(() => {
    // getDataAbout()
  }, [])

  return (
    <div className={Styles.scoped}>
      <NavigationBar label={t`features_settings_center_about_us_index_2tumy_yot9`} url="/settings-center" />
      <div className="content">
        <LazyImage
          className="overflow-hidden rounded-3xl w-20 h-20 flex-shrink-0"
          src={`${oss_svg_image_domain_address}${isChainstar ? 'blogo' : 'clogo'}.png`}
        />
        <h3 className="mt-5">{layoutProps.businessName}</h3>
        <div className="tipcontent">
          <p>{layoutProps.appInfo}</p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
