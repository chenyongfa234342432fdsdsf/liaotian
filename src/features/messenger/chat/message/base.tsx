import Icon from '@/components/icon'
import { popBoxConfirm } from '@/components/pop-box'
import { formatMessageTimeInChat, reSendMessage } from '@/helper/message'
import {
  ZIMConversationType,
  ZIMMessageDirection,
  ZIMMessageReceiptStatus,
  ZIMMessageSentStatus,
} from '@/plugins/im/constants'
import { IIMMessage } from '@/plugins/im/types'
import { useImStore } from '@/store/im'
import { useMessengerStore } from '@/store/messenger'
import { t } from '@lingui/macro'
import { Spin } from '@nbit/arco'
import { useEffect, useState } from 'react'
import { atMsgMapToMentions } from '@/helper/message-mention'
import { GroupMessageReceiptStatus } from './group-message-receipt-status'

export type IMessageProps<T = IIMMessage, P = any> = {
  message: T extends IIMMessage ? T : IIMMessage
  className?: string
  setHeight?: (height: number) => void
  preMessage?: IIMMessage
  nextMessage?: IIMMessage
  /** 自定义消息解析时使用 */
  data?: P
  inConversation?: boolean
  messagesWrapperRef?: React.RefObject<HTMLDivElement>
  /** 是否已在视图中出现过，并不是一直在视图中 */
  inView?: boolean
}
// 内容固定，样式随消息变化
export function TimeAndReadStatus({ message }: { message: IIMMessage }) {
  const { currentConversation } = useImStore()
  const isSelf = message.direction === ZIMMessageDirection.Send
  const isRead = message.receiptStatus === ZIMMessageReceiptStatus.Done
  const reSend = async () => {
    await popBoxConfirm(t`helper_message_fugvl05ct4`, t`features_messenger_chat_message_base__tuj3a9sij`, {
      okText: t`features_messenger_chat_message_base_gcwmza3rne`,
    })
    reSendMessage(message, currentConversation!)
  }

  const isGroup = message.conversationType === ZIMConversationType.Group
  const ats = atMsgMapToMentions(message).map(item => Number(item.id))

  const sentStatus =
    message.sentStatus === ZIMMessageSentStatus.Sending ? (
      <Spin className="-translate-y-0.5" size={12} element={null} />
    ) : message.sentStatus === ZIMMessageSentStatus.Success ? (
      isGroup ? (
        <GroupMessageReceiptStatus atMembers={ats} message={message} popoverClassName="ml-[-100px]" />
      ) : isRead ? (
        <Icon name="icon_chat_have_read" className="text-base -translate-y-px text-brand_color" />
      ) : (
        <Icon name="icon_set_confirm" className="text-sm -translate-y-px" />
      )
    ) : (
      <Icon onClick={reSend} name="icon_chat_unable_to_send" className="text-base -translate-y-px text-icon_color" />
    )

  return (
    <span className="inline-flex items-center">
      {formatMessageTimeInChat(message.timestamp)}
      {isSelf && <span className="ml-1">{sentStatus}</span>}
    </span>
  )
}

const defaultImageWidth = 200
const defaultImageHeight = 300

type IUseImageSizeParams = {
  originWidth?: number
  originHeight?: number
  defaultWidth?: number
  defaultHeight?: number
  src?: string
  imageMaxWidth?: number
  inView?: boolean
}
export function useImageSize({
  originWidth,
  originHeight,
  defaultWidth = defaultImageWidth,
  defaultHeight = defaultImageHeight,
  src,
  imageMaxWidth: propsImageMaxWidth,
  inView,
}: IUseImageSizeParams) {
  // 给图片一个精准的高度
  const padding = 8
  const { imageMaxWidth } = useMessengerStore()
  const maxWidth = (propsImageMaxWidth || imageMaxWidth) - padding
  const [messageWidth, setMessageWidth] = useState(originWidth || defaultWidth)
  const [messageHeight, setMessageHeight] = useState(originHeight || defaultHeight)
  let imageWidth = messageWidth
  if (imageWidth > maxWidth - padding) {
    imageWidth = maxWidth
  }
  const height = (messageHeight / messageWidth) * imageWidth

  const [imgEl] = useState(document.createElement('img'))

  useEffect(() => {
    // 有了就不用再请求了，否则不准
    if (originWidth || !src || inView === false) {
      return
    }
    imgEl.src = src
    imgEl.onload = () => {
      // 原始宽高
      setMessageWidth(imgEl.naturalWidth)
      setMessageHeight(imgEl.naturalHeight)
    }
  }, [src, inView])

  return {
    width: imageWidth,
    height,
    containerWidth: imageWidth + padding,
    containerHeight: height + padding,
  }
}
