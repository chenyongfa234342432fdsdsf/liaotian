import Icon from '@/components/icon'
import classNames from 'classnames'
import { t } from '@lingui/macro'
import Styles from './index.module.css'

export default function SystemSettingBar() {
  return (
    <div className={classNames(Styles['system-avatar'])}>
      <div className="notice-icon">
        <Icon name="icon_chat_notice" />
      </div>
      <span className="text">{t`features_system_announcement_components_system_session_index_rakngm1wgx`}</span>
    </div>
  )
}
