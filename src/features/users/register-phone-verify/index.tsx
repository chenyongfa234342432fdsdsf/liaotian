import { t } from '@lingui/macro'
import { useState, useRef } from 'react'
import { Form, Input, Spin } from '@nbit/arco'
import Icon from '@/components/icon'
import { oss_svg_image_domain_address } from '@/constants/oss'
import LazyImage from '@/components/lazy-image'
// import { postMemberRegisterPhoneRequest, postMemberRegisterMobileCodeRequest } from '@/apis/login'
import { useUserStore } from '@/store/user'
import { setToken } from '@/helper/auth'
import { verificationCode, CodeType, UserInformationDesensitization } from '../user-operate'
import CompleteRegistrationModal from '../complete-registration-modal'
import CountDown from '../count-down'
import styles from './index.module.css'
import { userToast } from '../user-toast'

const FormItem = Form.Item

function RegisterPhoneVerify() {
  const [form] = Form.useForm()

  const { userTransitionDatas, removeUserTransitionDatas, setUserInfo, setLogin } = useUserStore()

  const [isloding, setIsloding] = useState<boolean>(false)

  const [isSendCode, setIsSendCode] = useState<boolean>(false)

  const completeRegistrationModalRef = useRef<Record<'openRegistrationModal', () => void>>()

  const setRegistorChange = async () => {
    const res = await form.validate()
    setIsloding(true)
    // const { isOk, data } = await postMemberRegisterPhoneRequest({ ...userTransitionDatas, verifyCode: res?.verifyCode })
    // if (isOk) {
    //   setUserInfo({ ...data?.userInfo })
    //   setToken(data)
    //   setLogin(true)
    //   completeRegistrationModalRef?.current?.openRegistrationModal()
    // }
    setIsloding(false)
  }

  const setRegistorVerifyCode = async () => {
    // const { isOk } = await postMemberRegisterMobileCodeRequest({
    //   type: CodeType.register,
    //   mobile: userTransitionDatas?.mobile,
    //   mobileCountryCode: userTransitionDatas?.mobileCountryCode,
    // })
    // if (isOk) {
    //   userToast({ content: t`user.field.reuse_38` })
    //   setIsSendCode(true)
    //   return true
    // }
  }

  return (
    <div className={styles.scoped}>
      <div className="registor-image">
        <LazyImage src={`${oss_svg_image_domain_address}registor/register-main.png`} />
      </div>
      <div className="registor-form">
        <div className="registor-title">
          {t`features_layout_components_personalization_jcjm2uey5y`} -
          {t`features_user_operate_register_phone_verify_index_jmmepjllp7`}
        </div>
        <div className="mt-4 mb-10 text-xs md:block md:text-base text-[#878787] md:my-8">
          {t`features_user_operate_register_phone_verify_index_bcmt0astx7`} +{userTransitionDatas?.mobileCountryCode}
          {UserInformationDesensitization(userTransitionDatas?.mobile)}
          {t`features_user_operate_modify_password_index_ghq5uwm3kv`} 6,
          {t`features_user_operate_register_email_verify_index_5kvephicl4`}
          {t`features_user_operate_register_email_verify_index_3ugilfhpna`} 30 {''}
          {t`features_user_operate_modify_password_index_wctrpvcj7e`}
        </div>
        <div className="registor-form-submit">
          <Form layout="vertical" requiredSymbol={false} form={form} autoComplete="off">
            <FormItem
              field="verifyCode"
              rules={[verificationCode(isSendCode)]}
              label={t`features_user_operate_modify_password_index_qezwleoi6z`}
            >
              <Input
                prefix={<Icon name="phone_icon1" className="mt-0.5" />}
                placeholder={t`features_user_operate_register_phone_verify_index_f0bjbyv4su`}
                suffix={<CountDown onSend={setRegistorVerifyCode} />}
              />
            </FormItem>
          </Form>
        </div>
        <Spin loading={isloding} className="w-full">
          <div className="registor-submit-button" onClick={setRegistorChange}>
            {t`user.field.reuse_02`}
          </div>
        </Spin>
      </div>
      <CompleteRegistrationModal
        ref={completeRegistrationModalRef}
        onClosedChange={() => removeUserTransitionDatas()}
      />
    </div>
  )
}

export default RegisterPhoneVerify
