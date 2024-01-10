import { Modal } from '@nbit/arco'
import Icon from '@/components/icon'
import { t } from '@lingui/macro'
import styles from './index.module.css'
import { formatTime } from '../audio-video'

type Props = {
  audioZoomOutBoxVisible: boolean
  setRoomID: React.Dispatch<React.SetStateAction<string>>
  onClickHandlerAudioZoomOutBox: () => void
  seconds: number
}

function AudioZoomOutBox(props: Props) {
  const { audioZoomOutBoxVisible, setRoomID, onClickHandlerAudioZoomOutBox, seconds } = props

  return (
    <Modal
      className={styles['audio-zoom-out-box']}
      visible={audioZoomOutBoxVisible}
      footer={null}
      mask={false}
      closable={false}
      autoFocus={false}
      focusLock={false}
      afterClose={() => setRoomID('')}
      unmountOnExit
    >
      <div className={styles['audio-zoom-out-box-container']} onClick={onClickHandlerAudioZoomOutBox}>
        <div className="flex flex-col items-center">
          <Icon name="icon_chat_answer" className="text-brand_color text-3xl" />
          <div className="text-brand_color text-xs text-center">
            {seconds ? formatTime(seconds.toString()) : t`features_audio_and_video_audio_index_yul0bowqyu`}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AudioZoomOutBox
