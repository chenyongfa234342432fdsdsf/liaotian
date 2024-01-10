import { useImStore } from '@/store/im'
import { oss_svg_image_domain_address } from '@/constants/oss'
import UploadAvatarWithCrop from '@/components/upload-avatar-with-crop'
import { useContext, useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { getQueryUserInfo } from '@/apis/settings-center'
import { YapiGetV1ImChatGroupMemberListData } from '@/typings/yapi/ImChatGroupMemberV1GetApi'
import { t } from '@lingui/macro'
import { useGetGroupInfoDetails } from '@/hooks/group/chat-group'
import ChatAvatar from '@/components/chat-avatar'
import { updateGroupAvatar } from '@/helper/address-book'
import { YapiGetV1ImChatFriendDetailData } from '@/typings/yapi/ImChatFriendDetailV1GetApi'
import { HideMobileEnum } from '@/constants/address-book'
import styles from './index.module.css'
import { UserChatInfoContext } from '..'

export function UserChatAvatar({ friendDetails }: { friendDetails: YapiGetV1ImChatFriendDetailData }) {
  const contextUid = useContext(UserChatInfoContext)
  const { currentConversation } = useImStore() || {}
  const { conversationAvatarUrl = '', conversationName, conversationID } = currentConversation || {}

  const uid = contextUid || conversationID

  const { data, loading, run } = useRequest(getQueryUserInfo, { manual: true })

  const { mobileHideSet } = friendDetails

  const { mobileNumber, mobileCountryCd, nickName, userName, id, avatarPath } = data?.data?.[0] || {}

  useEffect(() => {
    run({ uid })
  }, [conversationID])

  return (
    <div className={styles.scoped}>
      <ChatAvatar className="chat-avatar" src={avatarPath} size={200} />
      <div className="avatar-name">{nickName || userName || id}</div>
      {mobileHideSet === HideMobileEnum.NO && (
        <div className="text-base text-text_color_02">
          {mobileCountryCd && `+${mobileCountryCd}`} {mobileNumber}
        </div>
      )}
    </div>
  )
}

export function GroupChatAvatar() {
  const { currentConversation } = useImStore()
  const groupId = currentConversation?.conversationID?.toString()

  const { details, fetchApi } = useGetGroupInfoDetails()
  const { groupData } = details || {}
  const { headImage, groupName, number } = groupData || {}

  const [headImg, setHeadImg] = useState(headImage)

  useEffect(() => {
    setHeadImg(headImage)
  }, [headImage])

  const handleHeadImgChange = newHeadImg => {
    if (groupId) {
      updateGroupAvatar(groupId, newHeadImg).then(res => {
        if (res) {
          setHeadImg(newHeadImg)
          fetchApi()
        }
      })
    }
  }

  return (
    <div className={styles.scoped}>
      <UploadAvatarWithCrop oldHeadImg={headImg} onHeadImgChange={handleHeadImgChange} isGroup />
      <div className="text-2xl">{groupName}</div>
      <div className="text-base text-text_color_02">
        {t({
          id: 'features_messenger_chat_information_chat_avatar_index_8on6x2_heg',
          values: { 0: number },
        })}
      </div>
    </div>
  )
}

export function MemberChatAvatar(props: Partial<YapiGetV1ImChatGroupMemberListData>) {
  const { avatarPath, nickName, uid } = props
  return (
    <div className={styles.scoped}>
      <ChatAvatar className="chat-avatar" src={avatarPath} size={200} />
      <div className="avatar-name">{nickName || uid}</div>
    </div>
  )
}
