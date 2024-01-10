import classNames from 'classnames'
import { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react'
import { Message, Modal, Image } from '@nbit/arco'
import { oss_svg_image_domain_address } from '@/constants/oss'
import Icon from '@/components/icon'
import { useUserStore } from '@/store/user'
import { ZegoExpressEngine } from 'zego-express-engine-webrtc'
import ZegoLocalStream from 'zego-express-engine-webrtc/sdk/code/zh/ZegoLocalStream.web'
import { postV1ImChatRoomCreateApiRequest } from '@/apis/audio-video'
import { useInterval, useUpdateEffect } from 'ahooks'
import { t } from '@lingui/macro'
import { ZegoStreamView } from 'zego-express-engine-webrtc/sdk/code/zh/ZegoStreamView.web'
import ChatAvatar from '@/components/chat-avatar'
import styles from './index.module.css'
import {
  useResizeAndDragMove,
  getDragAudioAndVideoHandleObject,
  getImZg,
  formatTime,
  useGetGlobalVoiceAndVideo,
  getZegoStream,
} from '../audio-video'
import {
  ComponentProps,
  VideoCall,
  GroupCall,
  StreamUpdateEnum,
  ZegoRoomStateChangedReason,
  Sender,
  MinWidthAndHeight,
  RoomType,
  RoomFlowType,
} from '../audio-video-type'
import AudioAndVideoAvatar from '../audio-and-video-avatar'

type IconHandleObj = {
  microPhoneturne: string
  speakerTurned: string
  cameraTurned: string
}

function Video(props: ComponentProps, ref) {
  const {
    currentConversation,
    callInvitationReceivedInfo,
    setCallInviteChange,
    setConversation,
    setCancelCallInviteChange,
    setHangupText,
    hangupText,
    sameLoginVerificationRef,
  } = props

  const { playVoiceAndVideo, stopVoiceAndVideo } = useGetGlobalVoiceAndVideo()

  const { zimToken, userInfo } = useUserStore()

  const [whetherDragMove, setWhetherDragMove] = useState<boolean>(true)

  const whetherCreateApiRequestRef = useRef<boolean>(true)

  const zg = useRef<ZegoExpressEngine>()

  const initialWidthAndHeightRef = useRef<MinWidthAndHeight>({ width: 360, height: 640 })

  const streamIDRef = useRef<string>('')

  const localStreamRef = useRef<ZegoLocalStream>()

  const remoteStreamRef = useRef<ZegoStreamView>()

  useResizeAndDragMove({
    interactDom: '.resize-drag-video',
    restrictSizeMinWidthAndHeight: initialWidthAndHeightRef.current,
    restrictSizeMaxWidthAndHeight: initialWidthAndHeightRef.current,
    whetherDragMove,
    whetherSizeOfTheDom: true,
  })

  const [videoZoomOutBoxVisible, setVideoZoomOutBoxVisible] = useState<boolean>(false)

  const [videoVisible, setVideoVisible] = useState<boolean>(false)

  const [iconHandleObj, setIconHandleObj] = useState<IconHandleObj>({
    microPhoneturne: 'microPhoneturnedOn',
    speakerTurned: 'speakerTurnedOn',
    cameraTurned: 'cameraTurnedOn',
  })

  const [roomID, setRoomID] = useState<string>('')

  const [connectedText, setConnectedText] = useState<string>(t`features_audio_and_video_audio_index_ews2l9ybes`)

  const [seconds, setSeconds] = useState<number>(0)

  const [isRunning, setIsRunning] = useState<boolean>(false)

  const openVideoBeautyRef = useRef<boolean>(false)

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

  // 是否接通
  const [whetherConnected, setWhetherConnected] = useState<boolean>(false)
  // 是否显示操作图标
  const [whetherShowHandleIcon, setShowHandleIcon] = useState<boolean>(true)
  // 是否是全屏
  const [whetherFullScreen, setFullScreen] = useState<boolean>(false)

  const openChatVideoScreen = () => {
    setFullScreen(!whetherFullScreen)
  }
  const answeronClick = () => {}

  const hanguponClick = () => {
    stopVoiceAndVideo()
    try {
      zg.current?.destroyEngine()
    } catch (error) {
      console.log(error)
    }
    whetherCreateApiRequestRef.current = true
    setFullScreen(false)
    setWhetherConnected(false)
    setConversation && setConversation(undefined)
    setVideoVisible(false)
    setVideoZoomOutBoxVisible(false)
    setCancelCallInviteChange && setCancelCallInviteChange(currentConversation?.conversationID)
    setIconHandleObj({
      microPhoneturne: 'microPhoneturnedOn',
      speakerTurned: 'speakerTurnedOn',
      cameraTurned: 'cameraTurnedOn',
    })
    resetTimer()
    setHangupText && setHangupText('')
    setConnectedText(t`features_audio_and_video_audio_index_ews2l9ybes`)
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

  const cameraTurnedOffClick = () => {
    zg.current?.enableVideoCaptureDevice(localStreamRef.current as ZegoLocalStream, true)
    setIconHandleObj({ ...iconHandleObj, cameraTurned: 'cameraTurnedOn' })
  }

  const cameraTurnedOnClick = () => {
    zg.current?.enableVideoCaptureDevice(localStreamRef.current as ZegoLocalStream, false)
    setIconHandleObj({ ...iconHandleObj, cameraTurned: 'cameraTurnedOff' })
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

  const dragVideoHandleObject = getDragAudioAndVideoHandleObject({
    answeronClick,
    hanguponClick,
    microPhoneturnedOffClick,
    microPhoneturnedOnClick,
    speakerTurnedOnClick,
    speakerTurnedOffClick,
    cameraTurnedOffClick,
    cameraTurnedOnClick,
    onMouseDown,
  })

  const openChatVideoSmall = () => {
    setVideoVisible(false)
    setVideoZoomOutBoxVisible(true)
  }

  useImperativeHandle(ref, () => ({
    openVideoModal() {
      playVoiceAndVideo()
      setVideoVisible(true)
    },
    closeVideoModal() {
      hanguponClick()
      setHangupText && setHangupText('')
    },
  }))

  const onClickHandlerAudioZoomOutBox = () => {
    setVideoZoomOutBoxVisible(false)
    setVideoVisible(true)
  }

  const onVideoMouseEnter = () => {
    setShowHandleIcon(true)
  }

  const onVideoMouseLeave = () => {
    setShowHandleIcon(false)
  }

  const openChatVideoBeauty = () => {
    const whetherOpenVideoBeauty = !openVideoBeautyRef.current
    zg.current?.setEffectsBeauty(localStreamRef.current as ZegoLocalStream, whetherOpenVideoBeauty, {
      smoothIntensity: 100,
      rosyIntensity: 100,
      whitenIntensity: 100,
      sharpenIntensity: 100,
    })
    openVideoBeautyRef.current = whetherOpenVideoBeauty
  }

  const getChatRoomCreateApiRequest = async () => {
    const { isOk, data } = await postV1ImChatRoomCreateApiRequest({
      roomBindId: currentConversation?.conversationID as string,
      roomType: RoomType.SingleChat,
      roomFlowType: RoomFlowType.Video,
    })

    if (isOk) {
      setRoomID(data?.roomNo as string)
      setCallInviteChange &&
        setCallInviteChange(currentConversation?.conversationID, {
          roomID: data?.roomNo,
          videoCall: VideoCall.videocall,
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
        let auto
        // 创建流、预览
        // 调用 createZegoStream 接口后，需要等待 ZEGO 服务器返回 ZegoLocalStream 实例对象才能执行后续操作
        try {
          auto = await getZegoStream({ video: true, audio: true })
        } catch (error) {
          auto = false
        }

        const localStream = (await zg.current?.createZegoStream({
          camera: { video: !!auto, audio: true },
        })) as ZegoLocalStream

        // 预览画面，将播放组件挂载到页面，"local-video" 为组件容器 <div> 元素的 id。
        auto && localStream?.playVideo(document.querySelector('#local-video') as HTMLElement)
        auto ? localStream?.startCaptureCameraAndMicrophone() : localStream?.startCaptureMicrophone()
        let streamID = new Date().getTime().toString()
        localStreamRef.current = localStream
        // 开始推流，将自己的音视频流推送到 ZEGO 音视频云
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
      console.log(streamList, 'streamListstreamListstreamListstreamListstreamList')

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
        remoteStreamRef.current = remoteView
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
    whetherConnected &&
      videoVisible &&
      remoteStreamRef.current?.play('remote-video-show', { enableAutoplayDialog: true, objectFit: 'cover' })
  }, [whetherConnected, videoZoomOutBoxVisible])

  useUpdateEffect(() => {
    if (whetherCreateApiRequestRef.current && callInvitationReceivedInfo && videoVisible) {
      setRoomID(callInvitationReceivedInfo?.roomID as string)
      setConnectedText(t`features_audio_and_video_audio_index_6zybyttgyp`)
    }
  }, [callInvitationReceivedInfo, videoVisible])

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
    <div>
      <Modal
        className={styles['video-zoom-out-box']}
        visible={videoZoomOutBoxVisible}
        footer={null}
        mask={false}
        closable={false}
        afterOpen={() =>
          remoteStreamRef.current?.play('remote-video-show-box', { enableAutoplayDialog: true, objectFit: 'cover' })
        }
        autoFocus={false}
        focusLock={false}
        unmountOnExit
      >
        <div className={styles['video-zoom-out-box-container']} onClick={onClickHandlerAudioZoomOutBox}>
          {whetherConnected ? (
            <div className="w-full h-full bg-black relative" id="remote-video-show-box">
              <div className="absolute bottom-2 flex justify-center text-button_text_01 w-full z-10">
                {formatTime(seconds.toString())}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="avatar">
                <AudioAndVideoAvatar
                  src={currentConversation?.conversationAvatarUrl}
                  size={96}
                  className="rounded-full"
                />
              </div>
              <div className="text-text_color_01 text-xs text-center mt-2.5">
                {hangupText || (seconds ? formatTime(seconds.toString()) : connectedText)}
              </div>
            </div>
          )}
        </div>
      </Modal>

      <Modal
        className={classNames(
          'resize-drag-video',
          whetherFullScreen ? styles['resize-drag-video-full'] : styles['resize-drag-video']
        )}
        wrapClassName={classNames(
          styles['resize-drag-video-wrap'],
          whetherFullScreen ? styles['resize-drag-video-wrap-initial'] : ''
        )}
        visible={videoVisible}
        footer={null}
        mask={false}
        closable={false}
        unmountOnExit={!videoZoomOutBoxVisible}
        autoFocus={false}
        focusLock={false}
        // afterClose={() => setRoomID('')}
      >
        <div
          className={styles['resize-drag-video-container']}
          onMouseEnter={onVideoMouseEnter}
          onMouseLeave={onVideoMouseLeave}
        >
          <div className="other-side-video-container">
            <div className="w-full h-full bg-call_bg_color_01" id="local-video"></div>
          </div>
          {whetherShowHandleIcon && (
            <div className="video-container-handdle">
              <Icon onClick={openChatVideoSmall} name="icon_chat_video_small_window" className="video-reduce" />
              <Icon onClick={openChatVideoScreen} name="icon_chat_video_reduce" className="video-amplify" />
              <Icon onClick={openChatVideoBeauty} name="icon_chat_video_beauty" className="video-beauty" />
              <div className="video-time">
                {hangupText || (seconds ? formatTime(seconds.toString()) : connectedText)}
              </div>
            </div>
          )}

          {whetherConnected ? (
            <div>
              <div className="connected-frame" id="remote-video-show"></div>
            </div>
          ) : (
            <div
              className={classNames('avatar', {
                'flex flex-col items-center': !whetherFullScreen,
              })}
            >
              <AudioAndVideoAvatar
                src={currentConversation?.conversationAvatarUrl}
                size={96}
                className="rounded-full"
              />

              <div className="avatar-left">
                <div
                  className={classNames('text-base my-1 drag-video-text', {
                    'flex justify-center': !whetherFullScreen,
                    'flex': whetherFullScreen,
                  })}
                >
                  {callInvitationReceivedInfo?.inviter || currentConversation?.conversationName}
                </div>
                <div
                  className={classNames('drag-video-text text-xs', {
                    'flex justify-center': !whetherFullScreen,
                    'flex': whetherFullScreen,
                  })}
                >
                  {hangupText || connectedText}
                </div>
              </div>
            </div>
          )}

          {whetherShowHandleIcon && (
            <div className="video-handle">
              <div className="flex  justify-evenly mb-6">
                {dragVideoHandleObject[iconHandleObj.microPhoneturne].dom}
                {dragVideoHandleObject[iconHandleObj.speakerTurned].dom}
                {dragVideoHandleObject[iconHandleObj.cameraTurned].dom}
              </div>
              <div className="flex  justify-center">{dragVideoHandleObject.hangup.dom} </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default forwardRef(Video)
