import { baseAddressBookStore } from '@/store/address-book'
import { baseUserStore } from '@/store/user'
import { baseCommonStore } from '@/store/common'
import { baseCheckinStore } from '@/store/checkin-center'
import { updateRemarkMapToStore } from '../address-book'
import { updateQueryEntity } from '../setting-config'
import { fetchAndUpdateUserInfo, getIsLogin } from '../auth'
import { updateUserIsBanToStore } from '../user'
import { editPushNotification, onsignOUTPushNotification } from './utils/init-ws'
import { initializeLayoutStore } from '../layout'

function afterLogin() {
  // 登录状态变化时调用
  if (!getIsLogin()) {
    return
  }

  updateRemarkMapToStore()
  const { setAddressBookList, setMyGroupList, setJoinGroupList } = baseAddressBookStore.getState()
  const { getTodayIfSign } = baseCheckinStore.getState()
  setAddressBookList()
  setMyGroupList()
  setJoinGroupList()
  updateQueryEntity()
  updateUserIsBanToStore()
  editPushNotification()
  initializeLayoutStore()
  fetchAndUpdateUserInfo()
  getTodayIfSign()
  // TODO: 更新个人信息
}

function afterLogout() {
  // 登出状态变化时调用
  if (getIsLogin()) {
    return
  }
  const { setRemarkMap } = baseAddressBookStore.getState()
  const { setAccessKey, setBusinessId } = baseCommonStore.getState()
  setAccessKey('')
  setBusinessId('')
  setRemarkMap({
    groupList: [],
    friendList: [],
  })
  onsignOUTPushNotification()
}

export function registerOnLoginChange() {
  baseUserStore.subscribe(
    state => state.isLogin,
    () => {
      afterLogin()
      afterLogout()
    }
  )
  afterLogin()
  afterLogout()
}
