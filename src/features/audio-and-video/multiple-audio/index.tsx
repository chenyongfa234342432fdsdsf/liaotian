import classNames from 'classnames'
import { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react'
import { Message, Modal } from '@nbit/arco'
// import { oss_svg_image_domain_address } from '@/constants/oss'
// import LazyImage from '@/components/lazy-image'
import Icon from '@/components/icon'
import { t } from '@lingui/macro'
import { cloneDeep } from 'lodash'
import { useUpdateEffect, useInterval, useMount } from 'ahooks'
import { postV1ImChatRoomCreateApiRequest } from '@/apis/audio-video'
import { useUserStore } from '@/store/user'
import { ZegoExpressEngine } from 'zego-express-engine-webrtc'
import ZegoLocalStream from 'zego-express-engine-webrtc/sdk/code/zh/ZegoLocalStream.web'
import { ZegoStreamList } from 'zego-express-engine-webrtc/sdk/code/zh/ZegoExpressEntity.web'
import { ImChatGroupMemberListData } from '@/typings/apis/group'
import { useImStore } from '@/store/im'
import { oss_svg_image_domain_address } from '@/constants/oss'
import styles from './index.module.css'
import AudioInviteComponent from '../audio-invite-component'
import AudioVideoImageGrid from '../audio-video-image-grid'
import {
  useResizeAndDragMove,
  getDragAudioAndVideoHandleObject,
  getImZg,
  useGroupMembersList,
  useGetGlobalVoiceAndVideo,
  formatTime,
  sendMessageCommandList,
} from '../audio-video'
import AudioZoomOutBox from '../audio-zoom-out-box'
import SelectAudioVideoPeople from '../select-audio-video-people'
import {
  MinWidthAndHeight,
  ComponentProps,
  StreamUpdateEnum,
  GroupCall,
  VideoCall,
  Sender,
  ZegoRoomStateChangedReason,
  RoomType,
  RoomFlowType,
} from '../audio-video-type'

type IconHandleObj = {
  microPhoneturne: string
  speakerTurned: string
}

function MultipleAudio(props: ComponentProps, ref) {
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
    invitingAndDecliningInfo,
    setCallEnd,
    sameLoginVerificationRef,
    whetherVoiceAndVideoIngRef,
  } = props

  const {
    groupMembersList,
    setCurrentConversation,
    currentconversation: currentconversationMember,
  } = useGroupMembersList()

  const { setRoomAudioVideoDetail } = useImStore()

  const { playVoiceAndVideo, stopVoiceAndVideo } = useGetGlobalVoiceAndVideo()

  const [audioInviteVisible, setAudioInviteVisible] = useState<boolean>(false)

  const { zimToken, userInfo } = useUserStore()

  const audioAndVideoRef = useRef<HTMLDivElement | null>(null)

  const [showGroupMembersList, setShowGroupMembersList] = useState<ImChatGroupMemberListData[]>([])

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

  const whetherCreateApiRequestRef = useRef<boolean>(true)

  const zg = useRef<ZegoExpressEngine>()

  const streamIDRef = useRef<ZegoStreamList[]>([])

  const deleteStreamIDRef = useRef<ZegoStreamList[]>([])

  const localStreamRef = useRef<ZegoLocalStream>()

  useResizeAndDragMove({
    interactDom: '.resize-drag-multiple-audio',
    restrictSizeMinWidthAndHeight: { width: 600, height: multipleDragAudioHeight },
    whetherDragMove,
    whetherSizeOfTheDom: !whetherFullScreen && whetherSizeOfTheDomDrag,
    setDomMoveNum,
    domMoveNum,
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

  const [connectedUserList, setConnectedUserList] = useState<ZegoStreamList[]>([])

  useUpdateEffect(() => {
    if (groupMembersList?.length && audioVisible) {
      const filterMembersList = groupMembersList.filter(
        memberItem =>
          connectedUserList.some(userItem => String(memberItem?.uid) === userItem?.user?.userID) ||
          memberItem?.uid === userInfo?.uid
      )
      setShowGroupMembersList(filterMembersList)
    }
  }, [connectedUserList, groupMembersList, audioVisible])

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

  const getMultipleAudioHeight = () => {
    const element = document.querySelector('.resize-drag-multiple-audio') as HTMLEmbedElement
    const height = element?.offsetHeight
    return height
  }

  useUpdateEffect(() => {
    setWhetherSizeOfTheDomDrag(true)
  }, [multipleAudioHeight, multipleDragAudioHeight])

  const answeronClick = () => {
    setCallAcceptInvite &&
      setCallAcceptInvite(() => {
        setWhetherAccept(true)
      }, callInvitationReceivedInfo)
  }

  const getInviteesArrayId = () => {
    return groupMembersList?.map(item => String(item?.uid))
  }

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
    }, 800)

    setUpdateRoomAudioVideoDetail()

    if (hangUp && inviteId === userInfo?.uid) {
      setCancelCallInviteChange && setCancelCallInviteChange(getInviteesArrayId())
    } else {
      setCancelCallInviteChange && setCancelCallInviteChange(currentConversation?.conversationID)
    }

    try {
      showGroupMembersList?.length <= 1 && setCallEnd && setCallEnd(currentConversation, currentconversationMember)
      zg.current?.destroyEngine()
      zg.current?.logoutRoom(roomID)
    } catch (error) {
      console.log(error)
    }
    whetherCreateApiRequestRef.current = true
    setConversation && setConversation(undefined)
    setCurrentConversation('')
    setAudioVisible(false)
    setIconHandleObj({
      microPhoneturne: 'microPhoneturnedOn',
      speakerTurned: 'speakerTurnedOn',
    })
    setWhetherConnected(false)
    setAudioZoomOutBoxVisible(false)
    setWhetherAccept(false)
    setAudioInviteVisible(false)
    setFullScreen(false)
    setHangupText && setHangupText('')
    resetTimer()
    setShowGroupMembersList([])
    setConnectedUserList([])
    localStreamRef.current?.stopVideo()
    setMultipleAudioHeight(472)

    setRoomID('')
    streamIDRef.current = []
    deleteStreamIDRef.current = []
    if (sameLoginVerificationRef) {
      sameLoginVerificationRef.current = true
    }
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

  useEffect(() => {
    // 在组件挂载时注册事件
    document.addEventListener('mouseup', onMouseUp)
    // 在组件卸载时移除事件
    return () => {
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  useEffect(() => {
    if (showGroupMembersList?.length > 2) {
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
  }, [showGroupMembersList])

  const dragAudioHandleObject = getDragAudioAndVideoHandleObject({
    answeronClick,
    hanguponClick: () => hanguponClick(true, invitingAndDecliningInfo?.inviteId),
    microPhoneturnedOffClick,
    microPhoneturnedOnClick,
    speakerTurnedOnClick,
    speakerTurnedOffClick,
    onMouseDown,
    iconContainerHeight: 'w-[40px]',
    iconContainerWidth: 'h-[40px]',
    iconWidthAndHeight: 'text-xl',
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
    openMultipleAudioModal() {
      if (!audioZoomOutBoxVisible) {
        setAudioVisible(true)
        setWhetherAccept(true)
        playVoiceAndVideo()
      }
    },
    closeMultipleAudioModal() {
      hanguponClick()
    },
    openMultipleAudioInviteModal() {
      playVoiceAndVideo()
      setAudioInviteVisible(true)
    },
    closeMultipleAudioInviteModal() {
      stopVoiceAndVideo()
      setAudioInviteVisible(false)
      setHangupText && setHangupText('')
      audioVisible && hanguponClick()
    },
    applyToJoinChat(roomId: string, joinChatConversation) {
      setRoomID(roomId)
      setCurrentConversation(joinChatConversation)
      setAudioVisible(true)
    },
  }))

  const onClickHandlerAudioZoomOutBox = () => {
    setAudioZoomOutBoxVisible(false)
    setAudioVisible(true)
  }

  // const deleteStreamUserIdChange = () => {
  //   const deleteStreamUserId = deleteStreamIDRef.current?.map(item => String(item?.user?.userID)) || []
  //   const rejectInvitingId = invitingAndDecliningInfo?.rejectInvitingId || []
  //   const deleteUserIdList = [...deleteStreamUserId, ...rejectInvitingId]
  //   if (deleteUserIdList.length >= getInviteesArrayId()?.length) {
  //     hanguponClick()
  //   }
  // }

  const setCallInviteSendChange = (inviteesArrayId, roomIDArrayId) => {
    setCallInviteChange &&
      setCallInviteChange(inviteesArrayId, {
        roomID: roomIDArrayId,
        videoCall: VideoCall.voicecall,
        groupCall: GroupCall.groupChatCall,
        conversationID: currentConversation?.conversationID || currentconversationMember?.conversationID,
        conversationName: currentConversation?.conversationName || currentconversationMember?.conversationName,
        inviterAvatarUrl: userInfo?.avatarPath,
        inviterID: userInfo?.uid,
        inviter: userInfo?.nickName,
        sender: Sender.Web,
        type: currentConversation?.type || currentconversationMember?.conversationAvatarUrl,
      })
  }

  const getChatRoomCreateApiRequest = async () => {
    const { isOk, data } = await postV1ImChatRoomCreateApiRequest({
      roomBindId: currentConversation?.conversationID as string,
      roomType: RoomType.GroupleChat,
      roomFlowType: RoomFlowType.Audio,
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

        sendMessageCommandList(currentConversation, currentconversationMember)
        setUpdateRoomAudioVideoDetail()
      }
    })

    zg.current?.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
      // 房间内其他用户音视频流变化的通知
      if (updateType === StreamUpdateEnum.ADD) {
        stopVoiceAndVideo()
        startTimer()
        streamIDRef.current = [...streamIDRef.current, ...streamList]
        setConnectedUserList([...streamIDRef.current])
        streamList?.forEach(async item => {
          const streamID = item.streamID
          // streamList 中有对应流的 streamID
          const remoteStream = (await zg.current?.startPlayingStream(streamID, {
            audio: true,
            video: false,
          })) as MediaStream
          // 创建媒体流播放组件
          const remoteView = zg.current?.createRemoteStreamView(remoteStream)
          remoteView?.play(`remote-video${item?.user?.userID}`)
          // 流新增，开始拉流
          // 此处演示拉取流新增的列表中第一条流的音视频
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
      } else if (updateType === StreamUpdateEnum.DELETE) {
        // 流删除，通过流删除列表 streamList 中每个流的 streamID 进行停止拉流。
        const streamIDRefList = [...cloneDeep(streamIDRef.current)]
        streamList?.forEach(async item => {
          zg.current?.stopPlayingStream(item?.streamID)
          const streamIDRefListIndex = streamIDRefList?.findIndex(
            itemList => item?.user?.userID === itemList?.user?.userID
          )

          if (streamIDRefListIndex !== -1) {
            streamIDRefList?.splice(streamIDRefListIndex, 1)
          }
        })
        streamIDRef.current = [...streamIDRefList]
        setConnectedUserList([...cloneDeep(streamIDRef.current)])
      }
    })

    zg.current?.on('roomStateChanged', async (roomID, reason, errorCode, extendData) => {
      if (reason === ZegoRoomStateChangedReason.Kickout) {
        Message.error(t`features_audio_and_video_video_index_kb0rifluho`)
        hanguponClick()
      }
    })
  }

  // useUpdateEffect(() => {
  //   if (
  //     invitingAndDecliningInfo.rejectInvitingId.length + deleteStreamIDRef.current.length > 0 &&
  //     groupMembersList?.length > 0
  //   ) {
  //     deleteStreamUserIdChange()
  //   }
  // }, [invitingAndDecliningInfo?.rejectInvitingId, deleteStreamIDRef.current?.length, groupMembersList])

  useUpdateEffect(() => {
    if (whetherCreateApiRequestRef.current && callInvitationReceivedInfo && audioVisible && whetherAccept) {
      setRoomID(callInvitationReceivedInfo?.roomID as string)
      setCurrentConversation(callInvitationReceivedInfo)
    }
  }, [callInvitationReceivedInfo, audioVisible, whetherAccept])

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

  return (
    <div className={styles.audio} ref={audioAndVideoRef}>
      <AudioInviteComponent
        setAudioInviteVisible={setAudioInviteVisible}
        audioInviteVisible={audioInviteVisible}
        setCallRejectInvite={setCallRejectInvite}
        setCallAcceptInvite={setCallAcceptInvite}
        callAudioInvitationReceivedInfo={callInvitationReceivedInfo}
        currentConversation={currentConversation}
        setAudioVisible={setAudioVisible}
        sameLoginVerificationRef={sameLoginVerificationRef}
        whetherVoiceAndVideoIngRef={whetherVoiceAndVideoIngRef}
      />
      {/* <div id="remote-video"></div> */}
      <SelectAudioVideoPeople
        currentConversation={currentConversation}
        visibleAudioVideoPeople={visibleAudioVideoPeople}
        setVisibleAudioVideoPeople={setVisibleAudioVideoPeople}
        onConfirm={onVisibleAudioVideoPeopleConfirm}
        groupMembersList={groupMembersList}
      />
      <AudioZoomOutBox
        setRoomID={setRoomID}
        audioZoomOutBoxVisible={audioZoomOutBoxVisible}
        onClickHandlerAudioZoomOutBox={onClickHandlerAudioZoomOutBox}
        seconds={seconds}
      />

      <Modal
        className={classNames(
          'resize-drag-multiple-audio',
          whetherFullScreen ? styles['resize-drag-audio-full'] : styles['resize-drag-multiple-audio']
        )}
        wrapClassName={classNames(whetherFullScreen ? styles['resize-drag-audio-wrap-initial'] : '')}
        visible={audioVisible}
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
          </div>
          <div className="drag-audio-text text-xs">
            {hangupText ||
              (seconds ? formatTime(seconds.toString()) : t`features_audio_and_video_audio_index_ews2l9ybes`)}
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
                <AudioVideoImageGrid>
                  {showGroupMembersList?.map(item => {
                    return (
                      <div className="inner-box" key={item?.uid}>
                        <img
                          className="w-full h-full"
                          src={item.avatarPath || `${oss_svg_image_domain_address}icon_peer_default_avatar.png`}
                          key={item?.uid}
                          alt=""
                        />
                        <div id={`remote-video${item?.uid}`}></div>
                      </div>
                    )
                  })}
                </AudioVideoImageGrid>
              </div>
            </div>
          </div>
          {getShowAnsweronIcon() ? (
            <div className="flex  justify-evenly absolute bottom-[28px] w-full">
              {dragAudioHandleObject.answer.dom}
              {dragAudioHandleObject.hangup.dom}
            </div>
          ) : (
            <div className="bottom-[40px] w-full absolute">
              <div className="w-[342px] mx-auto flex justify-between">
                {dragAudioHandleObject[iconHandleObj.microPhoneturne]?.dom}
                {dragAudioHandleObject[iconHandleObj.speakerTurned].dom}
                {showGroupMembersList.length < groupMembersList?.length && (
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
          )}
        </div>
      </Modal>
    </div>
  )
}

export default forwardRef(MultipleAudio)
