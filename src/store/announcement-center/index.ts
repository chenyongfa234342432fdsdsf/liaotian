import { create } from 'zustand'
import { createTrackedSelector } from 'react-tracked'
import produce from 'immer'
import { devtools } from 'zustand/middleware'
import { getAnnouncementInfo, setAnnouncementInfo, removeAnnouncementInfo } from '@/helper/cache/announcement-center'

type IAnnouncementCenterStore = ReturnType<typeof getStore>

function getStore(set) {
  return {
    //  当前选中的公告数据 有缓存先取缓存
    selectAnnouncementInfo: getAnnouncementInfo() || {},
    // 公告中心选择数据设置
    setSelectAnnouncementInfo: selectAnnouncementInfo => {
      set(
        produce((draft: IAnnouncementCenterStore) => {
          draft.selectAnnouncementInfo = selectAnnouncementInfo
          setAnnouncementInfo(selectAnnouncementInfo)
        })
      )
    },
    // 公告中心选择数据移除
    removeSelectAnnouncementInfoCache: () => {
      removeAnnouncementInfo()
    },
  }
}
const AnnouncementCenterStore = create(devtools(getStore, { name: 'announcement-center-store' }))

const useAnnouncementCenterStore = createTrackedSelector(AnnouncementCenterStore)

export { useAnnouncementCenterStore, AnnouncementCenterStore }
