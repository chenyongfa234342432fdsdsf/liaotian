import Icon from '@/components/icon'
import { Input, Modal } from '@nbit/arco'
import { useDebounce, useUpdateEffect } from 'ahooks'
import { useMemo, useState } from 'react'
import { IIMConversation } from '@/plugins/im/types'
import { friendToConversation, groupToConversation, useSearchConversations } from '@/helper/conversation'
import { useSearchContacts } from '@/helper/address-book'
import { t } from '@lingui/macro'
import styles from './index.module.css'
import { Recent } from './recent'
import { Friend } from './friend'
import { Group } from './group'
import { renderContactItems } from './base'

export type ISelectContactProps = {
  onClose: () => void
  visible: boolean
  onConfirm: (selectedContacts: IIMConversation[]) => void
}

enum ModelEnum {
  none = 'none',
  group = 'group',
  friend = 'friend',
}

/** 选择联系人，用于转发消息、创建群聊、群发助手的好友选择 */
function SelectContact(props: ISelectContactProps) {
  const [keyword, setKeyword] = useState('')
  const debounceKeyword = useDebounce(keyword, {
    wait: 300,
  })
  const [focused, setFocused] = useState(false)
  const [mode, setMode] = useState(ModelEnum.none)

  const [selectedContacts, setSelectedContacts] = useState<IIMConversation[]>([])

  const onChange = (value: IIMConversation) => {
    setSelectedContacts(prev => {
      if (prev.some(item => item.conversationID === value.conversationID)) {
        return prev.filter(item => item.conversationID !== value.conversationID)
      }
      return [...prev, value]
    })
  }

  useUpdateEffect(() => {
    setSelectedContacts([])
    setKeyword('')
    setMode(ModelEnum.none)
  }, [props.visible])

  const onOk = () => {
    props.onConfirm(selectedContacts)
  }
  const searchedContacts = useSearchConversations(debounceKeyword)

  return (
    <Modal
      closeIcon={null}
      title={null}
      footer={null}
      visible={props.visible}
      mountOnEnter
      unmountOnExit
      wrapClassName={styles['select-modal-wrapper']}
    >
      <div className={styles['select-root-wrapper']}>
        <div className="header">
          {mode === ModelEnum.none && (
            <>
              <Icon onClick={props.onClose} className="icon" name="icon_chat_close" />
              <span>{t`features_select_contact_index_7rccj5bohd`}</span>
            </>
          )}
          {mode === ModelEnum.group && (
            <>
              <Icon onClick={() => setMode(ModelEnum.none)} className="icon" name="a-Notselected" />
              <span>{t`features_select_contact_index_wtbrncd1b1`}</span>
            </>
          )}
          {mode === ModelEnum.friend && (
            <>
              <Icon onClick={() => setMode(ModelEnum.none)} className="icon" name="a-Notselected" />
              <span>{t`features_select_contact_index__diuat3dso`}</span>
            </>
          )}
        </div>
        <div className="px-6 py-4">
          <Input
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={setKeyword}
            allowClear
            placeholder={t`features_group_components_search_input_index_tq98cmscdb`}
            className="with-search"
            prefix={<Icon name="icon_chat_search" className="text-icon_color text-xl/5" />}
          />
        </div>
        {debounceKeyword ? (
          <div className="flex-1 overflow-y-auto">
            {renderContactItems({
              conversations: searchedContacts,
              selectedContacts,
              onChange,
              keyword: debounceKeyword,
            })}
          </div>
        ) : (
          <>
            {mode === ModelEnum.none && (
              <>
                <div className="category-item with-border" onClick={() => setMode(ModelEnum.group)}>
                  <div className="left">
                    <Icon name="icon_address_book_group" className="icon" />
                  </div>
                  <div className="right">
                    <span>{t`features_select_contact_index_ursogloihf`}</span>

                    <Icon className="text-icon_color" name="icon_chat_arrow" />
                  </div>
                </div>
                <div className="category-item" onClick={() => setMode(ModelEnum.friend)}>
                  <div className="left">
                    <Icon name="icon_address_book_new_friend" className="icon" />
                  </div>
                  <div className="right">
                    <span>{t`features_select_contact_index_j64ti6fb_2`}</span>
                    <Icon className="text-icon_color" name="icon_chat_arrow" />
                  </div>
                </div>
                <div className="text-brand_color px-6 pt-4 pb-2">{t`features_select_contact_index_4jfma2vn7q`}</div>
              </>
            )}
            <div className="flex-1 overflow-y-auto">
              {mode === ModelEnum.none && <Recent selectedContacts={selectedContacts} onChange={onChange} />}
              {mode === ModelEnum.friend && <Friend selectedContacts={selectedContacts} onChange={onChange} />}
              {mode === ModelEnum.group && <Group selectedContacts={selectedContacts} onChange={onChange} />}
            </div>
          </>
        )}

        {selectedContacts.length > 0 && (
          <div className="actions-wrapper">
            <div className="names">
              {selectedContacts
                .map(item => item.conversationName)
                .join(t`features_messenger_chat_message_custom_group_join_cwrwuajmcz`)}
            </div>
            <div className="button" onClick={onOk}>
              <Icon name="icon_chat_send" className="text-button_text_01 text-2xl" />
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default SelectContact
