import { revokeGroupMessageByAdmin } from '@/apis/messsage/group'
import Icon from '@/components/icon'
import SelectContact from '@/features/select-contact'
import { getGroupById, useIsInGroup, useSelfInGroup } from '@/helper/address-book'
import { deleteMessages, forwardMessage } from '@/helper/message'
import { requestWithLoading } from '@/helper/render'
import { ZIMConversationType, ZIMMessageDirection, ZIMMessageSentStatus, ZIMMessageType } from '@/plugins/im/constants'
import { getImInstance } from '@/plugins/im/core'
import { IIMConversation, IIMMessage, IIMRevokeMessage } from '@/plugins/im/types'
import { useImStore } from '@/store/im'
import { useMessengerStore } from '@/store/messenger'
import { useUserStore } from '@/store/user'
import { t } from '@lingui/macro'
import { Dropdown, Menu, Message } from '@nbit/arco'
import classNames from 'classnames'
import produce from 'immer'
import { useState } from 'react'
import { useCopyToClipboard } from 'react-use'

function useMessageCanRevoke(message: IIMMessage) {
  const { currentConversation, updateMessagesByConversation } = useImStore()
  const { userInfo } = useUserStore()
  const isSelf = message.direction === ZIMMessageDirection.Send
  const isGroup = message.conversationType === ZIMConversationType.Group
  const selfInGroup = useSelfInGroup(message.conversationID)
  // 自己发送成功 2 分钟以内
  let canRevoke =
    isSelf &&
    message.sentStatus === ZIMMessageSentStatus.Success &&
    Date.now() - Number(message.timestamp) < 1.9 * 60 * 1000
  // 走撤回逻辑
  let revoke = () => {
    const group = getGroupById(currentConversation!.conversationID)
    const nickname = message.conversationType === ZIMConversationType.Group ? group?.myNickName : userInfo.nickName
    getImInstance().revokeMessage(message, {
      revokeExtendedData: JSON.stringify({
        operatorName: nickname || userInfo.nickName,
      }),
    })
    // 自己撤回的消息无法收到回调，需要自己手动处理
    updateMessagesByConversation(
      currentConversation!.conversationID,
      [
        produce(message, (draft: IIMRevokeMessage) => {
          draft.originalMessageType = draft.type
          draft.originalTextMessageContent = draft.message
          draft.type = ZIMMessageType.Revoke
        }) as any,
      ],
      'update'
    )
    Message.success(t`features_messenger_chat_message_actions_bqmv8ipzz0`)
  }
  // 群组 24 小时内管理员可撤回（包括自己的）
  if (isGroup && !canRevoke) {
    const isAdmin = !!selfInGroup?.lord || !!selfInGroup?.administrator
    canRevoke =
      isAdmin &&
      message.sentStatus === ZIMMessageSentStatus.Success &&
      Date.now() - Number(message.timestamp) < 23.59 * 60 * 60 * 1000
    revoke = async () => {
      // 调用接口，成功后直接删除
      const { isOk } = await requestWithLoading(
        revokeGroupMessageByAdmin({
          groupId: message.conversationID as any,
          messageId: message.messageID,
        })
      )
      if (!isOk) {
        return
      }
      deleteMessages([message], currentConversation!, false)
      Message.success(t`features_messenger_chat_message_actions_bqmv8ipzz0`)
    }
  }

  return [canRevoke, revoke] as const
}

export function ChatMessagesActions({
  message,
  children,
  inCenter,
}: {
  message: IIMMessage
  children: React.ReactNode
  inCenter: boolean
}) {
  const { currentConversation, updateMessagesByConversation } = useImStore()
  const { setInMultiSelect, inMultiSelect } = useMessengerStore()
  const isSelf = message.direction === ZIMMessageDirection.Send
  const [, copyValue] = useCopyToClipboard()
  const copy = () => {
    copyValue(message.message as string)
    Message.success(t`features_messenger_chat_message_actions_dp8cwcddzx`)
  }
  const [forwardVisible, setForwardVisible] = useState(false)
  const forward = () => {
    setForwardVisible(true)
  }
  const onConfirmForward = (selectedConversations: IIMConversation[]) => {
    selectedConversations.forEach(conversation => {
      // 暂时不考虑合并转发
      forwardMessage(message, conversation)
    })
    setForwardVisible(false)
  }
  const multipleChoice = () => {
    setInMultiSelect(true)
  }
  const del = async () => {
    deleteMessages([message], currentConversation!)
  }
  const [canRevoke, revoke] = useMessageCanRevoke(message)
  const canCopy = message.type === ZIMMessageType.Text
  // 无法转发
  const canForward = ![
    ZIMMessageType.Custom,
    ZIMMessageType.Revoke,
    ZIMMessageType.Command,
    ZIMMessageType.Unknown,
    ZIMMessageType.System,
  ].includes(message.type)
  const menus = [
    {
      id: '1',
      hidden: !canCopy,
      icon: 'icon_chat_messages_copy',
      text: t`features_messenger_chat_message_actions_eprqxenp68`,
      onClick: copy,
    },
    {
      id: '2',
      icon: 'icon_chat_messages_forward',
      text: t`features_messenger_chat_message_actions_5xkqpc5hef`,
      hidden: !canForward,
      onClick: forward,
    },
    {
      id: '3',
      hidden: !canRevoke,
      icon: 'icon_chat_messages_retract',
      text: t`features_messenger_chat_message_actions_3fapevth_r`,
      onClick: revoke,
    },
    {
      id: '4',
      icon: 'icon_chat_messages_multiple_choice',
      text: t`features_messenger_chat_message_actions_3xzjfuoglw`,
      onClick: multipleChoice,
    },
    {
      id: '5',
      icon: 'icon_chat_messages_delete',
      text: t`features_messenger_chat_message_actions_y9zlvhqoie`,
      color: 'text-secondary_color',
      onClick: del,
    },
  ]

  const inGroup = useIsInGroup()

  return (
    <>
      <Dropdown
        trigger="contextMenu"
        position={isSelf ? 'br' : 'bl'}
        disabled={inMultiSelect || !inGroup || inCenter}
        droplist={
          <Menu>
            {menus.map(menu => {
              if (menu.hidden) {
                return null
              }
              return (
                <Menu.Item key={menu.id} className="flex items-center" onClick={menu.onClick}>
                  <Icon
                    className={classNames('text-xl mr-3', menu.color ? menu.color : 'text-text_color_01')}
                    name={menu.icon}
                  />
                  <span className={classNames(menu.color ? menu.color : '', 'text-base')}>{menu.text}</span>
                </Menu.Item>
              )
            })}
          </Menu>
        }
      >
        {children}
      </Dropdown>
      <SelectContact
        visible={forwardVisible}
        onClose={() => {
          setForwardVisible(false)
        }}
        onConfirm={onConfirmForward}
      />
    </>
  )
}
