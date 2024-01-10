import GroupManage from '@/features/group/group-manage'
import AddNewMembers from '@/features/group/group-members-manage'
import { useImStore } from '@/store/im'
import { GroupEnum } from '@/constants/group'
import { useGroupStore } from '@/store/group'
import { useGetGroupMembers } from '@/hooks/group/chat-group'
import { useAddressBookStore } from '@/store/address-book'
import { isEmpty } from 'lodash'
import { createContext, useEffect } from 'react'
import { ZIMConversationType } from '@/plugins/im/constants'
import { t } from '@lingui/macro'
import { getIsAdminUser, useIsInGroup } from '@/helper/address-book'
import { useRequest } from 'ahooks'
import { getV1ImChatFriendDetailApiRequest } from '@/apis/address-book'
import { MessengerRightNavBar } from '../messenger-right-drawer'
import { GroupChatInfoLayout, SystemAdminChatInfoLayout, UserChatInfoLayout } from './layout'
import ChatMedia from './chat-media'
import MoreMedia from './more-media'
import { GroupAnnoucement, GroupRemark, UserChatRemark } from './chat-remark'
import {
  CommonChatSettings,
  CommonGroupChatSettings,
  GroupChatSettings,
  MemberChatSettings,
  MemberCommonSettings,
  UserChatSettings,
} from './chat-settings'
import ChatMembers, { GroupMemberList } from './chat-members'
import GroupQrCode from './qr-code'
import { GroupChatAvatar, MemberChatAvatar, UserChatAvatar } from './chat-avatar'

export const UserChatInfoContext = createContext('')

export function ChatInfo({ onClose }: { onClose }) {
  const { currentConversation } = useImStore()

  const isGroup = currentConversation?.type === ZIMConversationType.Group

  return isGroup ? <GroupChatInfo onClose={onClose} /> : <UserChatInfo onClose={onClose} />
}

export function ChatInfoByUid({ uid, onClose }: { uid: string; onClose }) {
  const { addressBookList, setAddressBookList } = useAddressBookStore()

  isEmpty(addressBookList) && setAddressBookList()

  const isFriend = addressBookList?.find(each => each.uid === Number(uid))

  if (isFriend) return <UserChatInfo uid={uid} onClose={onClose} />

  return <ChatMemberInfo uid={uid} onClose={onClose} />
}

export function UserChatInfo({ uid, onClose }: { uid?: string; onClose: () => void }) {
  const { data, run } = useRequest(getV1ImChatFriendDetailApiRequest, { manual: true })
  const friendDetails = data?.data
  const { currentConversation } = useImStore()

  const contextUid = uid || currentConversation?.conversationID || ''

  const isSystemAdmin = getIsAdminUser(contextUid)

  useEffect(() => {
    contextUid && run({ uid: contextUid })
  }, [contextUid])

  function UserChatRemarkWithProps() {
    return <UserChatRemark friendDetails={friendDetails} />
  }

  function UserChatAvatarWithProps() {
    return friendDetails && <UserChatAvatar friendDetails={friendDetails} />
  }

  const content = (
    <>
      <MessengerRightNavBar
        title={t`features_messenger_chat_chat_header_more_oeq6rzlarr`}
        onClose={onClose}
        isCloseIcon
      />
      {isSystemAdmin ? (
        <SystemAdminChatInfoLayout Info={UserChatAvatarWithProps} />
      ) : (
        <UserChatInfoLayout
          Info={UserChatAvatarWithProps}
          Note={UserChatRemarkWithProps}
          Media={ChatMedia}
          Settings={UserChatSettings}
          CommonSettings={CommonChatSettings}
        />
      )}
    </>
  )

  return uid ? <UserChatInfoContext.Provider value={uid}>{content}</UserChatInfoContext.Provider> : content
}

export function GroupChatInfo({ onClose }) {
  const isInGroup = useIsInGroup()

  useEffect(() => {
    !isInGroup && onClose()
  }, [isInGroup])
  return (
    <>
      <MessengerRightNavBar
        title={t`features_messenger_chat_chat_header_more_tfwlzhzu_o`}
        onClose={onClose}
        isCloseIcon
      />
      <GroupChatInfoLayout
        Info={GroupChatAvatar}
        Note={GroupAnnoucement}
        Media={ChatMedia}
        Settings={GroupChatSettings}
        GroupSettings={GroupRemark}
        Members={ChatMembers}
        CommonSettings={CommonGroupChatSettings}
      />
    </>
  )
}

export function ChatMoreMedia({ onClose, uid }: { onClose: () => void; uid?: string }) {
  const content = (
    <>
      <MessengerRightNavBar
        onClose={onClose}
        title={t`features_messenger_chat_information_chat_media_index_awpnacrual`}
      />
      <MoreMedia />
    </>
  )
  return uid ? <UserChatInfoContext.Provider value={uid}>{content}</UserChatInfoContext.Provider> : content
}

export function ChatGroupQrCode({ onClose }) {
  return (
    <>
      <MessengerRightNavBar
        title={t`features_messenger_chat_information_chat_remark_index_r5lny1wfmo`}
        onClose={onClose}
      />
      <GroupQrCode />
    </>
  )
}

export function ChatGroupManage({ onClose }) {
  return (
    <>
      <MessengerRightNavBar title={t`features_group_group_manage_index_eqe9ptkxdg`} onClose={onClose} />
      <GroupManage onClose={onClose} noHeader />
    </>
  )
}

export function ChatGroupMembers({ onClose }) {
  return (
    <>
      <MessengerRightNavBar title={t`features_messenger_chat_information_index_6_0ichz9fs`} onClose={onClose} />
      <GroupMemberList />
    </>
  )
}

export function ChatEditMembers({ onClose }) {
  const { groupOperateMark, setGroupOperateMark } = useGroupStore()
  const operateNameMap = {
    [GroupEnum.add]: t`features_group_group_members_manage_index_4zzexhrrt3`,
    [GroupEnum.del]: t`features_group_group_members_manage_index_nvb7r5gsdh`,
    [GroupEnum.addGroup]: t`features_group_group_manage_index_tcjzrkguez`,
    [GroupEnum.delGroup]: t`features_group_group_members_manage_index_cjcyin8hbg`,
  }
  const onCloseClick = () => {
    setGroupOperateMark('')
    onClose()
  }
  return (
    <>
      <MessengerRightNavBar title={operateNameMap[groupOperateMark]} onClose={onCloseClick} />
      <AddNewMembers onClose={onCloseClick} noHeader />
    </>
  )
}

export function ChatMemberInfo({ uid, onClose }) {
  const { members } = useGetGroupMembers()
  const member = members?.find(member => member.uid?.toString() === uid?.toString())

  const isSystemAdmin = getIsAdminUser(uid)

  function ChatAvatar() {
    return member ? <MemberChatAvatar {...member} /> : <span></span>
  }

  function MemberSettings() {
    return <MemberChatSettings uid={uid} />
  }
  return (
    <>
      <MessengerRightNavBar title={t`features_messenger_chat_information_index_opwb5cxpas`} onClose={onClose} />
      {isSystemAdmin ? (
        <SystemAdminChatInfoLayout Info={ChatAvatar} />
      ) : (
        <UserChatInfoLayout Info={ChatAvatar} Settings={MemberSettings} CommonSettings={MemberCommonSettings} />
      )}
    </>
  )
}
