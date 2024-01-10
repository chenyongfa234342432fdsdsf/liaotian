import React, { useState, useRef, useEffect } from 'react'
import Icon from '@/components/icon'
import { useUserStore } from '@/store/user'
import { Message } from '@nbit/arco'
import { getV1ImChatImUserInfoGetMobileTelCodeApiRequest } from '@/apis/login'
import {
  postV1ImChatEmailBindingMobileApiRequest,
  getV1ImChatImUserInfoGetAddressByIpApiRequest,
} from '@/apis/settings-center'
import { YapiGetV1ImChatImUserInfoGetMobileTelCodeApiRequest } from '@/typings/yapi/ImChatImUserInfoGetMobileTelCodeV1GetApi'
import { YapiPostV1ImChatEmailBindingMobileApiRequest } from '@/typings/yapi/ImChatEmailBindingMobileV1PostApi'
import CountryModal from '@/components/country-modal'
import { t } from '@lingui/macro'
import NavigationBar from '../navigation-bar'
import BindingSuccess from './binding-success'
import Styles from './index.module.css'

function BindMobile() {
  const { userInfo, setUserInfo } = useUserStore()
  const [area, setArea] = useState<string>('')
  const [areaCode, setAreaCode] = useState<string>('')
  const [countryShortName, setCountryShortName] = useState<string>('')
  const [mobile, setMobile] = useState('')
  const [code, setCode] = useState('')
  const [countdown, setCountdown] = useState(0)
  const [state, setState] = useState('pennding')

  // 选择地区
  const [modalVisible, setModalVisible] = useState(false)
  const handleCountryModal = () => {
    setModalVisible(true)
  }
  const hanleModalClose = () => {
    setModalVisible(false)
  }
  const handleCountrySelect = (data: { countryName: string; countryEnCode: string; countryShortName: string }) => {
    setArea(data.countryName)
    setAreaCode(data.countryEnCode)
    setCountryShortName(countryShortName)
  }

  // 绑定手机号码
  const handleCommitClick = () => {
    if (!code) {
      Message.error(t`features_settings_center_bind_mobile_index_nhuddnkozc`)
      return
    }
    let data: YapiPostV1ImChatEmailBindingMobileApiRequest = {
      regCountryCd: countryShortName,
      mobileCountryCd: areaCode,
      mobileNumber: mobile,
      mobileCode: code,
    }
    postV1ImChatEmailBindingMobileApiRequest(data).then(res => {
      if (res.isOk && res.data) {
        const updatedUserInfo = {
          ...userInfo,
          mobileNumber: mobile,
          mobileCountryCd: areaCode,
        }
        setUserInfo(updatedUserInfo)
        setState('success')
      }
    })
  }

  // 发送验证码
  const handleSendCode = () => {
    // 调用后端API发送验证码的逻辑
    if (!mobile) {
      Message.error(t`features_settings_center_bind_mobile_index_0ra0n8jymv`)
      return
    }
    let data: YapiGetV1ImChatImUserInfoGetMobileTelCodeApiRequest = {
      mobileNumber: mobile,
      mobileCountryCd: areaCode,
      typeCd: '1',
    }
    getV1ImChatImUserInfoGetMobileTelCodeApiRequest(data).then(res => {
      if (res.isOk && res.data) {
        // 设置倒计时时间为60秒
        setCountdown(60)
      }
    })
  }

  // 根据IP获取位置
  const getAddressByIP = () => {
    getV1ImChatImUserInfoGetAddressByIpApiRequest({}).then(res => {
      if (res.isOk && res.data) {
        let { countryName, countryShortName, countryEnCode } = res.data
        setArea(countryName || '')
        setAreaCode(countryEnCode || '')
        setCountryShortName(countryShortName || '')
      }
    })
  }
  useEffect(() => {
    if (userInfo.mobileNumber) {
      setState('success')
    } else {
      getAddressByIP()
    }
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
    <div className={Styles.scoped}>
      <NavigationBar label={t`features_settings_center_account_security_index_b_vtomrwck`} url="/account-security" />
      <div className="mobile-content">
        {state === 'pennding' && (
          <div>
            <div className="mobile-box">
              <div className="list-item cursor-pointer" onClick={handleCountryModal}>
                <span className="area">{area}</span>
                <Icon name="icon_chat_arrow" fontSize={16} className="arrow-icon text-icon_color" />
              </div>
              <div className="list-item">
                <span className="area-code">+{areaCode}</span>
                <input
                  type="text"
                  value={mobile}
                  placeholder={t`features_settings_center_bind_mobile_index_rocukuvszt`}
                  className="mobile"
                  onChange={e => setMobile(e.target.value)}
                />
              </div>
              <div className="list-item" style={{ border: 'none' }}>
                <input
                  type="text"
                  value={code}
                  placeholder={t`features_settings_center_bind_mobile_index_avn5naqutc`}
                  className="code"
                  onChange={e => setCode(e.target.value)}
                />
                <button onClick={handleSendCode} disabled={countdown > 0} className="getcode" type="button">
                  {countdown > 0 ? `${countdown}s` : t`features_settings_center_bind_mobile_index_6ar4vb1hlx`}
                </button>
              </div>
            </div>
            <div className="commit-btn" onClick={handleCommitClick}>
              <Icon name="icon_set_confirm" fontSize={24} className="commit-icon" />
            </div>
          </div>
        )}
        <CountryModal visible={modalVisible} onClose={hanleModalClose} onSelect={handleCountrySelect} />
        {state === 'success' && <BindingSuccess />}
      </div>
    </div>
  )
}

export default BindMobile
