import { IIMConversation } from '@/plugins/im/types'
import LazyImage from '@/components/lazy-image'
import { Avatar, Checkbox, Dropdown, Menu } from '@nbit/arco'
import classNames from 'classnames'
import HighLight from '@/components/highlight'
import ListEmpty from '@/components/list-empty'
import ChatAvatar from '@/components/chat-avatar'
import { ZIMConversationType } from '@/plugins/im/constants'
import { defaultCheckboxRender } from '@/components/checkbox'
import styles from './base.module.css'

export type IChildProps = {
  selectedContacts: IIMConversation[]
  onChange(selectedContact: IIMConversation): void
}

export type IContactItemProps = {
  conversation: IIMConversation
  isSelected?: boolean
  onChange: () => void
  /** 传入了关键词时会高亮 */
  keyword?: string
}

export function ContactItem({ conversation, keyword, isSelected, onChange }: IContactItemProps) {
  return (
    <div
      className={classNames(styles['conversation-wrapper'], {
        'is-selected': isSelected,
      })}
      onClick={onChange}
    >
      <Checkbox className="mr-6" checked={isSelected}>
        {defaultCheckboxRender}
      </Checkbox>
      <div className="conversation-left">
        <ChatAvatar
          isGroup={conversation.type === ZIMConversationType.Group}
          size={50}
          src={conversation.conversationAvatarUrl}
        />
      </div>
      <div className="conversation-right">
        <div className="flex justify-between items-center mb-1">
          <div className="conversation-name">
            <HighLight
              text={conversation.conversationName || ' '}
              keyword={keyword}
              highlightClassName="text-brand_color"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function renderContactItems({
  conversations,
  selectedContacts,
  onChange,
  keyword,
}: IChildProps & { conversations: IIMConversation[]; keyword?: string }) {
  if (conversations.length === 0) {
    return (
      <div className="py-10">
        <ListEmpty />
      </div>
    )
  }
  return conversations.map(conversation => {
    const isSelected = selectedContacts.some(item => item.conversationID === conversation.conversationID)
    const onChangeItem = () => {
      onChange(conversation)
    }
    return (
      <ContactItem
        conversation={conversation}
        key={conversation.conversationID}
        isSelected={isSelected}
        onChange={onChangeItem}
        keyword={keyword}
      />
    )
  })
}
