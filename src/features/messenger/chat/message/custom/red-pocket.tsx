import { t } from '@lingui/macro'
import { IIMMessageContentRedPocket, IIMMessageContentRedPocketReceive } from '@/plugins/im/types'

import { isSameUid } from '@/helper/address-book'
import { baseUserStore, useUserStore } from '@/store/user'
import { oss_svg_image_domain_address } from '@/constants/oss'
import { IMCustomMessageRefTypeCdEnum, RedPacketStatusEnum, ZIMMessageDirection } from '@/plugins/im/constants'
import { useState } from 'react'
import { getV1ImRedPackageGetPackageInfoApiRequest } from '@/apis/red-packet'
import { IMessageProps } from '../base'
import { SealedEnvelope } from '../../red-envelope/sealed-envelope'
import { ExpiredEnvelope } from '../../red-envelope/expired-envelope'
import { Detail, ReceiverList, Sender, Tips, ReceivedAmount, RenderWithRedPacketInfo } from '../../red-envelope/detail'
import { sepLine, sepLineWithMarginBlock } from '../../red-envelope/sep-line'
import { RedPocketInMessage } from './red-pocket-message'

export function RedPocketMessage({
  data,
  message,
  inConversation,
}: IMessageProps<undefined, IIMMessageContentRedPocket>) {
  const isSelf = message.direction === ZIMMessageDirection.Send

  if (data && !inConversation) {
    return isSelf ? <SentRedPocket uid={message.senderUserID} data={data} /> : <GotRedPocket data={data} />
  }

  return <div>{t`features_messenger_chat_message_custom_red_pocket_axvzvhydct`}</div>
}
// 我收到的红包消息
function GotRedPocket(props: { data: IIMMessageContentRedPocket }) {
  const { data } = props
  const [visibleModal, setVisibleModal] = useState<'sealed' | 'expired' | 'detail' | 'none'>('none')
  const user = useUserStore()
  const myUID = String(user.userInfo.uid)
  return (
    <>
      {visibleModal === 'expired' && <ExpiredEnvelope packageId={data.id} onClose={() => setVisibleModal('none')} />}
      {visibleModal === 'sealed' && (
        <SealedEnvelope
          packageId={data.id}
          visible
          onClose={() => setVisibleModal('none')}
          onReceived={() => setVisibleModal('detail')}
        />
      )}
      {visibleModal === 'detail' && (
        <Detail packageId={data.id} onClose={() => setVisibleModal('none')}>
          <Sender />
          <ReceivedAmount uid={myUID} />

          {data.refTypeCd !== IMCustomMessageRefTypeCdEnum.single ? (
            <>
              <div className="h-2 bg-card_bg_color_01 mt-5"></div>
              <Tips />
              {sepLine}
              <ReceiverList />
            </>
          ) : (
            <>
              {sepLineWithMarginBlock}
              <ReceiverList />
            </>
          )}
        </Detail>
      )}
      <RedPocketInMessage
        id={data.id}
        isSelf={false}
        onClick={async () => {
          const resp = await getV1ImRedPackageGetPackageInfoApiRequest({ packageId: `${data.id}` })
          if (resp.data) {
            if (resp.data.statusInd === RedPacketStatusEnum.expired) {
              if (data.refTypeCd === IMCustomMessageRefTypeCdEnum.single) {
                // 过期的个人红包，显示过期 Modal
                setVisibleModal('expired')
              } else {
                // 过期的群红包打开领取详情
                setVisibleModal('detail')
              }
              return
            }
            const received = resp.data?.receiveList?.some(item => String(item.uid) === myUID)
            if (!received && resp.data.statusInd === RedPacketStatusEnum.normal) {
              setVisibleModal('sealed')
            } else {
              setVisibleModal('detail')
            }
          }
        }}
      />
    </>
  )
}

// 我发的
function SentRedPocket(props: { uid: string; data: IIMMessageContentRedPocket }) {
  const { data } = props

  const [visibleModal, setVisibleModal] = useState<'sealed' | 'detail' | 'none'>('none')
  return (
    <>
      {visibleModal === 'detail' && (
        <Detail packageId={props.data.id} onClose={() => setVisibleModal('none')}>
          <Sender />
          {props.data.refTypeCd !== IMCustomMessageRefTypeCdEnum.single && (
            <>
              <ReceivedAmount uid={props.uid} />
              <div className="h-2 bg-card_bg_color_01 mt-5"></div>
            </>
          )}

          <Tips />
          <RenderWithRedPacketInfo>{data => (data.receiveList?.length ? sepLine : null)}</RenderWithRedPacketInfo>
          <ReceiverList />
        </Detail>
      )}
      {visibleModal === 'sealed' && (
        <SealedEnvelope
          visible
          packageId={props.data.id}
          onClose={() => setVisibleModal('none')}
          onReceived={() => setVisibleModal('detail')}
        />
      )}
      <RedPocketInMessage
        isSelf
        id={data.id}
        onClick={async () => {
          const resp = await getV1ImRedPackageGetPackageInfoApiRequest({ packageId: `${props.data.id}` })
          if (resp.data) {
            const { selfIfReceive, statusInd } = resp.data
            if (props.data.refTypeCd === IMCustomMessageRefTypeCdEnum.single) {
              setVisibleModal('detail')
            } else {
              if (!selfIfReceive && statusInd === RedPacketStatusEnum.normal) {
                setVisibleModal('sealed')
              } else {
                setVisibleModal('detail')
              }
            }
          }
        }}
      />
    </>
  )
}

export function RedPocketReceivedMessage({ data }: IMessageProps<undefined, IIMMessageContentRedPocketReceive>) {
  const userUid = baseUserStore.getState().userInfo.uid
  const senderIsSelf = isSameUid(data?.sendUid, userUid)
  const sender = senderIsSelf ? t`features_messenger_chat_message_custom_group_join_tkus6zotkt` : data?.sendNickName
  const receiverIsSelf = isSameUid(data?.uid, userUid)
  const receiver = receiverIsSelf ? t`features_messenger_chat_message_custom_group_join_tkus6zotkt` : data?.nickName
  const text = t({
    id: 'features_messenger_chat_message_custom_red_pocket_x4d_jpbmxe',
    values: { 0: receiver, 1: sender },
  })
  return (
    <div className="flex items-center text-text_color_02">
      <img className="w-4 mr-1" src={`${oss_svg_image_domain_address}image_little_red_envelope.png`} alt="" />
      <span
        className="message-text"
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      ></span>
    </div>
  )
}
