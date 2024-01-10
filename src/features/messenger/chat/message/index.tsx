/* eslint-disable prettier/prettier */
// 会话中的消息展示组件

import classNames from 'classnames'
import { IMCustomMessageSubTypeEnum, ZIMConversationType, ZIMMessageDirection, ZIMMessageReceiptStatus, ZIMMessageType } from '@/plugins/im/constants'
import { useImStore } from '@/store/im'
import { useEffect, useRef, useState } from 'react'
import { useUpdateEffect } from 'ahooks'
import LazyImage from '@/components/lazy-image'
import { oss_svg_image_domain_address } from '@/constants/oss'
import { useMessengerStore } from '@/store/messenger'
import { Checkbox } from '@nbit/arco'
import { getExtraDataFromMessage, sendMessagesReceiptRead } from '@/helper/message'
import produce from 'immer'
import { IIMMessage } from '@/plugins/im/types'
import { ZIMCustomMessage } from 'zego-zim-web'
import { defaultCheckboxRender } from '@/components/checkbox'
import { isChainstar, isMerchant } from '@/helper/env'
import { clearConversationUnreadMessageCount } from '@/helper/conversation'
import ChatAvatar from '@/components/chat-avatar'
import { useAddressBookStore } from '@/store/address-book'
import { getGroupById, isSameUid, useConversationGroup, useCurrentGroupDetail } from '@/helper/address-book'
import { useCommonStore } from '@/store/common'
import { GroupNicknackVisibleEnum } from '@/constants/address-book'
import { GroupHideNormalMembers } from '@/constants/group'
import styles from './index.module.css'
import { IMessageProps, TimeAndReadStatus } from './base'
import { ImageMessage } from './image'
import { VideoMessage } from './video'
import { AudioMessage } from './audio'
import { FileMessage } from './file'
import { ChatMessagesActions } from './actions'
import { RevokeMessage } from './revoke'
import { CustomMessage } from './custom'
import { TextMessage } from './text'

function ChatArrow({ isSelf, isGroup }: { isSelf: boolean; isGroup: boolean }) {
  const { theme } = useCommonStore()
  const iconName = `chat_arrow_${isSelf ? 'right' : 'left'}${isGroup && !isSelf ? '_group' : ''}${isMerchant && isSelf ? '_business' : ''}_${theme}.png`
  return (
    <div className={classNames(styles['chat-arrow'], isSelf ? 'is-right' : 'is-left', {
      'is-group': isGroup
    })}>
      <LazyImage src={`${oss_svg_image_domain_address}chat/chat-arrows/${iconName}`} />
    </div>
  )
}
function GroupSenderAvatar({ message }: { message: IIMMessage }) {
  const extendData = getExtraDataFromMessage(message)
  const { openContactInfo } = useMessengerStore()
  const groupDetail  = useCurrentGroupDetail()
  // 如果当前群开启了关闭群成员显示功能则不支持
  const openChatInfo = () => {
    if (groupDetail?.groupData.isHideUser === GroupHideNormalMembers.hide && isMerchant) {
      return
    }
    openContactInfo(message.senderUserID)
  }

  return <div className={styles['group-sender-avatar']} onClick={openChatInfo}>
    <ChatAvatar  padding={8}  src={extendData.avatarUrl || ''} size={28}  />
  </div>
}

function ToTextMessage({ message }: IMessageProps) {
  const map = {
    [ZIMMessageType.File]: '【文件】',
  }
  return <div className="text-center">{map[message?.type as any] || '未知消息'}</div>
}

const messageMap = {
  [ZIMMessageType.Text]: TextMessage,
  [ZIMMessageType.Image]: ImageMessage,
  [ZIMMessageType.Video]: VideoMessage,
  [ZIMMessageType.Audio]: AudioMessage,
  [ZIMMessageType.File]: FileMessage,
  [ZIMMessageType.Revoke]: RevokeMessage,
  [ZIMMessageType.Custom]: CustomMessage,
}

function getMessageInCenter(message: IIMMessage) {
  return [ZIMMessageType.Custom, ZIMMessageType.Revoke, ZIMMessageType.Command].includes(message.type) && ![IMCustomMessageSubTypeEnum.redPocket].includes((message as ZIMCustomMessage).subType)
}

function getChatMessageArrowVisible(message: IIMMessage, preMessage?: IIMMessage, nextMessage?: IIMMessage) {
  const inCenter = getMessageInCenter(message)
  const isSelf = message.direction === ZIMMessageDirection.Send
  const isGroup = message.conversationType === ZIMConversationType.Group
  // 不在中间且消息不连续的时候才展示，或者一个人连续，跨天了，或者下一条消息为自定义消息
  let chatArrowVisible = !inCenter && (
    !nextMessage || nextMessage.senderUserID !== message.senderUserID || (new Date(nextMessage.timestamp).getDate() !== new Date(message.timestamp).getDate()) || getMessageInCenter(nextMessage)
  )

  //  不在中间且消息不连续的时候才展示，或者一个人连续，跨天了，或者上一条消息为自定义消息，如果是自己发送的，就和普通消息规则一致
  let groupChatArrowVisible = isSelf ? chatArrowVisible : !inCenter && isGroup && (
    !preMessage || preMessage.senderUserID !== message.senderUserID || (new Date(preMessage.timestamp).getDate() !== new Date(message.timestamp).getDate()) || getMessageInCenter(preMessage)
  )
  const groupAvatarVisible = groupChatArrowVisible && isGroup && !isSelf
  // 红包消息不展示，箭头自定义
  if (message.type === ZIMMessageType.Custom && (message as ZIMCustomMessage).subType === IMCustomMessageSubTypeEnum.redPocket) {
    chatArrowVisible = false
    groupChatArrowVisible = false
  }

  return {
    chatArrowVisible: isGroup ? groupChatArrowVisible : chatArrowVisible,
    groupChatArrowVisible,
    groupAvatarVisible,
  }
}
function extraClassnamePerMessage(message:IIMMessage) {
  const cls =`messsage-${  ZIMMessageType[message.type]}`
  if(message.type === ZIMMessageType.Custom) {
    const subTypeName = IMCustomMessageSubTypeEnum[(message as any).subType]
    return `${cls}-${subTypeName}`.toLowerCase()
  }
  return cls
}

function ChatMessage({ message, setHeight: propsSetHeight, preMessage, messagesWrapperRef, nextMessage   }: IMessageProps) {
  const { currentConversation, updateMessagesByConversation } = useImStore()
  const { inMultiSelect, addOrRemoveSelectedMessage, selectedMessages,  imageMaxWidth } = useMessengerStore()
  const isSelf = message.direction === ZIMMessageDirection.Send
  const isGroup = message.conversationType === ZIMConversationType.Group
  const Component = messageMap[message?.type as any]
  // TODO: 是否展示在中间
  const inCenter = getMessageInCenter(message)

  const [height, setHeight] = useState(42)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight)
    }
  }, [])
  useUpdateEffect(() => {
    propsSetHeight?.(height)
  }, [height])
  // 现阶段不支持，也不展示未知的消息类型直接返回空来处理
  const isUnknownMessage = false
  const wrapperRef = useRef<HTMLDivElement>(null)
  const messageRef = useRef(message)
  messageRef.current = message
  const extendData = getExtraDataFromMessage(message)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (isUnknownMessage || !wrapperRef.current || !messagesWrapperRef?.current) {
      return
    }
    // 当消息进入视图中时，标记为已读
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setInView(true)
          // 目前看这里发送了之后并不会更新，所以需要手动更新下
          if (!isSelf && messageRef.current.receiptStatus === ZIMMessageReceiptStatus.Processing) {
            sendMessagesReceiptRead([messageRef.current])
            updateMessagesByConversation(messageRef.current.conversationID, [produce(messageRef.current, draft => {
              draft.receiptStatus = ZIMMessageReceiptStatus.Done
            })], 'update')

          }
          // 最后一条了，则清除会话未读
          if (!nextMessage) {
            clearConversationUnreadMessageCount()
          }
          observer.disconnect()
        }
      })
    }, {
      root: messagesWrapperRef.current,
    })
    observer.observe(wrapperRef!.current)
    return () => {
      observer.disconnect()
    }
  }, [isUnknownMessage])
  
  const { chatArrowVisible, groupChatArrowVisible, groupAvatarVisible } = getChatMessageArrowVisible(message, preMessage, nextMessage)
  const { groupMembers } = useAddressBookStore()
  const groupMember = (groupMembers[currentConversation!.conversationID] || []).find(item => isSameUid(item.uid, message.senderUserID))
  // 优先显示好友备注，其次群昵称，最后昵称
  const groupNickName = groupMember?.nickName || groupMember?.realNickName || extendData.fromNickname
  const group = useConversationGroup(currentConversation)
  if (isUnknownMessage) {
    return null
  }
  const checkAble = inMultiSelect && !inCenter
  const onSelect = () => {
    if (checkAble) {
      addOrRemoveSelectedMessage(message)
    }
  }
  const isChecked = !!selectedMessages.find(item => item.messageID === message.messageID)

  return (
      <div ref={wrapperRef} className="relative flex" >
        {checkAble && (
          <Checkbox
            className={styles['multi-checkbox']}
            onChange={() => {
              addOrRemoveSelectedMessage(message)
            }}
            checked={isChecked}
          >{defaultCheckboxRender}</Checkbox>
        )}
        <div
          ref={ref}
          onClick={onSelect}
          className={classNames(styles['message-wrapper'], 'flex-1', {
            'is-self': isSelf,
            'in-center': inCenter,
            'cursor-pointer': inMultiSelect,
          })}
        >
          <div className={classNames("message-content",extraClassnamePerMessage(message))} style={{
        maxWidth: imageMaxWidth || '60%',
      }}>
            <ChatMessagesActions inCenter={inCenter} message={message}>
              {!isSelf && groupAvatarVisible && group?.showMemberNickName === GroupNicknackVisibleEnum.YES && <div className={classNames('group-sender-nickname', {
                'not-with-arrow': !groupChatArrowVisible,
              })}>{groupNickName}</div>}
              {Component ? (
                <Component inView={inView} setHeight={setHeight} message={message} />
              ) : (
                <ToTextMessage setHeight={setHeight} message={message} />
              )}
              {(chatArrowVisible || groupChatArrowVisible) && <ChatArrow isGroup={isGroup} isSelf={isSelf} />}
              {!isSelf && groupAvatarVisible && <GroupSenderAvatar message={message} />}
            </ChatMessagesActions>
          </div>
        </div>

      </div>
  )
}

export default ChatMessage
