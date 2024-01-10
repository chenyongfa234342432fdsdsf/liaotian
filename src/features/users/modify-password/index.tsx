import { t } from '@lingui/macro'
import { useState } from 'react'
import { Form, Input, Spin } from '@nbit/arco'
import Icon from '@/components/icon'
import { oss_svg_image_domain_address } from '@/constants/oss'
import LazyImage from '@/components/lazy-image'
import { useUserStore } from '@/store/user'
import { link } from '@/helper/link'
import { usePageContext } from '@/hooks/use-page-context'
// import {
//   postMemberRegisterMobileCodeRequest,
//   postMemberRegisterEmailCodeRequest,
//   postUserPwdResetRequest,
// } from '@/apis/login'
import { useUpdateEffect } from 'ahooks'
import {
  TabOption,
  passwordValidate,
  confirmPasswordValidate,
  passwordValidateAll,
  verificationCode,
  UserInformationDesensitization,
  CodeType,
  TabOptionRequest,
} from '../user-operate'
import CountDown from '../count-down'
import styles from './index.module.css'
import { userToast } from '../user-toast'

const FormItem = Form.Item

function ModifyPassword() {
  const [form] = Form.useForm()

  const pageContext = usePageContext()

  const { userTransitionDatas, removeUserTransitionDatas, userInfo, clearUserCacheData } = useUserStore()

  const { email, mobileCountry, mobileNumber } = userInfo

  const [isPhoneSend, setIsPhoneSend] = useState<boolean>(false)

  const rules = verificationCode(isPhoneSend)

  const { type: requestType } = pageContext?.urlParsed?.search || {}

  const type = requestType || (email ? TabOption.Email : TabOption.Phone)

  const password = Form.useWatch('password', form)

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

  const [isloding, setIsloding] = useState<boolean>(false)

  const [confirmPasswordVisible, setconfirmPasswordVisible] = useState<boolean>(false)

  const getAccountPhone = () => {
    return userTransitionDatas?.resetPhone?.phone || mobileNumber
  }

  const getAccountEmail = () => {
    return userTransitionDatas?.resetEmail || email
  }

  const getAccountAreacode = () => {
    return userTransitionDatas?.resetPhone?.areacode || mobileCountry
  }

  const setRegistorVerifyCode = async () => {
    const request = {
      // [TabOption.Email]: postMemberRegisterEmailCodeRequest,
      // [TabOption.Phone]: postMemberRegisterMobileCodeRequest,
      [TabOption.Email]: () => {},
      [TabOption.Phone]: () => {},
    }
    const requestParams = {
      [TabOption.Phone]: {
        type: CodeType.ModifyPassword,
        mobile: getAccountPhone(),
        mobileCountryCode: getAccountAreacode(),
      },
      [TabOption.Email]: {
        type: CodeType.ModifyPassword,
        email: getAccountEmail(),
      },
    }
    const { isOk } = await request[type](requestParams[type])
    if (isOk) {
      userToast({ content: t`user.field.reuse_38` })
      setIsPhoneSend(true)
      return true
    }
  }

  const confirmPassword = e => {
    setconfirmPasswordVisible(e)
  }

  const setUpPassword = e => {
    setPasswordVisible(e)
  }

  const setRegistorChange = async () => {
    const res = await form.validate()
    setIsloding(true)
    // const { isOk } = await postUserPwdResetRequest({
    //   verifyType: type === TabOption.Email ? TabOptionRequest?.Email : TabOptionRequest?.Phone,
    //   verifyCode: res?.code,
    //   account: type === TabOption.Email ? getAccountEmail() : getAccountPhone(),
    //   newPassword: res?.password,
    //   mobileCountryCode: type === TabOption.Email ? null : userTransitionDatas?.resetPhone?.areacode || mobileCountry,
    // })
    setIsloding(false)
    // if (isOk) {
    //   clearUserCacheData()
    //   removeUserTransitionDatas()
    //   link('/login')
    // }
  }

  useUpdateEffect(() => {
    form.getFieldValue('comfirmpassword') && form.validate(['comfirmpassword'])
  }, [password])

  return (
    <div className={styles.scoped}>
      <div className="registor-image">
        <LazyImage src={`${oss_svg_image_domain_address}registor/register-main.png`} />
      </div>
      <div className="registor-form">
        <div className="registor-title">{t`features_chain_star_profile_index_oid_7akon6`}</div>
        <div className="registor-form-submit">
          <Form layout="vertical" requiredSymbol={false} form={form} autoComplete="off">
            <div className="relative">
              <FormItem
                label={t`features_user_operate_create_account_index_ttwdoccami`}
                field="password"
                rules={[passwordValidate()]}
              >
                <Input.Password
                  suffix={
                    <Icon
                      onClick={() => setUpPassword(!passwordVisible)}
                      name={passwordVisible ? 'eyes_open1' : 'eyes_close1'}
                    />
                  }
                  prefix={<Icon name="key_icon1" className="mt-0.5" />}
                  onVisibilityChange={setUpPassword}
                  placeholder={t`features_user_operate_create_account_index_axnpq0avo8`}
                />
              </FormItem>
              {passwordValidateAll(password) && (
                <div className="absolute left-0 bottom-0 lg:bottom-4 text-[#878787] text-xs">
                  8~16 {t`features_user_operate_create_account_index_8t1wvyh6uu`}
                </div>
              )}
            </div>
            <FormItem
              label={t`features_user_operate_create_account_index_0p9u3hj6yu`}
              field="comfirmpassword"
              shouldUpdate
              rules={[confirmPasswordValidate(password)]}
            >
              <Input.Password
                suffix={
                  <Icon
                    onClick={() => confirmPassword(!confirmPasswordVisible)}
                    name={confirmPasswordVisible ? 'eyes_open1' : 'eyes_close1'}
                  />
                }
                prefix={<Icon name="key_icon1" className="mt-0.5" />}
                onVisibilityChange={confirmPassword}
                placeholder={t`features_user_operate_create_account_index_axnpq0avo8`}
              />
            </FormItem>
            <FormItem
              field="code"
              rules={[rules]}
              label={
                type === TabOption.Email
                  ? t`features_user_operate_modify_password_index_shs4xtddtk`
                  : t`features_user_operate_modify_password_index_qezwleoi6z`
              }
            >
              <Input
                prefix={<Icon name={type === TabOption.Email ? 'message_icon' : 'phone_icon1'} className="mt-0.5" />}
                placeholder={`${t`features_user_operate_modify_password_index_rkcakkybmr`}${
                  type === TabOption.Email
                    ? t`features_user_operate_modify_password_index_shs4xtddtk`
                    : t`features_user_operate_modify_password_index_qezwleoi6z`
                }`}
                suffix={<CountDown onSend={setRegistorVerifyCode} />}
              />
            </FormItem>
            <div className="text-white text-sm -mt-2.5">
              {t`features_user_operate_modify_password_index_lchyhxswmc`}
              {type === TabOption.Email
                ? t`features_chain_star_contact_index_32pdchge3uavncqnjohjs`
                : t({
                    id: 'features_user_operate_modify_password_index_rrqxhxpyca',
                    values: { 0: getAccountAreacode() },
                  })}
              {UserInformationDesensitization(type === TabOption.Email ? getAccountEmail() : getAccountPhone())}
              {t`features_user_operate_modify_password_index_ghq5uwm3kv`} 6
              {t`features_user_operate_modify_password_index_vp1ndnssll`} 30
              {t`features_user_operate_modify_password_index_wctrpvcj7e`}
            </div>
          </Form>
        </div>
        <Spin loading={isloding} className="w-full mt-8">
          <div className="registor-agreement-button" onClick={setRegistorChange}>
            {t`features_chain_star_profile_index_oid_7akon6`}
          </div>
        </Spin>
      </div>
    </div>
  )
}

export default ModifyPassword
