import { getBasicWebApiData, getFooterApiData } from '@/apis/layout'

import { baseLayoutStore } from '@/store/layout'
import { baseCommonStore } from '@/store/common'
import { recursiveColumnMap } from './footer'

export function initializeLayoutStore() {
  const layoutStore = baseLayoutStore.getState()
  const { setLayoutProps, setColumnsDataByCd } = layoutStore
  const { locale, businessId } = baseCommonStore.getState()

  Promise.all([
    getBasicWebApiData({ businessId, lanType: locale }),
    getFooterApiData({ businessId, lanType: locale }),
  ]).then(res => {
    const layoutProps = {
      ...res[0]?.data,
      ...res[1]?.data,
    }
    setLayoutProps(layoutProps)
    setColumnsDataByCd(recursiveColumnMap(layoutProps?.columnsDatas || []))
  })
}
