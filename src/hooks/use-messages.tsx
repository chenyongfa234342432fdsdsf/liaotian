import { ZIMMessageOrder, ZIMMessageType } from '@/plugins/im/constants'
import { getImInstance } from '@/plugins/im/core'
import { useImStore } from '@/store/im'
import { useRequest, useUpdateEffect } from 'ahooks'
import { useEffect, useState } from 'react'
import { ZIMMessage } from 'zego-zim-web'
import { isSameUid } from '@/helper/address-book'
import { deleteMessages } from '@/helper/message'
import useScrollTrackerYAxis from './use-scroll-tracker'

/** 获取可展示的消息，先目前主要用于过滤掉已撤回的消息 */
export function useDisplayMessages(messages: (ZIMMessage | undefined)[]) {
  const { revokedMessageIds } = useImStore()
  useEffect(() => {
    messages.forEach(item => {
      if (!item) return
      const isRevoked = revokedMessageIds[item.conversationID]?.find(id => isSameUid(id, item.messageID))
      if (isRevoked) {
        deleteMessages(
          [item],
          {
            conversationID: item.conversationID,
            type: item.conversationType,
          } as any,
          false
        )
      }
    })
  }, [messages, revokedMessageIds])
  // 这里本来是不需要了，为了兼容其它使用场景保留过滤，同时在上面的 hook 中处理真正的逻辑
  return messages.filter(item => {
    if (!item) return false
    return true
  }) as ZIMMessage[]
}

export function useSearchHistoryMessages(messageTypes: ZIMMessageType[], uid?: string, count = 20) {
  const { currentConversation } = useImStore()
  const { conversationID, type } = currentConversation || {}
  const [messages, setmessages] = useState<ZIMMessage[]>([])
  const [isFinished, setisFinished] = useState(false)

  const { scroller: scrollContainer, isBottomSub } = useScrollTrackerYAxis()
  const zim = getImInstance()

  const id = uid || conversationID

  const { runAsync, loading } = useRequest(
    async (nextMessage?: ZIMMessage) => {
      if (isFinished) return
      const queriedMessages = await zim.searchLocalMessages(id!, type!, {
        nextMessage: nextMessage || messages[0],
        count,
        messageTypes,
        keywords: [],
        senderUserIDs: [],
        subMessageTypes: [],
        startTime: 0,
        endTime: 0,
        order: ZIMMessageOrder.Descending,
      })
      const messageList = queriedMessages?.messageList || []

      if (messageList.length < count) setisFinished(true)

      setmessages(prev => {
        const next = [...messageList, ...prev]
        return next
      })
    },
    { manual: true }
  )

  useEffect(() => {
    if (id !== undefined && type !== undefined) {
      runAsync()
    }
  }, [id])

  useUpdateEffect(() => {
    const fetch = toFetch => {
      if (toFetch) {
        runAsync()
      }
    }
    fetch(isBottomSub)
  }, [isBottomSub])

  return {
    messages,
    scrollRef: scrollContainer,
    loading,
  }
}
