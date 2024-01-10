import Icon from '@/components/icon'
import { formatMediaTime, sendMediaMessage, voiceToMp3File } from '@/helper/message'
import { useMessengerStore } from '@/store/messenger'
import { useState } from 'react'
import { Message, Spin, Tooltip } from '@nbit/arco'
import { useInterval, useMount, useRequest, useSafeState, useUnmount } from 'ahooks'
import { t } from '@lingui/macro'
import type IRecorder from 'js-audio-recorder'
import { useImStore } from '@/store/im'
import { ZIMMessageType } from '@/plugins/im/constants'
import LoadingElement from '@/components/loading-element'
import { requestWithLoading } from '@/helper/render'
import { AudioProgress } from '../audio-progress'
import styles from './chat-audio.module.css'

// 不录音的话就不加载多余文件
const getRecorder = () => {
  return import('js-audio-recorder').then(res => res.default)
}

export function ChatAudio() {
  const { setInRecording } = useMessengerStore()
  const { run: onStartRecord, loading } = useRequest(
    async () => {
      const Recorder = await getRecorder()
      // @ts-ignore
      Recorder.getPermission()
        .then(() => {
          setInRecording(true)
        })
        .catch(() => {
          Message.error(t`features_messenger_chat_input_chat_audio_eadg8j_3bv`)
        })
    },
    {
      manual: true,
    }
  )
  return (
    <div onClick={onStartRecord}>
      {loading ? (
        <LoadingElement />
      ) : (
        <Icon name="icon_chat_voice" className="text-2xl/5 text-icon_color hover:text-brand_color" />
      )}
    </div>
  )
}
const maxDuration = 60
export function ChatRecordInner({
  recorder,
  sendAudioMessage,
}: {
  recorder: IRecorder
  sendAudioMessage: (audioFile: File, duration: number) => void
}) {
  const [duration, setDuration] = useState(0)
  const [paused, setPaused] = useState(false)
  useInterval(() => {
    if (paused) return
    setDuration(duration + 1)
    if (duration === maxDuration - 1) {
      recorder.stop()
      setPaused(true)
    }
  }, 1000)
  useMount(() => {
    recorder.start()
  })
  useUnmount(() => {
    recorder.destroy()
  })

  const togglePlay = () => {
    if (paused) {
      // 暂时不做恢复
      // recorder.resume()
    } else {
      recorder.pause()
      setPaused(!paused)
    }
  }
  const { chatMessagesScrollIntoBottom, setInRecording } = useMessengerStore()
  const { currentConversation } = useImStore()
  const { run: send, loading } = useRequest(
    async () => {
      if (duration < 2) {
        Message.error(t`features_messenger_chat_input_chat_audio_u5ocwkjk8y`)
        return
      }
      recorder.stop()
      setPaused(true)
      // 转换需要一些时间
      const mp3File = await requestWithLoading(voiceToMp3File(recorder))
      sendAudioMessage(mp3File, duration)
      // sendMediaMessage(mp3File, currentConversation!, {
      //   type: ZIMMessageType.Audio,
      //   audioDuration: duration,
      // })
      setInRecording(false)
      chatMessagesScrollIntoBottom()
    },
    {
      manual: true,
    }
  )
  const tipVisible = maxDuration - duration < 10 && !paused
  const tipContent = t({
    id: 'features_messenger_chat_input_chat_audio_wwxtxjlsjr',
    values: { 0: maxDuration - duration },
  })
  const clear = () => {
    recorder.stop()
    recorder.destroy()
    setInRecording(false)
  }

  return (
    <div className={styles['chat-record-wrapper']}>
      <div className="flex items-center mr-20">
        <Icon
          onClick={clear}
          name="icon_chat_delete1"
          className="text-2xl mr-4 text-icon_color hover:text-brand_color"
        />
        <span className="text-xl">{formatMediaTime(duration)}</span>
      </div>
      <div className="mr-4">
        <AudioProgress waveHeightScale={1.5} current={duration} total={duration} />
      </div>
      <div className="flex items-center">
        <Tooltip
          popupVisible={tipVisible}
          triggerProps={{
            popupAlign: {
              top: 24,
            },
          }}
          content={tipContent}
          color="var(--brand_color)"
        >
          {!paused && (
            <Icon
              onClick={togglePlay}
              name={paused ? '' : 'icon_chat_talking'}
              className="text-brand_color talking-icon"
            />
          )}
        </Tooltip>
        <div onClick={send} className="send-wrapper">
          <Icon name="icon_chat_send" className="text-button_text_01  text-xl" />
        </div>
      </div>
    </div>
  )
}
export function ChatRecord({ sendAudioMessage }: { sendAudioMessage: (audioFile: File, duration: number) => void }) {
  const [recorder, setRecorder] = useSafeState<IRecorder | undefined>()
  useMount(async () => {
    const Recorder = await getRecorder()
    setRecorder(new Recorder())
  })
  useUnmount(() => {
    recorder?.destroy()
  })

  if (!recorder) return null
  return <ChatRecordInner recorder={recorder} sendAudioMessage={sendAudioMessage} />
}
