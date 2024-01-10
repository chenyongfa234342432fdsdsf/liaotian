import AsyncSuspense from '@/components/async-suspense'
import ListEmpty from '@/components/list-empty'
import { oss_svg_image_domain_address } from '@/constants/oss'
import SystemSettingBar from '@/features/system-announcement/components/system-avatar'
import SystemMessageContent from '@/features/system-announcement/components/system-content'
import { useCommonStore } from '@/store/common'
import { useImStore } from '@/store/im'
import { useMessengerStore } from '@/store/messenger'
import { useEventListener } from 'ahooks'
import { lazy, useEffect, useRef } from 'react'

const ChatWindow = lazy(() =>
  import('./chat-window').then(res => ({
    default: res.ChatWindow,
  }))
)

function Chat() {
  const { currentConversation } = useImStore()
  const { drawersCount, systemNotificationsVisible, setImageMaxWidth, setInMultiSelect } = useMessengerStore()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const setWidth = () => {
    setTimeout(() => {
      // 存在跳转到登录后没有数据的情况
      let width = ((wrapperRef.current?.clientWidth || 500) - 112) * 0.6
      setImageMaxWidth(width)
    }, 300)
  }
  useEffect(() => {
    // 在这里更新加载图片的最大宽度
    setWidth()
  }, [drawersCount])
  useEventListener('resize', setWidth)
  useEffect(() => {
    // 改变会话时退出多选模式
    return () => {
      setInMultiSelect(false)
    }
  }, [currentConversation])
  const { theme } = useCommonStore()
  return (
    <div className="h-full bg-card_bg_color_01 relative" ref={wrapperRef}>
      <img
        className="absolute left-0 z-0 top-0 w-full h-full object-cover"
        src={`${oss_svg_image_domain_address}icon_chat_bg_${theme}.png`}
        alt=""
      />
      <div className="h-full relative z-1">
        {currentConversation ? (
          <AsyncSuspense
            hasLoading
            spinProps={{
              size: 60,
              className: 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
            }}
          >
            <ChatWindow />
          </AsyncSuspense>
        ) : systemNotificationsVisible ? (
          <div className="h-full flex flex-col">
            <SystemSettingBar />
            <SystemMessageContent />
          </div>
        ) : (
          <div className="h-full relative flex items-center justify-center">
            <ListEmpty />
          </div>
        )}
      </div>
    </div>
  )
}

export default Chat
