import { HOME_RIGHT_DRAWER_ID } from '@/constants/dom'
import classNames from 'classnames'
import Icon from '@/components/icon'
import Link from '@/components/link'
import { useMessengerStore } from '@/store/messenger'
import { useUpdateEffect, useMount, useUnmount } from 'ahooks'
import { useImStore } from '@/store/im'
import { useCheckinStore } from '@/store/checkin-center'
import { useState } from 'react'
import AudioVideoModal from '@/features/messenger/chat/audio-video-modal'
import { awaitImLoaded } from '@/helper/lifecycle/login-im'
import styles from './messenger-layout.module.css'
import Chat from './chat'

export function MessengerLayout({ children }) {
  const { currentConversation } = useImStore()
  const { todayIfSign } = useCheckinStore()
  const { drawersCount, setDrawersCount, setInMultiSelect, setInRecording, setMessageByReEdit } = useMessengerStore()
  const [showAudioVideoModal, setShowAudioVideoModal] = useState<boolean>(false)
  // 检测到切换的时候直接关闭所有展示
  useUpdateEffect(() => {
    setDrawersCount(0)

    // reset drawer count on unmount
    return () => setDrawersCount(0)
  }, [currentConversation?.conversationID])

  useMount(async () => {
    await awaitImLoaded()
    setShowAudioVideoModal(true)
  })
  useUnmount(() => {
    setInMultiSelect(false)
    setInRecording(false)
    setMessageByReEdit('')
  })

  return (
    <div className={styles['messenger-layout-wrapper']}>
      {showAudioVideoModal && <AudioVideoModal />}
      <div className="messenger-bg">
        <div className="bg-brand_color brand-bar"></div>
        <div className="flex-1 bg-button_animate"></div>
      </div>
      <div className="layout-contetn-wrapper">
        <div className="messenger-left">{children}</div>
        <div className="messenger-center">
          <Chat />
        </div>
        <div
          id={HOME_RIGHT_DRAWER_ID}
          className={classNames('messenger-right', {
            '!w-0': drawersCount === 0,
          })}
        ></div>
        {!todayIfSign && (
          <Link className="sign-box" href="/checkin-center">
            <Icon name="icon_set_sign_in" className="w-6 h-6 text-2xl" />
          </Link>
        )}
      </div>
    </div>
  )
}
