import { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react'
import { useMount, useUnmount } from 'ahooks'
import Video from '@/features/audio-and-video/video'
import VideoInvite from '@/features/audio-and-video/video-invite'
import Audio from '@/features/audio-and-video/audio'
import MultipleAudio from '@/features/audio-and-video/multiple-audio'
import MultipleVideo from '@/features/audio-and-video/multiple-video'
import { useCallInvitation } from '@/features/audio-and-video/audio-video'
import {
  VideoCall,
  GroupCall,
  AudioRef,
  VideoRef,
  VideoInviteRef,
  MultipleAudioRef,
  MultipleVideoRef,
  InvitingAndDecliningInfo,
  CallAudioInvitationReceivedInfo,
} from '@/features/audio-and-video/audio-video-type'
import { IIMConversation } from '@/plugins/im/types'
import { useUserStore } from '@/store/user'
import { useImStore } from '@/store/im'

type Props = {
  currentConversation?: IIMConversation
  vidoeConversation?: IIMConversation
  audioConversation?: IIMConversation
  multipleAudioConversation?: IIMConversation
  multipleVideoConversation?: IIMConversation
  setConversation?: React.Dispatch<React.SetStateAction<IIMConversation | undefined>>
  setVidoeConversation?: React.Dispatch<React.SetStateAction<IIMConversation | undefined>>
  setMultiplePeopleAudio?: React.Dispatch<React.SetStateAction<IIMConversation | undefined>>
  setMultiplePeopleVideo?: React.Dispatch<React.SetStateAction<IIMConversation | undefined>>
}

function AudioVideoModal(props: Props, ref) {
  const {
    multipleAudioConversation,
    currentConversation,
    audioConversation,
    vidoeConversation,
    setVidoeConversation,
    setConversation,
    setMultiplePeopleAudio,
    multipleVideoConversation,
    setMultiplePeopleVideo,
  } = props

  const audioRef = useRef<AudioRef>(null)

  const { setAudioVideoHooksObj } = useImStore()

  const multipleAudioRef = useRef<MultipleAudioRef>(null)

  const multipleVideoRef = useRef<MultipleVideoRef>(null)

  const { userInfo } = useUserStore()

  const videoRef = useRef<VideoRef>(null)

  const videoInviteRef = useRef<VideoInviteRef>(null)

  const [hangupText, setHangupText] = useState<string>('')

  const [callAudioInvitationReceivedInfo, setCallInvitationReceivedInfo] = useState<CallAudioInvitationReceivedInfo>()

  const [invitingAndDecliningInfo, setInvitingAndDecliningInfo] = useState<InvitingAndDecliningInfo>({
    inviteId: '',
    rejectInvitingId: [],
  })

  const {
    setCallInviteChange,
    setCallAcceptInvite,
    setCallRejectInvite,
    setCancelCallInviteChange,
    whetherVoiceAndVideoIngRef,
    sameLoginVerificationRef,
    setCallEnd,
  } = useCallInvitation(
    audioRef,
    setCallInvitationReceivedInfo,
    videoRef,
    videoInviteRef,
    setHangupText,
    multipleAudioRef,
    setInvitingAndDecliningInfo,
    invitingAndDecliningInfo,
    multipleVideoRef
  )

  const audioAndVideoInviteParams = {
    setCallAcceptInvite,
    setCallRejectInvite,
    callAudioInvitationReceivedInfo,
  }

  const audioAndVideoParams = {
    setCallInviteChange,
    setCancelCallInviteChange,
  }

  const getCallInvitationReceivedInfo = (videoSelect, groupCall) => {
    return callAudioInvitationReceivedInfo?.videoCall === videoSelect &&
      callAudioInvitationReceivedInfo?.groupCall === groupCall
      ? callAudioInvitationReceivedInfo
      : undefined
  }

  useImperativeHandle(ref, () => ({
    judgewhetherVoiceAndVideoIngRef() {
      return whetherVoiceAndVideoIngRef.current
    },
    sameOpenLoginVerificationRef() {
      sameLoginVerificationRef.current = true
    },
  }))

  useMount(() => {
    window.onbeforeunload = function () {
      setCancelCallInviteChange(currentConversation?.conversationID)
      setCallRejectInvite && setCallRejectInvite({ userId: userInfo?.uid, userName: userInfo?.nickName })
    }
    setAudioVideoHooksObj({ multipleAudioRef, multipleVideoRef })
  })

  useUnmount(() => {
    window.onbeforeunload = null
  })

  return (
    <>
      <Audio
        ref={audioRef}
        hangupText={hangupText}
        setHangupText={setHangupText}
        currentConversation={audioConversation}
        setConversation={setConversation}
        callInvitationReceivedInfo={getCallInvitationReceivedInfo(VideoCall.voicecall, GroupCall.singlePersonCall)}
        sameLoginVerificationRef={sameLoginVerificationRef}
        {...audioAndVideoParams}
        {...audioAndVideoInviteParams}
      />
      {/* <AudioInvite ref={audioInviteRef} {...audioAndVideoInviteParams} /> */}
      <MultipleAudio
        ref={multipleAudioRef}
        hangupText={hangupText}
        setHangupText={setHangupText}
        currentConversation={multipleAudioConversation}
        setConversation={setMultiplePeopleAudio}
        callInvitationReceivedInfo={getCallInvitationReceivedInfo(VideoCall.voicecall, GroupCall.groupChatCall)}
        invitingAndDecliningInfo={invitingAndDecliningInfo}
        sameLoginVerificationRef={sameLoginVerificationRef}
        setCallEnd={setCallEnd}
        whetherVoiceAndVideoIngRef={whetherVoiceAndVideoIngRef}
        {...audioAndVideoParams}
        {...audioAndVideoInviteParams}
      />
      <Video
        ref={videoRef}
        hangupText={hangupText}
        setHangupText={setHangupText}
        currentConversation={vidoeConversation}
        setConversation={setVidoeConversation}
        callInvitationReceivedInfo={getCallInvitationReceivedInfo(VideoCall.videocall, GroupCall.singlePersonCall)}
        sameLoginVerificationRef={sameLoginVerificationRef}
        {...audioAndVideoParams}
      />

      <MultipleVideo
        ref={multipleVideoRef}
        hangupText={hangupText}
        setHangupText={setHangupText}
        currentConversation={multipleVideoConversation}
        setConversation={setMultiplePeopleVideo}
        callInvitationReceivedInfo={getCallInvitationReceivedInfo(VideoCall.videocall, GroupCall.groupChatCall)}
        invitingAndDecliningInfo={invitingAndDecliningInfo}
        sameLoginVerificationRef={sameLoginVerificationRef}
        setCallEnd={setCallEnd}
        {...audioAndVideoParams}
      />
      <VideoInvite
        ref={videoInviteRef}
        {...audioAndVideoInviteParams}
        sameLoginVerificationRef={sameLoginVerificationRef}
        whetherVoiceAndVideoIngRef={whetherVoiceAndVideoIngRef}
      />
    </>
  )
}

export default forwardRef(AudioVideoModal)
