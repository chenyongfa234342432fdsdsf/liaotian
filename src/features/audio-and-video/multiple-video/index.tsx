import classNames from 'classnames'
import { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react'
import { Message, Modal } from '@nbit/arco'
import { oss_svg_image_domain_address } from '@/constants/oss'
import Icon from '@/components/icon'
import { t } from '@lingui/macro'
import { cloneDeep } from 'lodash'
import { useUpdateEffect, useInterval, useMount, useUnmount } from 'ahooks'
import { postV1ImChatRoomCreateApiRequest } from '@/apis/audio-video'
import { useUserStore } from '@/store/user'
import { ZegoExpressEngine } from 'zego-express-engine-webrtc'
import ZegoLocalStream from 'zego-express-engine-webrtc/sdk/code/zh/ZegoLocalStream.web'
import { ZegoStreamList } from 'zego-express-engine-webrtc/sdk/code/zh/ZegoExpressEntity.web'
import { ZegoStreamView } from 'zego-express-engine-webrtc/sdk/code/zh/ZegoStreamView.web'
// import LazyImage, { Type } from '@/components/lazy-image'
import { ImChatGroupMemberListData } from '@/typings/apis/group'
import { useImStore } from '@/store/im'
import styles from './index.module.css'
import AudioVideoImageGrid from '../audio-video-image-grid'
import {
  useResizeAndDragMove,
  getDragAudioAndVideoHandleObject,
  getImZg,
  useGroupMembersList,
  useGetGlobalVoiceAndVideo,
  formatTime,
  getZegoStream,
  sendMessageCommandList,
} from '../audio-video'
import {
  MinWidthAndHeight,
  ShowOrHideCamera,
  ComponentProps,
  StreamUpdateEnum,
  GroupCall,
  VideoCall,
  Sender,
  ZegoRoomStateChangedReason,
  RoomType,
  RoomFlowType,
} from '../audio-video-type'
import SelectAudioVideoPeople from '../select-audio-video-people'

type IconHandleObj = {
  microPhoneturne: string
  speakerTurned: string
  cameraTurned: string
}

type RemoteView = {
  remoteView: ZegoStreamView
  userID: string
  remoteStream: MediaStream
}

function MultipleVideo(props: ComponentProps, ref) {
  const {
    currentConversation,
    callInvitationReceivedInfo,
    setCallInviteChange,
    setConversation,
    setCancelCallInviteChange,
    hangupText,
    setHangupText,
    invitingAndDecliningInfo,
    setCallEnd,
    sameLoginVerificationRef,
  } = props

  const {
    groupMembersList,
    setCurrentConversation,
    currentconversation: currentconversationMember,
  } = useGroupMembersList()

  const { playVoiceAndVideo, stopVoiceAndVideo } = useGetGlobalVoiceAndVideo()

  const { setRoomAudioVideoDetail } = useImStore()

  const { zimToken, userInfo } = useUserStore()

  const audioAndVideoRef = useRef<HTMLDivElement | null>(null)

  const [domMoveNum, setDomMoveNum] = useState<MinWidthAndHeight>({ width: 600, height: 540 })

  const [whetherDragMove, setWhetherDragMove] = useState<boolean>(true)

  // 是否是全屏
  const [whetherFullScreen, setFullScreen] = useState<boolean>(false)

  const [multipleAudioHeight, setMultipleAudioHeight] = useState<number>(472)

  const [multipleDragAudioHeight, setDragMultipleAudioHeight] = useState<number>(472)

  const [whetherSizeOfTheDomDrag, setWhetherSizeOfTheDomDrag] = useState<boolean>(true)

  const [whetherAccept, setWhetherAccept] = useState<boolean>(false)

  const [whetherConnected, setWhetherConnected] = useState<boolean>(false)

  const [visibleAudioVideoPeople, setVisibleAudioVideoPeople] = useState<boolean>(false)

  const [showGroupMemberList, setShowGroupMemberList] = useState<ImChatGroupMemberListData[]>([])

  const [showOrHideCamera, setShowOrHideCamera] = useState<ShowOrHideCamera[]>([])

  const remoteShowOrHideCameraRef = useRef<ShowOrHideCamera[]>([] as ShowOrHideCamera[])

  const whetherCreateApiRequestRef = useRef<boolean>(true)

  const remoteStreamRef = useRef<RemoteView[]>([] as RemoteView[])

  const [remoteStreamList, setRemoteStreamList] = useState<RemoteView[]>([] as RemoteView[])

  const zg = useRef<ZegoExpressEngine>()

  const streamIDRef = useRef<ZegoStreamList[]>([])

  const deleteStreamIDRef = useRef<ZegoStreamList[]>([])

  const localStreamRef = useRef<ZegoLocalStream>()

  const openVideoBeautyRef = useRef<boolean>(false)

  useResizeAndDragMove({
    interactDom: '.resize-drag-multiple-video',
    restrictSizeMinWidthAndHeight: { width: 600, height: multipleDragAudioHeight },
    whetherDragMove,
    whetherSizeOfTheDom: !whetherFullScreen && whetherSizeOfTheDomDrag,
    restrictSizeMaxWidthAndHeight: { width: Infinity, height: Infinity },
    setDomMoveNum,
    domMoveNum,
  })

  const [videoZoomOutBoxVisible, setVideoZoomOutBoxVisible] = useState<boolean>(false)

  const [iconHandleObj, setIconHandleObj] = useState<IconHandleObj>({
    microPhoneturne: 'microPhoneturnedOn',
    speakerTurned: 'speakerTurnedOn',
    cameraTurned: 'cameraTurnedOn',
  })

  const [videoVisible, setVideoVisible] = useState<boolean>(false)

  const [roomID, setRoomID] = useState<string>('')

  const [seconds, setSeconds] = useState<number>(0)

  const [isRunning, setIsRunning] = useState<boolean>(false)

  const [connectedVideoUserList, setVideoConnectedUserList] = useState<ZegoStreamList[]>([])

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

  const getMultipleAudioHeight = () => {
    const element = document.querySelector('.resize-drag-multiple-video') as HTMLEmbedElement
    const height = element?.offsetHeight
    return height
  }

  useUpdateEffect(() => {
    setWhetherSizeOfTheDomDrag(true)
  }, [multipleAudioHeight, multipleDragAudioHeight])

  const answeronClick = () => {}

  const getInviteesArrayId = () => {
    return groupMembersList?.map(item => String(item?.uid))
  }

  useEffect(() => {
    const groupShowOrHideMembersList = groupMembersList?.map(item => {
      const showOrHideCameraBoolean = showOrHideCamera?.find(
        cameraItem => cameraItem.userID === String(item?.uid)
      )?.cameraStatus
      return {
        userID: String(item?.uid),
        cameraStatus: showOrHideCameraBoolean !== undefined ? showOrHideCameraBoolean : true,
      }
    })
    setShowOrHideCamera([...groupShowOrHideMembersList])
    remoteShowOrHideCameraRef.current = [...groupShowOrHideMembersList]
  }, [groupMembersList])

  useUpdateEffect(() => {
    const getConnectedUserList = memberItem => {
      return connectedVideoUserList?.some(userItem => String(memberItem?.uid) === userItem?.user?.userID)
    }
    const groupMembersFiterList = groupMembersList?.filter(memberItem => getConnectedUserList(memberItem))
    const groupUserInfoList = groupMembersList?.filter(memberItem => memberItem?.uid === userInfo?.uid)
    setShowGroupMemberList([...groupUserInfoList, ...groupMembersFiterList])
  }, [connectedVideoUserList, groupMembersList, userInfo])

  const setUpdateRoomAudioVideoDetail = () => {
    setTimeout(() => {
      if (currentConversation?.conversationID || currentconversationMember?.conversationID) {
        setRoomAudioVideoDetail(currentConversation?.conversationID || currentconversationMember?.conversationID)
      }
    }, 400)
  }

  const hanguponClick = (hangUp?: boolean, inviteId?: string) => {
    stopVoiceAndVideo()
    setTimeout(() => {
      sendMessageCommandList(currentConversation, currentconversationMember)
    }, 1000)
    setUpdateRoomAudioVideoDetail()

    showGroupMemberList?.length <= 1 && setCallEnd && setCallEnd()
    if (hangUp && inviteId === userInfo?.uid) {
      setCancelCallInviteChange && setCancelCallInviteChange(getInviteesArrayId())
    } else {
      setCancelCallInviteChange && setCancelCallInviteChange(currentConversation?.conversationID)
    }

    try {
      zg.current?.destroyEngine()
    } catch (error) {
      console.log(error)
    }
    whetherCreateApiRequestRef.current = true
    setConversation && setConversation(undefined)
    setCurrentConversation('')
    setVideoVisible(false)
    setIconHandleObj({
      microPhoneturne: 'microPhoneturnedOn',
      speakerTurned: 'speakerTurnedOn',
      cameraTurned: 'cameraTurnedOn',
    })
    setWhetherConnected(false)
    setVideoZoomOutBoxVisible(false)
    setWhetherAccept(false)
    setFullScreen(false)
    setHangupText && setHangupText('')
    resetTimer()
    setVideoConnectedUserList([])
    localStreamRef.current?.stopVideo()
    setMultipleAudioHeight(472)
    setRoomID('')
    streamIDRef.current = []
    deleteStreamIDRef.current = []
    remoteStreamRef.current = []
    setShowOrHideCamera([])
    remoteShowOrHideCameraRef.current = []
    setRemoteStreamList([])
    if (sameLoginVerificationRef) {
      sameLoginVerificationRef.current = true
    }
    zg.current?.logoutRoom(roomID)
  }

  const getShowOrHideCamera = (cameraStatusUserId, cameraStatus) => {
    const showOrHideCameraList = remoteShowOrHideCameraRef.current?.map(hideCameraItem => {
      return {
        cameraStatus: hideCameraItem.userID === cameraStatusUserId ? cameraStatus : hideCameraItem.cameraStatus,
        userID: hideCameraItem.userID,
      }
    })
    remoteShowOrHideCameraRef.current = [...showOrHideCameraList]
    setShowOrHideCamera([...showOrHideCameraList])
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
    streamIDRef.current?.forEach(item => {
      zg.current?.mutePlayStreamAudio(item?.streamID, true)
    })
    setIconHandleObj({ ...iconHandleObj, speakerTurned: 'speakerTurnedOff' })
  }

  const speakerTurnedOffClick = () => {
    streamIDRef.current?.forEach(item => {
      zg.current?.mutePlayStreamAudio(item?.streamID, false)
    })
    setIconHandleObj({ ...iconHandleObj, speakerTurned: 'speakerTurnedOn' })
  }

  const cameraTurnedOffClick = () => {
    getShowOrHideCamera(String(userInfo?.uid), true)
    zg.current?.enableVideoCaptureDevice(localStreamRef.current as ZegoLocalStream, true)
    setIconHandleObj({ ...iconHandleObj, cameraTurned: 'cameraTurnedOn' })
  }

  const cameraTurnedOnClick = () => {
    getShowOrHideCamera(String(userInfo?.uid), false)
    zg.current?.enableVideoCaptureDevice(localStreamRef.current as ZegoLocalStream, false)
    setIconHandleObj({ ...iconHandleObj, cameraTurned: 'cameraTurnedOff' })
  }

  const onMouseDown = () => {
    setWhetherDragMove(false)
  }

  const onMouseUp = () => {
    setWhetherDragMove(true)
  }

  useMount(() => {
    window.onbeforeunload = function () {
      zg.current?.logoutRoom(roomID)
      setUpdateRoomAudioVideoDetail()
    }
  })

  useUnmount(() => {
    window.onbeforeunload = null
  })

  useEffect(() => {
    // 在组件挂载时注册事件
    document.addEventListener('mouseup', onMouseUp)
    // 在组件卸载时移除事件
    return () => {
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  useEffect(() => {
    if (showGroupMemberList?.length > 2) {
      const height = getMultipleAudioHeight()
      if (height < 774) {
        setMultipleAudioHeight(774)
        setDragMultipleAudioHeight(774)
        // setWhetherSizeOfTheDomDrag(false)
      }
    } else {
      setDragMultipleAudioHeight(472)
      // setWhetherSizeOfTheDomDrag(false)
    }
  }, [showGroupMemberList?.length])

  const dragAudioHandleObject = getDragAudioAndVideoHandleObject({
    answeronClick,
    hanguponClick: () => hanguponClick(true, invitingAndDecliningInfo?.inviteId),
    microPhoneturnedOffClick,
    microPhoneturnedOnClick,
    speakerTurnedOnClick,
    speakerTurnedOffClick,
    onMouseDown,
    cameraTurnedOffClick,
    cameraTurnedOnClick,
    iconContainerHeight: 'w-[40px]',
    iconContainerWidth: 'h-[40px]',
    iconWidthAndHeight: 'text-xl',
  })

  const openChatVideoSmall = () => {
    if (whetherConnected || currentConversation?.conversationID) {
      setVideoZoomOutBoxVisible(true)
      setVideoVisible(false)
      return
    }
    if (!whetherConnected) {
      setVideoVisible(false)
    }
  }

  useImperativeHandle(ref, () => ({
    openMultipleVideoModal() {
      setVideoVisible(true)
      setWhetherAccept(true)
      playVoiceAndVideo()
    },
    closeMultipleVideoModal() {
      hanguponClick()
    },
    applyToJoinChat(roomId: string, joinChatConversation) {
      setRoomID(roomId)
      setCurrentConversation(joinChatConversation)
      setVideoVisible(true)
    },
  }))

  const onClickHandlerAudioZoomOutBox = () => {
    setVideoZoomOutBoxVisible(false)
    setVideoVisible(true)
  }

  const setCallInviteSendChange = (inviteesArrayId, roomIDArrayId) => {
    setCallInviteChange &&
      setCallInviteChange(inviteesArrayId, {
        roomID: roomIDArrayId,
        videoCall: VideoCall.videocall,
        groupCall: GroupCall.groupChatCall,
        conversationID: currentConversation?.conversationID || currentconversationMember?.conversationID,
        conversationName: currentConversation?.conversationName || currentconversationMember?.conversationName,
        inviterAvatarUrl: userInfo?.avatarPath,
        inviterID: userInfo?.uid,
        inviter: userInfo?.nickName,
        sender: Sender.Web,
      })
  }

  const getChatRoomCreateApiRequest = async () => {
    const { isOk, data } = await postV1ImChatRoomCreateApiRequest({
      roomBindId: currentConversation?.conversationID as string,
      roomType: RoomType.GroupleChat,
      roomFlowType: RoomFlowType.Video,
    })
    if (isOk) {
      setRoomID(data?.roomNo as string)
      const inviteesArrayId = getInviteesArrayId()
      setCallInviteSendChange(inviteesArrayId, data?.roomNo)
      whetherCreateApiRequestRef.current = false
    } else {
      setConversation && setConversation(undefined)
      setCurrentConversation && setCurrentConversation(undefined)
    }
  }

  const getlocalStreamDom = () => {
    return document.querySelector(`#remote-video${userInfo?.uid}`) as HTMLElement
  }

  const setRemoteStreamDomHandle = remoteStream => {
    remoteStream?.forEach(item => {
      try {
        item?.remoteView?.play?.(`remote-video${item?.userID}`, { enableAutoplayDialog: true, objectFit: 'cover' })
      } catch (error) {
        console.log(error, 'errorerrorerror')
      }
    })
  }

  useUpdateEffect(() => {
    if (!videoZoomOutBoxVisible) {
      // 预览画面，将播放组件挂载到页面，"local-video" 为组件容器 <div> 元素的 id。
      if (localStreamRef.current?.active) {
        localStreamRef.current?.playVideo?.(getlocalStreamDom(), {
          objectFit: 'cover',
        })
      }
    }
  }, [videoZoomOutBoxVisible])

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

        localStream?.startCaptureCameraAndMicrophone()
        // 预览画面，将播放组件挂载到页面，"local-video" 为组件容器 <div> 元素的 id。
        localStream?.playVideo?.(getlocalStreamDom(), {
          objectFit: 'cover',
        })
        // 开始推流，将自己的音视频流推送到 ZEGO 音视频云
        let streamID = new Date().getTime().toString()
        localStreamRef.current = localStream
        zg.current?.startPublishingStream(streamID, localStream)

        sendMessageCommandList(currentConversation, currentconversationMember)
        setUpdateRoomAudioVideoDetail()
      }
    })

    zg.current?.on('remoteCameraStatusUpdate', (item, updateType) => {
      const cameraStatusUserId = streamIDRef.current?.find(streamIdItem => streamIdItem?.streamID === item)?.user
        ?.userID
      const cameraStatus = updateType === 'OPEN'
      getShowOrHideCamera(cameraStatusUserId, cameraStatus)
    })

    zg.current?.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
      // 房间内其他用户音视频流变化的通知
      console.log(streamList, updateType, 'streamListstreamListstreamList')

      if (updateType === StreamUpdateEnum.ADD) {
        stopVoiceAndVideo()
        startTimer()
        streamIDRef.current = [...streamIDRef.current, ...streamList]
        streamList?.forEach(async item => {
          const streamID = item.streamID
          // streamList 中有对应流的 streamID
          const remoteStream = (await zg.current?.startPlayingStream(streamID, {
            audio: true,
            video: true,
          })) as MediaStream
          // 创建媒体流播放组件
          const remoteView = zg.current?.createRemoteStreamView(remoteStream)
          if (remoteView) {
            remoteStreamRef.current = [
              ...remoteStreamRef.current,
              { remoteView, userID: item?.user?.userID, remoteStream },
            ]
            setRemoteStreamList([...remoteStreamRef.current])
          }
          console.log(remoteStreamRef.current, 'remoteStreamRef.currentremoteStreamRef.current')

          const deleteStreamIDRefList = [...cloneDeep(deleteStreamIDRef.current)]
          const deleteStreamIDRefIndex = deleteStreamIDRefList.findIndex(
            itemList => item?.user?.userID === itemList?.user?.userID
          )

          if (deleteStreamIDRefIndex !== -1) {
            deleteStreamIDRefList.splice(deleteStreamIDRefIndex, 1)
            deleteStreamIDRef.current = [...deleteStreamIDRefList]
          }
          setWhetherConnected(true)
        })
        setVideoConnectedUserList([...streamIDRef.current])
      } else if (updateType === StreamUpdateEnum.DELETE) {
        // 流删除，通过流删除列表 streamList 中每个流的 streamID 进行停止拉流。
        const streamIDRefList = [...cloneDeep(streamIDRef.current)]
        const remoteStreamRefList = [...cloneDeep(remoteStreamRef.current)]
        streamList?.forEach(async item => {
          zg.current?.stopPlayingStream(item?.streamID)
          const streamIDRefListIndex = streamIDRefList?.findIndex(
            itemList => item?.user?.userID === itemList?.user?.userID
          )
          const remoteStreamIDRefListIndex = remoteStreamRefList?.findIndex(
            itemList => item?.user?.userID === itemList?.userID
          )
          if (streamIDRefListIndex !== -1) {
            streamIDRefList.splice(streamIDRefListIndex, 1)
          }
          if (remoteStreamIDRefListIndex !== -1) {
            remoteStreamRefList.splice(remoteStreamIDRefListIndex, 1)
          }
        })
        streamIDRef.current = [...streamIDRefList]
        remoteStreamRef.current = [...remoteStreamRefList]
        setVideoConnectedUserList([...cloneDeep(streamIDRefList)])
        setRemoteStreamList([...remoteStreamRef.current])
        setRemoteStreamDomHandle(remoteStreamRef.current)
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
    if (videoVisible && whetherConnected) {
      setRemoteStreamDomHandle(remoteStreamList)
      if (localStreamRef.current?.active) {
        try {
          localStreamRef.current?.playVideo?.(getlocalStreamDom(), {
            objectFit: 'cover',
          })
        } catch (error) {
          console.log(error, 'localStreamReferrorerrorerror')
        }
      }
    }
  }, [remoteStreamList, videoZoomOutBoxVisible, videoVisible, whetherConnected, showGroupMemberList])

  useUpdateEffect(() => {
    if (whetherCreateApiRequestRef.current && callInvitationReceivedInfo && videoVisible && whetherAccept) {
      setRoomID(callInvitationReceivedInfo?.roomID as string)
      setCurrentConversation(callInvitationReceivedInfo)
    }
  }, [callInvitationReceivedInfo, videoVisible, whetherAccept])

  useUpdateEffect(() => {
    if (roomID) {
      zg.current = getImZg()
      setRoomHandle()
    }
  }, [roomID])

  useUpdateEffect(() => {
    if (whetherCreateApiRequestRef.current && currentConversation?.conversationID) {
      getChatRoomCreateApiRequest()
    }
  }, [groupMembersList])

  useUpdateEffect(() => {
    if (whetherCreateApiRequestRef.current && currentConversation?.conversationID) {
      setCurrentConversation(currentConversation)
    }
  }, [currentConversation?.conversationID])

  const openChatAudioScreen = () => {
    setFullScreen(!whetherFullScreen)
  }

  const onVisibleAudioVideoPeopleConfirm = item => {
    if (sameLoginVerificationRef) {
      sameLoginVerificationRef.current = true
    }
    const InviteAudioVideoIdList =
      item?.map(audioVideoItem => {
        return String(audioVideoItem?.uid)
      }) || []
    setCallInviteSendChange(InviteAudioVideoIdList, roomID)
    whetherCreateApiRequestRef.current = false
  }

  const showOrHideCameraAvar = item => {
    return showOrHideCamera?.find(cameraItem => cameraItem?.userID === String(item?.uid))?.cameraStatus
  }

  return (
    <div className={styles.audio} ref={audioAndVideoRef}>
      <SelectAudioVideoPeople
        currentConversation={currentConversation}
        visibleAudioVideoPeople={visibleAudioVideoPeople}
        setVisibleAudioVideoPeople={setVisibleAudioVideoPeople}
        onConfirm={onVisibleAudioVideoPeopleConfirm}
        groupMembersList={groupMembersList}
      />
      <Modal
        className={styles['video-zoom-out-box']}
        visible={videoZoomOutBoxVisible}
        footer={null}
        mask={false}
        closable={false}
        afterOpen={() => {
          localStreamRef.current?.playVideo?.(document?.querySelector('#remote-video-show-box') as HTMLElement, {
            objectFit: 'cover',
          })
        }}
        autoFocus={false}
        focusLock={false}
        unmountOnExit
      >
        <div className={styles['video-zoom-out-box-container']} onClick={onClickHandlerAudioZoomOutBox}>
          <div className="w-full h-full bg-black relative" id="remote-video-show-box">
            <div className="absolute bottom-2 flex justify-center text-button_text_01 w-full z-10">
              {hangupText || seconds ? formatTime(seconds.toString()) : ''}
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        className={classNames(
          'resize-drag-multiple-video',
          whetherFullScreen ? styles['resize-drag-audio-full'] : styles['resize-drag-multiple-audio']
        )}
        wrapClassName={classNames(whetherFullScreen ? styles['resize-drag-audio-wrap-initial'] : '')}
        visible={videoVisible}
        // getPopupContainer={() => audioAndVideoRef.current as HTMLDivElement}
        footer={null}
        mask={false}
        closable={false}
        unmountOnExit
        autoFocus={false}
        focusLock={false}
        style={{ height: multipleAudioHeight }}
      >
        <div
          className={styles['resize-drag-audio-multiple-container']}
          style={{
            // width: `${domMoveNum.width}px`,
            height: whetherFullScreen ? 'height: calc(100% - 133px);' : '',
          }}
        >
          <div className="w-full h-[36px]  bg-call_bg_color_01 rounded-lg">
            <div className="absolute top-1 left-[18px]" onClick={openChatVideoSmall}>
              <Icon name="icon_chat_video_small_window" className="text-button_text_01 text-base" />
            </div>
            <div className="absolute top-1 left-[62px]" onClick={openChatAudioScreen}>
              <Icon name="icon_chat_video_reduce" className="text-button_text_01 text-base" />
            </div>
            <div className="absolute top-1 right-[18px]" onClick={openChatVideoBeauty}>
              <Icon name="icon_chat_video_beauty" className="text-button_text_01 text-base" />
            </div>
            <div className="drag-audio-text text-xs mt-3">
              {hangupText ||
                (seconds ? formatTime(seconds.toString()) : t`features_audio_and_video_audio_index_ews2l9ybes`)}
            </div>
          </div>

          <div
            className="flex justify-center"
            style={{
              // width: `${domMoveNum.width}px`,
              height: 'inherit',
            }}
          >
            <div
              className="avatar-container"
              style={{
                width: `${domMoveNum.width + 10}px`,
                // height: whetherFullScreen ? 'height: calc(100% - 133px);' : `${domMoveNum.height - 160}px`,
              }}
            >
              <div
                className="avatar-item"
                style={{
                  width: `${domMoveNum.width}px`,
                }}
              >
                {videoVisible && (
                  <AudioVideoImageGrid>
                    {showGroupMemberList?.map(item => {
                      return (
                        <div className="inner-box" key={item?.uid}>
                          <img
                            className={!showOrHideCameraAvar(item) ? 'w-full h-full' : 'w-0 h-0'}
                            src={item.avatarPath || `${oss_svg_image_domain_address}icon_peer_default_avatar.png`}
                            key={item?.uid}
                            alt=""
                          />
                          <div
                            className={classNames('remote-video-id')}
                            style={
                              showOrHideCameraAvar(item)
                                ? { width: '100%', height: '100%' }
                                : { width: '0', height: '0' }
                            }
                            id={`remote-video${item?.uid}`}
                          ></div>
                        </div>
                      )
                    })}
                  </AudioVideoImageGrid>
                )}
              </div>
            </div>
          </div>

          <div className="bottom-[40px] w-full absolute">
            <div className="w-[342px] mx-auto flex justify-between">
              {dragAudioHandleObject[iconHandleObj.microPhoneturne]?.dom}
              {dragAudioHandleObject[iconHandleObj.speakerTurned].dom}
              {dragAudioHandleObject[iconHandleObj.cameraTurned].dom}
              {showGroupMemberList.length < groupMembersList?.length && (
                <div onClick={() => setVisibleAudioVideoPeople(true)} className="flex items-center flex-col">
                  <div className="w-10 h-10 rounded-full bg-call_bg_color_03 flex justify-center items-center">
                    <Icon name="icon_set_new" className="text-button_text_01 text-xl" />
                  </div>
                  <div className="text-button_text_01 text-xs mt-2">{t`features_group_group_members_manage_index_4zzexhrrt3`}</div>
                </div>
              )}
              {dragAudioHandleObject.hangup.dom}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default forwardRef(MultipleVideo)
