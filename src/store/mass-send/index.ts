import { create } from 'zustand'
import produce from 'immer'
import { createTrackedSelector } from 'react-tracked'
import { YapiGetV1ImChatImSendMassInfoQueryListApiResponse } from '@/typings/yapi/ImChatImSendMassInfoQueryListV1GetApi'

type IStore = ReturnType<typeof getStore>

function getStore(set) {
  return {
    massSendInfoList: [] as YapiGetV1ImChatImSendMassInfoQueryListApiResponse[],
    setMassSendInfoList: (massSendInfoList: YapiGetV1ImChatImSendMassInfoQueryListApiResponse[]) => {
      set(
        produce((draft: IStore) => {
          draft.massSendInfoList = massSendInfoList
        })
      )
    },
  }
}

const baseMassSendStore = create(getStore)

const useMassSendStore = createTrackedSelector(baseMassSendStore)
export { useMassSendStore, baseMassSendStore }
