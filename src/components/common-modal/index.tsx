import { Modal } from '@nbit/arco'
import cn from 'classnames'
import { t } from '@lingui/macro'
import styles from './index.module.css'

export function CommonModal(props) {
  const { children, className, ...rest } = props
  return (
    <Modal
      okText={t`components_pop_box_index_xjmp7i51ci`}
      cancelText={t`features_group_components_comfirm_btn_pop_index_2sr1guu0iy`}
      closable={false}
      className={cn(styles.scoped, className)}
      {...rest}
    >
      {children}
    </Modal>
  )
}
