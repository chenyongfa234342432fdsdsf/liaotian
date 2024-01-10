import { IIMMessageContentMediaZoomClosed } from '@/plugins/im/types'
import { t } from '@lingui/macro'
import { formatDate } from '@/helper/date'
import { IMessageProps } from '../base'

/** 格式化时间展示 */
function getDuration(ms: number) {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const date = new Date()
  date.setHours(0, 0, 0, ms)
  const h = formatDate(date.getTime(), 'hh')
  const m = formatDate(date.getTime(), 'mm')
  const s = formatDate(date.getTime(), 'ss')
  const values = {
    0: h,
    1: m,
    2: s,
  }
  if (hours > 0) {
    return t({
      id: 'features_messenger_chat_message_custom_call_end_0qjzqjxq6y',
      values,
    })
  }
  if (minutes > 0) {
    return t({
      id: 'features_messenger_chat_message_custom_call_end_w4wzlfwzcg',
      values,
    })
  }
  return t({
    id: 'features_messenger_chat_message_custom_call_end_ytq9kkjcfd',
    values,
  })
}

export function CallEnd({ data }: IMessageProps<undefined, IIMMessageContentMediaZoomClosed>) {
  const title = t`features_messenger_chat_message_custom_call_end_onibxwenii`
  const text = `${title}${getDuration(data?.time || 0)}`
  return <span className="text-text_color_02 message-text">{text}</span>
}
