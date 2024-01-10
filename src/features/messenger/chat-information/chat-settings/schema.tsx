import Icon from '@/components/icon'
import { toggleConversationDoNotDisturb, toggleConversationPined } from '@/helper/conversation'
import { baseImStore } from '@/store/im'
import { Message } from '@nbit/arco'
import { addFriend, addToBlackList, deleteFriend, deleteGroup } from '@/helper/address-book'
import { baseAddressBookStore } from '@/store/address-book'
import { t } from '@lingui/macro'
import { clearConversationMessages } from '@/helper/message'
import { ClearChatModal } from '../../chat-information-modals/alert-modals'
import ChatComplainModal from '../../chat-information-modals/chat-complain-modal'

export type TSettingsSchema = ReturnType<typeof CommonChatSettingsSchema>[0] & {
  onClick?: any
  onTrigger?: (flag: boolean) => void
}

export const UserChatSettingsSchema = (uid?: string) => [
  {
    name: t`features_messenger_chat_chat_header_more_fokapfv5cr`,
    hasSwitch: true,
    switchStatus: false,
    icon: <Icon name="icon_chat_top" />,
    hasModal: false,
    Modal: '',
    onTrigger: flag => {
      const { currentConversation, conversations } = baseImStore.getState()
      let conversation = currentConversation
      if (uid) conversation = conversations?.find(c => c.conversationID === uid)
      if (!conversation?.conversationID) return
      toggleConversationPined(conversation)
    },
  },
  // {
  //   name: '设置聊天背景',
  //   hasSwitch: false,
  //   switchStatus: false,
  //   icon: <Icon name="icon_group_chat_set_bg" />,
  //   hasModal: true,
  //   Modal: ChatBgModal,
  // },
  {
    name: t`helper_address_book_9rpuyg59gl`,
    hasSwitch: false,
    switchStatus: false,
    icon: <Icon name="icon_chat_blacklist" />,
    hasModal: false,
    Modal: '',
    onClick: () => {
      const { currentConversation } = baseImStore.getState()
      currentConversation && addToBlackList(currentConversation)
    },
  },
]

export const CommonChatSettingsSchema = () => [
  {
    name: t`features_messenger_chat_chat_header_more_id_dkarjtm`,
    hasSwitch: false,
    switchStatus: false,
    icon: <Icon name="icon_chat_clear" />,
    hasModal: false,
    Modal: '',
    onClick: () => {
      const { currentConversation } = baseImStore.getState()
      currentConversation && clearConversationMessages(currentConversation)
    },
  },
  {
    name: t`features_messenger_chat_chat_header_more_vegbnukvgl`,
    hasSwitch: false,
    switchStatus: false,
    icon: <Icon name="icon_chat_complaint" />,
    hasModal: true,
    Modal: ChatComplainModal,
  },
  {
    name: t`features_messenger_chat_chat_header_more_hpwm4idktc`,
    hasSwitch: false,
    switchStatus: false,
    icon: <Icon name="icon_chat_delete1" />,
    hasModal: false,
    Modal: '',
    onClick: async () => {
      const { setAddressBookList } = baseAddressBookStore.getState()
      const { currentConversation } = baseImStore.getState()
      await deleteFriend(currentConversation!)
      // 调用通讯录好友，更新列表
      setAddressBookList()
    },
  },
]

export const GroupChatSettingsSchema = () => [
  {
    name: t`features_messenger_chat_chat_header_more_fokapfv5cr`,
    hasSwitch: true,
    switchStatus: false,
    icon: <Icon name="icon_chat_top" />,
    hasModal: false,
    Modal: '',
    onTrigger: flag => {
      const { currentConversation } = baseImStore.getState()
      if (!currentConversation?.conversationID) return
      toggleConversationPined(currentConversation)
    },
  },
  {
    name: t`features_messenger_chat_chat_header_more_imid_mlr_9`,
    hasSwitch: true,
    switchStatus: false,
    icon: <Icon name="icon_chat_do_not_disturb" />,
    hasModal: false,
    Modal: '',
    onTrigger: flag => {
      const { currentConversation } = baseImStore.getState()
      if (!currentConversation?.conversationID) return
      toggleConversationDoNotDisturb(currentConversation)
    },
  },
  // {
  //   name: '设置聊天背景',
  //   hasSwitch: false,
  //   switchStatus: false,
  //   icon: <Icon name="icon_group_chat_set_bg" />,
  //   hasModal: true,
  //   Modal: ChatBgModal,
  // },
]

export const GroupAdminCommonSettingsSchema = () => [
  {
    name: t`features_messenger_chat_information_chat_settings_schema_5mf95pfdms`,
    hasSwitch: false,
    switchStatus: false,
    icon: <Icon name="msg" />,
    hasModal: false,
    Modal: '',
  },
]

export const MemberCommonSettingsSchema = () => [
  {
    name: t`features_messenger_chat_chat_header_more_vegbnukvgl`,
    hasSwitch: false,
    switchStatus: false,
    icon: <Icon name="icon_chat_complaint" />,
    hasModal: true,
    Modal: ChatComplainModal,
  },
]

export const MemberChatSettingsSchema = uid => [
  {
    name: t`features_messenger_chat_information_chat_settings_schema_tgrf_5rcdi`,
    hasSwitch: false,
    switchStatus: false,
    icon: <Icon name="icon_address_book_invite_friend" />,
    hasModal: true,
    onClick: () => {
      addFriend(uid)
    },
  },
]

export const CommonGroupChatSettingsSchema = () => [
  {
    name: t`features_messenger_chat_chat_header_more_id_dkarjtm`,
    hasSwitch: false,
    switchStatus: false,
    icon: <Icon name="icon_chat_clear" />,
    hasModal: false,
    Modal: '',
    onClick: () => {
      const { currentConversation } = baseImStore.getState()
      currentConversation && clearConversationMessages(currentConversation)
    },
  },
  {
    name: t`features_messenger_chat_chat_header_more_vegbnukvgl`,
    hasSwitch: false,
    switchStatus: false,
    icon: <Icon name="icon_chat_complaint" />,
    hasModal: true,
    Modal: ChatComplainModal,
  },
  {
    name: t`features_messenger_chat_information_chat_settings_schema_5mf95pfdms`,
    hasSwitch: false,
    switchStatus: false,
    icon: <Icon name="icon_chat_delete1" />,
    hasModal: false,
    Modal: '',
    onClick: async () => {
      const { currentConversation } = baseImStore.getState()
      currentConversation && deleteGroup(currentConversation)
    },
  },
]
