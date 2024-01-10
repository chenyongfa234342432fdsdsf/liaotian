import { MessageSendFailTypeEnum } from '@/plugins/im/constants'
import { IIMJoinGroupMessageContent } from '@/plugins/im/types'
import { useUserStore } from '@/store/user'
import { t } from '@lingui/macro'
import { isSameUid } from '@/helper/address-book'
import { IMessageProps } from '../base'

export function GroupJoinMessage({ data }: IMessageProps<undefined, IIMJoinGroupMessageContent>) {
  const { userInfo } = useUserStore()
  const users = data?.users || []
  const inviteUserIsSelf = isSameUid(users[0]?.inviterUid, userInfo.uid)
  const inviteNickName = inviteUserIsSelf
    ? t`features_messenger_chat_message_custom_group_join_tkus6zotkt`
    : users[0]?.inviterNickName
  const userNames = users
    .map(user =>
      isSameUid(userInfo.uid, user.uid)
        ? t`features_messenger_chat_message_custom_group_join_tkus6zotkt`
        : user.nickName
    )
    .join(t`features_messenger_chat_message_custom_group_join_cwrwuajmcz`)
  const text = users[0]?.isInitiative
    ? t({
        id: 'features_messenger_chat_message_custom_group_join_jdhf1f4kzt',
        values: { 0: userNames },
      })
    : t({
        id: 'features_messenger_chat_message_custom_group_join_mrcqvfb4y8',
        values: { 0: inviteNickName, 1: userNames },
      })
  return <span className="text-text_color_02 message-text">{text}</span>
}
