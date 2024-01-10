import { YapiGetV1ImRedPackageGetPackageInfoData } from '@/typings/yapi/ImRedPackageGetPackageInfoV1GetApi'
import { useContext, createContext, ReactNode } from 'react'
import Icon from '@/components/icon'
import { RedPacketStatusEnum } from '@/plugins/im/constants'
import { Avatar } from '@nbit/arco'
import { Spin } from '@nbit/arco'
import { t } from '@lingui/macro'
import ChatAvatar from '@/components/chat-avatar'
import { OpenedEnvelopModal } from './opened-envelope-modal'
import { Receiver } from './receiver'
import style from './detail.module.css'
import { Score } from './score'
import { useRedPacketInfo } from './use-package-info'

const ctx = createContext<YapiGetV1ImRedPackageGetPackageInfoData | null>(null)
const Provider = ctx.Provider

export function Detail(props: { packageId: number; className?: string; children?: ReactNode; onClose?: () => void }) {
  const req = useRedPacketInfo(props.packageId)
  const data = req.data?.data
  return (
    <OpenedEnvelopModal onClose={props.onClose}>
      {data ? (
        <Provider value={data}>{props.children}</Provider>
      ) : (
        <div className="flex justify-center">
          <Spin />
        </div>
      )}
    </OpenedEnvelopModal>
  )
}
function usePackgeInfo() {
  return useContext(ctx)!
}
export function ReceivedAmount(props: { uid: string; className?: string }) {
  const data = usePackgeInfo()
  return (
    <Score
      className={props.className}
      score={data.receiveList?.find(i => String(i.uid) === props.uid)?.receiveAmount ?? 0}
    />
  )
}
export function ReceiverList() {
  const data = usePackgeInfo()
  const length = data.receiveList?.length
  if (length) {
    return (
      <div className="pl-6 pr-6 pt-4 pb-1">
        {data.receiveList?.map(receiver => (
          <Receiver
            underline={length > 1}
            key={receiver.uid}
            name={receiver.nickName ?? ''}
            url={receiver.avatarPath}
            time={`${receiver.createdByTime}`}
            score={receiver.receiveAmount ?? 0}
          />
        ))}
      </div>
    )
  }
  return null
}

export function Sender() {
  const data = usePackgeInfo()
  const remark = data.remark || t`features_messenger_chat_message_custom_red_pocket_message_hflxvdk0jj`
  return (
    <div className={style.sender}>
      <div className="grid-box">
        <ChatAvatar size={30} src={data.avatarPath} />
        <div className="sender">
          {data.nickName}
          {t`features_messenger_chat_red_envelope_detail_ztxmrjfhp7`}
        </div>

        <div className="bless">{remark}</div>
      </div>
    </div>
  )
}
export function RenderWithRedPacketInfo(props: {
  children: (data: YapiGetV1ImRedPackageGetPackageInfoData) => ReactNode
}) {
  return <>{props.children(usePackgeInfo())}</>
}

export function Tips() {
  const data = usePackgeInfo()
  let msg = ''
  if (data?.refTypeCd === 'single') {
    switch (data.statusInd) {
      case RedPacketStatusEnum.expired:
        msg = t`features_messenger_chat_red_envelope_detail_ceuh4nhbx6`
        break
      default:
        msg = t({
          id: 'features_messenger_chat_red_envelope_detail_8rtzqv9bjn',
          values: { 0: data.packageAmount },
        })
        break
    }
  } else {
    switch (data.statusInd) {
      case RedPacketStatusEnum.normal:
        msg = t({
          id: 'features_messenger_chat_red_envelope_detail_3r_veb9eps',
          values: { 0: data.yetCount, 1: data.packageCount, 2: data.residueAmount, 3: data.packageAmount },
        })
        break
      case RedPacketStatusEnum.received:
        msg = t({
          id: 'features_messenger_chat_red_envelope_detail_na3lthatfp',
          values: { 0: data.packageCount, 1: Number((data.complateTime ?? 0) / 6000).toFixed(0) },
        })
        break
      case RedPacketStatusEnum.expired:
        msg = t({
          id: 'features_messenger_chat_red_envelope_detail_qgn_ltza3n',
          values: { 0: data.yetCount, 1: data.packageCount, 2: data.residueAmount, 3: data.packageAmount },
        })
        break
      default:
        break
    }
  }
  return <div className={style.tips}>{msg}</div>
}
