import Icon from '@/components/icon'
import { GroupEnum, GroupMemberBanEnum } from '@/constants/group'
import { useMessengerRightDrawer } from '@/hooks/use-messenger-right-drawer'
import { groupStore } from '@/store/group'
import { useGetFilteredGroupMembers, useGetGroupMembers } from '@/hooks/group/chat-group'
import { t } from '@lingui/macro'
import { useUserStore } from '@/store/user'
import classNames from 'classnames'
import ChatAvatar from '@/components/chat-avatar'
import { useImStore } from '@/store/im'
import { isEmpty } from 'lodash'
import ListEmpty from '@/components/list-empty'
import { popBoxConfirm } from '@/components/pop-box'
import { banGroup } from '@/apis/group'
import { Message } from '@nbit/arco'
import { updateGroupMembers } from '@/helper/address-book'
import { YapiGetV1ImChatGroupMemberListData } from '@/typings/yapi/ImChatGroupMemberV1GetApi'
import { ChatEditMembers, ChatGroupMembers, ChatInfoByUid } from '..'
import styles from './index.module.css'

function MemberCell(props: Partial<YapiGetV1ImChatGroupMemberListData> & { allowMute?: boolean }) {
  const [open, close] = useMessengerRightDrawer()
  const { avatarPath, nickName, administrator, uid, isBan, lord, allowMute } = props as any
  const { userInfo } = useUserStore()
  const { currentConversation } = useImStore() || {}
  const { conversationID } = currentConversation || {}
  const isMe = userInfo?.uid?.toString() === uid?.toString()

  const muteMember = (e: MouseEvent, toBan: GroupMemberBanEnum) => {
    const banText =
      toBan === GroupMemberBanEnum.ban
        ? t`features_messenger_chat_information_chat_members_index_c2l99hin4c`
        : t`features_messenger_chat_information_chat_members_index_p5srsbcqse`
    if (!allowMute) return
    e.stopPropagation()
    popBoxConfirm(
      t`helper_message_fugvl05ct4`,
      t({
        id: 'features_messenger_chat_information_chat_members_index_jyyoplwsqi',
        values: { 0: banText },
      })
    ).then(async () => {
      if (conversationID) {
        const res = await banGroup({ groupId: conversationID, banType: 2, memberUid: [uid], ban: toBan })
        if (res.isOk && res.data?.success) {
          updateGroupMembers(conversationID)
          Message.success(
            t({
              id: 'features_messenger_chat_information_chat_members_index_q5uhbgaqgx',
              values: { 0: banText },
            })
          )
        } else
          Message.success(
            t({
              id: 'features_messenger_chat_information_chat_members_index_1d4jiatpnw',
              values: { 0: banText },
            })
          )
      }
    })
  }
  return (
    <div
      className={classNames(styles['member-cell'], { '!cursor-default': isMe })}
      onClick={() => !isMe && open(<ChatInfoByUid uid={uid?.toString()} onClose={close} />)}
    >
      <ChatAvatar className="avatar-icon" size={40} src={avatarPath} />
      <span className="mr-auto ml-3">{nickName}</span>
      {lord && <span className="admin-tag">{t`features_group_group_members_manage_index_qgyohgesjw`}</span>}
      {administrator && <span className="admin-tag">{t`features_group_group_members_manage_index_5cucpjz9ym`}</span>}
      {!administrator &&
        !lord &&
        allowMute &&
        (GroupMemberBanEnum.ban === isBan ? (
          <Icon
            className="muted-icon p-2 mr-1"
            name="icon_chat_forbidden"
            onClick={e => muteMember(e, GroupMemberBanEnum.normal)}
          />
        ) : (
          <Icon
            className="p-2 mr-1"
            name="icon_chat_prohibition"
            onClick={e => muteMember(e, GroupMemberBanEnum.ban)}
          />
        ))}
      <Icon name="icon_chat_arrow" className={classNames({ '!cursor-default': isMe })} />
    </div>
  )
}

function ChatMembers() {
  const [open, close] = useMessengerRightDrawer()

  const { members } = useGetGroupMembers()

  const currentMembers = useGetFilteredGroupMembers(members)

  const { userInfo } = useUserStore()
  const user = currentMembers?.find(member => member.uid === userInfo?.uid)
  const isAdminOrLord = user?.lord || user?.administrator

  return (
    <div className={styles['chat-members']}>
      <div
        className="flex items-center text-text_color_02 mb-4 cursor-pointer"
        onClick={() => {
          open(<ChatGroupMembers onClose={close} />)
        }}
      >
        <span>
          {members?.length || 0} {t`features_messenger_chat_information_chat_members_index_vevb4wa2ym`}
        </span>
        <span className="ml-auto">{t`features_messenger_chat_information_chat_members_index_mw7jyf4yqw`}</span>
        <Icon name={'icon_chat_arrow'} />
      </div>
      <div className="flex flex-row items-center space-x-4">
        <div
          className="set-new-icon-container"
          onClick={() => {
            const { setGroupOperateMark } = groupStore.getState()
            setGroupOperateMark(GroupEnum.add)
            open(<ChatEditMembers onClose={close} />)
          }}
        >
          <Icon name="icon_set_new" />
        </div>

        <span>{t`features_group_group_members_manage_index_4zzexhrrt3`}</span>
      </div>
      {/* list of members */}
      {currentMembers?.map((member, idx) => (
        <MemberCell key={idx} {...member} allowMute={isAdminOrLord} />
      ))}
    </div>
  )
}

export function GroupMemberList() {
  const { members } = useGetGroupMembers()

  const { userInfo } = useUserStore()
  const currentMembers = useGetFilteredGroupMembers(members)

  const user = currentMembers?.find(member => member.uid === userInfo?.uid)
  const isAdminOrLord = user?.lord || user?.administrator

  if (isEmpty(currentMembers)) return <ListEmpty />
  return (
    <div className={styles['group-chat-members-list']}>
      {currentMembers?.map((member, idx) => (
        <MemberCell key={idx} {...member} allowMute={isAdminOrLord} />
      ))}
    </div>
  )
}

export default ChatMembers
