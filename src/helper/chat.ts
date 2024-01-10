import { ZIMConversationType } from '@/plugins/im/constants'
import { baseChatGroupStore } from '@/store/group/chat-group'
import { baseImStore } from '@/store/im'

export function updateChatAnnouncement(announcement: string) {
  const { updateGroupAnnouncement } = baseChatGroupStore.getState()
  const { currentConversation } = baseImStore.getState()

  if (currentConversation?.type !== ZIMConversationType.Group) return

  const groupId = currentConversation?.conversationID

  if (!groupId) return

  updateGroupAnnouncement(groupId, announcement)
}
