import { IIMConversation } from '@/plugins/im/types'
import { Dropdown, Menu } from '@nbit/arco'
import classNames from 'classnames'
import { formatDate } from '@/helper/date'
import { ZIMConversationNotificationStatus, ZIMConversationType } from '@/plugins/im/constants'
import Icon from '@/components/icon'
import HighLight from '@/components/highlight'
import { useImStore } from '@/store/im'
import { toggleConversationDoNotDisturb, toggleConversationPined } from '@/helper/conversation'
import { deleteConversation, formatMessageTimeInConversation } from '@/helper/message'
import { useConversationWithRemark } from '@/helper/address-book'
import ChatAvatar from '@/components/chat-avatar'
import { t } from '@lingui/macro'
import { useMessengerStore } from '@/store/messenger'
import ConversationMessage from './message'
import styles from './conversation.module.css'

export type IConversationProps = {
  conversation: IIMConversation
  children?: React.ReactNode
  isSelected?: boolean
  /** 传入了关键词时会高亮 */
  keyword?: string
}

export function Conversation({ conversation: propsConversation, keyword }: IConversationProps) {
  const conversation = useConversationWithRemark(propsConversation)
  const { setCurrentConversation, currentConversation } = useImStore()
  const { setSystemNotificationsVisible } = useMessengerStore()
  const toChat = () => {
    setSystemNotificationsVisible(false)
    setCurrentConversation({ ...conversation })
  }

  const isSelected = conversation?.conversationID === currentConversation?.conversationID
  const setPined = () => {
    toggleConversationPined(conversation)
  }
  const setDoNotDisturb = () => {
    toggleConversationDoNotDisturb(conversation)
  }
  const delConversation = async () => {
    deleteConversation(conversation)
  }
  const iconClassName = 'text-icon_color text-xl mr-3'
  const menuClassName = 'flex items-center !text-base'
  const isMute = conversation.notificationStatus === ZIMConversationNotificationStatus.DoNotDisturb

  return (
    <Dropdown
      trigger="contextMenu"
      position="bl"
      droplist={
        <Menu>
          <Menu.Item className={menuClassName} key="1" onClick={setPined}>
            <Icon className={iconClassName} name={conversation.isPinned ? 'icon_chat_top' : 'icon_chat_top'} />
            {conversation.isPinned
              ? t`features_messenger_chat_chat_header_more_hewxx7_mur`
              : t`features_messenger_conversations_conversation_czjswybwxa`}
          </Menu.Item>
          {conversation.type === ZIMConversationType.Group && (
            <Menu.Item className={menuClassName} onClick={setDoNotDisturb} key="2">
              <Icon
                className={iconClassName}
                name={
                  conversation.notificationStatus === ZIMConversationNotificationStatus.DoNotDisturb
                    ? 'icon_chat_do_not_disturb'
                    : 'icon_chat_do_not_disturb'
                }
              />
              {isMute
                ? t`features_messenger_chat_chat_header_more_wa5p4ypd3t`
                : t`features_messenger_conversations_conversation_j3slbpuceq`}
            </Menu.Item>
          )}
          <Menu.Item className={menuClassName} key="3" onClick={delConversation}>
            <Icon className={iconClassName} name="icon_chat_delete1" />
            <span>{t`features_messenger_chat_message_actions_y9zlvhqoie`}</span>
          </Menu.Item>
        </Menu>
      }
    >
      <div
        className={classNames(styles['conversation-wrapper'], {
          'is-selected': isSelected,
          'is-mute': isMute,
        })}
        onClick={toChat}
      >
        <div className="conversation-left">
          <div className="relative">
            <ChatAvatar
              size={50}
              src={conversation.conversationAvatarUrl}
              isGroup={conversation.type === ZIMConversationType.Group}
            />
            {conversation.unreadMessageCount > 0 && <div className="unread">{conversation.unreadMessageCount}</div>}
          </div>
        </div>
        <div className="conversation-right">
          <div className="flex justify-between items-center mb-1">
            <div className="conversation-name">
              <HighLight text={conversation.conversationName} keyword={keyword} highlightClassName="text-brand_color" />
            </div>
            <div className="text-text_color_02">
              {conversation.lastMessage?.timestamp
                ? formatMessageTimeInConversation(conversation.lastMessage?.timestamp)
                : ''}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <ConversationMessage conversation={conversation} keyword={keyword} message={conversation.lastMessage} />
            {(conversation.isPinned ||
              conversation.notificationStatus === ZIMConversationNotificationStatus.DoNotDisturb) && (
              <div className="ml-4 text-base/5 flex">
                {conversation.isPinned && <Icon name="icon_chat_top" className="text-icon_color" />}
                {conversation.notificationStatus === ZIMConversationNotificationStatus.DoNotDisturb && (
                  <Icon name="icon_chat_do_not_disturb" className="text-icon_color ml-4" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Dropdown>
  )
}
