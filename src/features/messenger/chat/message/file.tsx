import { IIMAudioMessage, IIMFileMessage } from '@/plugins/im/types'
import { getExtraDataFromMessage, getFileIcon, getFileSizeHuman, getMessageFileType } from '@/helper/message'
import { ZIMMessageType } from '@/plugins/im/constants'
import { Skeleton, Image, Tooltip } from '@nbit/arco'
import Icon from '@/components/icon'
import classNames from 'classnames'
import { formatNumberDecimalDelZero } from '@/helper/decimal'
import { link } from '@/helper/link'
import { useMessengerStore } from '@/store/messenger'
import { downloadOpenUrl } from '@/helper/common'
import styles from './index.module.css'
import { AudioMessage } from './audio'
import { TimeAndReadStatus, useImageSize } from './base'

export function FileMessage({
  message,
  hideTime,
  className,
}: {
  message: IIMFileMessage
  hideTime?: boolean
  className?: string
}) {
  const { imageMaxWidth } = useMessengerStore()
  const previewUrl = getExtraDataFromMessage(message).previewUrl
  const { width, height } = useImageSize({
    defaultHeight: 100,
    defaultWidth: 328,
    imageMaxWidth: Math.min(328, imageMaxWidth),
    src: previewUrl,
  })
  const fileName = message.fileName || message.fileLocalPath?.name || ''
  const fileSize = Number(formatNumberDecimalDelZero((message.fileSize || message.fileLocalPath?.size || 0) / 1024, 2))
  if (getMessageFileType(fileName, false) === ZIMMessageType.Audio) {
    // return <AudioMessage message={message as any} />
  }
  const openDownload = () => {
    if (!message.fileDownloadUrl) {
      return
    }
    downloadOpenUrl(message.fileDownloadUrl, message.fileName)
  }

  return (
    <div
      className={classNames(
        styles['file-message-wrapper'],
        {
          'with-preview': previewUrl,
        },
        className
      )}
      onClick={openDownload}
    >
      {previewUrl && (
        <Image
          width={width}
          height={height}
          className="rounded-lg"
          loader={
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
          }
          error={null}
          src={previewUrl}
          alt=""
        />
      )}
      <div
        className="icon-wrapper"
        style={{
          width,
        }}
      >
        <Icon className="text-2xl mr-2" name={getFileIcon(fileName)} />
        <div className="flex-1 w-0">
          <div className="filename" title={fileName}>
            {fileName}
          </div>
          <div className="file-size">
            {getFileSizeHuman(fileSize)}.{fileName.split('.').pop()}
          </div>
        </div>
      </div>
      {!hideTime && (
        <div className="time">
          <TimeAndReadStatus message={message} />
        </div>
      )}
    </div>
  )
}
