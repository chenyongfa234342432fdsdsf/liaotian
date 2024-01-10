import { create } from 'zustand'
import { createTrackedSelector } from 'react-tracked'
import produce from 'immer'
import { devtools } from 'zustand/middleware'
import { YapiGetV1ImChatFriendApplyListData } from '@/typings/yapi/ImChatFriendApplyListV1GetApi'

type INewFriendStore = ReturnType<typeof getStore>

function getStore(set, get) {
  return {
    // 通讯录列表好友
    newFriendItem: {} as YapiGetV1ImChatFriendApplyListData,

    setNewFriendItem: item => {
      set(
        produce((draft: INewFriendStore) => {
          draft.newFriendItem = item as YapiGetV1ImChatFriendApplyListData
        })
      )
    },
    off: false,
    setOff: (boolean: boolean) => {
      set(
        produce((draft: INewFriendStore) => {
          draft.off = boolean
        })
      )
    },
  }
}
const baseNewFriendStore = create(devtools(getStore, { name: 'new-friend-store' }))

const useNewFriendStore = createTrackedSelector(baseNewFriendStore)

export { useNewFriendStore, baseNewFriendStore }
