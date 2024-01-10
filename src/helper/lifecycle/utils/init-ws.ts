import { baseUserStore } from '@/store/user'
import { baseCommonStore } from '@/store/common'
import ws from '@/plugins/ws'
import { WsBizEnum, WsThrottleTimeEnum, WsTypesEnum } from '@/constants/ws'
import { WSThrottleTypeEnum } from '@/plugins/ws/constants'
import { baseAddressBookStore } from '@/store/address-book'
import { wsUrl } from '../../env'

// 建立好友信息修改推送
const subsEdit = {
  biz: WsBizEnum.im,
  type: WsTypesEnum.userInfoModify,
}
// 建立好友注销推送
const subsSignOUT = {
  biz: WsBizEnum.im,
  type: WsTypesEnum.friendDestroy,
}
const subs = [subsEdit, subsSignOUT]
const callbackEdit = res => {
  const addressBookStore = baseAddressBookStore.getState()
  addressBookStore.setAddressBookList()
}
export const editPushNotification = () => {
  ws.subscribe({
    subs,
    callback: callbackEdit,
  })
}

export const onsignOUTPushNotification = () => {
  // 注销好友注销推送
  ws.unsubscribe({
    subs,
    callback: callbackEdit,
  })
}

export async function initWS() {
  ws.setOptions({
    wsUrl,
    success() {
      if (baseUserStore.getState().isLogin) {
        ws.login()
      }
    },
    getToken: () => {
      return baseUserStore.getState().token?.accessToken as unknown as string
    },
  })
  ws.connect()

  ws.onAddWsDelayTimeChange(time => {
    baseCommonStore.getState().setwsDelayTime(time)
  })
}

baseUserStore.subscribe(
  userState => userState.isLogin,
  () => {
    if (baseUserStore.getState().isLogin) {
      ws.login()
    } else {
      ws.logout()
    }
  }
)
