import Icon from '@/components/icon'
import { toggleConversationDoNotDisturb, toggleConversationPined } from '@/helper/conversation'
import { ZIMConversationNotificationStatus, ZIMConversationType } from '@/plugins/im/constants'
import { useImStore } from '@/store/im'
import { Dropdown, Menu } from '@nbit/arco'
import { deleteFriend, deleteGroup } from '@/helper/address-book'
import { clearConversationMessages } from '@/helper/message'
import { useAddressBookStore } from '@/store/address-book'
import { useMessengerRightDrawer } from '@/hooks/use-messenger-right-drawer'
import { t } from '@lingui/macro'
import { useState } from 'react'
import styles from './chat-header.module.css'
import { ChatInfo } from '../chat-information'
import ChatComplainModal from '../chat-information-modals/chat-complain-modal'

export function ChatHeaderMore() {
  const { setAddressBookList } = useAddressBookStore()
  const [open, close] = useMessengerRightDrawer()

  const { currentConversation } = useImStore()
  const isGroup = currentConversation?.type === ZIMConversationType.Group
  const togglePined = () => {
    toggleConversationPined(currentConversation!)
  }
  const toggleDisturb = () => {
    toggleConversationDoNotDisturb(currentConversation!)
  }
  const openBgSetting = () => {}
  const [complainVisible, setComplainVisible] = useState(false)
  const complain = () => {
    setComplainVisible(true)
  }

  const del = async () => {
    await (isGroup ? deleteGroup(currentConversation) : deleteFriend(currentConversation!))
  }
  const openContactInfo = () => {
    open(<ChatInfo onClose={close} />)
  }
  const clearMessages = async () => {
    clearConversationMessages(currentConversation!)
  }
  const menus = [
    {
      id: '1',
      text: isGroup
        ? t`features_messenger_chat_chat_header_more_tfwlzhzu_o`
        : t`features_messenger_chat_chat_header_more_oeq6rzlarr`,
      onClick: openContactInfo,
    },
    {
      id: '2',
      text: currentConversation?.isPinned
        ? t`features_messenger_chat_chat_header_more_hewxx7_mur`
        : t`features_messenger_chat_chat_header_more_fokapfv5cr`,
      onClick: togglePined,
    },
    {
      id: '3',
      hidden: !isGroup,
      text:
        currentConversation?.notificationStatus === ZIMConversationNotificationStatus.Notify
          ? t`features_messenger_chat_chat_header_more_imid_mlr_9`
          : t`features_messenger_chat_chat_header_more_wa5p4ypd3t`,
      onClick: toggleDisturb,
    },
    {
      id: '4',
      // 先不做
      hidden: true,
      text: t`features_messenger_chat_chat_header_more_qwqejeixxl`,
      onClick: openBgSetting,
    },
    {
      id: '5',
      text: t`features_messenger_chat_chat_header_more_id_dkarjtm`,
      onClick: clearMessages,
    },
    {
      id: '6',
      text: t`features_messenger_chat_chat_header_more_vegbnukvgl`,
      onClick: complain,
    },
    {
      id: '7',
      text: isGroup
        ? t`features_messenger_chat_chat_header_more_czjsnjjjam`
        : t`features_messenger_chat_chat_header_more_hpwm4idktc`,
      onClick: del,
    },
  ]

  return (
    <>
      <Dropdown
        trigger="click"
        position="br"
        triggerProps={{
          className: styles['header-more-dropdown-wrapper'],
        }}
        droplist={
          <Menu>
            {menus.map(menu => {
              if (menu.hidden) {
                return null
              }
              return (
                <Menu.Item key={menu.id} className="flex text-base" onClick={menu.onClick}>
                  <span>{menu.text}</span>
                </Menu.Item>
              )
            })}
          </Menu>
        }
      >
        <Icon className="text-2xl text-icon_color hover:text-brand_color" name="icon_chat_more" />
      </Dropdown>
      <ChatComplainModal visible={complainVisible} setvisible={setComplainVisible} />
    </>
  )
}
