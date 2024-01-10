import Icon from '@/components/icon'
import { Image, Modal, Skeleton } from '@nbit/arco'
import { useContext, useEffect, useRef, useState } from 'react'
import { IIMImageMessage, IIMVideoMessage } from '@/plugins/im/types'
import { useMessengerRightDrawer } from '@/hooks/use-messenger-right-drawer'
import { ZIMMessageType } from '@/plugins/im/constants'
import { formatMediaTime } from '@/helper/message'
import { isEmpty } from 'lodash'
import { useSearchHistoryMessages } from '@/hooks/use-messages'
import { useImStore } from '@/store/im'
import { t } from '@lingui/macro'
import styles from './index.module.css'
import { ChatMoreMedia, UserChatInfoContext } from '..'

function VideoPreview({
  message,
  visible,
  setvisible,
}: {
  message: IIMVideoMessage
  visible: boolean
  setvisible: (state: boolean) => void
}) {
  const { videoFirstFrameWidth, videoFirstFrameHeight, videoFirstFrameDownloadUrl, fileDownloadUrl } = message

  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <Modal
      className={styles['video-preview']}
      footer={null}
      closeIcon={false}
      closable
      visible={visible}
      onCancel={() => setvisible(false)}
      unmountOnExit
      mountOnEnter
    >
      <video className="video" ref={videoRef} controls poster={videoFirstFrameDownloadUrl}>
        <source src={fileDownloadUrl}></source>
      </video>
    </Modal>
  )
}

export function MediaItem(props: (IIMVideoMessage | IIMImageMessage) & { size?: number }) {
  const { size = 94 } = props
  const { videoFirstFrameDownloadUrl, fileDownloadUrl, videoDuration, fileName } = props as IIMVideoMessage
  const { thumbnailDownloadUrl } = props as IIMImageMessage
  const [modal, setmodal] = useState(false)
  const [duration, setDuration] = useState(formatMediaTime(videoDuration))

  const videoUrl = videoFirstFrameDownloadUrl || fileDownloadUrl
  const imageUrl = thumbnailDownloadUrl || fileDownloadUrl

  useEffect(() => {
    videoDuration !== undefined && setDuration(formatMediaTime(videoDuration))
  }, [videoDuration])

  const loader = (
    <Skeleton
      image={{
        style: {
          maxWidth: size,
          maxHeight: size,
          margin: 0,
        },
      }}
      text={false}
      animation
    />
  )

  if (props.type === ZIMMessageType.Video && videoDuration === 0) {
    let video = document.createElement('video')
    video.preload = 'metadata'

    video.onloadedmetadata = function () {
      setDuration(formatMediaTime(video.duration))
      URL.revokeObjectURL(video.src)
    }

    video.src = fileDownloadUrl
  }

  if (props.type === ZIMMessageType.Image)
    return (
      <div className={styles['img-media-item']}>
        <Image
          style={{ maxWidth: size, maxHeight: size }}
          className="media-img"
          src={imageUrl}
          error={!imageUrl ? undefined : loader}
          loader={loader}
        />
      </div>
    )

  if (props.type === ZIMMessageType.Video) {
    return (
      <div className={styles['img-media-item']}>
        <Image
          preview={false}
          style={{ maxWidth: size, maxHeight: size }}
          className="media-img"
          onClick={() => setmodal(true)}
          src={videoUrl}
          error={!videoUrl ? undefined : loader}
          loader={loader}
        />
        {videoUrl && (
          <div className="duration">
            <Icon noPointer name="icon_chat_video" className="text-button_text_01 text-sm mr-1" />
            <span className="text-button_text_01 text-xs">{duration}</span>
          </div>
        )}
        {modal && videoUrl && <VideoPreview visible={modal} setvisible={setmodal} message={props} />}
      </div>
    )
  }
  return <span></span>
}

function ChatMedia() {
  const contextUid = useContext(UserChatInfoContext)
  const { currentConversation, messagesByConversation } = useImStore()

  const uid = contextUid || currentConversation?.conversationID

  const mediaMessages =
    messagesByConversation
      ?.find(message => message.conversationId === uid)
      ?.messages?.filter(message => message.type === ZIMMessageType.Image || message.type === ZIMMessageType.Video)
      ?.reverse() || ([] as unknown as (IIMImageMessage | IIMVideoMessage)[])
  const [open, close] = useMessengerRightDrawer()

  return (
    <div className={styles['contact-media']}>
      <div
        className="flex flex-row items-center cursor-pointer"
        onClick={() => open(<ChatMoreMedia uid={uid} onClose={close} />)}
      >
        <span className="text-base">{t`features_messenger_chat_information_chat_media_index_awpnacrual`}</span>
        <Icon className="text-base ml-auto text-icon_color" name="icon_chat_arrow" />
      </div>
      {!isEmpty(mediaMessages) && (
        <div className="img-media-items">
          {/* <HorizontalScrollBar> */}
          {(mediaMessages as (IIMVideoMessage | IIMImageMessage)[])?.slice(0, 3)?.map((each, idx) => (
            <MediaItem key={idx} {...each} />
          ))}
          {/* </HorizontalScrollBar> */}
        </div>
      )}
    </div>
  )
}

export default ChatMedia
