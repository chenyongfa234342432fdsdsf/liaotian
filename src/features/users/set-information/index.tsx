import { t } from '@lingui/macro'
import { useState, useRef, useEffect } from 'react'
import { Form, Input, Radio, Button, Message, Spin } from '@nbit/arco'
import Icon from '@/components/icon'
import { useUserStore } from '@/store/user'
import { link } from '@/helper/link'
import CountryModal from '@/components/country-modal'
import { popBoxConfirm } from '@/components/pop-box'
import UploadAvatarWithCrop from '@/components/upload-avatar-with-crop'
import { editUserInfo, postV1ImChatEmailBindingMobileApiRequest } from '@/apis/settings-center'
import { getV1ImChatImUserInfoGetMobileTelCodeApiRequest } from '@/apis/login'
import { YapiGetV1ImChatImUserInfoGetMobileTelCodeApiRequest } from '@/typings/yapi/ImChatImUserInfoGetMobileTelCodeV1GetApi'
import { YapiPostV1ImChatImUserInfoEditUserInfoApiRequest } from '@/typings/yapi/ImChatImUserInfoEditUserInfoV1PostApi'
import { YapiPostV1ImChatEmailBindingMobileApiRequest } from '@/typings/yapi/ImChatEmailBindingMobileV1PostApi'
import { UserLayout } from '../user-layout'
import styles from './index.module.css'

enum Step {
  EnterHeadUser = 1,
  EnterBindPhone = 2,
}

function SetInformation() {
  // 设置用户图像和昵称
  const { userInfo, setUserInfo } = useUserStore()
  const [headImg, setHeadImg] = useState('')
  const [inputText, setInputText] = useState('')
  const [step, setStep] = useState(Step.EnterHeadUser)
  const [isloding, setIsloding] = useState<boolean>(false) // loading

  // 绑定手机号码
  const [account, setAccount] = useState('')
  const [countdown, setCountdown] = useState(0) // 倒计时
  const [code, setCode] = useState('') // 验证码
  const [area, setArea] = useState<string>(userInfo.bindCountry || '') // 国家名称
  const [mobileCountryCd, setMobileCountryCd] = useState<string>(userInfo.mobileCountryCd || '') // 区号
  const [countryShortName, setCountryShortName] = useState<string>(userInfo.regCountryCd || '') // 国家简称
  const [modalVisible, setModalVisible] = useState(false) // 地区弹框

  const handleHeadImgChange = newHeadImg => {
    setHeadImg(newHeadImg)
    publicEditUserInfo({ avatarPath: newHeadImg })
  }

  const handleInputChange = event => {
    setInputText(event.target.value)
  }

  const publicEditUserInfo = (data: YapiPostV1ImChatImUserInfoEditUserInfoApiRequest) => {
    editUserInfo(data).then(res => {
      if (res.isOk && res.data?.success) {
        const updatedUserInfo = {
          ...userInfo,
          ...data,
        }
        setUserInfo(updatedUserInfo)
      }
    })
  }

  // 下一步
  const handleNext = () => {
    publicEditUserInfo({ nickName: inputText })
    if (!userInfo.mobileNumber) {
      setStep(Step.EnterBindPhone)
    } else {
      link('/messenger')
    }
  }

  // 选择地区
  const handleCountryModal = () => {
    setModalVisible(true)
  }
  const hanleModalClose = () => {
    setModalVisible(false)
  }
  const handleCountrySelect = (data: { countryName: string; countryEnCode: string; countryShortName: string }) => {
    setArea(data.countryName)
    setMobileCountryCd(data.countryEnCode)
    setCountryShortName(data.countryShortName)
  }

  // 发送验证码
  const handleSendCode = () => {
    if (!account) {
      Message.error(t`features_settings_center_bind_mobile_index_0ra0n8jymv`)
      return
    }
    getMobileTelCode()
  }

  // 手机号码发短信
  const getMobileTelCode = () => {
    let data: YapiGetV1ImChatImUserInfoGetMobileTelCodeApiRequest = {
      mobileNumber: account,
      mobileCountryCd,
      typeCd: '1',
    }
    getV1ImChatImUserInfoGetMobileTelCodeApiRequest(data).then(res => {
      if (res.isOk && res.data?.success) {
        // 设置倒计时时间为60秒
        setCountdown(60)
      }
    })
  }

  // 跳过
  const handleJumpOver = async () => {
    await popBoxConfirm(t`helper_message_fugvl05ct4`, t`features_users_set_information_index_x1gw1yxzgn`, {
      okText: t`components_i18n_select_modal_index_cl__sphiqv`,
    })
    link('/messenger')
  }

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
  // 手机号码绑定确定
  const handleCommit = () => {
    let data: YapiPostV1ImChatEmailBindingMobileApiRequest = {
      regCountryCd: countryShortName,
      mobileCountryCd,
      mobileNumber: account,
      mobileCode: code,
    }
    postV1ImChatEmailBindingMobileApiRequest(data).then(res => {
      if (res.isOk && res.data?.success) {
        const updatedUserInfo = {
          ...userInfo,
          mobileNumber: account,
          mobileCountryCd: code,
        }
        setUserInfo(updatedUserInfo)
        link('/messenger')
      }
    })
  }

  return (
    <UserLayout>
      <div className={styles.scoped}>
        {step === Step.EnterHeadUser && (
          <div className="information">
            <h1 className="text-3xl text-text_color_01 font-semibold">{t`features_users_set_information_index_gbh7pkzybl`}</h1>
            <div className="upload-head">
              <UploadAvatarWithCrop
                size={82}
                padding={40}
                onHeadImgChange={handleHeadImgChange}
                containerClassName="info-box"
              />
            </div>
            <div className="enter-box">
              <input
                type="text"
                className="enter-input"
                value={inputText}
                onChange={handleInputChange}
                maxLength={10}
                placeholder={t`features_users_set_information_index_4_gowgaube`}
              />
              {inputText && (
                <span className="max-num">
                  {t`features_users_set_information_index_0olrpyuok9`}
                  {10 - inputText.length < 0 ? 0 : 10 - inputText.length}
                  {t`features_users_set_information_index_h9v_zt0h8q`}
                </span>
              )}
            </div>
            <Spin loading={isloding} className="w-full">
              <Button type="primary" long className="commit-btn" disabled={!inputText} onClick={handleNext}>
                {t`features_users_set_information_index_fpqbqymc5f`}
              </Button>
            </Spin>
          </div>
        )}

        {step === Step.EnterBindPhone && (
          <div className="information">
            <h1 className="text-3xl text-text_color_01 font-semibold">{t`features_settings_center_account_security_index_b_vtomrwck`}</h1>

            <div className="login-content mt-8">
              <div className="list-item cursor-pointer" onClick={handleCountryModal}>
                <input
                  type="text"
                  value={area}
                  className="area"
                  readOnly
                  placeholder={t`features_users_create_account_index_0dlxrrysk4`}
                />
                <Icon name="icon_chat_arrow" fontSize={16} className="text-icon_color pr-4" />
              </div>
              <div className="list-item">
                <span className="area-code">{mobileCountryCd ? `+${mobileCountryCd}` : '--'}</span>
                <input
                  type="text"
                  value={account}
                  placeholder={t`features_settings_center_bind_mobile_index_rocukuvszt`}
                  className="input-box"
                  onChange={e => setAccount(e.target.value)}
                />
              </div>

              <div className="list-item last-item">
                <input
                  type="text"
                  value={code}
                  placeholder={t`features_settings_center_bind_mobile_index_avn5naqutc`}
                  className="input-box"
                  onChange={e => setCode(e.target.value)}
                />
                <button onClick={handleSendCode} disabled={countdown > 0} className="getcode pr-4" type="button">
                  {countdown > 0 ? `${countdown}s` : t`features_users_create_account_index_dlm0wqw8rw`}
                </button>
              </div>
            </div>
            <Spin loading={isloding} className="w-full">
              <Button
                type="primary"
                long
                className="commit-btn"
                disabled={!account || !code || !mobileCountryCd}
                onClick={handleCommit}
              >{t`components_i18n_select_modal_index_cl__sphiqv`}</Button>
            </Spin>
            <div className="text-text_color_02 text-sm mt-6 w-full justify-start" onClick={handleJumpOver}>
              <span className="underline text-brand_color">{t`features_users_set_information_index_jedfqvgubj`}</span>
            </div>
          </div>
        )}
        <CountryModal visible={modalVisible} onClose={hanleModalClose} onSelect={handleCountrySelect} />
      </div>
    </UserLayout>
  )
}

export default SetInformation
