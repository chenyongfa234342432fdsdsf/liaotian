import { create } from 'zustand'
import { createTrackedSelector } from 'react-tracked'
import produce from 'immer'
import { devtools } from 'zustand/middleware'
import { IIMMessage } from '@/plugins/im/types'
import { sendMessage } from '@/helper/message'
import { IEmojiInfoType } from '@/typings/im'

// 主页 store，主要用于布局
type IMessengerStore = ReturnType<typeof getStore>

function getStore(set) {
  return {
    /** 已有 drawer 数量 */
    drawersCount: 0,
    increaseDrawersCount: () => {
      set(
        produce((draft: IMessengerStore) => {
          draft.drawersCount += 1
        })
      )
    },
    decreaseDrawersCount: () => {
      set(
        produce((draft: IMessengerStore) => {
          draft.drawersCount -= 1
          if (draft.drawersCount < 0) {
            draft.drawersCount = 0
          }
        })
      )
    },
    setDrawersCount: (count: number) => {
      set(
        produce((draft: IMessengerStore) => {
          draft.drawersCount = count
        })
      )
    },
    /** 聊天信息滚动到底部 */
    chatMessagesScrollIntoBottom: (options?: ScrollToOptions) => {},
    registerChatMessagesScrollIntoBottom: (fn: (options?: ScrollToOptions) => void) => {
      set(
        produce((draft: IMessengerStore) => {
          // 需要有延迟
          draft.chatMessagesScrollIntoBottom = (options?: ScrollToOptions) => {
            setTimeout(() => {
              fn(options)
            }, 50)
          }
        })
      )
    },
    /** 聊天图片最大宽度，用来计算加载时的高度 */
    imageMaxWidth: 200,
    setImageMaxWidth: (width: number) => {
      set(
        produce((draft: IMessengerStore) => {
          draft.imageMaxWidth = width
        })
      )
    },
    /** 选中的消息 */
    selectedMessages: [] as IIMMessage[],
    addOrRemoveSelectedMessage: (message: IIMMessage) => {
      set(
        produce((draft: IMessengerStore) => {
          const index = draft.selectedMessages.findIndex(item => {
            return item.messageID === message.messageID
          })
          if (index === -1) {
            draft.selectedMessages.push(message)
          } else {
            draft.selectedMessages.splice(index, 1)
          }
        })
      )
    },
    /** 进入了聊天多选模式 */
    inMultiSelect: false,
    setInMultiSelect: (mode: boolean) => {
      set(
        produce((draft: IMessengerStore) => {
          draft.selectedMessages = []
          draft.inMultiSelect = mode
        })
      )
    },
    /** 进入了录音模式 */
    inRecording: false,
    setInRecording: (mode: boolean) => {
      set(
        produce((draft: IMessengerStore) => {
          draft.inRecording = mode
        })
      )
    },
    /** 重新编辑的消息 */
    messageByReEdit: '',
    setMessageByReEdit: (message: string) => {
      set(
        produce((draft: IMessengerStore) => {
          draft.messageByReEdit = message
        })
      )
    },
    /** 打开联系人信息，由聊天组件注入 */
    openContactInfo: (uid: string | number) => {},
    registerOpenContactInfo: (fn: (uid: string | number) => void) => {
      set(
        produce((draft: IMessengerStore) => {
          draft.openContactInfo = fn
        })
      )
    },
    /** 是否展示系统公告 */
    systemNotificationsVisible: false,
    setSystemNotificationsVisible: (visible: boolean) => {
      set(
        produce((draft: IMessengerStore) => {
          draft.systemNotificationsVisible = visible
        })
      )
    },
  }
}
const baseMessengerStore = create(devtools(getStore, { name: 'home-store' }))

const useMessengerStore = createTrackedSelector(baseMessengerStore)

export { useMessengerStore, baseMessengerStore }
