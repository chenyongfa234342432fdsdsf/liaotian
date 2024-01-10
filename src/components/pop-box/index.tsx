import { Modal, ModalProps } from '@nbit/arco'
import { renderRoot } from '@/helper/render'
import { ReactNode } from 'react'
import { t } from '@lingui/macro'
import Styles from './index.module.css'

export type PopBoxProps = {
  visible: boolean
  title?: string
  content: ReactNode
  onClose: () => void
  onCommit: () => void
} & Pick<ModalProps, 'cancelText' | 'okText'>

function PopBox({
  visible,
  title = t`helper_message_fugvl05ct4`,
  content,
  onClose,
  onCommit,
  okText = t`components_pop_box_index_xjmp7i51ci`,
  cancelText = t`features_group_components_comfirm_btn_pop_index_2sr1guu0iy`,
  ...rest
}: PopBoxProps) {
  const handleCancel = () => {
    return onClose?.()
  }

  const handleOk = () => {
    return onCommit?.()
  }

  return (
    <Modal
      className={Styles.popbox}
      closable={false}
      title={<div style={{ textAlign: 'left' }}>{title}</div>}
      visible={visible}
      onCancel={handleCancel}
      onOk={handleOk}
      okText={okText}
      cancelText={cancelText}
      {...rest}
    >
      <p>{content}</p>
    </Modal>
  )
}

export async function popBoxConfirm(
  title: string,
  content: ReactNode | ((onClose: () => void) => ReactNode),
  config: ModalProps = {}
) {
  return new Promise((resolve, reject) => {
    renderRoot(unmount => {
      // prevent killing queued async functions before unmounting
      const asyncUnmount = () =>
        setTimeout(() => {
          unmount()
        })
      const onConfirm = () => {
        asyncUnmount()
        resolve({})
      }
      const onClose = () => {
        asyncUnmount()
        reject()
      }
      return (
        <PopBox
          onClose={onClose}
          {...config}
          onCommit={onConfirm}
          visible
          title={title}
          content={<span className="text-base">{typeof content === 'function' ? content(onClose) : content}</span>}
        />
      )
    })
  })
}
/** 确认之后需要请求接口的的使用这个函数，可以加入 loading，传入返回 promise 的 onCommit 即可 */
export async function popBoxConfirmWithLoading({
  onCommit: propsConCommit,
  content,
  ...props
}: Omit<PopBoxProps, 'onClose' | 'visible'>) {
  return new Promise((resolve, reject) => {
    renderRoot(unmount => {
      const onConfirm = async () => {
        await propsConCommit?.()
        unmount()
        resolve({})
      }
      const onClose = () => {
        reject()
        unmount()
      }
      return (
        <PopBox
          content={<span className="text-base">{content}</span>}
          onClose={onClose}
          {...props}
          onCommit={onConfirm}
          visible
        />
      )
    })
  })
}

export default PopBox
