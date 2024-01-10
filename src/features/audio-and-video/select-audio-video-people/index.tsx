import Icon from '@/components/icon'
import { Input, Modal, Checkbox } from '@nbit/arco'
import { useUpdateEffect } from 'ahooks'
import classNames from 'classnames'
import { useState, useRef } from 'react'
import { t } from '@lingui/macro'
import { defaultCheckboxRender } from '@/components/checkbox'
import HighLight from '@/components/highlight'
import { cloneDeep } from 'lodash'
import { ImChatGroupMemberListData } from '@/typings/apis/group'
import { IIMConversation } from '@/plugins/im/types'
import ChatAvatar from '@/components/chat-avatar'
import ListEmpty from '@/components/list-empty'
import { useUserStore } from '@/store/user'
import styles from './index.module.css'

export type ISelectContactProps = {
  onConfirm: (selectedContacts: ImChatGroupMemberListData[]) => void
  visibleAudioVideoPeople: boolean
  setVisibleAudioVideoPeople: React.Dispatch<React.SetStateAction<boolean>>
  currentConversation: IIMConversation | undefined
  groupMembersList: ImChatGroupMemberListData[]
}

function SelectAudioVideoPeople(props: ISelectContactProps) {
  const { onConfirm, visibleAudioVideoPeople, setVisibleAudioVideoPeople, groupMembersList } = props

  const { userInfo } = useUserStore()

  const [keyword, setKeyword] = useState('')

  const groupMembersListRef = useRef<(ImChatGroupMemberListData & { filterNum?: number })[]>([])

  const [selectedgroupMembersContactsList, setSelectedgroupMembersContactsList] = useState<ImChatGroupMemberListData[]>(
    []
  )

  console.log(groupMembersList, 'groupMembersListgroupMembersListgroupMembersList')

  const [selectedContacts, setSelectedContacts] = useState<ImChatGroupMemberListData[]>([])

  useUpdateEffect(() => {
    !visibleAudioVideoPeople && setSelectedContacts([])
  }, [visibleAudioVideoPeople])

  const onOk = () => {
    onConfirm(selectedContacts)
    setVisibleAudioVideoPeople(false)
  }

  const setSelectedGroupPeople = item => {
    const selectedContactsItemIndex = selectedContacts?.findIndex(contactsItems => contactsItems?.uid === item?.uid)
    if (selectedContactsItemIndex !== -1) {
      selectedContacts?.splice(selectedContactsItemIndex, 1)
      setSelectedContacts([...selectedContacts])
    } else {
      setSelectedContacts([...selectedContacts, item])
    }
  }

  const getSelectedContactsBoolean = item => {
    return !!selectedContacts?.find(contactsItems => contactsItems?.uid === item?.uid)
  }

  useUpdateEffect(() => {
    const groupMembersListClone = cloneDeep(groupMembersList)
    const groupMembersListRefFindIndex = groupMembersListClone?.findIndex(item => item?.uid === userInfo?.uid)
    groupMembersListClone?.splice(groupMembersListRefFindIndex, 1)
    groupMembersListRef.current = groupMembersListClone
    setSelectedgroupMembersContactsList(groupMembersListRef.current)
  }, [groupMembersList])

  const setPaythodChangeInput = e => {
    if (groupMembersListRef.current && e) {
      const groupMembersInputList = groupMembersListRef.current
        .filter(item => item.nickName.indexOf(e) !== -1)
        .sort((a, b) => {
          const codeKeyRemark = a.nickName?.toLowerCase()
          const countryValueRemark = b.nickName?.toLowerCase()
          if (codeKeyRemark === countryValueRemark) return 0
          return codeKeyRemark < countryValueRemark ? -1 : 1
        })
        .map(item => {
          item.filterNum = item.nickName.indexOf(e)
          return item
        })
        .sort((a, b) => {
          if (a.nickName && b?.nickName && a?.filterNum && b?.filterNum) {
            return a.filterNum - b.filterNum
          }
          return 0
        })
      setSelectedgroupMembersContactsList(groupMembersInputList)
    } else {
      setSelectedgroupMembersContactsList(groupMembersListRef.current)
    }
    setKeyword(e)
  }

  return (
    <Modal
      closeIcon={null}
      title={null}
      footer={null}
      visible={visibleAudioVideoPeople}
      mountOnEnter
      unmountOnExit
      wrapClassName={styles['select-modal-wrapper']}
    >
      <div className={styles['select-root-wrapper']}>
        <div className="header">
          <Icon
            onClick={() => {
              setVisibleAudioVideoPeople(false)
            }}
            className="icon"
            name="icon_chat_close"
          />
          <span>{t`features_group_group_members_manage_index_4zzexhrrt3`}</span>
        </div>
        <div className="px-6 py-4">
          <Input
            onChange={setPaythodChangeInput}
            allowClear
            placeholder={t`features_group_components_search_input_index_tq98cmscdb`}
            className="with-search"
            prefix={<Icon name="icon_chat_search" className="text-icon_color text-xl/5" />}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {selectedgroupMembersContactsList?.length > 0 ? (
            selectedgroupMembersContactsList?.map(item => {
              return (
                <div
                  className={classNames(styles['conversation-wrapper'], {
                    'is-selected': getSelectedContactsBoolean(item),
                  })}
                  key={item?.uid}
                  onClick={() => setSelectedGroupPeople(item)}
                >
                  <Checkbox className="mr-6" checked={getSelectedContactsBoolean(item)}>
                    {defaultCheckboxRender}
                  </Checkbox>
                  <div className="conversation-left">
                    <ChatAvatar size={50} src={item?.avatarPath} />
                  </div>
                  <div className="conversation-right">
                    <div className="flex justify-between items-center mb-1">
                      <div className="conversation-name">
                        <HighLight text={item?.nickName} keyword={keyword} highlightClassName="text-brand_color" />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="py-10">
              <ListEmpty />
            </div>
          )}
        </div>

        {selectedContacts.length > 0 && (
          <div className="actions-wrapper">
            <span>
              {t`features_audio_and_video_select_audio_video_people_index_uzz5hnlxfo`} {selectedContacts.length}{' '}
              {t`features_audio_and_video_select_audio_video_people_index_gn3g7cxiig`}
            </span>
            <div className="button" onClick={onOk}>
              <Icon name="icon_set_confirm" className="text-button_text_01 text-2xl" />
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default SelectAudioVideoPeople
