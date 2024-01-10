import { popBoxConfirm } from '@/components/pop-box'
import { Button, Divider, Spin } from '@nbit/arco'
import { useState } from 'react'
import { YapiGetV1ImChatFriendListData } from '@/typings/yapi/ImChatFriendListV1GetApi'
import Icon from '@/components/icon'
import { t } from '@lingui/macro'
import classNames from 'classnames'
import { IIMAudioMessage, IIMImageMessage, IIMVideoMessage } from '@/plugins/im/types'
import { formatMessageTimeInConversation } from '@/helper/message'
import { YapiGetV1ImChatImSendMassInfoQueryListApiResponse } from '@/typings/yapi/ImChatImSendMassInfoQueryListV1GetApi'
import { sendContentTypeEnum, sendSuccessEnum } from '@/constants/mass-send'
import useGetMassSendIinfoList from '@/hooks/mass-send'
import Emoji from '@/components/emoji'
import { CommonFriendBook } from '../group/components/search-friend'
import { BulkChatInput } from '../messenger/chat/input/chat-input'
import NavigationBar from '../settings-center/navigation-bar'
import styles from './index.module.css'
import NavComponent from '../group/components/nav-component'
import { AudioMessage } from '../messenger/chat/message/audio'
import { ImageMessage } from '../messenger/chat/message/image'
import { VideoMessage } from '../messenger/chat/message/video'

function RecipentBook({ onClose }) {
  const [selected, setselected] = useState<YapiGetV1ImChatFriendListData[]>([])
  const [selectAll, setselectAll] = useState(false)
  return (
    <CommonFriendBook
      displaySelectedMembers
      limit={10}
      avatarSize={40}
      navBar={
        <NavComponent
          onLeftIconClick={onClose}
          leftIcon={<Icon className="close-icon" name="icon_chat_close" />}
          titleText={t`features_group_sending_assistant_index_bkvay4fnsl`}
          right={
            <div className={styles['nav-component-checkbox']} onClick={() => setselectAll(prev => !prev)}>
              {selectAll ? (
                <Icon className={classNames('selected-icon')} name="icon_chat_selected" />
              ) : (
                <Icon className={classNames('not-selected-icon')} name="icon_chat_not_selected" />
              )}
              <span>{t`features_group_sending_assistant_index_hkukt8c4fs`}</span>
            </div>
          }
        />
      }
      onChange={setselected}
      onOk={() => {
        sendRecipentChat(selected)
        onClose()
      }}
      selectAll={selectAll}
    />
  )
}

function RecipentChat({ recipents, onClose }: { recipents: YapiGetV1ImChatFriendListData[]; onClose: () => void }) {
  const [isSending, setisSending] = useState(false)
  return (
    <Spin className={styles['recipent-chat']} loading={isSending}>
      <div className="text-sm text-text_color_02 mx-6 mt-4">
        {t({
          id: 'features_group_sending_assistant_index_3ugr7lq9wp',
          values: { 0: recipents.length },
        })}
      </div>
      <div className="text-base text-text_color_01 mt-4 mx-6">{recipents?.map(r => r.nickName).join(', ')}</div>
      <BulkChatInput recipents={recipents} onClose={onClose} onSending={setisSending} />
    </Spin>
  )
}

function sendRecipentChat(recipents: YapiGetV1ImChatFriendListData[]) {
  return popBoxConfirm(
    '',
    onClose => (
      <>
        <NavComponent
          titleText={t`features_group_sending_assistant_index_480a3uilyf`}
          leftIcon={<Icon className="close-icon" name="icon_chat_close" />}
          onLeftIconClick={onClose}
        />
        <RecipentChat recipents={recipents} onClose={onClose} />
      </>
    ),
    { footer: null, className: styles['bulk-send-pop'] }
  )
}

function OpenSelectRecipents() {
  return popBoxConfirm('', onClose => <RecipentBook onClose={onClose} />, {
    footer: null,
    className: styles['bulk-send-pop'],
  })
}

function SendAssistantItem({ info }: { info: YapiGetV1ImChatImSendMassInfoQueryListApiResponse }) {
  const { quiltUser, contentChar, sendTime, sendContentType, isSendSucessText } = info || {}

  const textNode = typeof contentChar === 'string' && (
    <span
      dangerouslySetInnerHTML={{
        __html: Emoji({
          str: contentChar,
        }) as string,
      }}
    />
  )

  let content = <span className="text-base">{textNode}</span>

  if (sendContentType === sendContentTypeEnum.audio) {
    const params = {
      fileDownloadUrl: info?.audioUrl,
      audioDuration: info?.mediaDuration,
    }
    content = (
      <span className="audio-wrapper">
        <AudioMessage hasStatus={false} message={params as unknown as IIMAudioMessage} />
      </span>
    )
  }

  if (sendContentType === sendContentTypeEnum.image) {
    const params = {
      fileDownloadUrl: info.pictureUrl,
      thumbnailWidth: info.originWidth,
      thumbnailHeight: info.originHeight,
    }
    content = <ImageMessage inView hasStatus={false} message={params as unknown as IIMImageMessage} maxWidth={430} />
  }

  if (sendContentType === sendContentTypeEnum.video) {
    const params = {
      fileDownloadUrl: info.videoUrl,
      videoFirstFrameWidth: info?.originWidth || info?.thumbnaiWidth,
      videoFirstFrameHeight: info?.originWidth || info?.thumbnaiNumber,
    }
    content = <VideoMessage hasStatus={false} message={params as unknown as IIMVideoMessage} maxWidth={430} />
  }

  return (
    <div className={styles['send-assistant-item']}>
      <div className="text-text_color_02 text-sm mb-2">
        {quiltUser.length} {t`features_group_sending_assistant_index_l_2gvrwuys`}
      </div>
      <div className="text-text_color_02 text-sm">{quiltUser?.map(user => user.nickName || user.uid)?.join(', ')}</div>
      <Divider />
      <div className="content-container">{content}</div>
      <div className="flex flex-row items-center mt-4">
        <span className="text-text_color_03 text-sm">{formatMessageTimeInConversation(sendTime)}</span>
        {isSendSucessText === sendSuccessEnum.fail && (
          <span className="fail-tag">
            <Icon name={'icon_chat_unable_to_send'} />
            <span>{t`features_messenger_chat_message_custom_send_failed_mkobftp6qr`}</span>
          </span>
        )}
        <Button
          onClick={() => info?.quiltUser && sendRecipentChat(info.quiltUser as YapiGetV1ImChatFriendListData[])}
          className={'send-btn'}
        >{t`features_group_sending_assistant_index_xzzeb5w2si`}</Button>
      </div>
    </div>
  )
}

export default function MassSendAssistant() {
  const { data, loading } = useGetMassSendIinfoList()

  return (
    <div className={styles['bulk-sending-assistant']}>
      <NavigationBar label={t`features_group_sending_assistant_index_ajodzou9tp`} url="/settings-center" />

      <div
        className="create-new-bulk"
        onClick={() => {
          OpenSelectRecipents()
        }}
      >
        <div className="set-new-icon-container">
          <Icon name="icon_set_new" />
        </div>
        <span>{t`features_group_sending_assistant_index_kna1ig2p6r`}</span>
      </div>
      <Spin loading={loading} block className="bulk-chat-history-list">
        <div>
          {data?.map((c, idx) => (
            <SendAssistantItem key={idx} info={c} />
          ))}
        </div>
      </Spin>
    </div>
  )
}
