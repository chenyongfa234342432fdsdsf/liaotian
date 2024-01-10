import Icon from '@/components/icon'
import { link } from '@/helper/link'
import {
  BindAccountTypeEnum,
  getAddBankCardRoutePath,
  getAddAccountRoutePath,
  getMyWalletRoutePath,
  IsOpenEnum,
  getBindAccountTypeEnumLabel,
} from '@/constants/my-wallet'
import { useRequest, useToggle } from 'ahooks'
import { t } from '@lingui/macro'
import { getV1ImChatImWalletTrendsConfigApiRequest } from '@/apis/settings-center/wallet'
import { find } from 'lodash'
import { useBindAccountList } from '@/hooks/use-bind-account-list'
import { Spin } from '@nbit/arco'
import NavigationBar from '../navigation-bar'
import styles from './index.module.css'
import { BindTypeModal } from './bind-type-modal'
import { List } from './list'

export default function BindAccount() {
  const { thirdLists, bankLists, loading } = useBindAccountList()
  const { data, loading: configLoading } = useRequest(getV1ImChatImWalletTrendsConfigApiRequest)
  // 获取商户配置
  const configs = data?.data ?? []

  // 是否开放积分转移, 未开放时隐藏绑定第三方账户入口
  const isOpenPointsTransfer = find(configs, i => i.codeVal === 'isOpenPointsTransfer')?.enabledInd === IsOpenEnum.Yes

  const [visible, { toggle }] = useToggle()
  const handleConfirmSelect = val => {
    if (val === BindAccountTypeEnum.Third) {
      link(getAddAccountRoutePath())
    } else {
      link(getAddBankCardRoutePath())
    }
  }

  const handleAdd = () => {
    if (isOpenPointsTransfer) {
      toggle()
    } else {
      link(getAddBankCardRoutePath())
    }
  }
  return (
    <div className={styles.scoped}>
      <NavigationBar label={t`features_settings_center_bind_account_index_hmuz2srdow`} url={getMyWalletRoutePath()} />
      {loading || configLoading ? (
        <div className="flex justify-center py-6">
          <Spin />
        </div>
      ) : (
        <>
          <div onClick={handleAdd} className="cursor-pointer bg-card_bg_color_03 flex items-center px-6 py-4 mb-2.5">
            <span className="w-10 h-10 rounded-full mr-3 text-xl bg-brand_color flex items-center justify-center">
              <Icon className="add-icon" name="icon_set_new" />
            </span>
            <span>
              {isOpenPointsTransfer
                ? t`features_settings_center_bind_account_index_ooh7tnooc0`
                : getBindAccountTypeEnumLabel(BindAccountTypeEnum.Bank)}
            </span>
          </div>
          <List bankLists={bankLists} thirdLists={thirdLists} />
        </>
      )}

      <BindTypeModal visible={visible} onCancel={toggle} onSelect={handleConfirmSelect} />
    </div>
  )
}
