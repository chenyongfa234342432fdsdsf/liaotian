import { filter, find, map } from 'lodash'
import { useEffect, useState } from 'react'
import cn from 'classnames'
import { Button, Message, Input } from '@nbit/arco'
import Icon from '@/components/icon'
import { useRequest, useToggle } from 'ahooks'
import { CommonModal } from '@/components/common-modal'
import { Radio, RadioGroup } from '@/components/radio'
import { useBindAccountList } from '@/hooks/use-bind-account-list'
import { YapiGetV1ImChatUserBankCardListData } from '@/typings/yapi/ImChatUserBankCardListV1GetApi'
import {
  getV1ImWithdrawSettingGetCoinListApiRequest,
  postV1ImUserBalanceBankCardWithdrawApiRequest,
  postV1ImUserBalanceWithdrawApiRequest,
} from '@/apis/settings-center/wallet'
import { link } from '@/helper/link'
import { getV1ImUserBalanceGetBalanceInfoApiRequest } from '@/apis/balance'
import { t } from '@lingui/macro'
import { getMyWalletRoutePath } from '@/constants/my-wallet'
import { YapiGetV1ImChatImUserBindListData } from '@/typings/yapi/ImChatImUserBindListV1GetApi'
import ListEmpty from '@/components/list-empty'
import { PaymentPassword } from '@/features/messenger/chat/red-packet/payment-password'
import { filterOnlyNumbers } from '@/helper/input'
import NavigationBar from '../navigation-bar'
import styles from './index.module.css'

export default function TransferAssets() {
  const { thirdLists, bankLists } = useBindAccountList()
  const options = ['50', '100', '200', '300', '500', '1000']
  const [value, setValue] = useState('') // 提现积分数
  const accounts = [...thirdLists, ...bankLists]
  const [accountId, setAccountId] = useState(accounts[0]?.id)
  // 选择账户弹窗可见性
  const [visible, { toggle }] = useToggle(false)
  const { data } = useRequest(getV1ImUserBalanceGetBalanceInfoApiRequest)
  // 弹窗中选择的账户
  const [tempAccountId, setTempAccountId] = useState<string | null>(null)
  // 输入提现密码弹窗可见性
  const [pwdModalVisible, { toggle: togglePwdModalVisible }] = useToggle()

  useEffect(() => {
    // 初始化将实际选中的账户同步至弹窗中
    if (accountId) setTempAccountId(accountId)
  }, [accountId])

  const totalAssets = String(data?.data?.balance ?? '')

  useEffect(() => {
    // 从接口数据设置初始化选中的账户
    setAccountId([...thirdLists, ...bankLists][0]?.id)
  }, [thirdLists, bankLists])

  const handleQuickClick = val => () => {
    setValue(val)
  }

  const handleFillAll = () => {
    setValue(totalAssets)
  }

  // 根据账户类型渲染账户名称，区分三方账户和银行卡账户
  const renderAccountName = () => {
    if (!accounts.length) return '--'
    const accountInfo = find(accounts, i => i.id === accountId)

    const bankAccountName = `${(accountInfo as YapiGetV1ImChatUserBankCardListData)?.bankName} ${(
      accountInfo as YapiGetV1ImChatUserBankCardListData
    )?.cardNo?.slice(-4)}`
    const thirdAccountName =
      (accountInfo as YapiGetV1ImChatImUserBindListData)?.thirdNickName ?? t`features_settings_center_index_06mq_dgqgg`

    return (accountInfo as YapiGetV1ImChatImUserBindListData)?.thirdUid ? thirdAccountName : bankAccountName
  }

  // 发起提现
  const handleWithdraw = async () => {
    togglePwdModalVisible()
    const accountInfo = find(accounts, i => i.id === accountId)
    if ((accountInfo as YapiGetV1ImChatImUserBindListData)?.thirdUid) {
      // 第三方账户提现
      const coinRes = await getV1ImWithdrawSettingGetCoinListApiRequest({})
      if (coinRes.isOk) {
        const symbol = coinRes?.data?.[0]?.coinSymbol ?? ''
        const res = await postV1ImUserBalanceWithdrawApiRequest({
          symbol,
          monkeyUid: (accountInfo as YapiGetV1ImChatImUserBindListData)?.thirdUid,
          amount: Number(value),
        })
        if (res.isOk) link(getMyWalletRoutePath())
      } else {
        if (coinRes.message) Message.error(coinRes.message)
      }
    } else {
      // 银行卡账户提现
      const res = await postV1ImUserBalanceBankCardWithdrawApiRequest({ cardId: `${accountId}`, amount: Number(value) })
      if (res.isOk) link(getMyWalletRoutePath())
    }
  }

  const handleConfirmSelect = () => {
    if (tempAccountId) setAccountId(tempAccountId)
    toggle()
  }

  const handleCancelSelect = () => {
    // 回显实际选中账户
    if (accountId) setTempAccountId(accountId)
    toggle()
  }

  const handleInputAmount = (val: string) => {
    setValue(filterOnlyNumbers(val))
  }
  return (
    <div className={styles.scoped}>
      <NavigationBar label={t`features_settings_center_my_wallet_header_koqigxpkjm`} url="/my-wallet" />
      <div className="flex-1 overflow-y-scroll">
        <div className="bg-card_bg_color_03 px-6 py-4">
          <span className="text-text_color_02 text-sm">{t`features_settings_center_transfer_assets_index_mx9tmsn3be`}</span>
          <div className="flex justify-between mt-3">
            <span>{renderAccountName()}</span>
            <Icon onClick={toggle} name="icon_chat_arrow" />
          </div>
        </div>
        <div className="my-2.5 bg-card_bg_color_03 px-6 pt-5 pb-8">
          <div className="flex justify-between text-sm mb-4">
            <span>
              {t`features_settings_center_transfer_assets_index_oasfngk8rb`}
              {totalAssets}
            </span>
            <span className="text-text_color_02">
              1 {t`features_messenger_chat_red_envelope_receiver_pm1ruksqfc`} = 1 USDT
            </span>
          </div>
          <Input
            placeholder={t`features_settings_center_transfer_assets_index_cjrqb_ijkv`}
            value={value}
            suffix={
              <Button className="fill-all-btn" type="text" onClick={handleFillAll}>
                {t`features_settings_center_my_wallet_index_5foylhseih`}
              </Button>
            }
            onChange={handleInputAmount}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-card_bg_color_03">
          {map(options, i => (
            <div
              className={cn(
                'border rounded-lg text-center cursor-pointer',
                value === i ? 'text-brand_color border-brand_color' : 'border-line_color_02'
              )}
              onClick={handleQuickClick(i)}
            >
              {i}
            </div>
          ))}
        </div>
        {value && accountId ? (
          <div
            onClick={togglePwdModalVisible}
            className="my-8 text-2xl mx-auto w-11 h-11 rounded-full bg-brand_color flex items-center justify-center"
          >
            <Icon name="icon_chat_unread" className="submit-icon" />
          </div>
        ) : null}
      </div>
      <CommonModal
        onCancel={handleCancelSelect}
        onOk={handleConfirmSelect}
        visible={visible}
        title={t`features_settings_center_transfer_assets_index_h10ibsrh8v`}
        closable={false}
        className={styles.modal}
      >
        {!accounts.length ? (
          <ListEmpty />
        ) : (
          <RadioGroup direction="vertical" value={tempAccountId} onChange={setTempAccountId}>
            {map(accounts, (i, ind) => {
              return (i as YapiGetV1ImChatImUserBindListData)?.thirdUid ? (
                <label key={ind} className="flex mb-3 last:mb-0">
                  <Radio value={i.id} />
                  <div className="border-b border-line_color_02 flex-1 pb-3">
                    <div className="text-base">
                      {(i as YapiGetV1ImChatImUserBindListData).thirdNickName ??
                        t`features_settings_center_index_06mq_dgqgg`}
                    </div>
                    <span className="text-text_color_02">uid {(i as YapiGetV1ImChatImUserBindListData).thirdUid}</span>
                  </div>
                </label>
              ) : (
                <label key={ind} className="flex mb-3 last:mb-0">
                  <Radio value={i.id} />
                  <div className="border-b border-line_color_02 flex-1 pb-3">
                    <div className="text-base">{(i as YapiGetV1ImChatUserBankCardListData).cardHolder}</div>
                    <span className="text-text_color_02">
                      {(i as YapiGetV1ImChatUserBankCardListData)?.bankName}{' '}
                      {(i as YapiGetV1ImChatUserBankCardListData)?.cardNo?.slice(-4)}
                    </span>
                  </div>
                </label>
              )
            })}
          </RadioGroup>
        )}
      </CommonModal>
      {pwdModalVisible ? (
        <PaymentPassword
          money={Number(value)}
          balance={Number(totalAssets)}
          onCancel={togglePwdModalVisible}
          onConfirm={handleWithdraw}
        />
      ) : null}
    </div>
  )
}
