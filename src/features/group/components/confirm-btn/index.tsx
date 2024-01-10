import Icon from '@/components/icon'
import { Spin } from '@nbit/arco'
import Styles from './index.module.css'

export default function ConfirmBtn({ clickFunc, isLoading }: { clickFunc: () => void; isLoading: boolean }) {
  return (
    <div
      className={Styles['confirm-btn']}
      onClick={() => {
        if (isLoading) return
        clickFunc()
      }}
    >
      <Spin loading={isLoading}>
        <Icon name="icon_set_confirm" />
      </Spin>
    </div>
  )
}
