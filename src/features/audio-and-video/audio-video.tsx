import interact from 'interactjs'
import Icon from '@/components/icon'
import { useEffect, useRef, useState } from 'react'
import { getImAudioAndVideoSdkAppId, getImInstance } from '@/plugins/im/core'
import { Message } from '@nbit/arco'
import { t } from '@lingui/macro'
import type ZIM from 'zego-zim-web'
import { ZegoExpressEngine } from 'zego-express-engine-webrtc'
import { useMount, useUpdateEffect } from 'ahooks'
import dayjs from 'dayjs'
import { baseUserStore, useUserStore } from '@/store/user'
import { updateGroupMembers } from '@/helper/address-book'
import { useCommonStore } from '@/store/common'
import { ImChatGroupMemberListData } from '@/typings/apis/group'
import { useAddressBookStore } from '@/store/address-book'
import { ZIMMessagePriority, ZIMMessageType } from '@/plugins/im/constants'
import { appendExtraData } from '@/helper/message'
import {
  VideoCall,
  GroupCall,
  RejectionType,
  DetectionPermissions,
  ZIMCallUserState,
  SoundSwitch,
  AudioRef,
  MultipleAudioRef,
  MultipleVideoRef,
  VideoRef,
  VideoInviteRef,
  ResizeAndDragMoveProps,
  CallAudioInvitationReceivedInfo,
  InvitingAndDecliningInfo,
  DragAudioHandleObjectProps,
} from './audio-video-type'
// import { useImStore } from '@/store/im'
// import { ZIMCallUserState } from 'zego-zim-web'

const formatTime = time => {
  const formattedTime = dayjs().startOf('day').add(time, 'second').format('mm:ss')
  return formattedTime
}

const dragMoveListener = event => {
  const target = event.target
  const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
  target.style.transform = `translate(${x}px, ${y}px)`
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

const useResizeAndDragMove = (resizeAndDragMoveProps: ResizeAndDragMoveProps) => {
  const {
    interactDom,
    outer = 'html',
    restriction = 'html',
    whetherSizeOfTheDom,
    restrictSizeMinWidthAndHeight,
    restrictSizeMaxWidthAndHeight,
    whetherDragMove = true,
    setDomMoveNum,
    domMoveNum,
  } = resizeAndDragMoveProps

  const [domMoveNumDetail, setDomMoveNumDetail] = useState<number>(0)

  const initialWidthRef = useRef<number>(0)

  useUpdateEffect(() => {
    initialWidthRef.current = 0
  }, [domMoveNum?.width])

  useUpdateEffect(() => {
    setDomMoveNum &&
      setDomMoveNum({
        width: (domMoveNum?.width as number) + domMoveNumDetail * 0.27,
        height: (domMoveNum?.width as number) + domMoveNumDetail * 0.27,
      })
  }, [domMoveNumDetail])

  useEffect(() => {
    const interactInstance = interact(interactDom)
    if (whetherSizeOfTheDom) {
      interactInstance.resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        listeners: {
          move(event) {
            const target = event.target
            let x = parseFloat(target.getAttribute('data-x')) || 0
            let y = parseFloat(target.getAttribute('data-y')) || 0
            const newWidth = event.rect.width
            const newHeight = event.rect.height

            target.style.width = `${newWidth}px`
            target.style.height = `${newHeight}px`

            x += event.deltaRect.left
            y += event.deltaRect.top

            target.style.transform = `translate(${x}px,${y}px)`

            target.setAttribute('data-x', x)
            target.setAttribute('data-y', y)
            // 获取宽高的变化
            // const widthChange = Math.abs(event.deltaRect.width)
            // const heightChange = Math.abs(event.deltaRect.height)
            // 比较宽度和高度的变化
            // if (widthChange > heightChange) {
            // } else if (widthChange < heightChange) {
            //   setDomMoveNumDetail(newWidth)
            // } else {
            //   setDomMoveNumDetail(newWidth)
            // }

            initialWidthRef.current += event.deltaRect.width
            setDomMoveNumDetail(initialWidthRef.current)
          },
        },
        modifiers: [
          interact.modifiers.restrictEdges({
            outer,
          }),
          interact.modifiers.restrictSize({
            min: restrictSizeMinWidthAndHeight,
            max: restrictSizeMaxWidthAndHeight,
          }),
        ],
      })
    } else {
      interactInstance.unset()
    }

    if (whetherDragMove) {
      // 添加拖拽功能
      interactInstance.draggable({
        listeners: { move: dragMoveListener },
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction,
            endOnly: true,
          }),
        ],
      })
    } else {
      interactInstance.unset()
    }
  }, [whetherDragMove, whetherSizeOfTheDom, restrictSizeMinWidthAndHeight])
}

const getDragAudioAndVideoHandleObject = (props: DragAudioHandleObjectProps) => {
  const {
    answeronClick,
    hanguponClick,
    microPhoneturnedOffClick,
    microPhoneturnedOnClick,
    speakerTurnedOnClick,
    speakerTurnedOffClick,
    cameraTurnedOnClick,
    cameraTurnedOffClick,
    onMouseDown,
    iconWidthAndHeight = 'text-2xl',
    iconContainerWidth = 'h-[56px]',
    iconContainerHeight = 'w-[56px]',
  } = props || {}

  const dragAudioHandleContainer = 'w-[60px] flex items-center flex-col'

  const dragAudioHandle = `flex justify-center rounded-full ${iconContainerWidth} ${iconContainerHeight} cursor-pointer`

  const dragAudioHandleText = 'flex justify-center items-center text-xs text-button_text_01 mt-2 text-center'

  const getDragAudioHandle = (
    backgroundColor: string,
    iconName: string,
    text: string,
    onClickHandler?: () => void,
    iconcolor = 'text-button_text_01'
  ) => (
    <div className={`${dragAudioHandleContainer}`} onMouseDown={onMouseDown}>
      <div className={`${dragAudioHandle} ${backgroundColor}`} onClick={() => onClickHandler?.()}>
        <Icon name={iconName} className={`${iconcolor} ${iconWidthAndHeight}`} />
      </div>
      <div className={dragAudioHandleText}>{text}</div>
    </div>
  )

  return {
    // 接听
    answer: {
      dom: getDragAudioHandle(
        'bg-avatar_bg_04',
        'icon_chat_answer',
        t`features_audio_and_video_audio_video_relp1fq9o3`,
        answeronClick
      ),
    },
    // 挂断
    hangup: {
      dom: getDragAudioHandle(
        'bg-secondary_color',
        'icon_chat_hang_up',
        t`features_audio_and_video_audio_video_qbnnjzk0dk`,
        hanguponClick
      ),
    },
    // 麦克风已关
    microPhoneturnedOff: {
      dom: getDragAudioHandle(
        'bg-call_bg_color_03',
        'icon_chat_microphone',
        t`features_audio_and_video_audio_video_u12roj52vu`,
        microPhoneturnedOffClick
      ),
    },
    // 麦克风已开
    microPhoneturnedOn: {
      dom: getDragAudioHandle(
        'bg-call_bg_color_04',
        'icon_chat_microphone',
        t`features_audio_and_video_audio_video_fizqdnhjdt`,
        microPhoneturnedOnClick,
        'text-call_bg_color_01'
      ),
    },
    // 扬声器已开
    speakerTurnedOn: {
      dom: getDragAudioHandle(
        'bg-call_bg_color_04',
        'icon_chat_speaker',
        t`features_audio_and_video_audio_video_vgtgnv4ujj`,
        speakerTurnedOnClick,
        'text-call_bg_color_01'
      ),
    },
    // 扬声器已关
    speakerTurnedOff: {
      dom: getDragAudioHandle(
        'bg-call_bg_color_03',
        'icon_chat_speaker',
        t`features_audio_and_video_audio_video_llya442vnx`,
        speakerTurnedOffClick
      ),
    },
    // 摄像头已开
    cameraTurnedOn: {
      dom: getDragAudioHandle(
        'bg-call_bg_color_04',
        'icon_chat_camera',
        t`features_audio_and_video_audio_video_fn7fjjygj6`,
        cameraTurnedOnClick,
        'text-call_bg_color_01'
      ),
    },
    // 摄像头已关
    cameraTurnedOff: {
      dom: getDragAudioHandle(
        'bg-call_bg_color_03',
        'icon_chat_camera',
        t`features_audio_and_video_audio_video_owjgrlcznf`,
        cameraTurnedOffClick
      ),
    },
  }
}

const getImZg = () => {
  const zegoSdkAppId = getImAudioAndVideoSdkAppId()
  const zg = new ZegoExpressEngine(zegoSdkAppId, [
    `wss://webliveroom${zegoSdkAppId}-api.coolzcloud.com/ws`,
    `wss://webliveroom${zegoSdkAppId}-api-bak.coolzcloud.com/ws`,
  ])
  return zg
}

const getZegoStream = async detectionPermissions => {
  const zg = getImZg()
  const stream = await zg.createZegoStream({
    camera: {
      ...detectionPermissions,
    },
  })
  zg.destroyStream(stream)
  // 获取全媒体设备接口，需要提前申请麦克风允许权限
  const mediaDevices = await zg.enumDevices()
  const { microphones } = mediaDevices
  // 获取第一个麦克风设备的 deviceID
  const { deviceID } = microphones[0]
  // 创建采集的麦克风的媒体流
  const { zegoStream } = await zg.createZegoStream({
    camera: {
      ...detectionPermissions,
      audio: {
        input: deviceID,
      },
    },
  })
  return zegoStream.active
}

/** 获取开启麦克风权限 */
const getDetectionPermissions = async (detectionPermissions: DetectionPermissions) => {
  const zegoStreamResult = await getZegoStream(detectionPermissions)
  !zegoStreamResult && Message.error(t`features_audio_and_video_audio_video_oo6kfr0xy5`)
  return zegoStreamResult
}

const sendMessageCommandList = (currentConversation, currentconversationMember) => {
  getImInstance()?.sendMessage(
    {
      message: new Uint8Array([0x00, 0x02]),
      type: ZIMMessageType.Command,
      extendedData: appendExtraData({}),
    },
    currentConversation?.conversationID || currentconversationMember?.conversationID,
    currentConversation?.type || currentconversationMember?.type,
    {
      priority: ZIMMessagePriority.Low,
    }
  )
}

const useCallInvitation = (
  audioRef?: React.RefObject<AudioRef | null>,
  setCallInvitationReceivedInfo?: React.Dispatch<React.SetStateAction<CallAudioInvitationReceivedInfo | undefined>>,
  videoRef?: React.RefObject<VideoRef | null>,
  videoInviteRef?: React.RefObject<VideoInviteRef | null>,
  setHangupText?: React.Dispatch<React.SetStateAction<string>>,
  multipleAudioRef?: React.RefObject<MultipleAudioRef | null>,
  setInvitingAndDecliningInfo?: React.Dispatch<React.SetStateAction<InvitingAndDecliningInfo>>,
  invitingAndDecliningInfo?: InvitingAndDecliningInfo,
  multipleVideoRef?: React.RefObject<MultipleVideoRef | null>
) => {
  const zimRef = useRef<ZIM>()

  const invitaCallID = useRef<string>()

  const repeatInvitaCallIdList = useRef<string[]>([])

  const invitaID = useRef<string>()

  const rejectInvitingId = useRef<string[]>([])

  const sameLoginVerificationRef = useRef<boolean>(false)

  const whetherVoiceAndVideoIngRef = useRef<boolean>(false)

  const { userInfo: userInfoDetail } = useUserStore()

  const showtVideoCallAndGroupCall = useRef<Record<'videoCall' | 'groupCall', number>>({
    videoCall: 0,
    groupCall: 0,
  })

  const refHandleObj = () => {
    return {
      [VideoCall.videocall]: {
        [GroupCall.singlePersonCall]: {
          call: {
            on: videoRef?.current?.openVideoModal,
            off: videoRef?.current?.closeVideoModal,
          },
          inviteCall: {
            on: videoInviteRef?.current?.openVideoInviteModal,
            off: videoInviteRef?.current?.closeVideoInviteModal,
          },
        },
        [GroupCall.groupChatCall]: {
          inviteCall: {
            on: videoInviteRef?.current?.openVideoInviteModal,
            off: videoInviteRef?.current?.closeVideoInviteModal,
          },
          call: {
            on: multipleVideoRef?.current?.openMultipleVideoModal,
            off: multipleVideoRef?.current?.closeMultipleVideoModal,
          },
        },
      },
      [VideoCall.voicecall]: {
        [GroupCall.singlePersonCall]: {
          call: {
            on: audioRef?.current?.openAudioModal,
            off: audioRef?.current?.closeAudioModal,
          },
          inviteCall: {
            on: audioRef?.current?.openAudioInviteModal,
            off: audioRef?.current?.closeAudioInviteModal,
          },
        },

        [GroupCall.groupChatCall]: {
          inviteCall: {
            on: multipleAudioRef?.current?.openMultipleAudioInviteModal,
            off: multipleAudioRef?.current?.closeMultipleAudioInviteModal,
          },
          call: {
            on: multipleAudioRef?.current?.openMultipleAudioModal,
            off: multipleAudioRef?.current?.closeMultipleAudioModal,
          },
        },
      },
    }
  }

  const setInvitingAndDecliningInitial = () => {
    setInvitingAndDecliningInfo &&
      setInvitingAndDecliningInfo({
        inviteId: '',
        rejectInvitingId: [],
      })
    rejectInvitingId.current = []
    invitaID.current = ''
  }

  /** 拒绝呼叫邀请 */
  const setCallRejectInvite = (rejectObj, whetherBusy?: boolean, callId?: string) => {
    const config = {
      extendedData: JSON.stringify({
        callId: callId || invitaCallID.current,
        rejectionType: whetherBusy ? RejectionType.Busy : RejectionType.Hangup,
        ...rejectObj,
      }),
    }
    const { groupCall } = showtVideoCallAndGroupCall.current
    groupCall === GroupCall.groupChatCall && setInvitingAndDecliningInitial()
    zimRef.current
      ?.callReject(callId || (invitaCallID.current as string), config)
      .then(res => {
        // 操作成功
      })
      .catch(err => {
        // 操作失败
      })
  }

  const setCallEnd = (currentConversation, currentconversationMember) => {
    const config = { extendedData: JSON.stringify({ currentConversation, currentconversationMember }) }
    repeatInvitaCallIdList.current?.forEach(itemCallID => {
      zimRef.current
        ?.callEnd(itemCallID as string, config)
        .then(res => {
          console.log(res, 'resresresresres')

          // 操作成功
        })
        .catch(err => {
          // 操作失败
        })
    })
    repeatInvitaCallIdList.current = []
    // 结束呼叫
  }

  /** 接受呼叫邀请 */
  const setCallAcceptInvite = (callback, info) => {
    const config = {
      extendedData: JSON.stringify({
        groupCall: info?.groupCall,
        videoCall: info?.videoCall,
        sender: info?.sender,
      }),
    }
    invitaID.current = info?.inviterID
    setInvitingAndDecliningInfo &&
      setInvitingAndDecliningInfo({
        ...invitingAndDecliningInfo,
        inviteId: info?.inviterID,
      })

    zimRef.current
      ?.callAccept(invitaCallID.current as string, config)
      .then(res => {
        // 操作成功
        callback()
      })
      .catch(err => {
        // 操作失败
      })
  }

  /** 向在线用户发送呼叫邀请后取消呼叫邀请 */
  const setCancelCallInviteChange = inviteesArrayId => {
    const invitees = Array.isArray(inviteesArrayId) ? inviteesArrayId : [inviteesArrayId] // 被邀请人 ID 列表
    const config = { extendedData: 'your call invite extendedData' }
    whetherVoiceAndVideoIngRef.current = false
    console.log(
      whetherVoiceAndVideoIngRef.current,
      'whetherVoiceAndVideoIngRef.currentwhetherVoiceAndVideoIngRef.current'
    )
    repeatInvitaCallIdList.current = []
    const { groupCall } = showtVideoCallAndGroupCall.current
    groupCall === GroupCall.groupChatCall && setInvitingAndDecliningInitial()
    zimRef.current
      ?.callCancel(invitees, invitaCallID.current as string, config)
      .then(res => {
        console.log(res, 'resresresresresres')

        // 操作成功
      })
      .catch(err => {
        // 操作失败
      })
  }

  /** 向在线用户发送呼叫邀请 */
  const setCallInviteChange = (inviteesArrayId, extendedDataDetail) => {
    if (whetherVoiceAndVideoIngRef.current && extendedDataDetail?.groupCall === GroupCall.singlePersonCall) {
      Message.error(t`features_audio_and_video_audio_video_xed7qjh_fs`)
      return
    }
    console.log(extendedDataDetail, 'extendedDataDetailextendedDataDetailextendedDataDetailextendedDataDetail')

    const videoCallAndGroupCallRequest = {
      videoCall: extendedDataDetail?.videoCall,
      groupCall: extendedDataDetail?.groupCall,
      ...extendedDataDetail,
    }

    showtVideoCallAndGroupCall.current = videoCallAndGroupCallRequest
    invitaID.current = extendedDataDetail?.inviterID
    setInvitingAndDecliningInfo &&
      setInvitingAndDecliningInfo({
        ...invitingAndDecliningInfo,
        inviteId: extendedDataDetail?.inviterID,
      })

    const invitees = Array.isArray(inviteesArrayId) ? inviteesArrayId : [inviteesArrayId] // 被邀请人 ID 列表
    const config = {
      timeout: 90, // 邀请超时时间，单位为秒，范围 1-600
      extendedData: JSON.stringify({ ...extendedDataDetail }),
      mode: 1,
    }

    console.log(invitees, whetherVoiceAndVideoIngRef.current, 'inviteesinviteesinviteesinvitees')

    zimRef.current
      ?.callInvite(invitees, config)
      .then(res => {
        const { callID } = res
        if (!whetherVoiceAndVideoIngRef.current) {
          refHandleObj()?.[extendedDataDetail?.videoCall]?.[extendedDataDetail?.groupCall]?.call?.on?.()
          invitaCallID.current = callID
          if (!repeatInvitaCallIdList.current?.includes(callID)) {
            repeatInvitaCallIdList.current = [...repeatInvitaCallIdList.current, callID]
          }
        }

        whetherVoiceAndVideoIngRef.current = true
        // 操作成功
        // 此处的 callID 是用户发起呼叫后，SDK 内部生成的 ID，用于唯一标识一次呼叫邀请；之后发起人取消呼叫、被邀请人接受/拒绝呼叫，都会使用此 callID
      })
      .catch(err => {
        whetherVoiceAndVideoIngRef.current = false
        // 操作失败
      })
  }

  const setOffInviteCallAndCall = (videoCall, groupCall) => {
    refHandleObj()?.[videoCall]?.[groupCall]?.inviteCall?.off?.()
    refHandleObj()?.[videoCall]?.[groupCall]?.call?.off?.()
  }

  const rejectInvitingIdChange = userId => {
    rejectInvitingId.current = [...rejectInvitingId.current, userId]
    setInvitingAndDecliningInfo &&
      setInvitingAndDecliningInfo({
        inviteId: invitaID.current,
        rejectInvitingId: [...rejectInvitingId.current],
      })
  }

  const setSameLoginTips = (videoCall, groupCall, messege) => {
    refHandleObj()?.[videoCall]?.[groupCall]?.inviteCall?.off?.()
    Message.error(messege)
  }

  useMount(() => {
    zimRef.current = getImInstance()
    /** 被邀请者收到邀请后的回调通知 */
    zimRef.current?.on('callInvitationReceived', (zim, { callID, inviter, timeout, extendedData }) => {
      const userInfo = JSON.parse(extendedData) || {}

      const videoCallAndGroupCallRequest = {
        videoCall: userInfo?.videoCall,
        groupCall: userInfo?.groupCall,
        ...userInfo,
      }

      console.log(whetherVoiceAndVideoIngRef.current, callID, 'whetherVoiceAndVideoIngRef.current')

      if (whetherVoiceAndVideoIngRef.current) {
        setCallRejectInvite(
          {
            userId: userInfoDetail?.uid,
            userName: userInfoDetail?.nickName,
            invitaId: userInfo?.inviterID,
            sender: userInfo?.sender,
          },
          true,
          callID
        )
      } else {
        showtVideoCallAndGroupCall.current = videoCallAndGroupCallRequest
        invitaCallID.current = callID
        whetherVoiceAndVideoIngRef.current = true
        setCallInvitationReceivedInfo && setCallInvitationReceivedInfo(userInfo)
        refHandleObj()?.[userInfo?.videoCall]?.[userInfo?.groupCall]?.inviteCall?.on?.()
      }
    })

    // 被邀请者收到取消邀请后的回调通知
    zimRef.current?.on('callInvitationCancelled', (zim, { callID, inviter, extendedData }) => {
      const { videoCall, groupCall } = showtVideoCallAndGroupCall.current
      refHandleObj()?.[videoCall]?.[groupCall]?.inviteCall?.off?.()
      groupCall === GroupCall.groupChatCall && setInvitingAndDecliningInitial()
      whetherVoiceAndVideoIngRef.current = false
    })

    // 邀请者接受邀请后的回调通知
    zimRef.current?.on('callUserStateChanged', (zim, info) => {
      // invitaCallID.current = info.callID
      info.callUserList.forEach(userInfo => {
        // console.log(userInfo, userInfoDetail?.uid, 'userInfouserInfouserInfo')

        // 状态变化用户的 userID、最新用户状态、透传字段（与用户该调用接受、拒绝、退出呼叫时携带的 extended data 一致）
        const { state, extendedData, userID } = userInfo
        console.log(extendedData, userInfo, invitaCallID.current, 'extendedDataextendedDataextendedDataextendedData')

        // state = 1 表示接受，具体可以参考枚举 ZIMCallUserState
        if ((state as number) === ZIMCallUserState.accept && String(userInfoDetail?.uid) === userID) {
          const { groupCall, videoCall, sender } = (extendedData && JSON.parse(extendedData)) || {}

          console.log(
            sameLoginVerificationRef.current,
            String(userInfoDetail?.uid),
            userID,
            !sameLoginVerificationRef.current && String(userInfoDetail?.uid) === userID && sender !== 'Web',
            'sameLoginVerificationRefsameLoginVerificationRef'
          )

          if (!sameLoginVerificationRef.current && String(userInfoDetail?.uid) === userID && sender !== 'Web') {
            const { videoCall: videoCallSame, groupCall: groupCallSame } = showtVideoCallAndGroupCall.current
            setSameLoginTips(videoCallSame, groupCallSame, t`features_audio_and_video_audio_video_8uvfyn6cu0`)
            refHandleObj()?.[videoCallSame]?.[groupCallSame]?.inviteCall?.off?.()
            whetherVoiceAndVideoIngRef.current = false
          } else {
            console.log(refHandleObj()?.[videoCall]?.[groupCall], 'refHandleObj()?.[videoCall]?.[groupCall]')

            refHandleObj()?.[videoCall]?.[groupCall]?.call?.on?.()
            whetherVoiceAndVideoIngRef.current = true
          }
          sameLoginVerificationRef.current = false
        }
        const { videoCall, groupCall } = showtVideoCallAndGroupCall.current

        if ((state as number) === ZIMCallUserState.reject) {
          const { sender } = (extendedData && JSON.parse(extendedData)) || {}
          if (!sameLoginVerificationRef.current && String(userInfoDetail?.uid) === userID && sender !== 'Web') {
            setSameLoginTips(videoCall, groupCall, t`features_audio_and_video_audio_video_gutzczvrkr`)
            setCallInvitationReceivedInfo && setCallInvitationReceivedInfo(undefined)
            whetherVoiceAndVideoIngRef.current = false
            sameLoginVerificationRef.current = false
            return
          }
          sameLoginVerificationRef.current = false
        }
        console.log(state, groupCall, 'extendedData && JSON.parse(extendedData)123')

        if ((state as number) === ZIMCallUserState.reject && groupCall === GroupCall.singlePersonCall) {
          const { rejectionType, invitaId } = (extendedData && JSON.parse(extendedData)) || {}
          console.log(extendedData && JSON.parse(extendedData), 'extendedData && JSON.parse(extendedData)')

          if (rejectionType === RejectionType.Hangup) {
            setHangupText && setHangupText(t`features_audio_and_video_audio_video_tfhutvuk0t`)
            setTimeout(() => {
              setCallInvitationReceivedInfo && setCallInvitationReceivedInfo(undefined)
              whetherVoiceAndVideoIngRef.current = false
              refHandleObj()?.[videoCall]?.[groupCall]?.call?.off?.()
            }, 1000)
          } else {
            if (String(userInfoDetail?.uid) === String(invitaId)) {
              setTimeout(() => {
                whetherVoiceAndVideoIngRef.current = false
                refHandleObj()?.[videoCall]?.[groupCall]?.call?.off?.()
              }, 500)
              Message.error(t`features_audio_and_video_audio_video_fqcf8p0xuq`)
            }
          }
        }

        if ((state as number) === ZIMCallUserState.reject && groupCall === GroupCall.groupChatCall) {
          const { userId, invitaId } = (extendedData && JSON.parse(extendedData)) || {}
          console.log(extendedData && JSON.parse(extendedData), 'extendedData && JSON.parse(extendedData)')

          rejectInvitingIdChange(userId)
          if (String(userInfoDetail?.uid) === invitaId) {
            repeatInvitaCallIdList.current = []
          }
          // if (String(userInfoDetail?.uid) === invitaId) {
          //   setHangupText && setHangupText(t`features_audio_and_video_audio_video_tfhutvuk0t`)
          //   setTimeout(() => {
          //     setCallInvitationReceivedInfo(undefined)
          //     whetherVoiceAndVideoIngRef.current = false
          //     refHandleObj()?.[videoCall]?.[groupCall]?.call?.off?.()
          //   }, 1000)
          //   setInvitingAndDecliningInitial()
          //   whetherVoiceAndVideoIngRef.current = false
          // }
        }

        // state = 6 表示超时，具体可以参考枚举 ZIMCallUserState
        if ((state as number) === ZIMCallUserState.timeout && String(userInfoDetail?.uid) === userID) {
          const { userId } = (extendedData && JSON.parse(extendedData)) || {}
          rejectInvitingIdChange(userId)
          setOffInviteCallAndCall(videoCall, groupCall)
          whetherVoiceAndVideoIngRef.current = false
        }

        if ((state as number) === ZIMCallUserState.quit && String(userInfoDetail?.uid) === userID) {
          setOffInviteCallAndCall(videoCall, groupCall)
          whetherVoiceAndVideoIngRef.current = false
        }
      })
    })

    // 呼叫成员收到的回调通知
    zimRef.current?.on('callInvitationEnded', (zim, info) => {
      const { videoCall, groupCall } = showtVideoCallAndGroupCall.current
      setOffInviteCallAndCall(videoCall, groupCall)
      whetherVoiceAndVideoIngRef.current = false
      setCallInvitationReceivedInfo && setCallInvitationReceivedInfo(undefined)
    })

    // 被邀请者响应超时后，“被邀请者”收到的回调通知，超时时间单位：秒
    zimRef.current?.on('callInvitationTimeout', (zim, res) => {
      const { videoCall, groupCall } = showtVideoCallAndGroupCall.current
      setOffInviteCallAndCall(videoCall, groupCall)
      whetherVoiceAndVideoIngRef.current = false
      setCallInvitationReceivedInfo && setCallInvitationReceivedInfo(undefined)
    })
  })

  return {
    setCallInviteChange,
    setCancelCallInviteChange,
    setCallAcceptInvite,
    setCallRejectInvite,
    setCallEnd,
    whetherVoiceAndVideoIngRef,
    sameLoginVerificationRef,
  }
}

/** 开启铃声的自定义 hooks */
const useGetGlobalVoiceAndVideo = () => {
  const { globalVoiceAndVideoRef } = useCommonStore()

  const playVoiceAndVideo = () => {
    // const { imConfig } = baseUserStore.getState()
    // if (globalVoiceAndVideoRef?.current && SoundSwitch.open === imConfig?.soundSwitch) {
    //   globalVoiceAndVideoRef.current.currentTime = 0
    //   globalVoiceAndVideoRef?.current?.play()
    // }
  }

  const stopVoiceAndVideo = () => {
    globalVoiceAndVideoRef?.current?.pause()
    globalVoiceAndVideoRef?.current?.load()
  }

  return { playVoiceAndVideo, stopVoiceAndVideo }
}

/** 获取群组列表自定义 hooks */
const useGroupMembersList = () => {
  const { groupMembers } = useAddressBookStore()

  // const { currentConversation } = useImStore()
  const [currentconversation, setCurrentConversation] = useState<any>()

  const [groupMembersList, setGroupMembersList] = useState<ImChatGroupMemberListData[]>([])

  useEffect(() => {
    currentconversation?.conversationID && updateGroupMembers(currentconversation?.conversationID)
  }, [currentconversation?.conversationID])

  useEffect(() => {
    if (Object.keys(groupMembers)?.length > 0 && currentconversation?.conversationID) {
      setGroupMembersList(groupMembers?.[currentconversation?.conversationID])
    }
  }, [groupMembers])

  return { groupMembersList, setCurrentConversation, currentconversation }
}

export {
  dragMoveListener,
  useResizeAndDragMove,
  getDragAudioAndVideoHandleObject,
  getDetectionPermissions,
  useCallInvitation,
  getImZg,
  formatTime,
  useGetGlobalVoiceAndVideo,
  getZegoStream,
  useGroupMembersList,
  sendMessageCommandList,
}
