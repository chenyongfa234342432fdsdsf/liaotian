import { useImStore } from '@/store/im'
import { ZIMConversationType } from '@/plugins/im/constants'
import Tabs from '@/components/tabs'
import { Input, InputNumber } from '@nbit/arco'
import { useEffect, useState } from 'react'
import { postV1ImRedPackageSendApiRequest } from '@/apis/red-packet'
import { YapiPostV1ImRedPackageSendApiRequest as RedPacketSendRequest } from '@/typings/yapi/ImRedPackageSendV1PostApi'
import { ZIMConversation } from 'zego-zim-web'
import Icon from '@/components/icon'
import produce from 'immer'
import { useRequest } from 'ahooks'
import { getV1ImUserBalanceGetBalanceInfoApiRequest } from '@/apis/balance'
import { t } from '@lingui/macro'
import { getV1ImChatGroupInfoApiRequest } from '@/apis/group'
import { setLocale } from '@/helper/i18n'
import classNames from 'classnames'
import { RedPacketType } from './red-packet'
import { PaymentPassword } from './payment-password'
import styles from './send-red-packets.module.css'
import { RedPacketsModal } from './red-packets-modal'

type Steps = 'create' | 'password'

export function RedPackets(props: { onCancel: () => void }) {
  const { currentConversation } = useImStore()
  return (
    <>
      {currentConversation?.type === ZIMConversationType.Peer && (
        <PeerRedPackets onCancel={props.onCancel} id={currentConversation.conversationID} />
      )}
      {currentConversation?.type === ZIMConversationType.Group && (
        <GroupRedPackets onCancel={props.onCancel} id={currentConversation.conversationID} />
      )}
    </>
  )
}
function PeerRedPackets(props: { onCancel: () => void; id: string }) {
  const [steps, setSteps] = useState<Steps>('create')
  const [money, setMoney] = useState(0)
  const [remark, setRemark] = useState('')
  const { data: balanceInfo } = useRequest(async () => {
    const resp = await getV1ImUserBalanceGetBalanceInfoApiRequest({})
    return resp.data
  })
  const balance = balanceInfo?.balance ?? 0
  const handleSendRedPacket = async () => {
    const param: RedPacketSendRequest = {
      refTypeCd: RedPacketType.single,
      receiveUid: +props.id,
      receiveGroupId: 0,
      packageAmount: Number(money),
      packageCount: 1,
      remark: remark || t`features_messenger_chat_message_custom_red_pocket_message_hflxvdk0jj`,
    }
    const resp = await postV1ImRedPackageSendApiRequest(param)
    if (resp.isOk) {
      props.onCancel()
    } else {
      setSteps('create')
    }
  }
  return (
    <>
      {steps === 'create' && (
        <RedPacketsModal
          title={t`features_messenger_chat_red_packet_send_red_packets_z0fiaf8eop`}
          confirmString={t`features_messenger_chat_red_packet_send_red_packets_27i3mrstf8`}
          onCancel={props.onCancel}
          onConfirm={() => setSteps('password')}
          className={classNames(styles['peer-red-packet'], styles['red-packet-input'])}
          disabled={Number(money) <= 0}
        >
          <InputNumber
            hideControl
            className={'money-input'}
            onChange={value => {
              setMoney(value)
            }}
            prefix={
              <span className={'input-str'}>{t`features_messenger_chat_red_packet_send_red_packets_vyt_sybkxq`}</span>
            }
            placeholder="0.00"
          />
          <Input
            className={styles.input}
            value={remark}
            onChange={value => {
              setRemark(value)
            }}
            placeholder={t`features_messenger_chat_message_custom_red_pocket_message_hflxvdk0jj`}
          />
        </RedPacketsModal>
      )}
      {steps === 'password' && (
        <PaymentPassword money={+money} balance={balance} onCancel={props.onCancel} onConfirm={handleSendRedPacket} />
      )}
    </>
  )
}

type GroupRedPacket =
  | {
      type: RedPacketType.groupNormal
      number: string
      singleAmount: number
      // totalAmount: string
      remark: string
    }
  | {
      type: RedPacketType.groupRandom
      number: string
      totalAmount: number
      remark: string
    }

function GroupRedPackets(props: { onCancel: () => void; id: string }) {
  const [steps, setSteps] = useState<Steps>('create')
  const [redPacketInfo, setRedPacketInfo] = useState<GroupRedPacket>({
    type: RedPacketType.groupNormal,
    number: '',
    singleAmount: 0,
    remark: '',
  })
  const { data: groupData } = useRequest(async () => getV1ImChatGroupInfoApiRequest({ groupId: props.id }))
  const { data: balanceInfo } = useRequest(async () => {
    const resp = await getV1ImUserBalanceGetBalanceInfoApiRequest({})
    return resp.data
  })
  const balance = balanceInfo?.balance ?? 0
  const redPacketType = redPacketInfo.type
  const totalAmount =
    redPacketInfo.type === RedPacketType.groupNormal
      ? +redPacketInfo.number * +redPacketInfo.singleAmount
      : Number(redPacketInfo.totalAmount)
  const disabled =
    redPacketType === RedPacketType.groupNormal
      ? redPacketInfo.number === '' || redPacketInfo.singleAmount === 0
      : redPacketInfo.number === '' || redPacketInfo.totalAmount === 0

  const handleSendRedPacket = async () => {
    const param: RedPacketSendRequest = {
      refTypeCd: redPacketType,
      receiveUid: 0,
      // groupId 长度超过 number 的范围，后端让先传 string
      receiveGroupId: props.id as any,
      packageAmount: totalAmount,
      packageCount: Number(redPacketInfo.number),
      remark: redPacketInfo.remark || t`features_messenger_chat_message_custom_red_pocket_message_hflxvdk0jj`,
    }
    const resp = await postV1ImRedPackageSendApiRequest(param)
    if (resp.isOk) {
      props.onCancel()
    } else {
      setSteps('create')
    }
  }

  return (
    <>
      {steps === 'create' && (
        <RedPacketsModal
          title={t`features_messenger_chat_red_packet_send_red_packets_z0fiaf8eop`}
          confirmString={t`features_messenger_chat_red_packet_send_red_packets_27i3mrstf8`}
          onCancel={props.onCancel}
          onConfirm={() => setSteps('password')}
          className={classNames(styles['group-red-packet'], styles['red-packet-input'])}
          disabled={disabled}
        >
          <div className="red-type">
            <div
              role="button"
              tabIndex={0}
              className={redPacketType === RedPacketType.groupNormal ? 'is-select' : ''}
              onClick={() => {
                const info: GroupRedPacket = {
                  type: RedPacketType.groupNormal,
                  number: '',
                  singleAmount: 0,
                  remark: '',
                }
                setRedPacketInfo(info)
              }}
            >{t`features_messenger_chat_red_packet_send_red_packets_fcr9ejmtxj`}</div>
            <div
              className={redPacketType === RedPacketType.groupRandom ? 'is-select' : ''}
              role="button"
              tabIndex={0}
              onClick={() => {
                const info: GroupRedPacket = {
                  type: RedPacketType.groupRandom,
                  number: '',
                  totalAmount: 0,
                  remark: '',
                }
                setRedPacketInfo(info)
              }}
            >{t`features_messenger_chat_red_packet_send_red_packets_vlw8ihvde1`}</div>
          </div>
          <InputNumber
            className="rtl"
            hideControl
            prefix={
              <span className={'input-str'}>
                <Icon className="text-xl mr-3 red-packet-icon" name="icon_chat_red_envelope" />
                <span>{t`features_messenger_chat_red_packet_send_red_packets_bpqwbaxeeg`}</span>
              </span>
            }
            suffix={
              <span className="input-str">{t`features_messenger_chat_red_packet_send_red_packets_jfoafvqyxl`}</span>
            }
            placeholder="0"
            value={redPacketInfo.number === '' ? undefined : Number(redPacketInfo.number)}
            onChange={num => {
              const info = produce(redPacketInfo, draft => {
                draft.number = String(num)
              })
              setRedPacketInfo(info)
            }}
          />

          <div className="total-count">
            {t`features_messenger_chat_red_packet_send_red_packets_vztd6_yzns`} {groupData?.data?.groupData.number}
            {t`features_messenger_chat_red_packet_send_red_packets_7mmocspv46`}
          </div>

          {redPacketType === RedPacketType.groupNormal && (
            <InputNumber
              hideControl
              className={'rtl'}
              onChange={value => {
                const info = produce(redPacketInfo, draft => {
                  draft.singleAmount = value
                })
                setRedPacketInfo(info)
              }}
              prefix={
                <span className={'input-str'}>{t`features_messenger_chat_red_packet_send_red_packets_vyt_sybkxq`}</span>
              }
              placeholder="0.00"
            />
          )}
          {redPacketType === RedPacketType.groupRandom && (
            <InputNumber
              hideControl
              className={'rtl'}
              onChange={value => {
                const info = produce(redPacketInfo, draft => {
                  draft.totalAmount = value
                })
                setRedPacketInfo(info)
              }}
              prefix={
                <span className={'input-str'}>
                  <Icon className="text-xl mr-3 group-normal-icon" name="icon_chat_lump_sum" />
                  {t`features_messenger_chat_red_packet_send_red_packets_vzfrzbjjig`}
                </span>
              }
              placeholder="0.00"
            />
          )}
          <Input
            className={classNames('text-input', styles.input)}
            value={redPacketInfo.remark}
            onChange={value => {
              const info = produce(redPacketInfo, draft => {
                draft.remark = value
              })
              setRedPacketInfo(info)
            }}
            placeholder={t`features_messenger_chat_message_custom_red_pocket_message_hflxvdk0jj`}
          />
        </RedPacketsModal>
      )}
      {steps === 'password' && (
        <PaymentPassword
          money={Number(totalAmount)}
          balance={balance}
          onCancel={props.onCancel}
          onConfirm={handleSendRedPacket}
        />
      )}
    </>
  )
}
