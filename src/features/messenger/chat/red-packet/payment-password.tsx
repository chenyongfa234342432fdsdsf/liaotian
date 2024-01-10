import Password from '@/features/settings-center/payment-password/pay-password-component'
import { useCallback, useState } from 'react'
import { useRequest } from 'ahooks'
import { getV1ImUserBalanceGetBalanceInfoApiRequest } from '@/apis/balance'
import { t } from '@lingui/macro'
import { formatCurrency } from '@/helper/decimal'
import { postV1ImChatImUserInfoVerifyPayPasswordApiRequest } from '@/apis/settings-center'
import { Message } from '@nbit/arco'
import decryption from '@/helper/ASE_RSA'
import { useUserStore } from '@/store/user'
import { UserIsSetPayPassword } from '@/constants/user'
import { RedPacketsModal } from './red-packets-modal'
import styles from './payment-password.module.css'

export function PaymentPassword(props: {
  money: number
  balance: number
  onCancel: () => void
  onConfirm: () => Promise<any>
}) {
  const [password, setPassword] = useState('')
  const confirmDisable = password.length !== 6
  const { userInfo } = useUserStore()
  const { run, loading } = useRequest(
    async () => {
      if (password.length === 6) {
        if (userInfo.isSetPayPassword === UserIsSetPayPassword.no) {
          Message.error(t`features_messenger_chat_red_packet_payment_password_av6cebmpop`)
          return
        }
        const resp = await postV1ImChatImUserInfoVerifyPayPasswordApiRequest({
          payPassword: decryption.encryptAES(password, true),
        })
        if (resp.data?.success) {
          await props.onConfirm()
        } else {
          Message.error(t`features_messenger_chat_red_packet_payment_password_ii2obi7iva`)
        }
      }
    },
    {
      manual: true,
    }
  )

  return (
    <RedPacketsModal
      title={t`features_messenger_chat_red_packet_payment_password_oh0jm5naa7`}
      confirmString={t`features_group_components_comfirm_btn_pop_index_hqzknhzo76`}
      onCancel={props.onCancel}
      onConfirm={run}
      className={styles['payment-password-modal']}
      disabled={confirmDisable}
      loading={loading}
    >
      <div className="content">
        <div className="money">{Number(props.money).toFixed(2)}</div>
        <div className="points">{t`features_messenger_chat_red_envelope_receiver_pm1ruksqfc`}</div>
        <div className="payment-method">
          <span>{t`features_messenger_chat_red_packet_payment_password_sg4gbp4ul7`}</span>
          <span>
            {t`features_messenger_chat_red_packet_payment_password_rd0sfg4sbs`}(
            <span className={props.money <= props.balance ? 'balance-enough' : 'balance-not-enough'}>
              {t`features_messenger_chat_red_packet_payment_password_agvd0xlm9j`}
              {formatCurrency(props.balance)}
            </span>
            )
          </span>
        </div>
      </div>
      <Password onComplete={setPassword} />
    </RedPacketsModal>
  )
}
