import { t } from '@lingui/macro'
import { useState, useRef } from 'react'
import { Form, Input, Spin } from '@nbit/arco'
import Icon from '@/components/icon'
import { oss_svg_image_domain_address } from '@/constants/oss'
import LazyImage from '@/components/lazy-image'
// import { postMemberRegisterEmailRequest, postMemberRegisterEmailCodeRequest } from '@/apis/login'
import { useUserStore } from '@/store/user'
import { setToken } from '@/helper/auth'
import CompleteRegistrationModal from '../complete-registration-modal'
import CountDown from '../count-down'
import styles from './index.module.css'
import { verificationCode, CodeType, UserInformationDesensitization } from '../user-operate'
import { userToast } from '../user-toast'

const FormItem = Form.Item

function RegisterEmailVerify() {
  const [form] = Form.useForm()

  const [isSendCode, setIsSendCode] = useState<boolean>(false)

  const [isloding, setIsloding] = useState<boolean>(false)

  const { userTransitionDatas, removeUserTransitionDatas, setUserInfo, setLogin } = useUserStore()

  const completeRegistrationModalRef = useRef<Record<'openRegistrationModal', () => void>>()

  const setRegistorChange = async () => {
    // const { email, password, nickname } = userTransitionDatas || {}
    // const res = await form.validate()
    // setIsloding(true)
    // const { isOk, data } = await postMemberRegisterEmailRequest({
    //   email,
    //   password,
    //   nickname,
    //   verifyCode: res?.verifyCode,
    // })
    // if (isOk) {
    //   completeRegistrationModalRef?.current?.openRegistrationModal()
    //   setUserInfo({ ...data?.userInfo })
    //   setLogin(true)
    //   setToken(data)
    // }
    // setIsloding(false)
  }

  const setRegistorVerifyCode = async () => {
    // const { isOk } = await postMemberRegisterEmailCodeRequest({
    //   type: CodeType.register,
    //   email: userTransitionDatas?.email,
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
          {t`features_user_operate_register_email_verify_index_u_gzoslcqr`}
        </div>
        <div className="mt-4 mb-10 text-xs md:block md:text-base text-[#878787] md:my-8">
          {t`features_user_operate_register_email_verify_index_ytqfxqz3ri`}
          {UserInformationDesensitization(userTransitionDatas?.email)}
          {t`features_user_operate_modify_password_index_ghq5uwm3kv`} 6,
          {t`features_user_operate_register_email_verify_index_5kvephicl4`}
          {t`features_user_operate_register_email_verify_index_3ugilfhpna`} 30 {''}
          {t`features_user_operate_register_email_verify_index_loiyqcyngs`}
        </div>
        <div className="registor-form-submit">
          <Form layout="vertical" requiredSymbol={false} form={form} autoComplete="off">
            <FormItem
              field="verifyCode"
              rules={[verificationCode(isSendCode)]}
              label={t`features_user_operate_modify_password_index_shs4xtddtk`}
            >
              <Input
                prefix={<Icon name="message_icon" className="mt-0.5" />}
                placeholder={t`features_user_operate_register_email_verify_index_ekov6xuf1p`}
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

export default RegisterEmailVerify
