import { t } from '@lingui/macro'
import { useState } from 'react'
import { Form, Input } from '@nbit/arco'
import Icon from '@/components/icon'
import { oss_svg_image_domain_address } from '@/constants/oss'
import LazyImage from '@/components/lazy-image'
import cn from 'classnames'
import { link } from '@/helper/link'
import { useUserStore } from '@/store/user'
import { emailValidate, TabOption, phoneValidate } from '../user-operate'
import SelectPhone from '../select-phone'
import { useGetMemberArea } from '../use-get-member-area'
import styles from './index.module.css'

const FormItem = Form.Item

function ResetPassword() {
  const [form] = Form.useForm()

  const [selectedTab, setSelectedTab] = useState<string>(TabOption.Email)

  useGetMemberArea(form, 'phone', selectedTab)

  const { setUserTransitionDatas } = useUserStore()

  const setRegistorChange = async () => {
    const res = await form.validate()
    selectedTab === TabOption.Email
      ? setUserTransitionDatas({ resetEmail: res?.email })
      : setUserTransitionDatas({ resetPhone: res?.phone })
    link(`/modify-password?type=${selectedTab}`)
  }

  return (
    <div className={styles.scoped}>
      <div className="registor-image">
        <LazyImage src={`${oss_svg_image_domain_address}registor/register-main.png`} />
      </div>
      <div className="registor-form">
        <div className="registor-title">{t`features_user_operate_reset_password_index_ljq8qesixw`}</div>
        <div className="registor-tab">
          <div
            className={cn('registor-tab-item text-[#878787]', {
              'tab-item-selected': selectedTab === TabOption.Email,
              'bg-white': selectedTab === TabOption.Email,
            })}
            onClick={() => setSelectedTab(TabOption.Email)}
          >{t`features_chain_star_contact_index_32pdchge3uavncqnjohjs`}</div>
          <div
            className={cn('registor-tab-item text-[#878787]', {
              'tab-item-selected': selectedTab === TabOption.Phone,
              'bg-white': selectedTab === TabOption.Phone,
            })}
            onClick={() => setSelectedTab(TabOption.Phone)}
          >{t`features_user_operate_create_account_index_aicwbbewcl`}</div>
        </div>
        <div className="registor-form-submit">
          <Form layout="vertical" requiredSymbol={false} form={form} autoComplete="off">
            {selectedTab === TabOption.Email ? (
              <FormItem
                field="email"
                rules={[emailValidate()]}
                label={t`features_chain_star_contact_index_32pdchge3uavncqnjohjs`}
              >
                <Input
                  prefix={<Icon name="message_icon" className="mt-0.5" />}
                  placeholder={t`features_user_operate_create_account_index_ing73cyser`}
                />
              </FormItem>
            ) : (
              <FormItem
                field="phone"
                rules={[phoneValidate()]}
                label={t`features_user_operate_create_account_index_aicwbbewcl`}
              >
                <SelectPhone />
              </FormItem>
            )}
          </Form>
        </div>
        <div className="registor-agreement-button" onClick={setRegistorChange}>
          {t`user.field.reuse_23`}
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
