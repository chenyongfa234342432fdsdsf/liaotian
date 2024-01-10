import classNames from 'classnames'
import { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react'
import { Modal, Message } from '@nbit/arco'
import { oss_svg_image_domain_address } from '@/constants/oss'
import LazyImage from '@/components/lazy-image'
import Icon from '@/components/icon'
import { t } from '@lingui/macro'
import { useUpdateEffect, useInterval } from 'ahooks'
import { postV1ImChatRoomCreateApiRequest } from '@/apis/audio-video'
import { useUserStore } from '@/store/user'
import { ZegoExpressEngine } from 'zego-express-engine-webrtc'
import ZegoLocalStream from 'zego-express-engine-webrtc/sdk/code/zh/ZegoLocalStream.web'
import styles from './index.module.css'
import AudioInviteComponent from '../audio-invite-component'
import {
  useResizeAndDragMove,
  getDragAudioAndVideoHandleObject,
  getImZg,
  formatTime,
  useGetGlobalVoiceAndVideo,
} from '../audio-video'
import AudioZoomOutBox from '../audio-zoom-out-box'
import {
  ComponentProps,
  StreamUpdateEnum,
  ZegoRoomStateChangedReason,
  VideoCall,
  GroupCall,
  Sender,
  MinWidthAndHeight,
  RoomType,
  RoomFlowType,
} from '../audio-video-type'
import AudioAndVideoAvatar from '../audio-and-video-avatar'

type IconHandleObj = {
  microPhoneturne: string
  speakerTurned: string
}

function Audio(props: ComponentProps, ref) {
  const {
    currentConversation,
    callInvitationReceivedInfo,
    setCallInviteChange,
    setConversation,
    setCancelCallInviteChange,
    setCallRejectInvite,
    setCallAcceptInvite,
    hangupText,
    setHangupText,
    sameLoginVerificationRef,
  } = props

  const { playVoiceAndVideo, stopVoiceAndVideo } = useGetGlobalVoiceAndVideo()

  const audioRef = useRef<HTMLDivElement | null>(null)

  const [audioInviteVisible, setAudioInviteVisible] = useState<boolean>(false)

  const { zimToken, userInfo } = useUserStore()

  const [whetherDragMove, setWhetherDragMove] = useState<boolean>(true)

  const [connectedText, setConnectedText] = useState<string>(t`features_audio_and_video_audio_index_ews2l9ybes`)

  const [whetherAccept, setWhetherAccept] = useState<boolean>(false)

  const [whetherConnected, setWhetherConnected] = useState<boolean>(false)

  const initialWidthAndHeightRef = useRef<MinWidthAndHeight>({ width: 360, height: 640 })

  const whetherCreateApiRequestRef = useRef<boolean>(true)

  const zg = useRef<ZegoExpressEngine>()

  const streamIDRef = useRef<string>('')

  const localStreamRef = useRef<ZegoLocalStream>()

  useResizeAndDragMove({
    interactDom: '.resize-drag-audio',
    restrictSizeMinWidthAndHeight: initialWidthAndHeightRef.current,
    restrictSizeMaxWidthAndHeight: initialWidthAndHeightRef.current,
    whetherDragMove,
    whetherSizeOfTheDom: true,
  })

  const [audioZoomOutBoxVisible, setAudioZoomOutBoxVisible] = useState<boolean>(false)

  const [iconHandleObj, setIconHandleObj] = useState<IconHandleObj>({
    microPhoneturne: 'microPhoneturnedOn',
    speakerTurned: 'speakerTurnedOn',
  })

  const [audioVisible, setAudioVisible] = useState<boolean>(false)

  const [roomID, setRoomID] = useState<string>('')

  const [seconds, setSeconds] = useState<number>(0)

  const [isRunning, setIsRunning] = useState<boolean>(false)

  useInterval(
    () => {
      // 在这里执行每个时间间隔的操作
      setSeconds(prevSeconds => prevSeconds + 1)
    },
    isRunning ? 1000 : undefined // 时间间隔为 1 秒
  )

  const startTimer = () => {
    setIsRunning(true)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setSeconds(0)
  }

  const getShowAnsweronIcon = () => {
    return !whetherConnected && !currentConversation?.conversationID
  }

  const answeronClick = () => {
    setCallAcceptInvite &&
      setCallAcceptInvite(() => {
        setWhetherAccept(true)
      }, callInvitationReceivedInfo)
  }

  const hanguponClick = () => {
    stopVoiceAndVideo()
    setCallRejectInvite &&
      setCallRejectInvite({ userId: userInfo?.uid, userName: userInfo?.nickName, sender: Sender.Web })
    setCancelCallInviteChange && setCancelCallInviteChange(currentConversation?.conversationID)
    try {
      zg.current?.destroyEngine()
    } catch (error) {
      console.log(error)
    }
    whetherCreateApiRequestRef.current = true
    setConversation && setConversation(undefined)
    setAudioVisible(false)
    setIconHandleObj({
      microPhoneturne: 'microPhoneturnedOn',
      speakerTurned: 'speakerTurnedOn',
    })
    setWhetherConnected(false)
    setAudioZoomOutBoxVisible(false)
    setWhetherAccept(false)
    setAudioInviteVisible(false)
    setHangupText && setHangupText('')
    resetTimer()
    setConnectedText(t`features_audio_and_video_audio_index_ews2l9ybes`)
    streamIDRef.current = ''
    if (sameLoginVerificationRef) {
      sameLoginVerificationRef.current = true
    }
    zg.current?.logoutRoom(roomID)
  }

  const microPhoneturnedOffClick = () => {
    zg.current?.muteMicrophone(false)
    setIconHandleObj({ ...iconHandleObj, microPhoneturne: 'microPhoneturnedOn' })
  }

  const microPhoneturnedOnClick = () => {
    zg.current?.muteMicrophone(true)
    setIconHandleObj({ ...iconHandleObj, microPhoneturne: 'microPhoneturnedOff' })
  }

  const speakerTurnedOnClick = () => {
    zg.current?.mutePlayStreamAudio(streamIDRef.current, true)
    setIconHandleObj({ ...iconHandleObj, speakerTurned: 'speakerTurnedOff' })
  }

  const speakerTurnedOffClick = () => {
    zg.current?.mutePlayStreamAudio(streamIDRef.current, false)
    setIconHandleObj({ ...iconHandleObj, speakerTurned: 'speakerTurnedOn' })
  }

  const onMouseDown = () => {
    setWhetherDragMove(false)
  }

  const onMouseUp = () => {
    setWhetherDragMove(true)
  }

  useEffect(() => {
    // 在组件挂载时注册事件
    document.addEventListener('mouseup', onMouseUp)

    // 在组件卸载时移除事件
    return () => {
      document.removeEventListener('mouseup', onMouseUp)
    }
  })

  const dragAudioHandleObject = getDragAudioAndVideoHandleObject({
    answeronClick,
    hanguponClick,
    microPhoneturnedOffClick,
    microPhoneturnedOnClick,
    speakerTurnedOnClick,
    speakerTurnedOffClick,
    onMouseDown,
  })

  const openChatVideoSmall = () => {
    if (whetherConnected || currentConversation?.conversationID) {
      setAudioZoomOutBoxVisible(true)
      setAudioVisible(false)
      return
    }
    if (!whetherConnected) {
      setAudioInviteVisible(true)
      setAudioVisible(false)
    }
  }

  useImperativeHandle(ref, () => ({
    openAudioModal() {
      if (!audioZoomOutBoxVisible) {
        setAudioVisible(true)
        setWhetherAccept(true)
        playVoiceAndVideo()
      }
    },
    closeAudioModal() {
      hanguponClick()
    },
    openAudioInviteModal() {
      playVoiceAndVideo()
      setAudioInviteVisible(true)
    },
    closeAudioInviteModal() {
      setAudioInviteVisible(false)
      setHangupText && setHangupText('')
      stopVoiceAndVideo()
      audioVisible && hanguponClick()
    },
  }))

  const onClickHandlerAudioZoomOutBox = () => {
    setAudioZoomOutBoxVisible(false)
    setAudioVisible(true)
  }

  const getChatRoomCreateApiRequest = async () => {
    const { isOk, data } = await postV1ImChatRoomCreateApiRequest({
      roomBindId: currentConversation?.conversationID as string,
      roomType: RoomType.SingleChat,
      roomFlowType: RoomFlowType.Audio,
    })
    if (isOk) {
      setRoomID(data?.roomNo as string)
      setCallInviteChange &&
        setCallInviteChange(currentConversation?.conversationID, {
          roomID: data?.roomNo,
          videoCall: VideoCall.voicecall,
          groupCall: GroupCall.singlePersonCall,
          conversationID: currentConversation?.conversationID,
          conversationName: currentConversation?.conversationName,
          inviterAvatarUrl: userInfo?.avatarPath,
          inviterID: userInfo?.uid,
          inviter: userInfo?.nickName,
          sender: Sender.Web,
        })
      whetherCreateApiRequestRef.current = false
    } else {
      setConversation && setConversation(undefined)
    }
  }

  const setRoomHandle = () => {
    let userID = `${userInfo?.uid}`

    zg.current?.loginRoom(roomID, zimToken, { userID, userName: userID }, { userUpdate: true }).then(async result => {
      if (result === true) {
        // 创建流、预览
        // 调用 createZegoStream 接口后，需要等待 ZEGO 服务器返回 ZegoLocalStream 实例对象才能执行后续操作
        const localStream = (await zg.current?.createZegoStream({
          camera: { video: false, audio: true },
          screen: { video: false, audio: true },
        })) as ZegoLocalStream
        // 预览画面，将播放组件挂载到页面，"local-video" 为组件容器 <div> 元素的 id。
        localStream?.startCaptureMicrophone()
        // 开始推流，将自己的音视频流推送到 ZEGO 音视频云
        let streamID = new Date().getTime().toString()

        localStreamRef.current = localStream

        zg.current?.startPublishingStream(streamID, localStream)
      }
    })

    zg.current?.on('roomUserUpdate', (roomID, updateType, userList) => {
      if (updateType === StreamUpdateEnum.DELETE) {
        hanguponClick()
      }
      // 其他用户进出房间的通知
    })

    zg.current?.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
      // 房间内其他用户音视频流变化的通知
      if (updateType === StreamUpdateEnum.ADD) {
        stopVoiceAndVideo()
        startTimer()
        // 流新增，开始拉流
        // 此处演示拉取流新增的列表中第一条流的音视频
        const streamID = streamList[0].streamID
        streamIDRef.current = streamID
        // streamList 中有对应流的 streamID
        const remoteStream = (await zg.current?.startPlayingStream(streamID)) as MediaStream
        // 创建媒体流播放组件
        const remoteView = zg.current?.createRemoteStreamView(remoteStream)
        remoteView?.play('remote-video')

        setWhetherConnected(true)
      } else if (updateType === StreamUpdateEnum.DELETE) {
        // 流删除，通过流删除列表 streamList 中每个流的 streamID 进行停止拉流。
        const streamID = streamList[0].streamID
        zg.current?.stopPlayingStream(streamID)
      }
    })
    zg.current?.on('roomStateChanged', async (roomID, reason, errorCode, extendData) => {
      if (reason === ZegoRoomStateChangedReason.Kickout) {
        Message.error(t`features_audio_and_video_video_index_kb0rifluho`)
        hanguponClick()
      }
    })
  }

  useUpdateEffect(() => {
    if (whetherCreateApiRequestRef.current && callInvitationReceivedInfo && audioVisible && whetherAccept) {
      setRoomID(callInvitationReceivedInfo?.roomID as string)
      setConnectedText(t`features_audio_and_video_audio_index_6zybyttgyp`)
    }
  }, [callInvitationReceivedInfo, audioVisible, whetherAccept])

  useUpdateEffect(() => {
    if (roomID) {
      zg.current = getImZg()
      setRoomHandle()
    }
  }, [roomID])

  useUpdateEffect(() => {
    whetherCreateApiRequestRef.current && currentConversation?.conversationID && getChatRoomCreateApiRequest()
  }, [currentConversation?.conversationID])

  return (
    <div className={styles.audio} ref={audioRef}>
      <AudioInviteComponent
        setAudioInviteVisible={setAudioInviteVisible}
        audioInviteVisible={audioInviteVisible}
        setCallRejectInvite={setCallRejectInvite}
        setCallAcceptInvite={setCallAcceptInvite}
        callAudioInvitationReceivedInfo={callInvitationReceivedInfo}
        currentConversation={currentConversation}
        setAudioVisible={setAudioVisible}
        sameLoginVerificationRef={sameLoginVerificationRef}
      />
      <div id="remote-video"></div>
      <AudioZoomOutBox
        setRoomID={setRoomID}
        audioZoomOutBoxVisible={audioZoomOutBoxVisible}
        onClickHandlerAudioZoomOutBox={onClickHandlerAudioZoomOutBox}
        seconds={seconds}
      />
      <Modal
        className={classNames('resize-drag-audio', styles['resize-drag-audio'])}
        visible={audioVisible}
        getPopupContainer={() => audioRef.current as HTMLDivElement}
        footer={null}
        mask={false}
        closable={false}
        unmountOnExit
        autoFocus={false}
        focusLock={false}
      >
        <div className={styles['resize-drag-audio-container']}>
          <div className="absolute top-2.5 left-[18px]" onClick={openChatVideoSmall}>
            <Icon name="icon_chat_video_small_window" className="text-button_text_01 text-base" />
          </div>
          <div className="avatar flex flex-col items-center">
            <AudioAndVideoAvatar src={currentConversation?.conversationAvatarUrl} size={96} className="rounded-full" />
          </div>
          <div className="drag-audio-text text-base my-1">
            {callInvitationReceivedInfo?.inviter || currentConversation?.conversationName}
          </div>
          <div className="drag-audio-text text-xs">
            {hangupText || (seconds ? formatTime(seconds.toString()) : connectedText)}
          </div>
          {getShowAnsweronIcon() ? (
            <div className="flex  justify-evenly absolute bottom-[28px] w-full">
              {dragAudioHandleObject.answer.dom}
              {dragAudioHandleObject.hangup.dom}
            </div>
          ) : (
            <div className="flex  justify-evenly absolute bottom-[28px] w-full">
              {dragAudioHandleObject[iconHandleObj.microPhoneturne]?.dom}
              {dragAudioHandleObject.hangup.dom}
              {dragAudioHandleObject[iconHandleObj.speakerTurned].dom}
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default forwardRef(Audio)
