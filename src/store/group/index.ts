import { create } from 'zustand'
import produce from 'immer'
import { GroupEnum } from '@/constants/group'
import { subscribeWithSelector } from 'zustand/middleware'
import { createTrackedSelector } from 'react-tracked'
import { YapiGetV1ImChatFriendListData } from '@/typings/yapi/ImChatFriendListV1GetApi'

type IStore = ReturnType<typeof getStore>

function getStore(set, get) {
  return {
    /** 新建群已经选取的群成员 */
    groupSelectedList: [] as YapiGetV1ImChatFriendListData[],
    setGroupSelectedList: (groupSelectedList: YapiGetV1ImChatFriendListData[]) => {
      set(
        produce((draft: IStore) => {
          draft.groupSelectedList = groupSelectedList
        })
      )
    },
    /** 群操作标识 */
    groupOperateMark: '',
    setGroupOperateMark: (mark: GroupEnum | string) => {
      set(
        produce((draft: IStore) => {
          draft.groupOperateMark = mark
        })
      )
    },
  }
}

const groupStore = create(subscribeWithSelector(getStore))

const useGroupStore = createTrackedSelector(groupStore)
export { useGroupStore, groupStore }
