import { create } from 'zustand'
import { createTrackedSelector } from 'react-tracked'
import produce from 'immer'
import dayjs from 'dayjs'
import { devtools } from 'zustand/middleware'
import { getV1ImSignInGetUserSignInfoApiRequest } from '@/apis/checkin-center'
import { YapiGetV1ImSignInGetUserSignInfoData } from '@/typings/yapi/ImSignInGetUserSignInfoV1GetApi.d'

type INewTodayIfSignStore = {
  todayIfSign: boolean
}

function getStore(set, get) {
  return {
    todayIfSign: true,
    getTodayIfSign: async () => {
      const timeData = {
        startTimestamp: `${dayjs().startOf('day').valueOf()}`,
        endTimestamp: `${dayjs().endOf('day').valueOf()}`,
      }
      const res = await getV1ImSignInGetUserSignInfoApiRequest(timeData)
      const { isOk, data } = res || {}
      if (isOk && data) {
        set(
          produce((draft: YapiGetV1ImSignInGetUserSignInfoData) => {
            draft.todayIfSign = data.todayIfSign
          })
        )
      }
    },
    setNewTodayIfSign: (boolean: boolean) => {
      set(
        produce((draft: INewTodayIfSignStore) => {
          draft.todayIfSign = boolean
        })
      )
    },
  }
}
const baseCheckinStore = create(devtools(getStore, { name: 'checkin-center-store' }))

const useCheckinStore = createTrackedSelector(baseCheckinStore)

export { useCheckinStore, baseCheckinStore }
