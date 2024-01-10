import { IIMConversation } from '@/plugins/im/types'
import { deleteFriendRequest, getRemarkList, postV1ImChatFriendAddApiRequest } from '@/apis/address-book'
import { popBoxConfirm, popBoxConfirmWithLoading } from '@/components/pop-box'
import { baseAddressBookStore, useAddressBookStore } from '@/store/address-book'
import { ZIMConversationType, ZIMEventEnum } from '@/plugins/im/constants'
import { useMemo } from 'react'
import { postV1ImChatImBlockListBlockApiRequest } from '@/apis/blacklist'
import {
  getGroupMembers,
  getV1ImChatGroupInfoApiRequest,
  postV1ImChatGroupExitGroupApiRequest,
  postV1ImChatGroupModifyGroupHeadImageApiRequest,
} from '@/apis/group'
import { addEventListenerOnIm } from '@/plugins/im/event'
import { debounce } from 'lodash'
import { Message } from '@nbit/arco'
import { t } from '@lingui/macro'
import { useImStore } from '@/store/im'
import { getImInstance } from '@/plugins/im/core'
import { baseUserStore, useUserStore } from '@/store/user'
import { baseChatGroupStore, useChatGroupStore } from '@/store/group/chat-group'
import { GroupMemberBanEnum } from '@/constants/group'
import { UserLevenEnum } from '@/constants/user'
import { deleteConversation } from './message'

/** 删除联系人，会话 id 可以等同于联系人的 uid */
export async function deleteFriend(conversation: IIMConversation) {
  return popBoxConfirmWithLoading({
    title: t`helper_address_book_mvea4nxl3v`,
    content: t`helper_address_book_qpzdtimgfi`,
    onCommit: async () => {
      const res = await deleteFriendRequest({
        uid: Number(conversation.conversationID),
      })
      if (res.isOk) {
        baseAddressBookStore.getState().setAddressBookList()
        deleteConversation(conversation, false)
        Message.success(t`helper_address_book_yrjfkcujp9`)
      }
    },
  })
}
/** 删除群组，会话 id 可以等同于联系人的 uid */
export async function deleteGroup(conversation: IIMConversation) {
  return popBoxConfirmWithLoading({
    title: t`features_messenger_chat_chat_header_more_czjsnjjjam`,
    content: t`helper_address_book_vlc2w9p1vo`,
    onCommit: async () => {
      const res = await postV1ImChatGroupExitGroupApiRequest({
        groupId: conversation.conversationID,
      })
      if (res.isOk) {
        baseAddressBookStore.getState().setJoinGroupList()
        baseAddressBookStore.getState().setMyGroupList()
        // 退出后不删除会话 deleteConversation(conversation, false)
        Message.success(t`helper_address_book_phusuk99ho`)
      }
    },
  })
}
export async function addFriend(uid: string | number) {
  const { setAddressBookList } = baseAddressBookStore.getState()
  await popBoxConfirm(t`features_messenger_addition_index_pngdv3umj8`, t`helper_address_book_xoexvehwmo`)
  const res = await postV1ImChatFriendAddApiRequest({
    uid: Number(uid),
  })
  if (res.isOk) {
    Message.success(t`features_messenger_addition_index_t0o7celfir`)
    setAddressBookList()
  }
}
/** 加入黑名单，会话 id 可以等同于联系人的 uid */
export async function addToBlackList(conversation: IIMConversation) {
  return popBoxConfirmWithLoading({
    title: t`helper_address_book_9rpuyg59gl`,
    content: t`helper_address_book_ynwacl5mxr`,
    onCommit: async () => {
      const res = await postV1ImChatImBlockListBlockApiRequest({
        quiltUid: Number(conversation.conversationID),
      })
      if (res.isOk) {
        deleteConversation(conversation, false)
        baseAddressBookStore.getState().setAddressBookList()
        Message.success(t`helper_address_book_zeyncaae7k`)
      }
    },
  })
}
/** 获取所有备注过的好友和群聊 */
export async function updateRemarkMapToStore() {
  const res = await getRemarkList({})
  const { data } = res || {}
  if (data) {
    baseAddressBookStore.getState().setRemarkMap(data)
  }
}

export function isSameUid(id?: string | number, uid?: string | number) {
  return id?.toString() === uid?.toString()
}
export function getGroupById(groupId?: string) {
  const { myGroupList, joinGroupList } = baseAddressBookStore.getState()
  return [...myGroupList, ...joinGroupList].find(item => isSameUid(item.groupId, groupId))
}
/** 返回经过转换头像和备注的会话 */
export function getConversationWithRemark(conversation: IIMConversation) {
  const { remarkMap, addressBookList } = baseAddressBookStore.getState()
  let remark = ''
  let avatarUrl = ''
  if (conversation.type === ZIMConversationType.Group) {
    const group = getGroupById(conversation.conversationID)
    remark =
      remarkMap.groupList.find(item => isSameUid(item.groupId, conversation.conversationID!))?.remark ||
      group?.groupRemark ||
      group?.groupName ||
      conversation.conversationName
    avatarUrl = group?.headImage || conversation.conversationAvatarUrl
  } else {
    const friend = addressBookList.find(item => isSameUid(item.uid, conversation.conversationID))
    remark =
      remarkMap.friendList.find(item => isSameUid(item.uid, conversation.conversationID))?.remark ||
      friend?.friendRemark ||
      friend?.nickName ||
      conversation.conversationName
    avatarUrl = friend?.avatarPath || conversation.conversationAvatarUrl
  }

  return {
    ...conversation,
    conversationName: remark,
    conversationAvatarUrl: avatarUrl,
  }
}

export function useConversationWithRemark(conversation: IIMConversation) {
  // 触发响应式跟踪
  const { addressBookList, myGroupList, joinGroupList, remarkMap } = useAddressBookStore()
  return getConversationWithRemark(conversation)
}
/** 获取当前会话所在群组 */
export function useConversationGroup(conversation?: IIMConversation) {
  // 触发响应式跟踪
  const { myGroupList, joinGroupList } = useAddressBookStore()
  return getGroupById(conversation?.conversationID)
}
/** 搜索联系人数据 */
export function useSearchContacts(keyword: string) {
  const { addressBookList, myGroupList, joinGroupList } = useAddressBookStore()
  const keywordUpperCase = keyword.toUpperCase()

  return useMemo(() => {
    return {
      friends: addressBookList.filter(
        item =>
          item.nickName?.toUpperCase().includes(keywordUpperCase) ||
          item.friendRemark?.toUpperCase().includes(keywordUpperCase)
      ),
      groups: [...myGroupList, ...joinGroupList].filter(
        item =>
          item.groupName.toUpperCase().includes(keywordUpperCase) ||
          item.groupRemark?.toUpperCase().includes(keywordUpperCase)
      ),
    }
  }, [addressBookList, myGroupList, joinGroupList, keyword])
}
export async function updateGroupMembers(groupId: any) {
  const res = await getGroupMembers({
    groupId,
  })
  if (res.data) {
    baseAddressBookStore.getState().setGroupMembers(groupId, res.data)
  }
}
export function updateAllGroups() {
  const { setMyGroupList, setJoinGroupList } = baseAddressBookStore.getState()
  setMyGroupList()
  setJoinGroupList()
}
/** 群状态发生改变时全部调接口 */
export function bindEventOnGroupChange() {
  const events = [
    ZIMEventEnum.groupAttributesUpdated,
    ZIMEventEnum.groupStateChanged,
    ZIMEventEnum.groupNameUpdated,
    ZIMEventEnum.groupAvatarUrlUpdated,
    ZIMEventEnum.groupNoticeUpdated,
    ZIMEventEnum.groupMemberStateChanged,
    ZIMEventEnum.groupMemberInfoUpdated,
  ]
  const { setMyGroupList, setJoinGroupList } = baseAddressBookStore.getState()
  const debounceUpdate = debounce((groupId?: string) => {
    setMyGroupList()
    setJoinGroupList()
    if (groupId) {
      updateGroupMembers(groupId)
    }
  }, 500)
  events.forEach(event => {
    addEventListenerOnIm(event, (_, data) => {
      debounceUpdate(data?.groupId)
    })
  })
}
/** 检测是否还在当前群聊中，如果是单人聊天，返回 true */
export function useIsInGroup() {
  const { currentConversation } = useImStore()
  const { joinGroupList, myGroupList } = useAddressBookStore()
  const groupIds: any[] = [...joinGroupList, ...myGroupList].map(item => item.groupId)
  const groupLeaved =
    currentConversation?.type === ZIMConversationType.Group && !groupIds.includes(currentConversation?.conversationID)

  return !groupLeaved
}

export function updateGroupAvatar(groupId: string, headImg: string) {
  return new Promise((resolve, reject) => {
    postV1ImChatGroupModifyGroupHeadImageApiRequest({ groupId, headImage: headImg })
      .then(res => {
        if (res.isOk && res.data?.success) {
          getImInstance()?.updateGroupAvatarUrl(headImg, groupId)
          resolve(true)
        }
        resolve(false)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function useSelfInGroup(groupId: string) {
  const { userInfo } = useUserStore()
  const { groupMembers } = useAddressBookStore()

  return groupMembers[groupId]?.find(item => isSameUid(item.uid, userInfo.uid))
}
/** 获取当前会话群组详情 */
export function useCurrentGroupDetail() {
  const { currentConversation } = useImStore()
  const { groupDetails } = useChatGroupStore()
  const detail = groupDetails[currentConversation?.conversationID || '']
  // 用 || 无法触发自动类型推断
  // eslint-disable-next-line no-unneeded-ternary
  return detail ? detail : undefined
}
/** 获取用户禁言情况 */
export function useUserIsBan() {
  const { currentConversation } = useImStore()
  const { isBan: userIsBanGlobal, userInfo } = useUserStore()
  const { groupDetails } = useChatGroupStore()
  const groupIsBan = groupDetails[currentConversation!.conversationID]?.groupData.groupStatus === GroupMemberBanEnum.ban
  const groupNormalIsBan =
    groupDetails[currentConversation!.conversationID]?.groupData.groupBan === GroupMemberBanEnum.ban
  const selfIngroup = useSelfInGroup(currentConversation?.conversationID || '')
  // 群开启普通成员禁言，且自己不是管理员，且自己是普通用户，认为是被禁言
  const isNormalAndGroupBanNormal =
    groupNormalIsBan &&
    !(selfIngroup?.administrator || selfIngroup?.lord) &&
    userInfo.userLevel !== UserLevenEnum.advanced
  const isBanInGroup =
    groupDetails[currentConversation!.conversationID]?.groupData.isBan === GroupMemberBanEnum.ban ||
    isNormalAndGroupBanNormal
  const isBan = userIsBanGlobal || isBanInGroup || groupIsBan

  return {
    /** 是否禁言 */
    isBan,
    /** 群组已被禁言 */
    groupIsBan,
    /** 在群组被禁言 */
    isBanInGroup,
    /** 被全局禁言 */
    userIsBanGlobal,
  }
}
/** 更新群组详情 */
export async function updateGroupDetail(groupId: any) {
  const res = await getV1ImChatGroupInfoApiRequest({
    groupId,
  })
  if (res.data) {
    baseChatGroupStore.getState().setGroupDetails(groupId, res.data)
  }
}

export function getIsAdminUser(uid: string) {
  return isSameUid(uid, baseUserStore.getState().systemUid)
}
