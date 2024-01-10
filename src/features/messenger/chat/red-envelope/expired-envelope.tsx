import { oss_svg_image_domain_address } from '@/constants/oss'
import { t } from '@lingui/macro'
import { Modal, ModalProps } from './modal'
import style from './sealed-envelope.module.css'
import { useRedPacketInfo } from './use-package-info'

export type ExpiredEnvelopeProps = ModalProps & {
  packageId: number
  onClose?: () => void
}
export function ExpiredEnvelope(props: ExpiredEnvelopeProps) {
  const req = useRedPacketInfo(props.packageId)
  const sender = req.data?.data?.nickName
  const { ...rest } = props
  return (
    <Modal visible {...rest} onClose={props.onClose}>
      <div
        style={{
          backgroundImage: `url(${oss_svg_image_domain_address}redpacket.svg)`,
        }}
        className={style.sealed}
      >
        <div className="sender">
          {sender}
          {t`features_messenger_chat_red_envelope_detail_ztxmrjfhp7`}
        </div>
        <div className="bless">
          {t`features_messenger_chat_red_envelope_expired_envelope_4tqt0cmyid`} 24{' '}
          {t`features_messenger_chat_red_envelope_expired_envelope_8txbckapdy`}
          <br />
          {t`features_messenger_chat_message_custom_red_pocket_message_uqobfipajg`}
        </div>
      </div>
    </Modal>
  )
}
