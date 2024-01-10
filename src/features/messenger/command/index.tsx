import { Form, Input, Message } from '@nbit/arco'
import { postV1ImCommandCheckUserCommandApiRequest } from '@/apis/command'
import { useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { link } from '@/helper/link'
import { useUserStore } from '@/store/user'
import LoadingElement from '@/components/loading-element'
import AddressBookNav from '../address-book/address-book-nav-component'
import styles from './index.module.css'

function Command() {
  const [linkUrl, setLinkUrl] = useState('')
  const { userInfo, setUserInfo } = useUserStore()
  const [isLoading, setISLoading] = useState<boolean>(false)
  const [isVerify, setIsVerify] = useState(false)
  const FormItem = Form.Item
  const [form] = Form.useForm()
  const TextArea = Input.TextArea
  const onSubmit = async value => {
    form.setFieldValue('command', '')
    setISLoading(true)
    const res = await postV1ImCommandCheckUserCommandApiRequest({ command: value?.command })
    setUserInfo({ ...userInfo, command: value?.command })
    const { isOk, data, message } = res || {}
    if (isOk && data) {
      setLinkUrl(data?.linkUrl || '')
      setIsVerify(!isVerify)
      setISLoading(false)
    }
    if (!data) {
      Message.error(message!)
      setISLoading(false)
    }
  }

  useEffect(() => {
    if (linkUrl.length !== 0) {
      link(linkUrl, { target: true })
      link('/messenger')
    }
  }, [linkUrl, isVerify])
  return (
    <div className={styles.command}>
      <AddressBookNav titleText={t`features_messenger_command_index_z3j9cwsyij`} />
      <Form
        form={form}
        onSubmit={value => {
          onSubmit(value)
        }}
      >
        <FormItem className={'area-box'} field="command">
          <TextArea
            className={'area-handle'}
            placeholder={t`features_messenger_command_index_pkepnlafc2`}
            style={{ height: '223px' }}
          />
        </FormItem>
        <div className="px-6">
          <button type="submit" className="button-box">
            {t`features_messenger_command_index_4gcofjsjvz`}
          </button>
        </div>
      </Form>
      {isLoading && (
        <div className="flex justify-center -mt-52">
          <LoadingElement />
        </div>
      )}
      {/* <div className="ml-6 mt-4 text-brand_color text-sm">{t`features_messenger_command_index_8y09hjr6nw`}</div> */}
    </div>
  )
}
export default Command
