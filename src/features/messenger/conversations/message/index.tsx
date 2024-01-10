// 会话中的消息展示组件

import { IIMAudioMessage, IIMConversation, IIMFileMessage, IIMMessage } from '@/plugins/im/types'
import classNames from 'classnames'
import HighLight from '@/components/highlight'
import { ZIMConversationType, ZIMMessageDirection, ZIMMessageType } from '@/plugins/im/constants'
import { t } from '@lingui/macro'
import { isAtMe } from '@/helper/message-mention'
import { useDisplayMessages } from '@/hooks/use-messages'
import { formatMediaTime, getExtraDataFromMessage, getFileIcon } from '@/helper/message'
import Icon from '@/components/icon'
import Emoji from '@/components/emoji'
import styles from './index.module.css'
import { CustomMessage } from '../../chat/message/custom'
import { RevokeMessage } from '../../chat/message/revoke'
import { useMessageTextArr } from '../../chat/message/text'

type IMessageProps = {
  message?: IIMMessage
  keyword?: string
  conversation?: IIMConversation
}
function TextMessage({ message, keyword }: IMessageProps) {
  const { textArr } = useMessageTextArr(message!)
  // 处理表情
  const emojiNodeArr = textArr.map((node, index) => {
    const parsed = Emoji({
      str: node,
    }) as string
    if (parsed.includes('<image')) {
      return (
        <span
          key={index}
          dangerouslySetInnerHTML={{
            __html: parsed,
          }}
        />
      )
    }

    return <HighLight key={index} text={node} keyword={keyword} highlightClassName="text-brand_color" />
  })
  return <>{emojiNodeArr.map(item => item)}</>
}
function ToTextMessage({ message }: IMessageProps) {
  if (!message) {
    return null
  }
  const map = {
    [ZIMMessageType.Image]: (
      <span className="flex items-center">
        <Icon name="icon_register_avatar" className="text-base mr-1" />
        {t`features_messenger_conversations_message_index_kqkestu3_e`}
      </span>
    ),
    [ZIMMessageType.File]: (
      <span className="flex items-center">
        <Icon
          name={getFileIcon((message as IIMFileMessage).fileName || (message as IIMFileMessage).fileLocalPath.name)}
          className="text-base mr-1"
        />
        <span className="message-text">{(message as IIMFileMessage)?.fileName}</span>
      </span>
    ),
    [ZIMMessageType.Video]: t`features_messenger_conversations_message_index_tdztmxc8jl`,
    [ZIMMessageType.Audio]: (
      <span className="flex items-center">
        <Icon name="icon_chat_voice" className="text-base mr-1" />
        {formatMediaTime((message as IIMAudioMessage)?.audioDuration || 0)}
      </span>
    ),
  }
  return map[message?.type as any] || <span>{t`features_messenger_conversations_message_index_lhk9n5q4qp`}</span>
}

const componentsMap = {
  [ZIMMessageType.Text]: TextMessage,
  [ZIMMessageType.Revoke]: RevokeMessage,
  // 自定义可以直接用组件
  [ZIMMessageType.Custom]: CustomMessage,
}

function ConversationMessage({ message, conversation, keyword }: IMessageProps) {
  const Component = componentsMap[message?.type as any]
  const isSelf = message?.direction === ZIMMessageDirection.Send
  const atMe = message && isAtMe(message) && !isSelf
  const isGroup = message?.conversationType === ZIMConversationType.Group
  const atText = t`features_messenger_conversations_message_index_nsw1uvqs8m`
  const extra = getExtraDataFromMessage(message)
  const senderName = isSelf ? t`features_messenger_chat_message_custom_group_join_tkus6zotkt` : extra.fromNickname

  return (
    <div className={classNames(styles['message-wrapper'])}>
      {isGroup && message && senderName && <span className="not-text-ellipsis">{senderName}: </span>}
      {atMe && <span className="!text-secondary_color not-text-ellipsis">{atText}</span>}
      {Component && message ? (
        <Component inConversation message={message} keyword={keyword} />
      ) : (
        <ToTextMessage conversation={conversation} message={message} />
      )}
    </div>
  )
}

export default ConversationMessage
