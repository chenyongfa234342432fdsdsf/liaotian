import { create } from 'zustand'
import produce from 'immer'
import { devtools } from 'zustand/middleware'
import { createTrackedSelector } from 'react-tracked'
import { YapiGetV1ImChatGroupInfoData } from '@/typings/yapi/ImChatGroupInfoV1GetApi'
import { getV1ImChatGroupInfoApiRequest } from '@/apis/group'

type IStore = ReturnType<typeof getStore>

function getStore(set) {
  return {
    groupAnnouncement: {},
    updateGroupAnnouncement: (groupId: string, announcement: string) => {
      set(
        produce((draft: IStore) => {
          draft.groupAnnouncement = { ...draft.groupAnnouncement, [groupId]: announcement }
        })
      )
    },
    hasViewedAnnouncement: {} as Record<string, boolean>,
    setHasViewedAnnouncement: (groupId: string, hasViewed: boolean) => {
      set(
        produce((draft: IStore) => {
          draft.hasViewedAnnouncement = { ...draft.hasViewedAnnouncement, [groupId]: hasViewed }
        })
      )
    },
    groupDetails: {} as Record<string, YapiGetV1ImChatGroupInfoData>,
    setGroupDetails: (groupdId: string, details: YapiGetV1ImChatGroupInfoData) => {
      set(
        produce((draft: IStore) => {
          // remove storing other group data - get latest data
          draft.groupDetails = { ...draft.groupDetails, [groupdId]: details }
        })
      )
    },
  }
}

const baseChatGroupStore = create(devtools(getStore, { name: 'chat-group-store' }))

const useChatGroupStore = createTrackedSelector(baseChatGroupStore)
export { useChatGroupStore, baseChatGroupStore }
