import { oss_svg_image_domain_address } from '@/constants/oss'
import { postV1ImRedPackageReceiveApiRequest } from '@/apis/red-packet'
import { t } from '@lingui/macro'
import { Modal, ModalProps } from './modal'
import style from './sealed-envelope.module.css'
import { useRedPacketInfo } from './use-package-info'

export type SealedEnvelopeProps = ModalProps & {
  packageId: number
  onReceived?: () => void
}
export function SealedEnvelope(props: SealedEnvelopeProps) {
  const { onReceived, ...rest } = props
  const req = useRedPacketInfo(props.packageId)
  const remark = req.data?.data?.remark || t`features_messenger_chat_message_custom_red_pocket_message_hflxvdk0jj`
  const handleOpen = async () => {
    const resp = await postV1ImRedPackageReceiveApiRequest({
      packageId: props.packageId,
    })
    if (resp.isOk) {
      props.onReceived?.()
    }
  }
  const sender = req.data?.data?.nickName

  return (
    <Modal {...rest}>
      <div
        role="button"
        tabIndex={0}
        onClick={handleOpen}
        style={{
          backgroundImage: `url(${oss_svg_image_domain_address}redpacket.svg)`,
        }}
        className={style.sealed}
      >
        {sender && (
          <div className="sender">
            {sender}
            {t`features_messenger_chat_red_envelope_detail_ztxmrjfhp7`}
          </div>
        )}
        <div className="bless ">{remark}</div>
      </div>
    </Modal>
  )
}
