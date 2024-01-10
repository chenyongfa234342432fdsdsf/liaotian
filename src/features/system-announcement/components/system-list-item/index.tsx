import Icon from '@/components/icon'
import { formatDate } from '@/helper/date'
import { t } from '@lingui/macro'
import Styles from './index.module.css'

export default function SystemListItem({ itemData }) {
  const monthText = t`features_system_announcement_components_system_list_item_index_kdldzmhb1s`
  const dayText = t`features_system_announcement_components_system_list_item_index_tedq6qrzcy`
  return (
    <div className={Styles['system-item']}>
      <span className="date">
        {`${String(formatDate(itemData.pushTimeStramp, 'MM-DD')).replace('-', monthText)}`}
        {dayText}
      </span>
      <div className="content-box">
        <div className="flex items-center">
          <div className="icon-chat-box">
            <Icon name="icon_chat_speaker" />
          </div>
          <span className="title">{itemData?.name || '--'}</span>
        </div>
        <div className="article">{itemData.content}</div>
      </div>
    </div>
  )
}
