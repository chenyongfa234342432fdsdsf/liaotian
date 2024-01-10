import { getImInstance } from '@/plugins/im/core'
import { useImStore } from '@/store/im'
import { useMount, useRequest, useUpdateEffect } from 'ahooks'
import { ListWrapper } from '@/components/simple-virtual-list/wrapper'
import { useEffect, useRef, useState } from 'react'
import { Spin } from '@nbit/arco'
import ListEmpty from '@/components/list-empty'
import classNames from 'classnames'
import AnnouncementCarousel from '@/features/announcement-center/components/announcement-carousel'
import SystemSession from '@/features/system-announcement/components/system-session'
import { useMessengerStore } from '@/store/messenger'
import { Conversation } from './conversation'

function useConverSations() {
  const { conversations, updateConversations } = useImStore()
  const zim = getImInstance()
  const [retryTimes, setRetryTimes] = useState(0)
  const pageSize = 100
  const { run: loadMore, loading } = useRequest(
    async () => {
      const { conversationList } = await zim.queryConversationList({
        count: pageSize,
        nextConversation: conversations.length < pageSize ? undefined : conversations[conversations.length - 1],
      })
      if (conversationList.length === 0) {
        return
      }
      updateConversations(conversationList, 'push')
    },
    {
      manual: true,
    }
  )

  useEffect(() => {
    if (conversations.length === 0) {
      loadMore()
      return
    }
    if (conversations.length < pageSize && retryTimes < 2) {
      // 存在偶尔加载只有一两条数据的情况，所以这里需要尝试重新加载一次
      setRetryTimes(retryTimes + 1)
      loadMore()
    }
  }, [conversations])

  return {
    conversations,
    loadMore,
    loading,
  }
}

/** 会话列表 */
function Conversations() {
  const { conversations, loadMore, loading } = useConverSations()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { setCurrentConversation } = useImStore()
  const { systemNotificationsVisible, setSystemNotificationsVisible } = useMessengerStore()
  const [keepScrollAfterLoadPrevAfter, setKeepScrollAfterLoadPrevAfter] = useState(0)

  useUpdateEffect(() => {
    setKeepScrollAfterLoadPrevAfter(keepScrollAfterLoadPrevAfter + 1)
  }, [conversations])
  const openSystemNotifications = () => {
    setCurrentConversation(undefined)
    setSystemNotificationsVisible(true)
  }

  return (
    <ListWrapper
      keepScrollAfterLoadNext={keepScrollAfterLoadPrevAfter}
      ref={wrapperRef}
      className={classNames({
        'h-full': conversations.length === 0,
      })}
      loadNext={loadMore}
    >
      <div onClick={openSystemNotifications}>
        <SystemSession isActive={systemNotificationsVisible} />
      </div>
      {conversations.map(conversation => {
        return <Conversation conversation={conversation} key={conversation.conversationID} />
      })}
      {loading && (
        <div className="flex justify-center py-2">
          <Spin />
        </div>
      )}
      {!loading && conversations.length === 0 && (
        <div className="h-full flex items-center justify-center">
          <ListEmpty />
        </div>
      )}
    </ListWrapper>
  )
}

export default Conversations
