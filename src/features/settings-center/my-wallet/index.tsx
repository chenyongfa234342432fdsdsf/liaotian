import Tabs from '@/components/tabs'
import { useEffect, useState } from 'react'
import { filter, find, map } from 'lodash'
import { formatDate } from '@/helper/date'
import Link from '@/components/link'
import { useRequest } from 'ahooks'
import {
  getV1ImChatImWalletTrendsConfigApiRequest,
  getV1ImUserBalanceGetBillLogListApiRequest,
} from '@/apis/settings-center/wallet'
import { YapiGetV1ImUserBalanceGetBillLogListData } from '@/typings/yapi/ImUserBalanceGetBillLogListV1GetApi'
import { BillLogTypeEnum, IsOpenEnum, PAGE_SIZE } from '@/constants/my-wallet'
import ListEmpty from '@/components/list-empty'
import { List, Spin } from '@nbit/arco'
import { formatCurrency } from '@/helper/decimal'
import { t } from '@lingui/macro'
import NavigationBar from '../navigation-bar'
import styles from './index.module.css'
import { Header } from './header'

const getTablist = () => [
  {
    title: t`features_settings_center_my_wallet_index_5foylhseih`,
    id: BillLogTypeEnum.All,
  },
  {
    title: t`features_settings_center_my_wallet_index_ebi8e38cxa`,
    id: BillLogTypeEnum.Sub,
  },
  {
    title: t`features_settings_center_my_wallet_index_s6f1givjct`,
    id: BillLogTypeEnum.Add,
  },
]

export default function MyWallet() {
  const tabList = getTablist()
  const [tab, setTab] = useState(tabList[0])
  const { data, loading } = useRequest(getV1ImChatImWalletTrendsConfigApiRequest)
  // 获取商户配置
  const configs = data?.data ?? []
  // 绑定账号是否隐藏"
  const isHideBindAccount = find(configs, i => i.codeVal === 'isHideBindAccount')?.enabledInd === IsOpenEnum.No
  // 转移资产是否隐藏
  const isHideTransferAssets = find(configs, i => i.codeVal === 'isHideTransferAssets')?.enabledInd === IsOpenEnum.No

  const [lists, setLists] = useState<YapiGetV1ImUserBalanceGetBillLogListData[]>([])
  const [scrollLoading, setScrollLoading] = useState<JSX.Element | string>(<Spin />)
  const [totalPage, setTotalPage] = useState(1)
  const [pageNum, setPageNum] = useState(1) // 当前页数

  const fetchData = async currentPage => {
    setScrollLoading(<Spin />)
    if (currentPage > totalPage) {
      setScrollLoading(t`features_checkin_center_points_record_9zzgu4ntzv`)
    } else {
      const res = await getV1ImUserBalanceGetBillLogListApiRequest({
        pageNum: currentPage,
        pageSize: '10',
        ...(tab?.id !== BillLogTypeEnum.All && {
          type: tab?.id,
        }),
      })
      if (res.isOk) {
        const newLists = res?.data?.list ?? []
        const total = res?.data?.total ?? 0
        setLists(old => old.concat(newLists))
        if (total > PAGE_SIZE && totalPage === 1) setTotalPage(Math.ceil(total / PAGE_SIZE))
      }
      setScrollLoading('')
    }
  }

  useEffect(() => {
    fetchData(1)
  }, [tab])

  const handleTabChange = val => {
    setTab(val)
    // 切换tab之后重置列表数据和总页数
    setLists([])
    setTotalPage(1)
    setPageNum(1)
  }

  const renderBillCurrencyByType = (num, type) => {
    const formatNum = formatCurrency(num ?? 0, 2)
    const text = type === BillLogTypeEnum.Add ? `+${formatNum}` : `-${formatNum}`
    return text
  }
  return (
    <div className={styles.scoped}>
      <NavigationBar
        label={t`features_settings_center_my_wallet_index_qhfusz53li`}
        url="/settings-center"
        extra={
          !isHideBindAccount && !loading ? (
            <Link href="/bind-account" className="text-base">
              {t`features_settings_center_bind_account_index_hmuz2srdow`}
            </Link>
          ) : null
        }
      />
      {loading ? (
        <div className="flex py-6 justify-center">
          <Spin />
        </div>
      ) : (
        <>
          <Header isHideTransferAssets={isHideTransferAssets} />
          <div className="h-2.5 bg-card_bg_color_01" />
          <Tabs value={tab.id} mode="line" tabList={tabList} onChange={handleTabChange} />
          <List
            scrollLoading={scrollLoading}
            onReachBottom={() => {
              const newPageNum = pageNum + 1
              setPageNum(newPageNum)
              fetchData(newPageNum)
            }}
            dataSource={lists}
            noDataElement={<ListEmpty />}
            render={(i, index) => (
              <List.Item key={index} className="border-line_color_02 !pl-0 !py-3 !pr-6">
                <div className="flex justify-between items-center">
                  <div>{i?.refRemark}</div>
                  <div className={i?.refType === BillLogTypeEnum.Add ? 'text-brand_color' : ''}>
                    {renderBillCurrencyByType(i?.totalChanged, i?.refType)}
                  </div>
                </div>
                <div className="text-text_color_03 text-xs mt-2">{formatDate(i?.createdByTime ?? 0)}</div>
              </List.Item>
            )}
          />
        </>
      )}
    </div>
  )
}
