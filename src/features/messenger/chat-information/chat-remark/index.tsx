import { useContext, useEffect, useState } from 'react'
import {
  getV1ImChatGroupGetGroupAnnouncementApiRequest,
  getV1ImChatGroupInfoApiRequest,
  postV1ImChatGroupReleaseAnnouncementApiRequest,
  postV1ImChatGroupSettingUpdateApiRequest,
} from '@/apis/group'
import { useRequest } from 'ahooks'
import { useImStore } from '@/store/im'
import { useMessengerRightDrawer } from '@/hooks/use-messenger-right-drawer'
import TextInput from '@/features/settings-center/text-input'
import { Message } from '@nbit/arco'
import { getV1ImChatFriendDetailApiRequest, postV1ImChatFriendUpdateApiRequest } from '@/apis/address-book'
import { useGetGroupInfoDetails, useGetGroupMembers } from '@/hooks/group/chat-group'
import { GroupShowNicknameEnum } from '@/constants/group'
import { t } from '@lingui/macro'
import { updateRemarkMapToStore } from '@/helper/address-book'
import { useAddressBookStore } from '@/store/address-book'
import { useChatGroupStore } from '@/store/group/chat-group'
import { YapiGetV1ImChatFriendDetailData } from '@/typings/yapi/ImChatFriendDetailV1GetApi'
import { updateChatAnnouncement } from '@/helper/chat'
import styles from './index.module.css'
import { SettingCell } from '../chat-settings'
import { ChatGroupManage, ChatGroupQrCode, UserChatInfoContext } from '..'

export function UserChatRemark({ friendDetails }: { friendDetails?: YapiGetV1ImChatFriendDetailData }) {
  const contextUid = useContext(UserChatInfoContext)
  const { friendRemark: remark } = friendDetails || {}
  const { currentConversation } = useImStore()

  const uid = contextUid || currentConversation?.conversationID

  const [currentRemark, setcurrentRemark] = useState(remark)
  const { setAddressBookList } = useAddressBookStore()

  useEffect(() => {
    setcurrentRemark(remark)
  }, [remark])

  const handleConfirm = remark => {
    uid &&
      postV1ImChatFriendUpdateApiRequest({
        uid: Number(uid),
        friendRemark: remark,
      }).then(res => {
        if (res.isOk && res.data?.success) {
          setcurrentRemark(remark)
          updateRemarkMapToStore()
          setAddressBookList()
          Message.success(t`features_messenger_chat_information_chat_remark_index_p5mklxu1qc`)
        } else Message.error(t`features_messenger_chat_information_chat_remark_index_tt7jfjrgd4`)
      })
  }

  return (
    <TextInput
      className={styles['chat-remark']}
      label={t`features_messenger_chat_information_chat_remark_index_zo7_ruw4nd`}
      maxLength={20}
      editable
      onConfirm={handleConfirm}
      defaultValue={currentRemark}
      placeholder={t`features_messenger_chat_information_chat_remark_index_uhtuyhu7rd`}
    />
  )
}

export function GroupAnnoucement() {
  const { currentConversation } = useImStore()
  const [open, close] = useMessengerRightDrawer()

  const { groupAnnouncement, setHasViewedAnnouncement } = useChatGroupStore()
  const announcement = groupAnnouncement?.[currentConversation?.conversationID || '']

  const [currentAnnouncement, setcurrentAnnouncement] = useState(announcement)

  useEffect(() => {
    setcurrentAnnouncement(announcement)
  }, [announcement])

  const handleConfirm = announcement => {
    currentConversation?.conversationID &&
      postV1ImChatGroupReleaseAnnouncementApiRequest({
        groupId: currentConversation.conversationID,
        announcement,
      }).then(res => {
        if (res.isOk && res.data?.success) {
          updateChatAnnouncement(announcement)
          setHasViewedAnnouncement(currentConversation.conversationID, false)
          setcurrentAnnouncement(announcement)
          Message.success(t`features_messenger_chat_information_chat_remark_index_scxsdcusq5`)
        } else Message.error(t`features_messenger_chat_information_chat_remark_index_uxq2eoxdcv`)
      })
  }

  const { isAdmin } = useGetGroupMembers()

  return (
    <>
      <TextInput
        className={styles['chat-remark']}
        label={t`features_messenger_chat_information_chat_remark_index_cqh78zxrj8`}
        maxLength={20}
        editable
        onConfirm={handleConfirm}
        defaultValue={currentAnnouncement}
        placeholder={t`features_messenger_chat_information_chat_remark_index_an_vmamrj1`}
      />
      <SettingCell
        className="mt-8"
        switchStatus={false}
        name={t`features_messenger_chat_information_chat_remark_index_r5lny1wfmo`}
        onClick={() => open(<ChatGroupQrCode onClose={close} />)}
      />
      {isAdmin && (
        <SettingCell
          className="mt-8"
          switchStatus={false}
          name={t`features_group_group_manage_index_eqe9ptkxdg`}
          onClick={() => open(<ChatGroupManage onClose={close} />)}
        />
      )}
    </>
  )
}

export function GroupRemark() {
  const { currentConversation } = useImStore()
  const { groupDetails } = useChatGroupStore()
  const { settingData } = groupDetails?.[currentConversation?.conversationID || ''] || {}
  const { myNickName, showMemberNickName } = settingData || {}

  const { setAddressBookList } = useAddressBookStore()

  const [nickName, setnickName] = useState(myNickName)
  const [showNickName, setshowNickName] = useState(showMemberNickName?.toString() === GroupShowNicknameEnum.show)

  useEffect(() => {
    setnickName(myNickName)
    setshowNickName(showMemberNickName?.toString() === GroupShowNicknameEnum.show)
  }, [myNickName, showMemberNickName])

  const handleConfirm = (value: { myNickName?: string; showMemberNickName?: boolean }) => {
    currentConversation?.conversationID &&
      postV1ImChatGroupSettingUpdateApiRequest({
        groupId: currentConversation.conversationID,
        ...value,
        showMemberNickName: value?.showMemberNickName ? GroupShowNicknameEnum.show : GroupShowNicknameEnum.hide,
      }).then(res => {
        if (res.isOk && res.data?.success) {
          setnickName(myNickName)
          updateRemarkMapToStore()
          setAddressBookList()
          Message.success(t`features_messenger_chat_information_chat_remark_index_wubih4gb49`)
        } else Message.error(t`features_messenger_chat_information_chat_remark_index_ldn1yidruc`)
      })
  }

  return (
    <>
      <TextInput
        className={styles['chat-remark']}
        label={t`features_messenger_chat_information_chat_remark_index_disay3lo55`}
        maxLength={20}
        editable
        onConfirm={myNickName => handleConfirm({ myNickName })}
        defaultValue={nickName}
        placeholder={t`features_messenger_chat_information_chat_remark_index_an_vmamrj1`}
      />
      <SettingCell
        className="mt-8"
        switchStatus={showNickName}
        name={t`features_messenger_chat_information_chat_remark_index_uz2bz0qo4i`}
        hasSwitch
        onTrigger={flag => {
          setshowNickName(flag)
          handleConfirm({ showMemberNickName: flag })
        }}
      />
    </>
  )
}
