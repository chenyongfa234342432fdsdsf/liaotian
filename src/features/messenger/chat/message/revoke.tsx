import { ZIMMessageDirection, ZIMMessageType } from '@/plugins/im/constants'
import { IIMRevokeMessage, IRevokeExtendedData } from '@/plugins/im/types'
import { useMessengerStore } from '@/store/messenger'
import { t } from '@lingui/macro'
import { getExtraDataFromMessage } from '@/helper/message'
import { IMessageProps } from './base'

export function RevokeMessage({ message, inConversation }: IMessageProps<IIMRevokeMessage>) {
  const isSelf = message.direction === ZIMMessageDirection.Send
  const extendDataBase = getExtraDataFromMessage(message)
  const extendData: IRevokeExtendedData = JSON.parse(message.revokeExtendedData || '{}')
  const operator = isSelf
    ? t`features_messenger_chat_message_custom_group_join_tkus6zotkt`
    : `"${extendData.operatorName || extendDataBase.fromNickname}"`
  const text = t({
    id: 'features_messenger_chat_message_revoke_kz3olsbqcf',
    values: { 0: operator },
  })
  // 文本消息才可以重新编辑
  const canEdit =
    !inConversation &&
    isSelf &&
    message.originalMessageType === ZIMMessageType.Text &&
    message.originalTextMessageContent
  const { setMessageByReEdit } = useMessengerStore()

  const edit = () => {
    setMessageByReEdit(message.originalTextMessageContent as string)
  }
  return (
    <div className="text-text_color_02">
      <span>{text}</span>
      {canEdit && (
        <span onClick={edit} className="ml-1 text-text_color_special_04 cursor-pointer">
          {t`features_messenger_chat_message_revoke_bdfs2yos58`}
        </span>
      )}
    </div>
  )
}
