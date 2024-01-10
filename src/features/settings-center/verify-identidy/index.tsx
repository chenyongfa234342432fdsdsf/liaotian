import React, { useState, useRef, useEffect } from 'react'
import { usePageContext } from '@/hooks/use-page-context'
import Link from '@/components/link'
import { link } from '@/helper/link'
import { Modal, Image } from '@nbit/arco'
import Icon from '@/components/icon'
import { useUserStore } from '@/store/user'
import LazyImage from '@/components/lazy-image'
import { numberRegex } from '@/constants/setting'
import { businessCountryInfo } from '@/apis/settings-center'
import { TypeCdEnum } from '@/constants/setting'
import {
  postV1ImChatImUserInfoVerifyIdentityApiRequest,
  getV1ImChatRegisterValidCheckEmailCode,
} from '@/apis/settings-center'
import { getV1ImChatImUserInfoGetMobileTelCodeApiRequest, postMemberRegisterEmailCodeRequest } from '@/apis/login'
import { YapiGetV1ImChatImUserInfoGetMobileTelCodeApiRequest } from '@/typings/yapi/ImChatImUserInfoGetMobileTelCodeV1GetApi'
import { YapiGetV1ImChatEmailVerifySendApiRequest } from '@/typings/yapi/ImChatEmailVerifySendV1GetApi'
import { t } from '@lingui/macro'
import LogoutModal from './logout-modal'
import NavigationBar from '../navigation-bar'
import Styles from './index.module.css'

interface BusinessCountry {
  businessId: number
  countryEnCode: string
  countryId: number
  countryName: string
  countryShortName: string
  createdById: string
  createdByTime: string
  enableInd: number
  id: number
  isDelete: number
  language: string
  updatedById: string
  updatedByTime: string
  version: number
}

function BindMobile() {
  const pageContext = usePageContext()
  const { userInfo } = useUserStore()
  const [bindCountry, setBindCountry] = useState('')
  const [areaCode, setAreaCode] = useState('86')
  const [mobile, setMobile] = useState('')
  const [code, setCode] = useState('')
  const [countdown, setCountdown] = useState(0)
  const [visible, setVisible] = useState(false)
  const { url } = pageContext.urlParsed.search

  const handleSendCode = () => {
    if (userInfo.mobileNumber) {
      getMobileTelCode()
    } else {
      postMembeEmailCode()
    }
  }

  // 手机号码发短信
  const getMobileTelCode = () => {
    let data: YapiGetV1ImChatImUserInfoGetMobileTelCodeApiRequest = {
      mobileNumber: userInfo.mobileNumber,
      mobileCountryCd: userInfo.mobileCountryCd,
      typeCd: url === '/logout' ? TypeCdEnum.USERLAYOUT : TypeCdEnum.PERSONAL,
    }
    getV1ImChatImUserInfoGetMobileTelCodeApiRequest(data).then(res => {
      if (res.isOk && res.data?.success) {
        // 设置倒计时时间为60秒
        setCountdown(60)
      }
    })
  }

  // 邮箱发验证码
  const postMembeEmailCode = () => {
    let data: YapiGetV1ImChatEmailVerifySendApiRequest = {
      email: userInfo.email,
      typeCd: url === '/logout' ? TypeCdEnum.USERLAYOUT : TypeCdEnum.PERSONAL,
    }
    postMemberRegisterEmailCodeRequest(data).then(res => {
      if (res.isOk && res.data?.success) {
        // 设置倒计时时间为60秒
        setCountdown(60)
      }
    })
  }
  // 数字
  const changeSetCode = val => {
    if (numberRegex.test(val)) {
      setCode(val)
    } else {
      setCode('')
    }
  }

  // 手机号码短信验证
  const CheckPhoneCode = () => {
    let data: { mobileTelCode: string; typeCd?: number } = {
      mobileTelCode: code,
    }
    if (url === '/logout') {
      data.typeCd = 24
    }
    postV1ImChatImUserInfoVerifyIdentityApiRequest(data).then(res => {
      if (res.isOk && res.data?.success) {
        if (url === '/logout') {
          setVisible(true)
          return
        }
        link(url)
      }
    })
  }

  // 邮箱验证码验证
  const CheckEmailCode = () => {
    getV1ImChatRegisterValidCheckEmailCode({ email: userInfo.email, verifyCode: code }).then(res => {
      if (res.isOk && res.data?.success) {
        if (url === '/logout') {
          setVisible(true)
          return
        }
        link(url)
      }
    })
  }

  // 提交验证
  const handleCommitClick = () => {
    if (userInfo.mobileNumber) {
      CheckPhoneCode()
    } else {
      CheckEmailCode()
    }
  }

  // 查找国家名字，接口没有这个字段
  const getbusinessCountryInfo = () => {
    businessCountryInfo({}).then(res => {
      if (res.isOk && res.data) {
        let CountryData: any = res.data
        const getArea = CountryData.find(area => area.countryEnCode === userInfo.mobileCountryCd) as BusinessCountry
        if (getArea) {
          setBindCountry(getArea.countryName)
        }
      }
    })
  }

  // 注销关闭弹框
  const handleLogout = () => {
    setVisible(false)
  }

  useEffect(() => {
    getbusinessCountryInfo()
  }, [])

  useEffect(() => {
    let timer: any = null
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
    } else {
      clearInterval(timer)
    }

    // 组件卸载时清除定时器
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [countdown])

  return (
    <>
      <div className={Styles.scoped}>
        <NavigationBar label={t`features_settings_center_verify_identidy_index_ddqe9vbya0`} url="/account-security" />
        <div className="vefify-box">
          <div className="flex flex-col pt-7 w-full items-center justify-center h-40 pb-7">
            <Icon name="icon_set_verify_identidy" fontSize={50} className="text-brand_color" />
            <h3 className="text-lg text-text_color_01 mt-3">{t`features_settings_center_verify_identidy_index_27w9ced7x_`}</h3>
          </div>
          <div className="mobile-box">
            <div className="list-item cursor-pointer">
              <span className="area">{bindCountry}</span>
            </div>
            {userInfo.mobileNumber && (
              <div className="list-item">
                <span className="area-code">+{userInfo.mobileCountryCd}</span>
                <span className="mobile">{userInfo.mobileNumber}</span>
              </div>
            )}
            {!userInfo.mobileNumber && (
              <div className="list-item">
                <span className="mobile">{userInfo.email}</span>
              </div>
            )}
            <div className="list-item" style={{ border: 'none' }}>
              <input
                type="text"
                value={code}
                placeholder={
                  userInfo.mobileNumber
                    ? t`features_settings_center_bind_mobile_index_avn5naqutc`
                    : t`features_settings_center_verify_identidy_index_rwtzuuhnki`
                }
                className="code"
                onChange={e => changeSetCode(e.target.value)}
              />
              <button onClick={handleSendCode} disabled={countdown > 0} className="getcode" type="button">
                {countdown > 0 ? `${countdown}s` : t`features_settings_center_bind_mobile_index_6ar4vb1hlx`}
              </button>
            </div>
          </div>
          {code && (
            <div className="commit-btn" onClick={handleCommitClick}>
              <Icon
                name={url === '/logout' ? 'icon_set_confirm' : 'icon_set_next_step'}
                fontSize={url === '/logout' ? 24 : 34}
                className="commit-icon"
              />
            </div>
          )}
        </div>
      </div>
      {visible && <LogoutModal visible={visible} verifyCode={code} onCommit={handleLogout} />}
    </>
  )
}

export default BindMobile
