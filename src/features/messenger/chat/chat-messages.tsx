import { getImInstance } from '@/plugins/im/core'
import { IIMMessage } from '@/plugins/im/types'
import { useImStore } from '@/store/im'
import { useDebounceFn, useMount, usePrevious, useRequest, useScroll, useSize, useUpdateEffect } from 'ahooks'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useMessengerStore } from '@/store/messenger'
import { addEventListenerOnIm } from '@/plugins/im/event'
import {
  ZIMConversationType,
  ZIMEventEnum,
  ZIMMessageDirection,
  ZIMMessageReceiptStatus,
  ZIMMessageType,
} from '@/plugins/im/constants'
import { formatMessageTimeGroup } from '@/helper/message'
import { ListWrapper } from '@/components/simple-virtual-list/wrapper'
import { Spin } from '@nbit/arco'
import Icon from '@/components/icon'
import { t } from '@lingui/macro'
import { useMessengerRightDrawer } from '@/hooks/use-messenger-right-drawer'
import { updateGroupDetail, updateGroupMembers, useIsInGroup } from '@/helper/address-book'
import { clearConversationUnreadMessageCount } from '@/helper/conversation'
import { useAddressBookStore } from '@/store/address-book'
import { useDisplayMessages } from '@/hooks/use-messages'
import { queryGroupRevokedMessages } from '@/apis/messsage/group'
import ChatMessage from './message'
import styles from './chat-messages.module.css'
import { MessagesVirtual } from './messages-vritual'
import { MessagesVirtual2 } from './messages-vritual-2'
import { MessagesVirtual3 } from './messages-vritual-3'
import { UserChatInfo } from '../chat-information'

function useMessages() {
  const {
    messagesByConversation,
    currentConversation: storeCurrentConversation,
    updateMessagesByConversation,
    setRevokedMessageIds,
  } = useImStore()
  const currentConversation = storeCurrentConversation!
  const { chatMessagesScrollIntoBottom } = useMessengerStore()
  const { setJoinGroupList } = useAddressBookStore()
  const chatMessagesScrollIntoBottomRef = useRef(chatMessagesScrollIntoBottom)
  chatMessagesScrollIntoBottomRef.current = chatMessagesScrollIntoBottom
  const messages =
    messagesByConversation.find(item => item.conversationId === currentConversation.conversationID)?.messages || []
  const zim = getImInstance()
  const [finished, setFinished] = useState(false)
  const pageSize = 40
  const { runAsync: loadMore, loading } = useRequest(
    async (nextMessage?: IIMMessage) => {
      if (finished && messages.length > 0) {
        return
      }
      const res = await zim.queryHistoryMessage(currentConversation.conversationID, currentConversation.type, {
        count: pageSize,
        nextMessage: nextMessage || messages[0],
        reverse: true,
      })
      updateMessagesByConversation(currentConversation.conversationID, res.messageList, 'unshift')
      if (res.messageList.length < pageSize) {
        setFinished(true)
      }
      return res.messageList
    },
    {
      manual: true,
    }
  )
  const isGroup = currentConversation.type === ZIMConversationType.Group
  const inGroup = useIsInGroup()

  useEffect(() => {
    setFinished(false)
    if (messages.length < pageSize) {
      loadMore().then(() => {
        chatMessagesScrollIntoBottomRef.current()
      })
    }
    if (currentConversation.type === ZIMConversationType.Group) {
      if (inGroup) {
        // 更新群成员和群撤回消息列表
        updateGroupMembers(currentConversation.conversationID)
        updateGroupDetail(currentConversation.conversationID)
        queryGroupRevokedMessages({
          groupId: currentConversation.conversationID,
        }).then(res => {
          if (!res.data) return
          setRevokedMessageIds(
            currentConversation.conversationID,
            res.data.map(item => item.messageId)
          )
        })
      }
      // 多更新一次，通知有时会遗漏
      setJoinGroupList()
    }
    clearConversationUnreadMessageCount(currentConversation)
    // TODO: 是否停留在上一次已读消息的位置，不滚动，应该不需要
    chatMessagesScrollIntoBottomRef.current()
  }, [currentConversation.conversationID])
  useUpdateEffect(() => {
    if (isGroup) {
      updateGroupMembers(currentConversation.conversationID)
    }
  }, [inGroup])

  return {
    messages: useDisplayMessages(messages),
    loadMore,
    loading,
  }
}

function NewMessagesTip({ onClick }) {
  return (
    <div className={styles['new-messages-tip']} onClick={onClick}>
      <Icon name="icon_chat_news" className="text-brand_color mr-1" />
      <span>{t`features_messenger_chat_chat_messages_fiwaom_mss`}</span>
    </div>
  )
}

export function ChatMessages() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { messages, loadMore, loading } = useMessages()
  const messagesRef = useRef(messages)
  messagesRef.current = messages
  const loadingRef = useRef(false)
  loadingRef.current = loading
  const { currentConversation } = useImStore()
  const { registerChatMessagesScrollIntoBottom, registerOpenContactInfo } = useMessengerStore()
  const [openContactInfo, closeContactInfo] = useMessengerRightDrawer()
  const scrollToBottom = (options: ScrollToOptions = {}) => {
    wrapperRef.current!.scrollTo({
      top: options.top || wrapperRef.current!.scrollHeight - wrapperRef.current!.clientHeight,
      behavior: options.behavior || 'auto',
    })
  }
  useEffect(() => {
    registerChatMessagesScrollIntoBottom(scrollToBottom)
    registerOpenContactInfo((uid: any) => {
      openContactInfo(<UserChatInfo uid={uid} onClose={closeContactInfo} />)
    })
    return () => {
      registerChatMessagesScrollIntoBottom(() => {})
    }
  }, [])
  const chatMessagesScrollIntoBottomRef = useRef(scrollToBottom)
  chatMessagesScrollIntoBottomRef.current = scrollToBottom
  // 这里存在在视图之上也有消息未读，所以展示新消息提示时，需要满足未读和刚收到消息
  const unreadMessageCount = messages.filter(
    item => item.direction === ZIMMessageDirection.Receive && item.receiptStatus === ZIMMessageReceiptStatus.Processing
  ).length
  const [justReceivedMessage, setJustReceivedMessage] = useState(false)
  const clearUnread = () => {
    getImInstance().clearConversationUnreadMessageCount(currentConversation!.conversationID, currentConversation!.type)
  }
  useEffect(() => {
    setJustReceivedMessage(false)
    if (!currentConversation) {
      return
    }
    // 监听到之后推入即可，这里只处理当前聊天窗口的消息
    const typeEvents = {
      [ZIMConversationType.Peer]: ZIMEventEnum.message,
      [ZIMConversationType.Group]: ZIMEventEnum.receiveGroupMessage,
    }
    const remove = addEventListenerOnIm(typeEvents[currentConversation.type] as ZIMEventEnum.message, (_, data) => {
      if (
        data.fromConversationID === currentConversation.conversationID &&
        data.messageList.find(
          item => item.direction === ZIMMessageDirection.Receive && ![ZIMMessageType.Command].includes(item.type)
        )
      ) {
        // 对于无法滚动，清除已读
        if (wrapperRef.current!.scrollHeight - wrapperRef.current!.clientHeight <= 10) {
          clearUnread()
        }
        setJustReceivedMessage(true)
      }
    })
    return () => {
      remove()
    }
  }, [currentConversation])
  // 保持滚动的触发器
  const [keepScrollAfterLoadPrevAfter, setKeepScrollAfterLoadPrevAfter] = useState(0)
  const loadPrev = async () => {
    const res = await loadMore()
    if (res && res.length > 0) {
      setTimeout(() => {
        setKeepScrollAfterLoadPrevAfter(keepScrollAfterLoadPrevAfter + 1)
      }, 100)
    }
  }
  const onClickToBottom = () => {
    scrollToBottom({
      behavior: 'smooth',
    })
    setJustReceivedMessage(false)
    // 同时清除未读，因为已读回执之后是不会自动清除的
    clearUnread()
  }
  // 所有消息共用一个弹窗

  return (
    <>
      <ListWrapper
        ref={wrapperRef}
        keepScrollAfterLoadPrevAfter={keepScrollAfterLoadPrevAfter}
        className={styles['chat-messages-wrapper']}
        loadPrev={loadPrev}
        loadNext={() => {
          // 下一页时认为到底了
          setJustReceivedMessage(false)
          clearUnread()
        }}
      >
        {loading && (
          <div className="flex justify-center py-2">
            <Spin />
          </div>
        )}
        {messages.map((message, index) => {
          const preMessage = messages[index - 1]
          const showTime =
            !preMessage || new Date(preMessage.timestamp).getDate() !== new Date(message.timestamp).getDate()
          return (
            <div key={message.messageID}>
              {showTime && (
                <div className="group-time">
                  <div className="tag">{formatMessageTimeGroup(message.timestamp)}</div>
                </div>
              )}
              <ChatMessage
                messagesWrapperRef={wrapperRef}
                preMessage={preMessage}
                nextMessage={messages[index + 1]}
                message={message}
              />
            </div>
          )
        })}
        {/* 消息本来就是分页加载的，再加上虚拟列表用在这里还是有各种不丝滑的问题，先暂时忽略，后续反馈性能问题再优化 <MessagesVirtual2 loadMore={loadMore} messages={messages} /> */}
      </ListWrapper>
      {justReceivedMessage && <NewMessagesTip onClick={onClickToBottom} />}
    </>
  )
}
