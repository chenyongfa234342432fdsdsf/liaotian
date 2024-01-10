import { Button } from '@nbit/arco'
import { createPortal } from 'react-dom'
import classNames from 'classnames'
import styles from './index.module.css'

export default function MaskSecondConfirm({ children }) {
  return createPortal(<div className={classNames(styles['full-screen-loading'])}>{children}</div>, document.body)
}
