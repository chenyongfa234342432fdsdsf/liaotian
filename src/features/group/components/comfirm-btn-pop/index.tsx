import classNames from 'classnames'
import { Button } from '@nbit/arco'
import { t } from '@lingui/macro'
import Styles from './index.module.css'

type ConfirmBtnPopPropsType = {
  /** 标题 */
  title: string
  /** 主要内容 */
  content: string
  /** 取消事件 */
  cancelEvent: () => void
  /** 确认事件 */
  confirmEvent: () => void
  /** 是否 loading */
  loading?: boolean
}
export default function ConfirmBtnPop({
  title,
  content,
  cancelEvent,
  confirmEvent,
  loading = false,
}: ConfirmBtnPopPropsType) {
  return (
    <div className={Styles['confirm-btn-pop']}>
      <div className="title">{title}</div>
      <div className="content">{content}</div>
      <div className="btn-box">
        <Button className="cancel-btn" onClick={cancelEvent}>
          {t`features_group_components_comfirm_btn_pop_index_2sr1guu0iy`}
        </Button>
        <Button loading={loading} className="confirm-btn" onClick={confirmEvent}>
          {t`features_group_components_comfirm_btn_pop_index_hqzknhzo76`}
        </Button>
      </div>
    </div>
  )
}
