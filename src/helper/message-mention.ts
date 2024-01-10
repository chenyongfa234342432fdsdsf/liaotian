import { IIMMessage } from '@/plugins/im/types'
import { baseUserStore } from '@/store/user'
import { ZIMMessageDirection } from '@/plugins/im/constants'
import { getExtraDataFromMessage } from './message'
import { isSameUid } from './address-book'

export const MENTION_ALL_ID = 'all'

/** 额外格式转换为艾特，只检查文本消息 */
export function atMsgMapToMentions(message: IIMMessage) {
  const { atMsgMap = '' } = getExtraDataFromMessage(message)
  return (
    atMsgMap
      ?.split?.(';')
      .map(item => {
        const [id, start, end] = item.split(',')
        return {
          id,
          start: Number(start),
          end: Number(end),
        }
      })
      .filter(item => item.id) || []
  )
}
/** 查询是否有艾特自己 */
export function isAtMe(message: IIMMessage) {
  const { userInfo } = baseUserStore.getState()
  const mentions = atMsgMapToMentions(message)
  const isSelf = message.direction === ZIMMessageDirection.Send
  return !isSelf && mentions.some(item => isSameUid(item.id, userInfo.uid) || item.id === MENTION_ALL_ID)
}
