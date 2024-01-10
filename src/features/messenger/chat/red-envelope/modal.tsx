import Icon from '@/components/icon'
import { Button, Modal as ArcoModal } from '@nbit/arco'
import { ReactNode } from 'react'
import style from './modal.module.css'

export type ModalProps = {
  visible?: boolean
  onClose?: () => void
  children?: ReactNode
}

export function Modal(props: ModalProps) {
  return (
    <ArcoModal className={style.modal} simple visible={props.visible} footer={null}>
      <div className={'content'}>
        {props.children}
        <div role="button" tabIndex={0} onClick={props.onClose} className="close-btn">
          <Icon fontSize={32} className="icon text-icon_color" name="icon_set_logout" />
        </div>
      </div>
    </ArcoModal>
  )
}
