import { Modal } from '@nbit/arco'
import { oss_svg_image_domain_address } from '@/constants/oss'
import Icon from '@/components/icon'
import { ReactNode } from 'react'
import style from './opened-envelop-modal.module.css'

export type OpenedEnvelopModalProps = {
  children?: ReactNode
  onClose?: () => void
}
export function OpenedEnvelopModal(props: OpenedEnvelopModalProps) {
  return (
    <Modal simple visible className={style.opened} footer={null}>
      <div
        className="content"
        style={{
          backgroundImage: `url(${oss_svg_image_domain_address}opened-red-packet.svg)`,
        }}
      >
        <Icon className="icon" name="icon_chat_close" fontSize={20} onClick={props.onClose} />
        {props.children}
      </div>
    </Modal>
  )
}
