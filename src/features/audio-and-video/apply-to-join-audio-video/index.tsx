import Icon from '@/components/icon'
import { t } from '@lingui/macro'
import { useEffect } from 'react'
import { useImStore } from '@/store/im'
import { ZIMConversationType, ZIMEventEnum, ZIMMessageType } from '@/plugins/im/constants'
import { addEventListenerOnIm } from '@/plugins/im/event'
import { isSameCommand } from '@/helper/im/command'
import classNames from 'classnames'
import { useAddressBookStore } from '@/store/address-book'
import { useUserStore } from '@/store/user'
import styles from './index.module.css'
import { RoomFlowType } from '../audio-video-type'

function ApplyToJoinAudioVideo() {
  const { currentConversation, roomAudioVideoDetail, setRoomAudioVideoDetail, audioVideoHooksObj } = useImStore()

  const { multipleVideoRef, multipleAudioRef } = audioVideoHooksObj || {}

  const { groupMembers } = useAddressBookStore()

  const { userInfo } = useUserStore()

  const getImChatGroupHasOngoingCall = async () => {
    if (currentConversation?.type === ZIMConversationType.Group) {
      setRoomAudioVideoDetail(currentConversation?.conversationID as string)
    }
  }

  const setJoinAudioVideo = () => {
    if (roomAudioVideoDetail?.roomFlowType === RoomFlowType.Audio) {
      roomAudioVideoDetail?.hasOngoingCall &&
        multipleAudioRef.current?.applyToJoinChat(roomAudioVideoDetail?.roomId, currentConversation)
    } else {
      roomAudioVideoDetail?.hasOngoingCall &&
        multipleVideoRef.current?.applyToJoinChat(roomAudioVideoDetail?.roomId as string, currentConversation)
    }
  }

  useEffect(() => {
    const remove = addEventListenerOnIm(ZIMEventEnum.receiveGroupMessage, (_, { messageList }) => {
      const commands = messageList.filter(item => item.type === ZIMMessageType.Command)
      const audioAndVideoCommand = commands.find(item =>
        isSameCommand((item.message as Uint8Array).slice(0, 2), new Uint8Array([0x00, 0x02]))
      )
      if (audioAndVideoCommand) {
        getImChatGroupHasOngoingCall()
      }
    })

    return () => {
      remove()
    }
  }, [currentConversation?.conversationID])

  useEffect(() => {
    getImChatGroupHasOngoingCall()
  }, [currentConversation?.conversationID])

  const whetherAudio = () => {
    return roomAudioVideoDetail?.roomFlowType === RoomFlowType.Audio
  }

  const getWhetherShowApplyJoinContainer = () => {
    if (Object.keys(groupMembers)?.length > 0 && currentConversation?.conversationID) {
      const whetherHaveOwn = groupMembers?.[currentConversation?.conversationID]?.find(
        item => item?.uid === userInfo?.uid
      )
      return !!whetherHaveOwn
    }
  }

  return (
    <div className={styles['apply-join-container']}>
      {currentConversation?.type === ZIMConversationType.Group &&
        roomAudioVideoDetail?.hasOngoingCall &&
        getWhetherShowApplyJoinContainer() && (
          <div className="apply-join" onClick={() => setJoinAudioVideo()}>
            <div className="flex items-center">
              <Icon
                name={whetherAudio() ? 'icon_chat_answer' : 'icon_chat_video'}
                className={classNames('text-brand_color mr-0.5', {
                  'text-base': whetherAudio(),
                  'text-2xl': !whetherAudio(),
                })}
              />
              <span>
                {t`features_audio_and_video_apply_to_join_audio_video_index_avwrcmf5i6`}
                {whetherAudio()
                  ? t`features_audio_and_video_apply_to_join_audio_video_index_ykww0jbd4g`
                  : t`features_audio_and_video_apply_to_join_audio_video_index_0x1lkltw_8`}
                {t`features_audio_and_video_apply_to_join_audio_video_index_cpgmi1t3b4`}
              </span>
            </div>
            <div>
              <Icon name="icon_chat_arrow" className="text-icon_color text-xs" />
            </div>
          </div>
        )}
    </div>
  )
}

export default ApplyToJoinAudioVideo
