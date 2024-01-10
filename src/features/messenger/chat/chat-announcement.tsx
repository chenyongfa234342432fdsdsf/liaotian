import Icon from '@/components/icon'
import { useMessengerRightDrawer } from '@/hooks/use-messenger-right-drawer'
import { useChatGroupStore } from '@/store/group/chat-group'
import { useImStore } from '@/store/im'
import { useRequest, useUpdateEffect } from 'ahooks'
import { getV1ImChatGroupGetGroupAnnouncementApiRequest } from '@/apis/group'
import { useEffect, useState } from 'react'
import { updateChatAnnouncement } from '@/helper/chat'
import { ZIMConversationType } from '@/plugins/im/constants'
import { ChatInfo } from '../chat-information'

function ChatAnnouncement() {
  const { currentConversation } = useImStore()
  const { groupAnnouncement } = useChatGroupStore()
  const announcement = groupAnnouncement?.[currentConversation?.conversationID || '']

  const { runAsync } = useRequest(getV1ImChatGroupGetGroupAnnouncementApiRequest, { manual: true })

  const { hasViewedAnnouncement, setHasViewedAnnouncement } = useChatGroupStore()
  const hasViewed = currentConversation?.conversationID
    ? hasViewedAnnouncement[currentConversation.conversationID]
    : false

  useEffect(() => {
    currentConversation?.conversationID &&
      currentConversation?.type === ZIMConversationType.Group &&
      runAsync({ groupId: currentConversation?.conversationID }).then(res => {
        if (res.isOk && res.data) updateChatAnnouncement(res.data.announcement)
      })
  }, [currentConversation?.conversationID])

  const [open, close] = useMessengerRightDrawer()

  if (!announcement || currentConversation?.type !== ZIMConversationType.Group || hasViewed) return <span></span>

  return (
    <div
      className="flex bg-card_bg_color_03 rounded-lg mx-6 mt-3 py-2 cursor-pointer"
      onClick={() => {
        open(<ChatInfo onClose={close} />)
        setHasViewedAnnouncement(currentConversation.conversationID, true)
      }}
    >
      <div className="bg-brand_color w-5 h-5 flex items-center justify-center ml-3 mr-2 rounded-full">
        <Icon className="text-white text-xs" name="icon_chat_speaker" />
      </div>
      <span className="text-sm mr-auto">{announcement}</span>
      <Icon className="mr-3" name="icon_chat_arrow" />
    </div>
  )
}

export default ChatAnnouncement
