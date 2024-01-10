import { IIMGroupExitMessageContent, IIMGroupKickOutMessageContent } from '@/plugins/im/types'
import { useUserStore } from '@/store/user'
import { t } from '@lingui/macro'
import { isSameUid } from '@/helper/address-book'
import { IMessageProps } from '../base'

export function GroupExitMessage({ data }: IMessageProps<undefined, IIMGroupExitMessageContent>) {
  const { userInfo } = useUserStore()
  const isSelf = isSameUid(data?.uid, userInfo.uid)
  const nickname = isSelf ? t`features_messenger_chat_message_custom_group_join_tkus6zotkt` : data?.nickName
  const text = t({
    id: 'features_messenger_chat_message_custom_group_exit_cahcplicfg',
    values: { 0: nickname },
  })
  return <span className="text-text_color_02 message-text">{text}</span>
}
