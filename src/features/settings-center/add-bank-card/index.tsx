import Icon from '@/components/icon'
import { usePageContext } from '@/hooks/use-page-context'
import { Form, Input, Modal } from '@nbit/arco'
import { getBindAccountRoutePath } from '@/constants/my-wallet'
import { CommonModal } from '@/components/common-modal'
import { useToggle } from 'ahooks'
import {
  postV1ImChatUserBankCardAddApiRequest,
  postV1ImChatUserBankCardDeleteApiRequest,
  postV1ImChatUserBankCardModifyApiRequest,
} from '@/apis/settings-center/wallet'
import { YapiPostV1ImChatUserBankCardAddApiRequest } from '@/typings/yapi/ImChatUserBankCardAddV1PostApi'
import { link } from '@/helper/link'
import { useBindAccountList } from '@/hooks/use-bind-account-list'
import { find } from 'lodash'
import { useEffect, useMemo } from 'react'
import { t } from '@lingui/macro'
import commonModalStyles from '@/components/common-modal/index.module.css'
import { filterOnlyNumbers } from '@/helper/input'
import NavigationBar from '../navigation-bar'
import styles from './index.module.css'

export default function AddBankCard() {
  const ctx = usePageContext()
  const editingId = ctx.urlParsed?.search?.id ?? ''
  const [visible, { toggle }] = useToggle()
  const { bankLists } = useBindAccountList()
  const [form] = Form.useForm()

  const cardInfo = useMemo(() => find(bankLists, i => String(i.id) === String(editingId)), [bankLists, editingId])

  useEffect(() => {
    if (cardInfo) {
      form.setFieldsValue(cardInfo)
    }
  }, [cardInfo, form])

  const handleSubmit = async () => {
    toggle()
    const params = form.getFieldsValue()
    if (editingId) {
      const res = await postV1ImChatUserBankCardModifyApiRequest({ ...params, id: editingId })
      if (res.isOk) {
        link(getBindAccountRoutePath())
      }
    } else {
      const res = await postV1ImChatUserBankCardAddApiRequest(params as YapiPostV1ImChatUserBankCardAddApiRequest)
      if (res.isOk) {
        link(getBindAccountRoutePath())
      }
    }
  }

  const cardNo = Form.useWatch('cardNo', form)
  const cardHolder = Form.useWatch('cardHolder', form)
  const bankName = Form.useWatch('bankName', form)
  const openBank = Form.useWatch('openBank', form)

  const isShowSubmitBtn = cardNo && cardHolder && bankName && openBank

  const handleDelete = async () => {
    Modal.confirm({
      title: t`features_settings_center_add_bank_card_index_1caluqxfkq`,
      content: t`features_settings_center_add_bank_card_index_trwzx_wo8t`,
      closable: false,
      className: commonModalStyles.scoped,
      onOk: async () => {
        const res = await postV1ImChatUserBankCardDeleteApiRequest({ id: editingId })
        if (res.isOk) {
          link(getBindAccountRoutePath())
        }
      },
    })
  }

  return (
    <div className={styles.scoped}>
      <NavigationBar
        label={
          editingId
            ? t`features_settings_center_add_bank_card_index_pu7szbpo1n`
            : t`features_settings_center_add_bank_card_index_exccjj3i9b`
        }
        url={getBindAccountRoutePath()}
        extra={
          editingId ? <Icon onClick={handleDelete} className="delete-icon" name="icon_chat_messages_delete" /> : null
        }
      />
      <div className="flex-1 overflow-y-scroll">
        <Form requiredSymbol={false} form={form} className="px-6 bg-card_bg_color_03">
          <Form.Item
            formatter={filterOnlyNumbers}
            label={t`features_settings_center_add_bank_card_index_wpqdiwczvi`}
            field="cardNo"
          >
            <Input placeholder={t`features_settings_center_add_bank_card_index_s4u8icshyt`} />
          </Form.Item>
          <Form.Item label={t`features_settings_center_add_bank_card_index_yie63hl_jf`} field="cardHolder">
            <Input placeholder={t`features_settings_center_add_bank_card_index_ifrm6jjnok`} />
          </Form.Item>
          <Form.Item label={t`features_settings_center_add_bank_card_index_uef3vohmsv`} field="bankName">
            <Input placeholder={t`features_settings_center_add_bank_card_index_zudl1cb5tg`} />
          </Form.Item>
          <Form.Item label={t`features_settings_center_add_bank_card_index_xvqdmz2hjz`} field="openBank">
            <Input placeholder={t`features_settings_center_add_bank_card_index_e3awv2hoaa`} />
          </Form.Item>
        </Form>
        {isShowSubmitBtn ? (
          <div
            onClick={toggle}
            className="my-6 text-2xl mx-auto w-11 h-11 rounded-full bg-brand_color flex items-center justify-center"
          >
            <Icon name="icon_chat_unread" className="submit-icon" />
          </div>
        ) : null}

        <CommonModal title={t`helper_message_fugvl05ct4`} visible={visible} onCancel={toggle} onOk={handleSubmit}>
          {t`features_settings_center_add_bank_card_index_ls9t4lb1mt`}
        </CommonModal>
      </div>
    </div>
  )
}
