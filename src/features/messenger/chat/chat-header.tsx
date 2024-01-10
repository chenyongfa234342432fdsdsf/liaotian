import { useMessengerRightDrawer } from '@/hooks/use-messenger-right-drawer'
import { useState, useRef, useEffect } from 'react'
import { useImStore } from '@/store/im'
import classNames from 'classnames'
import { Message } from '@nbit/arco'
import Icon from '@/components/icon'
import { getDetectionPermissions } from '@/features/audio-and-video/audio-video'
import { getIsAdminUser, useConversationWithRemark, useIsInGroup, useUserIsBan } from '@/helper/address-book'
import { ZIMConversationType } from '@/plugins/im/constants'
import ChatAvatar from '@/components/chat-avatar'
import { IIMConversation } from '@/plugins/im/types'
import { useAddressBookStore } from '@/store/address-book'
import { t } from '@lingui/macro'
import { useUserStore } from '@/store/user'
import styles from './chat-header.module.css'
import AudioVideoModal from './audio-video-modal'
import { ChatHeaderMore } from './chat-header-more'
import { ChatInfo } from '../chat-information'
import { SearchMessage } from '../search-message'

function UserAvatar() {
  const [open, close] = useMessengerRightDrawer()

  const { currentConversation: storeCurrentConversation } = useImStore()
  const currentConversation = useConversationWithRemark(storeCurrentConversation!)
  const groupLeaved = !useIsInGroup()

  const openModal = () => {
    if (groupLeaved) {
      return
    }
    open(<ChatInfo onClose={close} />)
  }

  return (
    <div className="cursor-pointer" onClick={openModal}>
      <ChatAvatar
        size={40}
        src={currentConversation.conversationAvatarUrl}
        isGroup={currentConversation.type === ZIMConversationType.Group}
      />
    </div>
  )
}

type AudioVideoModalRef = {
  judgewhetherVoiceAndVideoIngRef: () => boolean
  sameOpenLoginVerificationRef: () => void
}

function HeaderTools(props) {
  const { currentConversation } = props

  const [audioConversation, setConversation] = useState<IIMConversation>()

  const [vidoeConversation, setVidoeConversation] = useState<IIMConversation>()

  const [multipleAudioConversation, setMultiplePeopleAudio] = useState<IIMConversation>()

  const [multipleVideoConversation, setMultiplePeopleVideo] = useState<IIMConversation>()

  const [whetherDisabled, setWhetherDisabled] = useState<boolean>(false)

  const audioVideoModalRef = useRef<AudioVideoModalRef>(null)

  const [open, close] = useMessengerRightDrawer()

  const { userInfo } = useUserStore()

  const { isBan } = useUserIsBan()

  const { groupMembers } = useAddressBookStore()

  useEffect(() => {
    if (Object.keys(groupMembers)?.length > 0 && currentConversation?.conversationID) {
      const whetherHaveOwn = groupMembers?.[currentConversation?.conversationID]?.find(
        item => item?.uid === userInfo?.uid
      )
      if (whetherHaveOwn && !isBan) {
        setWhetherDisabled(false)
      } else {
        setWhetherDisabled(true)
      }
    }
  }, [groupMembers, currentConversation, isBan])

  const whetherCanMakeCalls = () => {
    return whetherDisabled && currentConversation?.type === ZIMConversationType.Group
  }

  const tools = [
    {
      icon: 'icon_chat_video_line',
      id: 1,
      hidden: false,
      disable: whetherCanMakeCalls(),
      iconClick: async () => {
        if (whetherCanMakeCalls()) {
          return
        }
        if (groupMembers?.[currentConversation?.conversationID]?.length === 1) {
          Message.error(t`features_messenger_chat_chat_header_h4s7nx9gdy`)
          return
        }

        const result = await getDetectionPermissions({ video: false, audio: true })
        if (audioVideoModalRef?.current?.judgewhetherVoiceAndVideoIngRef()) {
          Message.error(t`features_audio_and_video_audio_video_xed7qjh_fs`)
          return
        }
        if (result) {
          currentConversation?.type === ZIMConversationType.Group
            ? setMultiplePeopleVideo(currentConversation)
            : setVidoeConversation(currentConversation)
          audioVideoModalRef.current?.sameOpenLoginVerificationRef()
        }
      },
    },
    {
      icon: 'icon_chat_phone',
      id: 2,
      hidden: false,
      disable: whetherCanMakeCalls(),
      iconClick: async () => {
        if (whetherCanMakeCalls()) {
          return
        }
        if (groupMembers?.[currentConversation?.conversationID]?.length === 1) {
          Message.error(t`features_messenger_chat_chat_header_5h2pqgppl5`)
          return
        }
        const result = await getDetectionPermissions({ video: false, audio: true })
        if (audioVideoModalRef?.current?.judgewhetherVoiceAndVideoIngRef()) {
          Message.error(t`features_audio_and_video_audio_video_xed7qjh_fs`)
          return
        }
        if (result) {
          currentConversation?.type === ZIMConversationType.Group
            ? setMultiplePeopleAudio(currentConversation)
            : setConversation(currentConversation)
          audioVideoModalRef.current?.sameOpenLoginVerificationRef()
          // setVideoCallAndGroupCall({ ...videoCallAndGroupCall, videoCall: VideoCall.voicecall })
        }
      },
    },
    {
      icon: 'icon_chat_search',
      id: 3,
      hoverIcon: '',
      iconClick: () => {
        open(<SearchMessage onClose={close} />)
      },
    },
    {
      icon: 'icon_chat_more',
      id: 4,
      hoverIcon: '',
      node: <ChatHeaderMore />,
    },
  ]

  return (
    <div className="flex">
      <AudioVideoModal
        ref={audioVideoModalRef}
        currentConversation={currentConversation}
        audioConversation={audioConversation}
        vidoeConversation={vidoeConversation}
        setVidoeConversation={setVidoeConversation}
        setConversation={setConversation}
        multipleAudioConversation={multipleAudioConversation}
        setMultiplePeopleAudio={setMultiplePeopleAudio}
        multipleVideoConversation={multipleVideoConversation}
        setMultiplePeopleVideo={setMultiplePeopleVideo}
      />
      {tools.map(item => {
        if (item.hidden) {
          return null
        }
        return (
          <div
            className={classNames('ml-6', {
              'not-allowed': item?.disable,
            })}
            key={item.id}
            onClick={() => item?.iconClick?.()}
          >
            {item?.node || (
              <Icon
                className={classNames('text-2xl', {
                  'text-icon_color hover:text-brand_color': !item?.disable,
                  'text-text_color_04': item?.disable,
                })}
                name={item.icon}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export function ChatHeader() {
  const groupLeaved = !useIsInGroup()
  const { currentConversation: storeCurrentConversation } = useImStore()
  const currentConversation = useConversationWithRemark(storeCurrentConversation!)
  const isAdminUser = getIsAdminUser(currentConversation.conversationID)

  return (
    <div className={styles['chat-header-wrapper']}>
      <UserAvatar />
      <div className="name">{currentConversation?.conversationName}</div>
      {!groupLeaved && !isAdminUser && <HeaderTools currentConversation={currentConversation} />}
    </div>
  )
}
