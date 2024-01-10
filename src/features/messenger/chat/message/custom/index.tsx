import {
  IIMAddFriendMessageContent,
  IIMCallCancelMessageContent,
  IIMCallRejectMessageContent,
  IIMCustomMessage,
} from '@/plugins/im/types'
import { getMessageFileType } from '@/helper/message'
import { IMCustomMessageSubTypeEnum, ZIMMessageDirection, ZIMMessageType } from '@/plugins/im/constants'
import { t } from '@lingui/macro'
import { isSameUid } from '@/helper/address-book'
import { baseUserStore } from '@/store/user'
import { useAddressBookStore } from '@/store/address-book'
import { IMessageProps } from '../base'
import { RedPocketMessage, RedPocketReceivedMessage } from './red-pocket'
import { SendFailedMessage } from './send-failed'
import { GroupJoinMessage } from './group-join'
import { GroupKickOutMessage } from './group-kick-out'
import { CallEnd } from './call-end'
import { GroupExitMessage } from './group-exit'

function AddFriend({ data, message }: IMessageProps<undefined, IIMAddFriendMessageContent>) {
  const isSelf = isSameUid(data?.applyUid, baseUserStore.getState().userInfo.uid)
  const { addressBookList } = useAddressBookStore()
  const friend = addressBookList.find(item => isSameUid(item.uid, message.conversationID))
  const nickname = isSelf ? data?.targetNickName : data?.applyNickName
  const text = t({
    id: 'features_messenger_chat_message_custom_index_36vp8jlbxc',
    values: { 0: nickname || friend?.friendRemark || friend?.nickName || message.conversationID },
  })
  return <div className="message-text text-text_color_02">{text}</div>
}
function Sign({ message }: IMessageProps) {
  const text = t`features_messenger_chat_message_custom_index_3yikiam465`
  return <div className="message-text text-text_color_02">{text}</div>
}

function GroupBlocked({ message }: IMessageProps) {
  const text = t`features_messenger_chat_message_custom_index_zyccegch3h`
  return <div className="message-text text-text_color_02">{text}</div>
}
function CanceledCall({ data }: IMessageProps<undefined, IIMCallCancelMessageContent>) {
  const isSelf = isSameUid(data?.callCancelUserId, baseUserStore.getState().userInfo.uid)
  const text = isSelf
    ? t`features_messenger_chat_message_custom_index_nlytzmkgps`
    : t`features_messenger_chat_message_custom_index_8b7fsr9ilc`
  return <div className="message-text text-text_color_02">{text}</div>
}
function RejectedCall({ data }: IMessageProps<undefined, IIMCallRejectMessageContent>) {
  const isSelf = isSameUid(data?.callRejectUserId, baseUserStore.getState().userInfo.uid)
  const text = isSelf
    ? t`features_messenger_chat_message_custom_index__smd9t2fmg`
    : t`features_messenger_chat_message_custom_index_walrv5icoj`
  return <div className="message-text text-text_color_02">{text}</div>
}

const componentsMap = {
  [IMCustomMessageSubTypeEnum.mediaZoomClosed]: CallEnd,
  [IMCustomMessageSubTypeEnum.friendAdded]: AddFriend,
  [IMCustomMessageSubTypeEnum.checkInReminder]: Sign,
  [IMCustomMessageSubTypeEnum.redPocket]: RedPocketMessage,
  [IMCustomMessageSubTypeEnum.redPocketReceive]: RedPocketReceivedMessage,
  [IMCustomMessageSubTypeEnum.messageSendFail]: SendFailedMessage,
  [IMCustomMessageSubTypeEnum.groupBlocked]: GroupBlocked,
  [IMCustomMessageSubTypeEnum.groupJoin]: GroupJoinMessage,
  [IMCustomMessageSubTypeEnum.groupKickOut]: GroupKickOutMessage,
  [IMCustomMessageSubTypeEnum.groupExit]: GroupExitMessage,
  [IMCustomMessageSubTypeEnum.callCancel]: CanceledCall,
  [IMCustomMessageSubTypeEnum.callReject]: RejectedCall,
}

export function CustomMessage({ message, inConversation }: { message: IIMCustomMessage; inConversation?: boolean }) {
  const Component = componentsMap[message.subType]
  const data = JSON.parse((message.message as string) || '{}')
  if (Component) {
    return <Component inConversation={inConversation} data={data} message={message} />
  }
  return <div className="message-text">{t`features_messenger_chat_message_custom_index_vhq21v00jo`}</div>
}
