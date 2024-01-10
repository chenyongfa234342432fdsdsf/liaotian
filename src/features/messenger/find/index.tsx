import { getV1ImDiscoverGetDiscoverListApiRequest } from '@/apis/find'
import { useCommonStore } from '@/store/common'
import { useEffect, useState } from 'react'
import { YapiGetV1ImDiscoverGetDiscoverListData } from '@/typings/yapi/ImDiscoverGetDiscoverListV1GetApi'
import { t } from '@lingui/macro'
import AddressBookNav from '../address-book/address-book-nav-component'
import styles from './index.module.css'
import CardList from './card-list'

function Find() {
  const { locale } = useCommonStore()
  const [discoverList, setDiscoverList] = useState<YapiGetV1ImDiscoverGetDiscoverListData[]>()
  const getDiscoverList = async () => {
    const res = await getV1ImDiscoverGetDiscoverListApiRequest({ lanTypeCd: locale })
    const { isOk, data } = res || {}
    if (isOk && data) {
      setDiscoverList(data)
    }
  }
  useEffect(() => {
    getDiscoverList()
  }, [])
  return (
    <div className={styles.find}>
      <AddressBookNav titleText={t`features_messenger_find_index_qjvk68cfjh`} />
      <div className="px-6">
        {discoverList?.map(item => {
          return <CardList key={item.columnName} item={item} />
        })}
      </div>
    </div>
  )
}
export default Find
