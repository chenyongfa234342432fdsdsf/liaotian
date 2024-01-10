import { FriendIsTopEnum } from '@/constants/address-book'
import {
  ZIMConversationEvent,
  ZIMConversationNotificationStatus,
  ZIMConversationType,
  ZIMEventEnum,
} from '@/plugins/im/constants'
import { getImInstance } from '@/plugins/im/core'
import { addEventListenerOnIm } from '@/plugins/im/event'
import { IIMConversation } from '@/plugins/im/types'
import { baseImStore } from '@/store/im'
import { IFriend, IGroup } from '@/typings/apis/address-book'
import { YapiGetV1ImChatFriendListData } from '@/typings/yapi/ImChatFriendListV1GetApi'
import { useMemo } from 'react'
import { Message } from '@nbit/arco'
import { t } from '@lingui/macro'
import { postV1ImChatGroupSettingUpdateApiRequest } from '@/apis/group'
import { postV1ImChatFriendUpdateApiRequest } from '@/apis/address-book'
import { getConversationWithRemark, updateAllGroups, useSearchContacts } from './address-book'

export function sortConversations(conversations: IIMConversation[]) {
  return conversations.slice().sort((a, b) => {
    // 首先比较是否置顶
    // 接着比较消息时间 (最新的在前)
    if (a.isPinned !== b.isPinned) {
      return a.isPinned ? -1 : 1
    }
    if (a.lastMessage && b.lastMessage) {
      return Number(b.lastMessage.timestamp) - Number(a.lastMessage.timestamp)
    }
    // TODO: 比较会话创建时间，比如新建了会话，但是还没发送消息
    return 0
  })
}
/** 切换会话免打扰状态 */
export async function toggleConversationDoNotDisturb(conversation: IIMConversation) {
  const enabled = conversation.notificationStatus === ZIMConversationNotificationStatus.DoNotDisturb
  await getImInstance().setConversationNotificationStatus(
    enabled ? ZIMConversationNotificationStatus.Notify : ZIMConversationNotificationStatus.DoNotDisturb,
    conversation.conversationID,
    conversation.type
  )
  postV1ImChatGroupSettingUpdateApiRequest({
    groupId: conversation.conversationID,
    messageDisturb: enabled ? ZIMConversationNotificationStatus.Notify : ZIMConversationNotificationStatus.DoNotDisturb,
  }).then(() => {
    updateAllGroups()
  })
  Message.success(enabled ? t`helper_conversation_ilfbehxljw` : t`helper_conversation_nyffvh3enl`)
}
/** 切换会话置顶状态 */
export async function toggleConversationPined(conversation: IIMConversation) {
  await getImInstance().updateConversationPinnedState(
    !conversation.isPinned,
    conversation.conversationID,
    conversation.type
  )
  if (conversation.type === ZIMConversationType.Group) {
    postV1ImChatGroupSettingUpdateApiRequest({
      groupId: conversation.conversationID,
      isTop: conversation.isPinned ? FriendIsTopEnum.NO : FriendIsTopEnum.YES,
    }).then(() => {
      updateAllGroups()
    })
  } else {
    postV1ImChatFriendUpdateApiRequest({
      uid: Number(conversation.conversationID),
      isTop: conversation.isPinned ? FriendIsTopEnum.NO : FriendIsTopEnum.YES,
    }).then(() => {})
  }
  Message.success(conversation.isPinned ? t`helper_conversation_pw8mvlwrba` : t`helper_conversation_zzgzjhvayo`)
}

export function friendToConversation(friend: IFriend) {
  return getConversationWithRemark({
    conversationAvatarUrl: friend.avatarPath,
    conversationID: friend.uid.toString(),
    conversationName: friend.friendRemark || friend.nickName,
    type: ZIMConversationType.Peer,
    // 二者参数是一致的
    notificationStatus: friend.messageDisturb,
    isPinned: friend.isTop === FriendIsTopEnum.YES,
    unreadMessageCount: 0,
    orderKey: 0,
  }) as IIMConversation
}
export function groupToConversation(group: IGroup) {
  return getConversationWithRemark({
    conversationAvatarUrl: group.headImage,
    conversationID: group.groupId,
    conversationName: group.groupName,
    type: ZIMConversationType.Group,
    // 二者参数是一致的
    notificationStatus: group.messageDisturb,
    isPinned: group.isTop === FriendIsTopEnum.YES,
    unreadMessageCount: 0,
    orderKey: 0,
  } as IIMConversation)
}
type ICreateConversationParams = {
  /** 好友，群组传 1 个即可 */
  friend?: IFriend
  /** 群组 */
  group?: IGroup
}
/** 给其它地方来发起会话 */
export function createConversation({ friend, group }: ICreateConversationParams) {
  const { conversations, updateConversations, setCurrentConversation } = baseImStore.getState()
  // 如果已经存在了，改变状态即可
  let exist = conversations.find(item => item.conversationID === (friend ? friend.uid.toString() : group!.groupId))
  if (exist) {
    setCurrentConversation(exist)
    return
  }
  exist = friend ? friendToConversation(friend) : groupToConversation(group!)
  updateConversations([exist], 'unshift')
  setCurrentConversation(exist)
}
/** 监听会话改变 */
export function bindEventOnConversationChange() {
  addEventListenerOnIm(ZIMEventEnum.conversationChanged, (_, data) => {
    const { updateConversations } = baseImStore.getState()

    data.infoList.forEach(item => {
      updateConversations([item.conversation], item.event === ZIMConversationEvent.Deleted ? 'delete' : 'update')
    })
  })
}

export function useSearchConversations(keyword: string) {
  const { groups, friends } = useSearchContacts(keyword)

  const displayContacts = useMemo(() => {
    if (!keyword) {
      return []
    }
    return friends.map(item => friendToConversation(item)).concat(groups.map(item => groupToConversation(item)))
  }, [groups, friends])

  return displayContacts
}
/** 清除会话未读 */
export function clearConversationUnreadMessageCount(conversation?: IIMConversation) {
  const { currentConversation } = baseImStore.getState()
  if (!conversation) {
    conversation = currentConversation
  }
  if (!conversation) return
  // 如果当前会话是最后一条，那么认为会话已全部已读
  getImInstance().clearConversationUnreadMessageCount(conversation!.conversationID, conversation!.type)
}
