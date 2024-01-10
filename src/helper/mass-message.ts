import { postV1ImChatImSendMassInfoCreateCircleApiRequest } from '@/apis/mass-send'
import { AwsS3FolderModuleName, AwsS3FolderModuleUseCaseName } from '@/plugins/aws-s3/constants'
import { awsS3UploadFile } from '@/plugins/aws-s3/utils'
import { ZIMMessageType } from '@/plugins/im/constants'
import { sendContentTypeEnum } from '@/constants/mass-send'
import { MarkcoinResponse } from '@/plugins/request'
import { YapiPostV1ImChatImSendMassInfoCreateCircleApiResponse } from '@/typings/yapi/ImChatImSendMassInfoCreateCircleV1PostApi'
import { getMessageFileType } from './message'

async function getVideoThumbnail(src: string): Promise<{
  width: number
  height: number
  /** 第一帧 */
  url?: string
  duration: number
}> {
  const defaultSize = {
    width: 0,
    height: 0,
  }
  return new Promise(resolve => {
    const div = document.createElement('div')
    // 手动设置不生效
    div.innerHTML = `<video autoplay muted></video>`
    const video = div.children[0] as HTMLVideoElement
    video.onerror = () => {
      resolve({
        ...defaultSize,
        url: '',
        duration: 0,
      })
      video.remove()
    }
    video.style.position = 'fixed'
    video.style.top = '0'
    video.style.visibility = 'hidden'
    document.body.appendChild(video)
    // 获取视频第一帧
    video.addEventListener('play', () => {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      canvas.getContext('2d')?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
      canvas.toBlob(async blob => {
        let url
        if (blob) {
          const { url: _url } = await awsS3UploadFile(
            new File([blob], `${Math.random()}.png`),
            AwsS3FolderModuleName.im,
            AwsS3FolderModuleUseCaseName.mass_media_message_application
          )
          url = _url
        }
        resolve({
          width: video.videoWidth,
          height: video.videoHeight,
          url,
          duration: video.duration,
        })
        video.remove()
      })
    })
    video.src = src
  })
}

export function massSendTextMessages(messageText: string, sendToUids: number[], configName: string) {
  return new Promise((resolve, reject) => {
    postV1ImChatImSendMassInfoCreateCircleApiRequest({
      uIds: sendToUids,
      sendContentType: sendContentTypeEnum.text,
      commFileName: '',
      configName,
      contentChar: messageText,
    })
      .then(res => {
        if (res.isOk) resolve(true)
        else resolve(false)
      })
      .catch(err => reject(err))
  })
}

export function massSendMediaMessenges(mediaFile: File, sendToUids: number[], configName: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const mediaFileType = getMessageFileType(mediaFile.name)
      const isImage = mediaFileType === ZIMMessageType.Image
      const isVideo = mediaFileType === ZIMMessageType.Video

      const { url } = await awsS3UploadFile(
        mediaFile,
        AwsS3FolderModuleName.im,
        AwsS3FolderModuleUseCaseName.mass_media_message_application
      )
      let originWidth: string | undefined
      let originHeight: string | undefined
      let res: MarkcoinResponse<YapiPostV1ImChatImSendMassInfoCreateCircleApiResponse> | null = null
      if (isImage) {
        const img = new Image()
        img.src = URL.createObjectURL(mediaFile)
        await img.decode()
        originWidth = img?.width as unknown as string
        originHeight = img?.height as unknown as string
        URL.revokeObjectURL(img.src)

        res = await postV1ImChatImSendMassInfoCreateCircleApiRequest({
          uIds: sendToUids,
          sendContentType: sendContentTypeEnum.image,
          commFileName: mediaFile.name,
          configName,
          pictureUrl: url,
          originUrl: url,
          originWidth,
          originHeight,
        })
      }

      if (isVideo) {
        const {
          url: thumbnailUrl,
          width: thumbnailWidth,
          height: thumbnailHeight,
          duration,
        } = await getVideoThumbnail(URL.createObjectURL(mediaFile))

        res = await postV1ImChatImSendMassInfoCreateCircleApiRequest({
          uIds: sendToUids,
          sendContentType: sendContentTypeEnum.video,
          commFileName: mediaFile.name,
          configName,
          videoUrl: url,
          originUrl: url,
          thumbnailUrl,
          originWidth: thumbnailWidth?.toString(),
          originHeight: thumbnailHeight?.toString(),
          thumbnaiWidth: thumbnailUrl ? thumbnailWidth?.toString() : undefined,
          thumbnaiNumber: thumbnailUrl ? thumbnailHeight?.toString() : undefined,
          mediaDuration: duration as unknown as string,
        })
      }

      if (res?.isOk) resolve(true)
      else resolve(false)
    } catch (err) {
      reject(err)
    }
  })
}

export function massSendAudioMessages(
  audioFile: File,
  audioDuration: number,
  sendToUids: number[],
  configName: string
) {
  return new Promise(async (resolve, reject) => {
    try {
      const { url } = await awsS3UploadFile(
        audioFile,
        AwsS3FolderModuleName.im,
        AwsS3FolderModuleUseCaseName.mass_media_message_application
      )

      const res = await postV1ImChatImSendMassInfoCreateCircleApiRequest({
        uIds: sendToUids,
        sendContentType: sendContentTypeEnum.audio,
        commFileName: audioFile.name,
        configName,
        audioUrl: url,
        mediaDuration: audioDuration as unknown as string,
        size: audioFile.size as unknown as string,
      })

      if (res.isOk) resolve(true)
      else resolve(false)
    } catch (err) {
      reject(err)
    }
  })
}
