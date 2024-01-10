import { useState, useImperativeHandle, forwardRef, useRef } from 'react'
import { CallAudioInvitationReceivedInfo } from '@/features/audio-and-video/audio-video-type'
import styles from './index.module.css'
import AudioInviteComponent from '../audio-invite-component'
import Audio from '../audio'

type Props = {
  setCallRejectInvite: (item: Record<'userId' | 'userName', string>) => void
  setCallAcceptInvite: (item: () => void) => void
  callAudioInvitationReceivedInfo?: CallAudioInvitationReceivedInfo
}

type AudioRef = {
  openAudioModal: () => void
}

function AudioInvite(props: Props, ref) {
  const [audioInviteVisible, setAudioInviteVisible] = useState<boolean>(false)

  const audioRef = useRef<AudioRef>()

  useImperativeHandle(ref, () => ({
    openAudioInviteModal() {
      setAudioInviteVisible(true)
    },
    closeAudioInviteModal() {
      setAudioInviteVisible(false)
    },
  }))

  const audioInviteClick = () => {
    setAudioInviteVisible(false)
    audioRef.current?.openAudioModal()
  }

  return (
    <div className={styles.audio} onClick={() => audioInviteClick()}>
      <Audio ref={audioRef} />
      <AudioInviteComponent
        setAudioInviteVisible={setAudioInviteVisible}
        audioInviteVisible={audioInviteVisible}
        {...props}
      />
    </div>
  )
}

export default forwardRef(AudioInvite)
