import { ZIMMessage } from 'zego-zim-web'
import {
  ZIMConversationType,
  ZIMMessageReceiptStatus,
  ZIMMessageDirection,
  ZIMMessageType,
} from '@/plugins/im/constants'
import Icon from '@/components/icon'
import dayjs from 'dayjs'
import { i18n } from '@lingui/core'
import { formatDate } from '@/helper/date'
import { t } from '@lingui/macro'
import HighLight from '@/components/highlight'
import { IIMFileMessage } from '@/plugins/im/types'
import { getExtraDataFromMessage } from '@/helper/message'
import style from './message-list.module.css'
import { GroupMessageReceiptStatus } from '../chat/message/group-message-receipt-status'
import { FileMessage } from '../chat/message/file'

export function MessageList(props: { messages: ZIMMessage[]; keyword: string }) {
  return (
    <>
      {props.messages.map(m => (
        <List key={m.messageID} message={m} keyword={props.keyword} />
      ))}
    </>
  )
}

function List(props: { message: ZIMMessage; keyword: string }) {
  const { timestamp } = props.message
  const isSelf = props.message.direction === ZIMMessageDirection.Send
  const isGroup = props.message.conversationType === ZIMConversationType.Group
  const extendData = getExtraDataFromMessage(props.message)
  return (
    <div className={style.list}>
      <div className="text-text_color_02 text-sm">{searchMessageTimeFormat(timestamp)}</div>
      <div className={props.message.type === ZIMMessageType.Text ? 'text-message' : ''}>
        <div className="flex items-center shrink-0">
          {isSelf &&
            (isGroup ? (
              <GroupMessageReceiptStatus className="mr-1" message={props.message} />
            ) : (
              <PeerReceiptStatus message={props.message} />
            ))}
          <span className="mr-1 shrink-0">{extendData.fromNickname}:</span>
        </div>
        <Message message={props.message} keyword={props.keyword} isGroup={isGroup} />
      </div>
    </div>
  )
}
function Message(props: { message: ZIMMessage; keyword: string; isGroup: boolean }) {
  const { message } = props
  const type = message.type

  return (
    <>
      {type === ZIMMessageType.Text && (
        <HighLight
          text={props.message.message as string}
          keyword={props.keyword}
          highlightClassName="text-brand_color"
          className="text-ellipsis overflow-hidden whitespace-nowrap"
        />
      )}
      {type === ZIMMessageType.File && (
        <FileMessage className="file-message" hideTime message={props.message as IIMFileMessage} />
      )}
    </>
  )
}

function PeerReceiptStatus(props: { message: ZIMMessage }) {
  const isRead = props.message.receiptStatus === ZIMMessageReceiptStatus.Done
  return isRead ? (
    <Icon name="icon_chat_have_read" className="text-base -translate-y-px text-brand_color mr-1" />
  ) : (
    <Icon name="icon_set_confirm" className="text-sm -translate-y-px mr-1 text-icon_color " />
  )
}

function isSameWeek(time: number) {
  const currentDate = dayjs()
  const targetDate = dayjs(time)
  return currentDate.isSame(targetDate, 'week')
}
function searchMessageTimeFormat(time: number) {
  if (dayjs().isSame(time, 'day')) {
    return formatDate(time, 'HH:mm')
  }
  if (dayjs().subtract(1, 'day').isSame(time, 'day')) {
    return t`helper_message_0jp5jdxnde`
  }
  if (isSameWeek(time)) {
    return i18n.date(new Date(time), {
      weekday: 'long',
    })
  }
  if (dayjs().isSame(time, 'year')) {
    return i18n.date(new Date(time), { month: 'long', day: 'numeric' })
  } else {
    return i18n.date(new Date(time), { year: 'numeric', month: 'long', day: 'numeric' })
  }
}
