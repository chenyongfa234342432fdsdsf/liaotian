import AsyncSuspense from '@/components/async-suspense'
import { Spin } from '@nbit/arco'
import { lazy, useEffect, useState } from 'react'
import { useImStore } from '@/store/im'
import { HOME_SEARCH_CONVERSATIONS_ID } from '@/constants/dom'
import { WsBizEnum, WsThrottleTimeEnum, WsTypesEnum } from '@/constants/ws'
import ws from '@/plugins/ws'
import { WSThrottleTypeEnum } from '@/plugins/ws/constants'
import { useAddressBookStore } from '@/store/address-book'
import SettingBar from './setting-bar'
import styles from './index.module.css'

const Conversations = lazy(() => import('./conversations'))
const MessengerSearch = lazy(() => import('./search'))

export default function Messenger() {
  const { imIsLogin } = useImStore()
  const { setApplyList } = useAddressBookStore()
  const [news, setNews] = useState<any[]>([])

  // 建立好友推送
  useEffect(() => {
    const subs = {
      biz: WsBizEnum.im,
      type: WsTypesEnum.friendApply,
    }
    const callbackApply = res => {
      setNews(old => {
        return [...old, ...res]
      })
    }
    ws.subscribe({
      subs,
      callback: callbackApply,
      throttleType: WSThrottleTypeEnum.increment,
      throttleTime: WsThrottleTimeEnum.Market,
    })
  }, [])

  useEffect(() => {
    setApplyList()
  }, [news])
  return (
    <div className={styles['messenger-wrapper']}>
      <SettingBar />

      {!imIsLogin ? (
        <div className="flex flex-1 justify-center items-center h-full">
          <Spin />
        </div>
      ) : (
        <>
          <MessengerSearch />
          <div id={HOME_SEARCH_CONVERSATIONS_ID} className="relative flex-1 overflow-y-auto">
            <Conversations />
          </div>
        </>
      )}
    </div>
  )
}
