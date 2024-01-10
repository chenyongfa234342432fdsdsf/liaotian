import { create } from 'zustand'
import { createTrackedSelector } from 'react-tracked'
import produce from 'immer'
import { devtools } from 'zustand/middleware'
import { YapiGetV1ImChatFriendListData } from '@/typings/yapi/ImChatFriendListV1GetApi'
import { YapiGetV1ImChatGroupMyGroupListData } from '@/typings/yapi/ImChatGroupMyGroupV1GetApi'
import { getV1ImChatFriendApplyListApiRequest, getV1ImChatFriendListApiRequest } from '@/apis/address-book'
import { getV1ImChatGroupMyGroupApiRequest } from '@/apis/group'
// 通讯录store，主要用于布局
import { YapiGetV1ImChatImUserInfoRemarkData } from '@/typings/yapi/ImChatImUserInfoRemarkListV1GetApi'
import { ImChatGroupMemberListData } from '@/typings/apis/group'
import { YapiGetV1ImChatFriendApplyListData } from '@/typings/yapi/ImChatFriendApplyListV1GetApi'
// 通讯录 store，主要用于布局
type IAddressBookStore = ReturnType<typeof getStore>

function getStore(set, get) {
  // const [applyListItem, setApplyListItem] = useState<YapiGetV1ImChatFriendApplyListData | undefined>()

  return {
    // 通讯录列表好友
    addressBookList: [] as YapiGetV1ImChatFriendListData[],

    setAddressBookList: async () => {
      const res = await getV1ImChatFriendListApiRequest({})
      const { isOk, data } = res || {}
      if (isOk) {
        set(
          produce((draft: IAddressBookStore) => {
            draft.addressBookList = data as YapiGetV1ImChatFriendListData[]
          })
        )
      }
    },
    // 我的群列表 创建的群聊
    myGroupList: [] as YapiGetV1ImChatGroupMyGroupListData[],
    // 我的群列表 加入的群聊
    joinGroupList: [] as YapiGetV1ImChatGroupMyGroupListData[],
    setMyGroupList: async () => {
      const res = await getV1ImChatGroupMyGroupApiRequest({ queryType: '1' })
      const { isOk, data } = res || {}
      if (isOk) {
        set(
          produce((draft: IAddressBookStore) => {
            draft.myGroupList = data as YapiGetV1ImChatGroupMyGroupListData[]
          })
        )
      }
    },
    setJoinGroupList: async () => {
      const res = await getV1ImChatGroupMyGroupApiRequest({ queryType: '2' })
      const { isOk, data } = res || {}
      if (isOk) {
        set(
          produce((draft: IAddressBookStore) => {
            draft.joinGroupList = data as YapiGetV1ImChatGroupMyGroupListData[]
          })
        )
      }
    },
    /** 从这里拿备注 */
    remarkMap: {
      groupList: [],
      friendList: [],
    } as YapiGetV1ImChatImUserInfoRemarkData,
    setRemarkMap: (remarkMap: YapiGetV1ImChatImUserInfoRemarkData) => {
      set(
        produce((draft: IAddressBookStore) => {
          draft.remarkMap = remarkMap
        })
      )
    },
    /** 群成员 */
    groupMembers: {} as Record<string, ImChatGroupMemberListData[]>,
    setGroupMembers: (groupId: string, members: ImChatGroupMemberListData[]) => {
      set(
        produce((draft: IAddressBookStore) => {
          draft.groupMembers[groupId] = members
        })
      )
    },

    /**
     * 好友申请列表
     */
    applyList: [] as YapiGetV1ImChatFriendApplyListData[],
    setApplyList: async () => {
      const res = await getV1ImChatFriendApplyListApiRequest({})
      const { isOk, data } = res || {}
      if (isOk && data) {
        set(
          produce((draft: IAddressBookStore) => {
            draft.applyList = data
          })
        )
      }
    },
  }
}
const baseAddressBookStore = create(devtools(getStore, { name: 'address-book-store' }))

const useAddressBookStore = createTrackedSelector(baseAddressBookStore)

export { useAddressBookStore, baseAddressBookStore }
