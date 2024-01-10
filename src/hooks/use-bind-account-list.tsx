import { getUserBindList, getV1ImChatUserBankCardListApiRequest } from '@/apis/settings-center/wallet'
import { useRequest } from 'ahooks'

export function useBindAccountList() {
  // 用户第三方绑定账户列表
  const { data, loading } = useRequest(getUserBindList)
  // 银行卡列表
  const { data: bankData, loading: bankLoading } = useRequest(getV1ImChatUserBankCardListApiRequest)
  const lists = data?.data ?? []
  const bankLists = bankData?.data ?? []
  return {
    thirdLists: lists,
    bankLists,
    loading: loading || bankLoading,
  }
}
