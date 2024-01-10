import classNames from 'classnames'
import { MENTION_ALL_ID, atMsgMapToMentions } from '@/helper/message-mention'
import { ReactNode } from 'react'
import { useUserStore } from '@/store/user'
import { isSameUid } from '@/helper/address-book'
import { useMessengerStore } from '@/store/messenger'
import { t } from '@lingui/macro'
import { IIMMessage } from '@/plugins/im/types'
import Emoji from '@/components/emoji'
import { IMessageProps, TimeAndReadStatus } from './base'
import styles from './index.module.css'

export function useMessageTextArr(message: IIMMessage) {
  const mentions = atMsgMapToMentions(message)
  const messageText = message.message as string
  const { userInfo } = useUserStore()
  const { openContactInfo } = useMessengerStore()
  const textArr: string[] = []
  const nodeArr: ReactNode[] = []
  let index = 0

  mentions.forEach(mention => {
    const isSelf = isSameUid(userInfo.uid, mention.id) || mention.id === MENTION_ALL_ID
    const preText = messageText.slice(index, mention.start)
    textArr.push(preText)
    nodeArr.push(preText)
    const onClick = () => {
      if (!isSelf) {
        openContactInfo(mention.id)
      }
    }
    const currentText =
      mention.id === MENTION_ALL_ID
        ? `@${t`features_messenger_chat_input_input_textarea_pdwrrndr4p`}`
        : messageText.slice(mention.start, mention.end)
    textArr.push(currentText)
    nodeArr.push(
      <span
        onClick={onClick}
        className={classNames('text-brand_color', {
          'cursor-pointer': !isSelf,
        })}
        key={mention.start}
      >
        {currentText}
      </span>
    )
    index = mention.end
  })
  const endText = messageText.slice(index, messageText.length)
  textArr.push(endText)
  nodeArr.push(endText)

  return {
    textArr,
    nodeArr,
  }
}

export function TextMessage({ message, className }: IMessageProps) {
  const { nodeArr } = useMessageTextArr(message)
  // 处理表情
  const emojiNodeArr = nodeArr.map((node, index) => {
    if (typeof node === 'string') {
      return (
        <span
          key={index}
          dangerouslySetInnerHTML={{
            __html: Emoji({
              str: node,
            }) as string,
          }}
        />
      )
    }
    return node
  })
  return (
    <div className={classNames(styles['text-message-wrapper'], className)}>
      <span>{emojiNodeArr}</span>
      <span className="time">{<TimeAndReadStatus message={message} />}</span>
    </div>
  )
}
