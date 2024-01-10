import { t } from '@lingui/macro'
import { useState, useRef, useEffect } from 'react'
import { Form, Input, Radio, Button, Message, Spin } from '@nbit/arco'
import Icon from '@/components/icon'
import { useUserStore } from '@/store/user'
import { usePageContext } from '@/hooks/use-page-context'
import LazyImage from '@/components/lazy-image'
import { I18nSelectChoose } from '@/components/i18n-select-modal'
import { oss_svg_image_domain_address } from '@/constants/oss'
import { isChainstar, isMerchant } from '@/helper/env'
import { setToken } from '@/helper/auth'
import { getMessengerPagePath } from '@/helper/route/messenger'
import { link } from '@/helper/link'
import Link from '@/components/link'
import CountryModal from '@/components/country-modal'
import {
  postLoginMobileApiRequest,
  postLoginEmailApiRequest,
  postV1ImChatLoginAccountApiRequest,
  postMemberRegisterEmailCodeRequest,
  getV1ImChatImUserInfoGetMobileTelCodeApiRequest,
} from '@/apis/login'
import { getV1ImChatImUserInfoGetAddressByIpApiRequest } from '@/apis/settings-center'
import { YapiGetV1ImChatImUserInfoGetMobileTelCodeApiRequest } from '@/typings/yapi/ImChatImUserInfoGetMobileTelCodeV1GetApi'
import { YapiGetV1ImChatEmailVerifySendApiRequest } from '@/typings/yapi/ImChatEmailVerifySendV1GetApi'
import { useCommonStore } from '@/store/common'
import { getWebKeyByBusinessId } from '@/helper/common'
import { accountValidate, emailValidate, passwordValidate, verificationCode } from '../user-operate'
import ScanningCode from '../scanning-code'
import { UserLayout } from '../user-layout'
import styles from './index.module.css'

let timer: any = null
export default function () {
  const { setBusinessId, setAccessKey } = useCommonStore()
  const { setUserInfo, setSystemUid, setZimToken, setLogin } = useUserStore()
  const [countdown, setCountdown] = useState(0) // 倒计时
  const [area, setArea] = useState<string>('') // 国家名称
  const [mobileCountryCd, setMobileCountryCd] = useState<string>('') // 区号
  const [countryShortName, setCountryShortName] = useState<string>('') // 国家简称
  const [showPassword, setShowPassword] = useState(false) // 显示密码明文
  const [tabCurrent, setTabCurrent] = useState('email') // tab 选中栏
  const [loginMethod, setLoginMethod] = useState('passwordLogin') // 登录方式
  const [isloding, setIsloding] = useState<boolean>(false) // loading
  const [serverId, setServerId] = useState('') // 服务器 id
  const [modalVisible, setModalVisible] = useState(false) // 地区弹框
  const [form] = Form.useForm()
  const pageContext = usePageContext()
  const { redirect } = pageContext.urlParsed.search

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
      typeCd: '2',
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
      typeCd: '2',
    }
    postMemberRegisterEmailCodeRequest(data).then(res => {
      if (res.isOk && res.data?.success) {
        // 设置倒计时时间为 60 秒
        setCountdown(60)
      }
    })
  }

  // 点击显示密码
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // 提交并登录
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
    // 登录
    if (tabCurrent === 'mobile') {
      loginValidMobile(values)
    } else {
      values.email.includes('@') ? loginValidEmail(values) : loginAccount(values)
    }
  }

  // 切换账号方式
  const handleTabChange = (type: string) => {
    setTabCurrent(type)
    setCountdown(0)
    if (timer) {
      clearInterval(timer)
    }
  }

  // 切换登录方式
  const handleMethod = () => {
    form.setFieldsValue({ email: '' }) // 清空邮箱输入框的内容
    if (loginMethod === 'passwordLogin') {
      setLoginMethod('codeLogin')
    } else {
      setLoginMethod('passwordLogin')
    }
  }

  // 邮箱登录
  const loginValidEmail = async val => {
    setIsloding(true)
    const { isOk, data } = await postLoginEmailApiRequest({
      email: val.email,
      loginPassword: val.loginPassword,
      emailCode: val.code,
    })
    setIsloding(false)
    if (isOk) {
      logincallBack(data)
    }
  }

  // UID登录
  const loginAccount = async val => {
    setIsloding(true)
    const { isOk, data } = await postV1ImChatLoginAccountApiRequest({
      uid: val.email,
      loginPassword: val.loginPassword,
    })
    setIsloding(false)
    if (isOk) {
      logincallBack(data)
    }
  }

  // 手机号码登录
  const loginValidMobile = async val => {
    setIsloding(true)
    const { isOk, data } = await postLoginMobileApiRequest({
      mobileCountryCd,
      mobileNumber: val.account,
      loginPassword: val.loginPassword,
      mobileTelCode: val.code,
    })
    setIsloding(false)
    if (isOk) {
      logincallBack(data)
    }
  }

  // 扫码登录
  const onLoginSuccess = data => {
    logincallBack(data)
  }

  // 登录回调
  const logincallBack = data => {
    setZimToken(data?.zeGoToken || '')
    setUserInfo({ ...data?.userInfo })
    setSystemUid(data?.systemUid)
    setToken(data)
    setLogin(true)
    Message.success(t`features_users_login_index_pszpygvu5b`)
    redirect ? link(redirect) : link(getMessengerPagePath())
  }

  useEffect(() => {
    getAddressByIP()
  }, [])

  useEffect(() => {
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
    <UserLayout>
      <div className={styles.scoped}>
        <I18nSelectChoose />
        <ScanningCode onLoginSuccess={onLoginSuccess} />

        <Form form={form} layout="vertical" onSubmit={onSubmit} autoComplete="off" validateTrigger="onBlur">
          <div className="login-box">
            <h1 className="text-3xl text-text_color_01 font-semibold">{t`features_users_login_index_yj8rlwoy9d`}</h1>
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
                <li className={tabCurrent === 'email' ? 'active' : ''} onClick={() => handleTabChange('email')}>
                  {t`features_users_login_index_czsm8tffq4`}
                </li>
                <li className={tabCurrent === 'mobile' ? 'active' : ''} onClick={() => handleTabChange('mobile')}>
                  {t`features_settings_center_personal_information_index_4sbsiya1gg`}
                </li>
              </ul>
            </div>
            <div className="login-content">
              {tabCurrent === 'mobile' && (
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
                    suffix={<Icon name="icon_chat_arrow" fontSize={16} className="text-icon_color pr-4" />}
                    placeholder={t`features_users_create_account_index_0dlxrrysk4`}
                    className="area"
                  />
                </Form.Item>
              )}
              {tabCurrent === 'mobile' && (
                <Form.Item
                  className="list-item"
                  field="account"
                  requiredSymbol={false}
                  rules={[{ required: true, message: t`features_settings_center_bind_mobile_index_rocukuvszt` }]}
                >
                  <Input
                    type="number"
                    addBefore={mobileCountryCd ? `+${mobileCountryCd}` : '--'}
                    placeholder={t`features_settings_center_bind_mobile_index_rocukuvszt`}
                    className="input-box"
                  />
                </Form.Item>
              )}
              {tabCurrent === 'email' && (
                <Form.Item
                  className="list-item"
                  field="email"
                  requiredSymbol={false}
                  rules={[loginMethod === 'codeLogin' ? emailValidate() : accountValidate()]}
                >
                  <Input
                    placeholder={
                      loginMethod === 'codeLogin'
                        ? t`features_users_login_index_obpolsxov8`
                        : t`features_users_login_index_zmstcluaog`
                    }
                    className="input-box"
                  />
                </Form.Item>
              )}
              {loginMethod === 'codeLogin' && (
                <Form.Item
                  className="list-item last-item"
                  requiredSymbol={false}
                  field="code"
                  rules={[verificationCode(countdown > 0)]}
                >
                  <Input
                    type="number"
                    placeholder={
                      tabCurrent === 'email'
                        ? t`features_settings_center_verify_identidy_index_rwtzuuhnki`
                        : t`features_settings_center_bind_mobile_index_avn5naqutc`
                    }
                    className="input-box"
                    addAfter={
                      <Button onClick={handleSendCode} disabled={countdown > 0} className="getcode pr-4" type="text">
                        {countdown > 0 ? `${countdown}s` : t`features_users_create_account_index_dlm0wqw8rw`}
                      </Button>
                    }
                  />
                </Form.Item>
              )}
              {loginMethod === 'passwordLogin' && (
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
              )}
            </div>
            <div className="switch-box" onClick={handleMethod}>
              <Button type="default" long className="switch-btn">
                {loginMethod === 'codeLogin'
                  ? t`features_users_login_index_zdnovihqrb`
                  : t`features_users_login_index_xor_1rtwly`}
              </Button>
            </div>

            <div className="w-full">
              <Button type="primary" loading={isloding} long className="commit-btn" htmlType="submit">
                {t`features_users_login_index_6tiyoujrwd`}
              </Button>
            </div>
            <div className="text-text_color_02 text-sm mt-6">
              <span>{t`features_users_login_index_kvhniugxol`}</span>
              <Link href="/register" className="text-brand_color unline">
                {t`features_users_login_index_r_dc9gbbyo`}
              </Link>
            </div>
          </div>
        </Form>
        <CountryModal visible={modalVisible} onClose={hanleModalClose} onSelect={handleCountrySelect} />
      </div>
    </UserLayout>
  )
}
