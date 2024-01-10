import { Button, Message, Modal } from '@nbit/arco'
import { ComponentProps, useEffect, useState } from 'react'
import { postV1ImChatImBlockListBlockApiRequest } from '@/apis/blacklist'
import { baseImStore } from '@/store/im'
import { clearConversationMessages } from '@/helper/message'
import { deleteGroup, postV1ImChatGroupExitGroupApiRequest } from '@/apis/group'
import { t } from '@lingui/macro'
import styles from './index.module.css'

function CommonAlertModal({
  title,
  text,
  visible,
  setvisible,
  onOk,
}: {
  text: string
  title: string
  visible: boolean
  setvisible: (state: boolean) => void
  onOk?: () => void
}) {
  const [isVisible, setisVisible] = useState(visible)

  useEffect(() => {
    setisVisible(visible)
  }, [visible])

  useEffect(() => {
    setvisible(isVisible)
  }, [isVisible])

  return (
    <Modal
      closable={false}
      className={styles['blacklist-modal']}
      visible={isVisible}
      onCancel={() => setisVisible(false)}
      title={title}
      footer={() => (
        <>
          <Button className={'ml-auto'} type="outline" onClick={() => setisVisible(false)}>
            {t`features_group_components_comfirm_btn_pop_index_2sr1guu0iy`}
          </Button>
          <Button
            onClick={() => {
              onOk && onOk()
              setisVisible(false)
            }}
            type="primary"
          >{t`components_pop_box_index_xjmp7i51ci`}</Button>
        </>
      )}
    >
      <div>{text}</div>
    </Modal>
  )
}
export function ClearChatModal(props: Omit<ComponentProps<typeof CommonAlertModal>, 'text' | 'title'>) {
  return (
    <CommonAlertModal
      title={t`features_messenger_chat_chat_header_more_id_dkarjtm`}
      text={t`features_messenger_chat_information_modals_alert_modals_index_pffcnkd29u`}
      {...props}
      onOk={() => {
        const { currentConversation } = baseImStore.getState()
        currentConversation && clearConversationMessages(currentConversation)
      }}
    />
  )
}
