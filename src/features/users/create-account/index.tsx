import { t } from '@lingui/macro'
import { useState, useRef, useEffect } from 'react'
import { Form, Input, Button, Message } from '@nbit/arco'
import Icon from '@/components/icon'
import { oss_svg_image_domain_address } from '@/constants/oss'
import { I18nSelectChoose } from '@/components/i18n-select-modal'
import { useUserStore } from '@/store/user'
import { setToken } from '@/helper/auth'
import { link } from '@/helper/link'
import Link from '@/components/link'
import { getMessengerPagePath } from '@/helper/route/messenger'
import { isChainstar, isMerchant } from '@/helper/env'
import CountryModal from '@/components/country-modal'
import { useLayoutStore } from '@/store/layout'
import {
  postRegisterValidMobileRequest,
  postRegisterValidEmailRequest,
  postMemberRegisterEmailCodeRequest,
  getV1ImChatImUserInfoGetMobileTelCodeApiRequest,
} from '@/apis/login'
import { getV1ImChatImUserInfoGetAddressByIpApiRequest } from '@/apis/settings-center'
import { YapiGetV1ImChatImUserInfoGetMobileTelCodeApiRequest } from '@/typings/yapi/ImChatImUserInfoGetMobileTelCodeV1GetApi'
import { YapiGetV1ImChatEmailVerifySendApiRequest } from '@/typings/yapi/ImChatEmailVerifySendV1GetApi'
import { useCommonStore } from '@/store/common'
import { getBusinessName, getWebKeyByBusinessId } from '@/helper/common'
import { useHelpCenterUid, useHelpCenterUrlTemp } from '@/hooks/use-help-center-url'
import ScanningCode from '../scanning-code'
import { emailValidate, passwordValidate, verificationCode } from '../user-operate'
import { UserLayout } from '../user-layout'
import styles from './index.module.css'

type SubmitDetail = {
  email?: string
  password?: string
  nickname?: string
  verifyCode?: string
  mobileCountryCd?: string
  mobile?: string
  shortName?: string
}

function CreateAccount() {
  const { columnsDatas } = useLayoutStore().layoutProps || {}
  const { setBusinessId, setAccessKey } = useCommonStore()
  const { setUserTransitionDatas, setSystemUid, setUserInfo, setLogin, setZimToken } = useUserStore()
  const [countdown, setCountdown] = useState(0) // 倒计时
  const [area, setArea] = useState<string>('') // 国家名称
  const [mobileCountryCd, setMobileCountryCd] = useState<string>('') // 区号
  const [countryShortName, setCountryShortName] = useState<string>('') // 国家简称
  const [tabCurrent, setTabCurrent] = useState('email') // tab 选中栏
  const [radioChecked, setRadioChecked] = useState(false) // 选择同意条款
  const [isloding, setIsloding] = useState<boolean>(false) // loading
  const [showPassword, setShowPassword] = useState(false) // 明文
  const submitDetail = useRef<SubmitDetail>() //
  const [form] = Form.useForm()
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
    setMobileCountryCd(data.countryEnCode)
    setCountryShortName(data.countryShortName)
    form.setFieldValue('area', data.countryName)
  }

  // 根据IP获取位置
  const getAddressByIP = () => {
    getV1ImChatImUserInfoGetAddressByIpApiRequest({}).then(res => {
      if (res.isOk && res.data) {
        let { countryName, countryShortName, countryEnCode } = res.data
        setArea(countryName || '')
        setMobileCountryCd(countryEnCode || '')
        setCountryShortName(countryShortName || '')
        form.setFieldValue('area', countryName)
      }
    })
  }

  // 发送验证码
  const handleSendCode = () => {
    const validateParams = {
      mobile: {
        validateName: ['account', 'area', 'serverId'],
        sendRequest: getMobileTelCode,
      },
      email: {
        validateName: ['email', 'serverId'],
        sendRequest: postMemberRegisterEmailCode,
      },
    }
    form
      .validate(validateParams[tabCurrent].validateName)
      .then(() => {
        // 验证通过
        validateParams[tabCurrent].sendRequest()
      })
      .catch(() => {
        // 验证失败
      })
  }

  // 手机号码发短信
  const getMobileTelCode = () => {
    const { account } = form.getFieldsValue()
    let data: YapiGetV1ImChatImUserInfoGetMobileTelCodeApiRequest = {
      mobileNumber: account,
      mobileCountryCd,
      typeCd: '1',
    }
    getV1ImChatImUserInfoGetMobileTelCodeApiRequest(data).then(res => {
      if (res.isOk && res.data?.success) {
        // 设置倒计时时间为 60 秒
        setCountdown(60)
      }
    })
  }

  // 邮箱发验证码
  const postMemberRegisterEmailCode = () => {
    const email = form.getFieldValue('email')
    let data: YapiGetV1ImChatEmailVerifySendApiRequest = {
      email,
      typeCd: '1',
    }
    postMemberRegisterEmailCodeRequest(data).then(res => {
      if (res.isOk && res.data?.success) {
        // 设置倒计时时间为 60 秒
        setCountdown(60)
      }
    })
  }

  // 选择同意条款
  const handleRadioChange = () => {
    setRadioChecked(!radioChecked)
    form.setFieldValue('protocol', !radioChecked)
  }

  // 提交并注册
  const onSubmit = async values => {
    // 是商户的话先验证商户
    if (isMerchant) {
      setIsloding(true)
      const webKeyResult = await getWebKeyByBusinessId(values.serverId)

      if (webKeyResult) {
        setBusinessId(values.serverId)
        webKeyResult && setAccessKey(webKeyResult)
      } else {
        setIsloding(false)
        setAccessKey('')
        setBusinessId('1')
        // TODO: 提示用户 bid 错误，并校验无法继续登录 @tylar
        await Message.error(t`features_users_create_account_index_sysmxmxmi8`)
        return
      }
    }
    // 注册
    if (tabCurrent === 'mobile') {
      registerValidMobile(values)
    } else {
      registerValidEmail(values)
    }
  }

  // 邮箱注册
  const registerValidEmail = async val => {
    setIsloding(true)
    const { data } = await postRegisterValidEmailRequest({
      email: val.email,
      loginPassword: val.loginPassword,
      emailCode: val.code,
      regCountry: countryShortName,
      mobileCountryCd,
    })
    if (!data) {
      setIsloding(false)
      return
    }
    setZimToken(data?.zeGoToken || '')
    setUserInfo({ ...data?.userInfo, ...{ bindCountry: area } })
    setSystemUid(data?.systemUid)
    setLogin(true)
    setToken(data)
    setIsloding(false)

    // 这里是过渡存储
    submitDetail.current = {
      email: val.email,
      password: val.loginPassword,
      verifyCode: val.code,
    }
    setUserTransitionDatas({ ...submitDetail.current })
    Message.success(t`features_users_create_account_index_hs4vign49m`)
    link('/set-information')
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // 手机号码注册
  const registerValidMobile = async val => {
    setIsloding(true)
    const { data } = await postRegisterValidMobileRequest({
      mobileNumber: val.account,
      loginPassword: val.loginPassword,
      mobileTelCode: val.code,
      regCountry: countryShortName,
      mobileCountryCd,
    })
    if (!data) {
      setIsloding(false)
      return
    }
    setIsloding(false)
    setZimToken(data?.zeGoToken || '')
    setUserInfo({ ...data?.userInfo, ...{ bindCountry: area } })
    setSystemUid(data?.systemUid)
    setToken(data)
    setLogin(true)
    // 这里是过渡存储
    submitDetail.current = {
      mobileCountryCd,
      mobile: val.account,
      shortName: countryShortName,
      password: val.loginPassword,
      verifyCode: val.code,
    }
    setUserTransitionDatas({ ...submitDetail.current })
    Message.success(t`features_users_create_account_index_hs4vign49m`)
    link('/set-information')
  }

  // 扫码登录
  const onLoginSuccess = data => {
    setZimToken(data?.zeGoToken || '')
    setUserInfo({ ...data?.userInfo })
    setSystemUid(data?.systemUid)
    setToken(data)
    Message.success(t`features_users_login_index_pszpygvu5b`)
    link(getMessengerPagePath())
  }

  useEffect(() => {
    getAddressByIP()
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
  const helpUrl = `${useHelpCenterUrlTemp('terms_service')}?redirect=/register`

  return (
    <UserLayout>
      <div className={styles.scoped}>
        <I18nSelectChoose />
        <ScanningCode onLoginSuccess={onLoginSuccess} />
        <Form form={form} layout="vertical" onSubmit={onSubmit} autoComplete="off" validateTrigger="onBlur">
          <div className="register-box">
            <h1 className="text-text_color_01 font-semibold size32">
              {tabCurrent === 'email'
                ? t`features_settings_center_personal_information_index_suyk940elg`
                : t`features_settings_center_personal_information_index_4sbsiya1gg`}
              {t`features_users_create_account_index_xyxpcp1rku`}
            </h1>
            {isChainstar && (
              <Form.Item
                className="list-item server-box"
                field="serverId"
                requiredSymbol={false}
                rules={[{ required: true, message: t`features_users_create_account_index_xhrbqemwnq` }]}
              >
                <Input
                  autoComplete="off"
                  placeholder={t`features_users_create_account_index_xhrbqemwnq`}
                  className="input-box"
                />
              </Form.Item>
            )}
            <div className="tab-box">
              <ul>
                <li className={tabCurrent === 'email' ? 'active' : ''} onClick={() => setTabCurrent('email')}>
                  {t`features_settings_center_personal_information_index_suyk940elg`}
                </li>
                <li className={tabCurrent === 'mobile' ? 'active' : ''} onClick={() => setTabCurrent('mobile')}>
                  {t`features_settings_center_personal_information_index_4sbsiya1gg`}
                </li>
              </ul>
            </div>
            <div className="register-content">
              <Form.Item
                className="list-item cursor-pointer"
                field="area"
                requiredSymbol={false}
                rules={[{ required: true, message: t`features_users_create_account_index_0dlxrrysk4` }]}
              >
                <Input
                  readOnly
                  value={area}
                  onClick={handleCountryModal}
                  suffix={<Icon name="icon_chat_arrow" fontSize={16} className="text-icon_color" />}
                  placeholder={t`features_users_create_account_index_0dlxrrysk4`}
                  className="area"
                />
              </Form.Item>
              {tabCurrent === 'mobile' && (
                <Form.Item
                  className="list-item"
                  field="account"
                  requiredSymbol={false}
                  rules={[{ required: true, message: t`features_settings_center_bind_mobile_index_rocukuvszt` }]}
                >
                  <Input
                    addBefore={mobileCountryCd ? `+${mobileCountryCd}` : '--'}
                    placeholder={t`features_settings_center_bind_mobile_index_rocukuvszt`}
                    className="input-box"
                    type="number"
                  />
                </Form.Item>
              )}
              {tabCurrent === 'email' && (
                <Form.Item className="list-item" field="email" requiredSymbol={false} rules={[emailValidate()]}>
                  <Input placeholder={t`features_users_create_account_index_jgkp094fey`} className="input-box" />
                </Form.Item>
              )}
              <Form.Item
                className="list-item"
                requiredSymbol={false}
                field="code"
                rules={[verificationCode(countdown > 0)]}
              >
                <Input
                  placeholder={
                    tabCurrent === 'email'
                      ? t`features_settings_center_verify_identidy_index_rwtzuuhnki`
                      : t`features_settings_center_bind_mobile_index_avn5naqutc`
                  }
                  className="input-box"
                  type="number"
                  addAfter={
                    <Button onClick={handleSendCode} disabled={countdown > 0} className="getcode pr-4" type="text">
                      {countdown > 0 ? `${countdown}s` : t`features_users_create_account_index_dlm0wqw8rw`}
                    </Button>
                  }
                />
              </Form.Item>
              <Form.Item
                className="list-item last-item"
                requiredSymbol={false}
                field="loginPassword"
                rules={[passwordValidate()]}
              >
                <Input
                  type={showPassword ? 'text' : 'password'}
                  className="input-box"
                  suffix={
                    <Icon
                      name={showPassword ? 'icon_register_open' : 'icon_register_hide'}
                      fontSize={22}
                      onClick={togglePasswordVisibility}
                      className="password-icon pr-4 text-icon_color"
                    />
                  }
                  placeholder={t`features_users_create_account_index_uqp_bpomjo`}
                />
              </Form.Item>
              {/* <div className="list-item flex-col flex-grow items-start p-3 pl-0 pr-0 last-item">
              <div className="flex items-center justify-start w-full">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  autoComplete="off"
                  className="input-box flex-1"
                  placeholder={t`features_users_create_account_index_uqp_bpomjo`}
                  onChange={handlePasswordChange}
                />
                <Icon
                  name={showPassword ? 'icon_register_open' : 'icon_register_hide'}
                  fontSize={22}
                  className="password-icon pr-4 text-icon_color"
                  onClick={togglePasswordVisibility}
                />
              </div>
              <p className="text-text_color_04 text-xs" style={{ color: !isValid && loginPassword ? 'red' : '' }}>
                {t`features_users_create_account_index_snel0z15uj`}
              </p>
            </div> */}
            </div>
            <Form.Item
              requiredSymbol={false}
              field="protocol"
              rules={[{ required: true, message: t`features_users_create_account_index_g_plaaivhm` }]}
            >
              <div className="flex mt-4 justify-start w-full">
                <Icon
                  name={radioChecked ? 'icon_register_single_selected' : 'icon_register_single_unselected'}
                  fontSize={20}
                  className={radioChecked ? 'country-icon-active' : 'country-icon'}
                  onClick={handleRadioChange}
                />
                <p className="text-sm text-text_color_02">
                  {t({
                    id: 'features_settings_center_logout_index_g9lscxwdky',
                    values: {
                      0: getBusinessName(),
                    },
                  })}
                  <Link href={helpUrl} className="text-brand_color">
                    {t`features_settings_center_logout_index_zladk_meh5`}
                  </Link>
                </p>
              </div>
            </Form.Item>
            <div className="w-full">
              <Button
                type="primary"
                loading={isloding}
                htmlType="submit"
                long
                className="commit-btn"
              >{t`features_users_create_account_index_xyxpcp1rku`}</Button>
            </div>
            <div className="text-text_color_02 text-sm mt-6">
              <span>{t`features_users_create_account_index_tyytj1iz0w`} </span>
              <Link href="/login" className="text-brand_color unline">
                {t`features_users_create_account_index_iog8k6vuh1`}
              </Link>
            </div>
          </div>
        </Form>
        <CountryModal visible={modalVisible} onClose={hanleModalClose} onSelect={handleCountrySelect} />
      </div>
    </UserLayout>
  )
}

export default CreateAccount
