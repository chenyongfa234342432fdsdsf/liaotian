import { IIMGroupKickOutMessageContent } from '@/plugins/im/types'
import { useUserStore } from '@/store/user'
import { t } from '@lingui/macro'
import { IMessageProps } from '../base'

export function GroupKickOutMessage({ data }: IMessageProps<undefined, IIMGroupKickOutMessageContent>) {
  const { userInfo } = useUserStore()
  const users = data?.users || []
  const isSelf = users[0]?.kickedUid === userInfo.uid
  const isSelfManageKickOut = users[0]?.kickUid === userInfo.uid
  const kickNickName = isSelfManageKickOut
    ? t`features_messenger_chat_message_custom_group_join_tkus6zotkt`
    : users[0]?.kickUsername
  const userNames = users
    .map(user => user.kickedUsername)
    .join(t`features_messenger_chat_message_custom_group_join_cwrwuajmcz`)
  const text = isSelf
    ? t`features_messenger_chat_message_custom_group_kick_out_gakdukoucr`
    : t({
        id: 'features_messenger_chat_message_custom_group_kick_out_0mx_re4uen',
        values: { 0: kickNickName, 1: userNames },
      })
  return <span className="text-text_color_02 message-text">{text}</span>
}
