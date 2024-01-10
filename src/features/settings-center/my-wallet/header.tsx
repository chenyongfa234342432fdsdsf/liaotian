import Icon from '@/components/icon'
import { Button } from '@nbit/arco'
import { navigate } from 'vike/client/router'
import { useRequest, useToggle } from 'ahooks'
import { getV1ImUserBalanceGetBalanceInfoApiRequest } from '@/apis/balance'
import { formatCurrency } from '@/helper/decimal'
import { t } from '@lingui/macro'

export function Header({ isHideTransferAssets }: { isHideTransferAssets: boolean }) {
  const [assetsVisible, { toggle: toggleVisible }] = useToggle(true)
  const { data } = useRequest(getV1ImUserBalanceGetBalanceInfoApiRequest)

  const balance = data?.data?.balance ?? 0

  return (
    <div className="py-6 pl-6 pr-5 relative">
      <div className="text-text_color_02 text-sm mb-2">
        {t`features_settings_center_my_wallet_header_ofcflfdwky`}
        <Icon
          className="ml-2"
          name={assetsVisible ? 'icon_register_open' : 'icon_register_hide'}
          onClick={toggleVisible}
        />
      </div>
      <div className="flex justify-between">
        <div className="text-[32px] flex-1 whitespace-nowrap text-ellipsis overflow-hidden">
          {assetsVisible ? formatCurrency(balance, 2) : '******'}
        </div>
        {!isHideTransferAssets ? (
          <Button
            onClick={() => navigate('/transfer-assets')}
            className="!rounded-[45px] text-sm h-[38px] px-6 !py-2"
            type="primary"
          >{t`features_settings_center_my_wallet_header_koqigxpkjm`}</Button>
        ) : null}
      </div>
    </div>
  )
}
