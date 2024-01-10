import { IIMAudioMessage } from '@/plugins/im/types'
import dayjs from 'dayjs'
import { useState, useRef } from 'react'
import Icon from '@/components/icon'
import { formatMediaTime, waveHeightArr } from '@/helper/message'
import classNames from 'classnames'
import { TimeAndReadStatus } from './base'
import styles from './index.module.css'
import { AudioProgress } from '../audio-progress'

export function AudioMessage({ message, hasStatus = true }: { message: IIMAudioMessage; hasStatus?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const onPlay = () => {
    setIsPlaying(true)
  }
  const onPause = () => {
    setIsPlaying(false)
  }
  const audioRef = useRef<HTMLAudioElement>(null)
  const play = () => {
    isPlaying ? audioRef.current!.pause() : audioRef.current?.play()
  }
  const [duration, setDuration] = useState(message.audioDuration || 0)
  const onDurationChange = () => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    setDuration(audioRef.current!.duration)
  }
  const [currentTime, setCurrentTime] = useState(0)
  const onCurrentTimeChange = () => {
    setCurrentTime(audioRef.current!.currentTime)
  }

  return (
    <div className={styles['audio-message-wrapper']}>
      <div className="play-icon" onClick={play}>
        <Icon name={!isPlaying ? 'icon_chat_pause' : 'icon_chat_play'} className="text-button_text_01 text-xs" />
      </div>
      <div className="mx-1">{formatMediaTime(currentTime === 0 ? duration : currentTime)}</div>
      <audio
        onDurationChange={onDurationChange}
        onCanPlay={onDurationChange}
        onProgress={onCurrentTimeChange}
        onTimeUpdate={onCurrentTimeChange}
        onPlay={onPlay}
        ref={audioRef}
        onPause={onPause}
        src={message.fileDownloadUrl}
      ></audio>
      <AudioProgress current={currentTime} total={duration} />
      {hasStatus && (
        <div className="time">
          <TimeAndReadStatus message={message} />
        </div>
      )}
    </div>
  )
}
