import { getGroupMembers, getV1ImChatGroupInfoApiRequest } from '@/apis/group'
import { GroupHideNormalMembers } from '@/constants/group'
import { UserLevenEnum } from '@/constants/user'
import { updateGroupDetail } from '@/helper/address-book'
import { isMerchant } from '@/helper/env'
import { ZIMConversationType } from '@/plugins/im/constants'
import { useAddressBookStore } from '@/store/address-book'
import { useChatGroupStore } from '@/store/group/chat-group'
import { useImStore } from '@/store/im'
import { useUserStore } from '@/store/user'
import { ImChatGroupMemberListData } from '@/typings/apis/group'
import { YapiGetV1ImChatGroupInfoData } from '@/typings/yapi/ImChatGroupInfoV1GetApi'
import { YapiGetV1ImChatGroupMemberListData } from '@/typings/yapi/ImChatGroupMemberV1GetApi'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'

export function useGetGroupMembers() {
  const { loading, runAsync } = useRequest(getGroupMembers, { manual: true })
  const { groupMembers, setGroupMembers } = useAddressBookStore()
  const { currentConversation } = useImStore() || {}
  const { conversationID, type } = currentConversation || {}
  const { userInfo } = useUserStore()
  useEffect(() => {
    if (!conversationID || groupMembers?.[conversationID] || type !== ZIMConversationType.Group) return
    conversationID &&
      runAsync({ groupId: conversationID }).then(res => {
        if (res.isOk && res.data) setGroupMembers(conversationID, res.data)
      })
  }, [conversationID])

  const isAdmin =
    (conversationID &&
      (groupMembers[conversationID]?.find(member => member.uid === userInfo.uid) as any)?.administrator) ||
    (conversationID && (groupMembers[conversationID]?.find(member => member.uid === userInfo.uid) as any)?.lord)

  return { members: conversationID ? groupMembers?.[conversationID] || [] : [], loading, isAdmin }
}

export function useGetGroupInfoDetails() {
  const { groupDetails } = useChatGroupStore()
  const { loading, runAsync } = useRequest(updateGroupDetail, { manual: true })
  const { currentConversation } = useImStore() || {}
  const { conversationID } = currentConversation || {}

  const fetchApi = () => {
    if (conversationID) {
      runAsync(conversationID)
    }
  }

  useEffect(() => {
    if (conversationID) {
      runAsync(conversationID)
    }
  }, [conversationID])

  return {
    details: conversationID ? groupDetails?.[conversationID] || {} : ({} as YapiGetV1ImChatGroupInfoData),
    loading,
    fetchApi,
  }
}

/**
 * get filtered members (only admin and owner) in Merchant mode or all members in normal mode
 * @param members
 */
export function useGetFilteredGroupMembers(
  members: Partial<ImChatGroupMemberListData & YapiGetV1ImChatGroupMemberListData>[]
) {
  const { groupDetails } = useChatGroupStore()
  const { currentConversation } = useImStore()
  const { groupData } = groupDetails?.[currentConversation?.conversationID || ''] || {}
  const { isHideUser } = groupData || {}

  const currentMembers =
    isHideUser === GroupHideNormalMembers.hide
      ? members?.filter(member => member.administrator || member.lord || member.userLevel === UserLevenEnum.advanced)
      : members

  return currentMembers
}
