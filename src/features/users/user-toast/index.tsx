import { Message } from '@nbit/arco'
import styles from './index.module.css'

type Props = {
  content: string
}

function userToast(props: Props) {
  const { content } = props

  return Message.info({
    showIcon: false,
    content,
    className: styles.container,
    style: { top: '90px' },
  })
}

export { userToast }
