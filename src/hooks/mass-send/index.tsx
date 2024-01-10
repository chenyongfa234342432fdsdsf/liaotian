import { getV1ImChatImSendMassInfoQueryListApiRequest } from '@/apis/mass-send'
import { useMassSendStore } from '@/store/mass-send'
import { YapiGetV1ImChatImSendMassInfoQueryListApiResponse } from '@/typings/yapi/ImChatImSendMassInfoQueryListV1GetApi'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'

function useGetMassSendIinfoList() {
  const { massSendInfoList, setMassSendInfoList } = useMassSendStore()
  const { loading, runAsync } = useRequest(getV1ImChatImSendMassInfoQueryListApiRequest, { manual: true })

  const fetchApi = () => {
    return new Promise((resolve, reject) => {
      runAsync({}).then(res => {
        if (res.isOk && res.data) {
          setMassSendInfoList((res.data as unknown as YapiGetV1ImChatImSendMassInfoQueryListApiResponse[]).reverse())
          resolve(true)
        } else resolve(false)
      })
    })
  }

  useEffect(() => {
    fetchApi()
  }, [])

  return {
    data: massSendInfoList,
    loading,
    fetchApi,
  }
}

export default useGetMassSendIinfoList
