import { IIMImageMessage } from '@/plugins/im/types'
import { Image, Skeleton } from '@nbit/arco'
import { useMessengerStore } from '@/store/messenger'
import { useMemo } from 'react'
import { fastUrlUtils } from '@nbit/utils'
import { useImageSize, TimeAndReadStatus, IMessageProps } from './base'
import styles from './index.module.css'

export function ImageMessage({
  message,
  inView,
  hasStatus = true,
  maxWidth,
}: IMessageProps<IIMImageMessage> & { hasStatus?: boolean; maxWidth?: number }) {
  const { imageMaxWidth } = useMessengerStore()
  const src = useMemo(() => {
    return message.fileLocalPath instanceof File
      ? URL.createObjectURL(message.fileLocalPath)
      : message.thumbnailDownloadUrl || message.fileDownloadUrl
  }, [message.fileLocalPath, message.thumbnailDownloadUrl, message.fileDownloadUrl])

  const { width, height } = useImageSize({
    originWidth: message.originalImageWidth,
    originHeight: message.originalImageHeight,
    imageMaxWidth: maxWidth || Math.min(328, imageMaxWidth),
    src,
    inView,
  })

  const loader = (
    <Skeleton
      image={{
        style: {
          width,
          height,
          margin: 0,
        },
      }}
      text={false}
      animation
    />
  )

  return (
    <div
      className={styles['image-message-wrapper']}
      style={{
        // @ts-ignore 下面的图片高度直接设置初步加载时存在问题，所以这里用 css 变量
        '--image-width': `${width}px`,
        '--image-height': `${height}px`,
      }}
    >
      {inView ? (
        <Image
          width={width}
          height={height}
          className="rounded-lg"
          loader={loader}
          error={!message.fileDownloadUrl ? undefined : loader}
          src={fastUrlUtils.getFastUrl(src)}
          alt=""
        />
      ) : (
        loader
      )}
      {hasStatus && (
        <div className="time">
          <TimeAndReadStatus message={message} />
        </div>
      )}
    </div>
  )
}
