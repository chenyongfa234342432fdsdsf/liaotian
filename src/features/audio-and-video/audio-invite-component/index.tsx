import classNames from 'classnames'
import { useState, useEffect, useRef } from 'react'
import { Modal } from '@nbit/arco'
import { oss_svg_image_domain_address } from '@/constants/oss'
import LazyImage from '@/components/lazy-image'
import Icon from '@/components/icon'
import { t } from '@lingui/macro'
import { useUserStore } from '@/store/user'
import { IIMConversation } from '@/plugins/im/types'
import styles from './index.module.css'
// import Audios from '../audio'
import { useResizeAndDragMove } from '../audio-video'
import { CallAudioInvitationReceivedInfo, MinWidthAndHeight } from '../audio-video-type'

type Props = {
  setCallRejectInvite?: (item: Record<'userId' | 'userName' | 'sender', string>) => void
  setCallAcceptInvite?: (item: () => void, detail: CallAudioInvitationReceivedInfo | undefined) => void
  callAudioInvitationReceivedInfo?: CallAudioInvitationReceivedInfo
  currentConversation?: IIMConversation
  audioInviteVisible: boolean
  setAudioInviteVisible: React.Dispatch<React.SetStateAction<boolean>>
  setAudioVisible?: React.Dispatch<React.SetStateAction<boolean>>
  sameLoginVerificationRef?: React.MutableRefObject<boolean>
  whetherVoiceAndVideoIngRef?: React.MutableRefObject<boolean>
}

function AudioInviteComponent(props: Props) {
  const {
    setCallRejectInvite,
    setCallAcceptInvite,
    callAudioInvitationReceivedInfo,
    audioInviteVisible,
    setAudioVisible,
    setAudioInviteVisible,
    sameLoginVerificationRef,
    whetherVoiceAndVideoIngRef,
  } = props

  const { userInfo } = useUserStore()

  const initialWidthAndHeightRef = useRef<MinWidthAndHeight>({ width: 300, height: 106 })

  const [whetherDragMove, setWhetherDragMove] = useState<boolean>(true)

  useResizeAndDragMove({
    interactDom: '.resize-drag-audio-invite',
    whetherDragMove,
    restrictSizeMinWidthAndHeight: initialWidthAndHeightRef.current,
    restrictSizeMaxWidthAndHeight: initialWidthAndHeightRef.current,
    whetherSizeOfTheDom: true,
  })

  const onMouseUp = () => {
    setWhetherDragMove(true)
  }

  const onMouseDown = () => {
    setWhetherDragMove(false)
  }

  const onClickHandlerChatAnswer = event => {
    event.stopPropagation()
    setCallAcceptInvite &&
      setCallAcceptInvite(() => {
        if (sameLoginVerificationRef) {
          sameLoginVerificationRef.current = true
        }
        setAudioInviteVisible(false)
      }, callAudioInvitationReceivedInfo)
  }

  const onClickHandlerHangUp = event => {
    event.stopPropagation()
    if (sameLoginVerificationRef) {
      sameLoginVerificationRef.current = true
    }
    if (whetherVoiceAndVideoIngRef) {
      whetherVoiceAndVideoIngRef.current = false
    }
    setCallRejectInvite && setCallRejectInvite({ userId: userInfo?.uid, userName: userInfo?.nickName, sender: 'Web' })
    setAudioInviteVisible(false)
  }

  useEffect(() => {
    // 在组件挂载时注册事件
    document.addEventListener('mouseup', onMouseUp)

    // 在组件卸载时移除事件
    return () => {
      document.removeEventListener('mouseup', onMouseUp)
    }
  })

  const audioInviteClick = () => {
    setAudioInviteVisible(false)
    setAudioVisible && setAudioVisible(true)
  }

  return (
    <div className={styles.audio}>
      <Modal
        className={classNames('resize-drag-audio-invite', styles['resize-drag-audio-invite'])}
        visible={audioInviteVisible}
        footer={null}
        mask={false}
        closable={false}
        unmountOnExit
      >
        <div className={styles['resize-drag-audio-invite-container']} onClick={() => audioInviteClick()}>
          <div className="flex mt-4 ml-4">
            <div className="avatar">
              <LazyImage
                src={
                  callAudioInvitationReceivedInfo?.inviterAvatarUrl ||
                  `${oss_svg_image_domain_address}defaultheadurl.png`
                }
              />
            </div>
            <div className="ml-3">
              <div className="text-xs text-button_text_01">{callAudioInvitationReceivedInfo?.inviter}</div>
              <div className="text-xs text-text_color_02">{t`features_audio_and_video_audio_invite_component_index_bpd6agr2wc`}</div>
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
              <Icon name="icon_chat_answer" className="text-button_text_01 text-xl" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AudioInviteComponent
