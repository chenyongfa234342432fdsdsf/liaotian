import { useMessengerStore } from '@/store/messenger'
import { t } from '@lingui/macro'
import Icon from '@/components/icon'
import { appendExtraData, deleteMessages, forwardMessage, sendMediaMessage, sendMessage } from '@/helper/message'
import { useImStore } from '@/store/im'
import SelectContact from '@/features/select-contact'
import { useEffect, useState } from 'react'
import { IIMConversation } from '@/plugins/im/types'
import classNames from 'classnames'
import { useCurrentGroupDetail, useIsInGroup, useUserIsBan } from '@/helper/address-book'
import { baseUserStore, useUserStore } from '@/store/user'
import { useUpdateEffect } from 'ahooks'
import { ZIMMessageType } from '@/plugins/im/constants'
import { YapiGetV1ImChatFriendListData } from '@/typings/yapi/ImChatFriendListV1GetApi'
import { massSendAudioMessages, massSendMediaMessenges, massSendTextMessages } from '@/helper/mass-message'
import useGetMassSendIinfoList from '@/hooks/mass-send'
import { Message } from '@nbit/arco'
import { useGroupStore } from '@/store/group'
import { useChatGroupStore } from '@/store/group/chat-group'
import { GroupMemberBanEnum } from '@/constants/group'
import { ChatRecord } from './chat-audio'
import styles from './chat-input.module.css'
import { InputMore, useBatchSendFileMessage } from './input-more'
import { InputTextarea } from './input-textarea'

function MultipleChoice() {
  const { currentConversation } = useImStore()
  const { selectedMessages, setInMultiSelect } = useMessengerStore()
  const text = t({
    id: 'features_messenger_chat_input_chat_input_mlpiu7uleb',
    values: { 0: selectedMessages.length },
  })
  const del = async () => {
    deleteMessages(selectedMessages, currentConversation!)
    setInMultiSelect(false)
  }
  const cancel = () => {
    setInMultiSelect(false)
  }
  const [forwardVisible, setForwardVisible] = useState(false)
  const forward = () => {
    setForwardVisible(true)
  }
  // 依次发送
  const onConfirm = (selectedConversations: IIMConversation[]) => {
    selectedConversations.forEach((conversation, index) => {
      selectedMessages.forEach((message, subIndex) => {
        // 暂时不考虑合并转发
        setTimeout(() => {
          forwardMessage(message, conversation)
        }, 200 * (index + 1) * (subIndex + 1))
      })
    })
    setInMultiSelect(false)
  }

  return (
    <div className="flex items-center justify-between flex-1">
      <div className="flex items-center">
        <Icon
          onClick={cancel}
          name="icon_chat_close"
          className="text-text_color_02 text-2xl/6 mr-4 hover:text-brand_color"
        />
        <div>{text}</div>
      </div>
      {selectedMessages.length > 0 && (
        <div className="flex items-center">
          <Icon
            onClick={del}
            name="icon_chat_delete1"
            className="text-text_color_02 text-2xl/5 mr-6 hover:text-brand_color"
          />
          <Icon
            onClick={forward}
            name="icon_chat_forward"
            // 暂时隐藏
            className="!hidden text-text_color_02 text-2xl/5 hover:text-brand_color"
          />
        </div>
      )}
      <SelectContact
        visible={forwardVisible}
        onClose={() => {
          setForwardVisible(false)
        }}
        onConfirm={onConfirm}
      />
    </div>
  )
}

function Disabled({ msg }: { msg: string }) {
  return (
    <div className="flex items-center justify-center w-full flex-1">
      <Icon name="icon_chat_unable_to_send" className="text-text_color_02 mr-1 text-xs" />
      <span className="text-text_color_02">{msg}</span>
    </div>
  )
}
function AbsoluteActions({ children }) {
  return <div className={classNames(styles['input-actions-more'])}>{children}</div>
}

export function ChatInput() {
  const { inMultiSelect, inRecording, setInMultiSelect, setInRecording } = useMessengerStore()
  const groupLeaved = !useIsInGroup()
  const { currentConversation } = useImStore()
  const groupDetail = useCurrentGroupDetail()
  const { isBan, userIsBanGlobal, isBanInGroup, groupIsBan } = useUserIsBan()
  const isBanTip = userIsBanGlobal
    ? t`features_messenger_chat_input_chat_input_a7ikrghpyd`
    : isBanInGroup
    ? t`features_messenger_chat_input_chat_input_6ln1vckuhk`
    : groupIsBan
    ? t`features_messenger_chat_message_custom_send_failed_zj1i0j9cvt`
    : ''

  useUpdateEffect(() => {
    // 重置状态
    setInMultiSelect(false)
    setInRecording(false)
  }, [currentConversation?.conversationID])

  return (
    <div className={styles['chat-input-wrapper']}>
      <InputMore fileUpload={useBatchSendFileMessage()} />
      <InputTextarea
        sendMessage={(plainTextValue, mentions) =>
          sendMessage(
            {
              message: plainTextValue,
              type: ZIMMessageType.Text,
              extendedData: appendExtraData({
                atMsgMap: mentions,
                fromNickname: groupDetail?.settingData.myNickName || baseUserStore.getState().userInfo.nickName,
              }),
            },
            currentConversation!.conversationID,
            currentConversation!.type
          )
        }
        onPasteMedia={file => currentConversation && sendMediaMessage(file, currentConversation)}
      />

      {inMultiSelect && (
        <AbsoluteActions>
          <MultipleChoice />
        </AbsoluteActions>
      )}
      {inRecording && (
        <AbsoluteActions>
          <ChatRecord
            sendAudioMessage={(audioFile, duration) =>
              sendMediaMessage(audioFile, currentConversation!, {
                type: ZIMMessageType.Audio,
                audioDuration: duration,
              })
            }
          />
        </AbsoluteActions>
      )}

      {groupLeaved && (
        <AbsoluteActions>
          <Disabled msg={t`features_messenger_chat_input_chat_input_ccb04uddzy`} />
        </AbsoluteActions>
      )}
      {isBan && (
        <AbsoluteActions>
          <Disabled msg={isBanTip} />
        </AbsoluteActions>
      )}
    </div>
  )
}

export function BulkChatInput({
  recipents,
  onClose,
  onSending,
}: {
  recipents: YapiGetV1ImChatFriendListData[]
  onClose: () => void
  onSending?: (isSending: boolean) => void
}) {
  const { inRecording, setInRecording } = useMessengerStore()
  const { fetchApi } = useGetMassSendIinfoList()

  useEffect(() => {
    // 重置状态
    setInRecording(false)

    return () => setInRecording(false)
  }, [recipents])

  const configName = recipents?.map(r => r.nickName)?.join(',')
  const sendToUids = recipents?.map(r => Number(r.uid))

  const bulkSendTextMsg = (plainTextValue, mentions) => {
    onSending?.(true)
    massSendTextMessages(plainTextValue, sendToUids, configName).then(isSucess => {
      if (isSucess) {
        fetchApi().then(() => {
          Message.success(t`features_messenger_chat_input_chat_input_7lsyf7g0la`)
          onClose()
          onSending?.(false)
        })
      } else Message.error(t`features_messenger_chat_message_custom_send_failed_mkobftp6qr`)
    })
  }

  const bulkSendAudioMsg = (audioFile, duration) => {
    onSending?.(true)
    massSendAudioMessages(audioFile, duration, sendToUids, configName).then(isSuccess => {
      if (isSuccess) {
        fetchApi().then(() => {
          Message.success(t`features_messenger_chat_input_chat_input_7lsyf7g0la`)
          onClose()
          onSending?.(false)
        })
      } else Message.error(t`features_messenger_chat_message_custom_send_failed_mkobftp6qr`)
    })
  }

  return (
    <div className={styles['chat-input-wrapper']}>
      <InputMore
        fileUpload={files => {
          onSending?.(true)
          return massSendMediaMessenges(files[0], sendToUids, configName).then(isSuccess => {
            if (isSuccess) {
              fetchApi().then(() => {
                Message.success(t`features_messenger_chat_input_chat_input_7lsyf7g0la`)
                onClose()
                onSending?.(false)
              })
            } else Message.error(t`features_messenger_chat_message_custom_send_failed_mkobftp6qr`)
          }) as Promise<void>
        }}
        onlyPhotoAlbum
        allowMultipleUploads={false}
      />
      <InputTextarea
        sendMessage={bulkSendTextMsg}
        onPasteMedia={file => {
          onSending?.(true)
          return massSendMediaMessenges(file, sendToUids, configName).then(isSuccess => {
            if (isSuccess) {
              fetchApi().then(() => {
                Message.success(t`features_messenger_chat_input_chat_input_7lsyf7g0la`)
                onClose()
                onSending?.(false)
              })
            } else Message.error(t`features_messenger_chat_message_custom_send_failed_mkobftp6qr`)
          })
        }}
      />
      {inRecording && (
        <AbsoluteActions>
          <ChatRecord sendAudioMessage={bulkSendAudioMsg} />
        </AbsoluteActions>
      )}
    </div>
  )
}
