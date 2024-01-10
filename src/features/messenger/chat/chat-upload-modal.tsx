import Icon from '@/components/icon'
import LazyImage from '@/components/lazy-image'
import { popBoxConfirmWithLoading } from '@/components/pop-box'
import { useEffect, useState } from 'react'
import { getFileIcon, getFileSizeHuman, getMessageFileType } from '@/helper/message'
import { ZIMMessageType } from '@/plugins/im/constants'
import styles from './chat-upload-modal.module.css'

export function uploadImagesPopBox(sendTo: string, files: File[]): Promise<File[]> {
  let finalFiles = [] as File[]
  return new Promise((resolve, reject) => {
    popBoxConfirmWithLoading({
      title: sendTo,
      content: <UploadMediaList files={files} onChange={files => (finalFiles = files)} />,
      onCommit: () => {
        resolve(finalFiles)
      },
    })
  })
}

function UploadMediaList({ files, onChange }: { files: File[]; onChange: (files: File[]) => void }) {
  const [_files, set_files] = useState<typeof files>([])
  const [dataUrls, setdataUrls] = useState<Record<string, { url: string | ArrayBuffer; type: ZIMMessageType }>>({})
  useEffect(() => {
    set_files(files)
    Array.prototype.forEach.call(files, readAndPreview)
  }, [files])

  useEffect(() => {
    onChange(_files)
  }, [_files])

  function readAndPreview(file: File) {
    const messageType = getMessageFileType(file.name)

    if (messageType === ZIMMessageType.File || messageType === ZIMMessageType.Video) {
      setdataUrls(prev => {
        const next = { ...prev }
        next[file.name] = {
          type: ZIMMessageType.File,
          url: getFileIcon(file.name),
        }
        return next
      })
      return
    }

    // TODO: add support for video format

    if (messageType === ZIMMessageType.Image) {
      // get data url from images
      const reader = new FileReader()

      reader.addEventListener(
        'load',
        () => {
          setdataUrls(prev => {
            if (reader.result) {
              prev[file.name] = { type: ZIMMessageType.Image, url: reader.result }
            }
            return { ...prev }
          })
        },
        false
      )

      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={styles['upload-media-list']}>
      {_files?.map((file, idx) => (
        <div key={idx}>
          {dataUrls?.[file.name]?.type === ZIMMessageType.File ? (
            <Icon className="text-3xl mr-4" name={(dataUrls?.[file.name]?.url as string) || ''} />
          ) : (
            <LazyImage className="mr-4" width={30} height={30} src={(dataUrls?.[file.name]?.url as string) || ''} />
          )}
          <div>
            <div>{file.name}</div>
            <div className="text-xs mt-1">{getFileSizeHuman(file.size / 1000)}</div>
          </div>
          <Icon
            className="ml-auto text-xl"
            name={'icon_chat_messages_delete'}
            onClick={() => set_files(files?.filter(f => f.name !== file.name))}
          />
        </div>
      ))}
    </div>
  )
}
