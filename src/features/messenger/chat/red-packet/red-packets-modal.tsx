import { Button, Modal } from '@nbit/arco'
import classNames from 'classnames'
import { t } from '@lingui/macro'
import styles from './red-packets-modal.module.css'

export function RedPacketsModal(props: {
  title: string
  confirmString: string
  children: React.ReactNode
  onCancel: () => void
  onConfirm: () => void
  disabled?: boolean
  className?: string
  loading?: boolean
}) {
  return (
    <Modal
      className={classNames(styles['red-packets-modal'], props.className)}
      visible
      simple
      title={<span className="title">{props.title}</span>}
      footer={
        <div className="footer">
          <Button className={'btn'} onClick={props.onCancel}>
            {t`features_group_components_comfirm_btn_pop_index_2sr1guu0iy`}
          </Button>
          <Button loading={props.loading} className={'btn red'} onClick={props.onConfirm} disabled={props.disabled}>
            {props.confirmString}
          </Button>
        </div>
      }
    >
      {props.children}
    </Modal>
  )
}
