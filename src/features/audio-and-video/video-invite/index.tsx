import classNames from 'classnames'
import { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react'
import { Modal } from '@nbit/arco'
import { oss_svg_image_domain_address } from '@/constants/oss'
import LazyImage from '@/components/lazy-image'
import Icon from '@/components/icon'
import { useUserStore } from '@/store/user'
import { t } from '@lingui/macro'
import styles from './index.module.css'
// import Video from '../video'
import { useResizeAndDragMove, useGetGlobalVoiceAndVideo, getDetectionPermissions } from '../audio-video'
import { MinWidthAndHeight, CallAudioInvitationReceivedInfo } from '../audio-video-type'

// type VideosRef = {
//   openVideoModal: () => void
// }

type Props = {
  setCallRejectInvite: (item: Record<'userId' | 'userName', string>) => void
  setCallAcceptInvite: (item: () => void, detail: CallAudioInvitationReceivedInfo | undefined) => void
  callAudioInvitationReceivedInfo?: CallAudioInvitationReceivedInfo
  sameLoginVerificationRef?: React.MutableRefObject<boolean>
  whetherVoiceAndVideoIngRef?: React.MutableRefObject<boolean>
}

function VideoInvite(props: Props, ref) {
  const {
    setCallRejectInvite,
    setCallAcceptInvite,
    callAudioInvitationReceivedInfo,
    sameLoginVerificationRef,
    whetherVoiceAndVideoIngRef,
  } = props

  const { playVoiceAndVideo, stopVoiceAndVideo } = useGetGlobalVoiceAndVideo()

  const { userInfo } = useUserStore()

  const [whetherDragMove, setWhetherDragMove] = useState<boolean>(true)

  const initialWidthAndHeightRef = useRef<MinWidthAndHeight>({ width: 300, height: 106 })

  // const videosRef = useRef<VideosRef>()

  useResizeAndDragMove({
    interactDom: '.resize-drag-video-invite',
    whetherDragMove,
    restrictSizeMinWidthAndHeight: initialWidthAndHeightRef.current,
    restrictSizeMaxWidthAndHeight: initialWidthAndHeightRef.current,
  })

  const [videoInviteVisible, setVideoInviteVisible] = useState<boolean>(false)

  const onMouseUp = () => {
    setWhetherDragMove(true)
  }

  const onMouseDown = () => {
    setWhetherDragMove(false)
  }

  const onClickHandlerChatAnswer = async () => {
    const result = await getDetectionPermissions({ video: false, audio: true })
    result &&
      setCallAcceptInvite(() => {
        setVideoInviteVisible(false)
        if (sameLoginVerificationRef) {
          sameLoginVerificationRef.current = true
        }
      }, callAudioInvitationReceivedInfo)
  }

  const onClickHandlerHangUp = () => {
    setCallRejectInvite({ userId: userInfo?.uid, userName: userInfo?.nickName })
    if (sameLoginVerificationRef) {
      sameLoginVerificationRef.current = true
    }
    if (whetherVoiceAndVideoIngRef) {
      whetherVoiceAndVideoIngRef.current = false
    }
    setVideoInviteVisible(false)
  }

  useEffect(() => {
    // 在组件挂载时注册事件
    document.addEventListener('mouseup', onMouseUp)

    // 在组件卸载时移除事件
    return () => {
      document.removeEventListener('mouseup', onMouseUp)
    }
  })

  useImperativeHandle(ref, () => ({
    openVideoInviteModal() {
      playVoiceAndVideo()
      setVideoInviteVisible(true)
    },
    closeVideoInviteModal() {
      stopVoiceAndVideo()
      setVideoInviteVisible(false)
    },
  }))

  return (
    <div className={styles.audio}>
      {/* <Video ref={videosRef} /> */}
      <Modal
        className={classNames('resize-drag-video-invite', styles['resize-drag-video-invite'])}
        visible={videoInviteVisible}
        footer={null}
        mask={false}
        closable={false}
        autoFocus={false}
        focusLock={false}
        unmountOnExit
      >
        <div className={styles['resize-drag-video-invite-container']}>
          <div className="flex mt-4 ml-4">
            <div className="avatar">
              <LazyImage
                src={
                  callAudioInvitationReceivedInfo?.inviterAvatarUrl ||
                  `${oss_svg_image_domain_address}icon_peer_default_avatar.png`
                }
              />
            </div>
            <div className="ml-3">
              <div className="text-xs text-button_text_01">{callAudioInvitationReceivedInfo?.inviter}</div>
              <div className="text-xs text-text_color_02">{t`features_audio_and_video_video_invite_index_1vv0mxdsi9`}</div>
            </div>
          </div>
          <div className="flex absolute bottom-3 right-3">
            <div
              className="bg-secondary_color flex justify-center items-center rounded-full w-[30px] h-[30px] mr-3"
              onClick={onClickHandlerHangUp}
              onMouseDown={onMouseDown}
            >
              <Icon name="icon_chat_hang_up" className="text-button_text_01 text-xl" />
            </div>
            <div
              className="bg-avatar_bg_04 flex justify-center items-center rounded-full w-[30px] h-[30px]"
              onClick={onClickHandlerChatAnswer}
              onMouseDown={onMouseDown}
            >
              <Icon name="icon_chat_video" className="text-button_text_01 text-xl" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default forwardRef(VideoInvite)
