import { IIMVideoMessage } from '@/plugins/im/types'
import { Skeleton, Image } from '@nbit/arco'
import dayjs from 'dayjs'
import { useState, useRef } from 'react'
import Icon from '@/components/icon'
import { formatMediaTime } from '@/helper/message'
import { useMessengerStore } from '@/store/messenger'
import { useImageSize, TimeAndReadStatus } from './base'
import styles from './index.module.css'

export function VideoMessage({
  message,
  hasStatus = true,
  maxWidth,
}: {
  message: IIMVideoMessage
  hasStatus?: boolean
  maxWidth?: number
}) {
  const { imageMaxWidth } = useMessengerStore()
  const { width, height } = useImageSize({
    originWidth: message.videoFirstFrameWidth,
    originHeight: message.videoFirstFrameHeight,
    src: message.videoFirstFrameDownloadUrl,
    imageMaxWidth: maxWidth || Math.min(328, imageMaxWidth),
  })
  const isPaused = true
  const [isPlaying, setIsPlaying] = useState(false)
  const onPlay = () => {
    setIsPlaying(true)
  }
  const onPause = () => {
    setIsPlaying(false)
  }
  const videoRef = useRef<HTMLVideoElement>(null)
  const play = () => {
    videoRef.current?.play()
    setIsPlaying(true)
  }
  const [duration, setDuration] = useState('00:00')
  const onDurationChange = () => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    setDuration(formatMediaTime(videoRef.current!.duration))
  }
  const loader = (
    <Skeleton
      image={{
        style: {
          width,
          height,
        },
      }}
      text={false}
      animation
    />
  )

  return (
    <div className={styles['video-message-wrapper']}>
      {!message.fileDownloadUrl ? (
        <Image
          width={width}
          height={height}
          preview={false}
          className="rounded-lg"
          loader={loader}
          error={loader}
          src={message.videoFirstFrameDownloadUrl}
          alt=""
        />
      ) : (
        <video
          onDurationChange={onDurationChange}
          onCanPlay={onDurationChange}
          controls={isPlaying}
          onPlay={onPlay}
          ref={videoRef}
          onPause={onPause}
          width={width}
          height={height}
          poster={message.videoFirstFrameDownloadUrl}
        >
          <source src={message.fileDownloadUrl}></source>
        </video>
      )}
      {hasStatus && (
        <div className="time">
          <TimeAndReadStatus message={message} />
        </div>
      )}
      <div className="duration">
        <Icon noPointer name="icon_chat_video" className="text-button_text_01 text-sm mr-1" />
        <span className="">{duration}</span>
      </div>
      {!isPlaying && (
        <div className="play-icon" onClick={play}>
          <Icon name={isPaused ? 'icon_chat_pause' : 'icon_chat_play'} className="text-button_text_01 text-xl" />
        </div>
      )}
    </div>
  )
}
