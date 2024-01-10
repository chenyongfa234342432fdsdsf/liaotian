import Icon from '@/components/icon'
import classNames from 'classnames'
import { t } from '@lingui/macro'
import LoadingElement from '@/components/loading-element'
import ListEmpty from '@/components/list-empty'
import { link } from '@/helper/link'

import { useNavigateOwnParams } from '@/hooks/use-navigate-own-params'
import ListItem from './components/list-item'
import Styles from './index.module.css'

export default function MessageList({ messageListData, loading, id }) {
  const { navigateOwnLink } = useNavigateOwnParams()

  const selectClick = selectData => {
    navigateOwnLink({ id: selectData?.id })
  }

  return (
    <div className={Styles['message-list']}>
      <p className="head">
        <div className="title">
          <Icon name="a-Notselected" onClick={() => link('/')} />
          <span>{t`features_announcement_center_components_message_list_index_x_ntlrzyyu`}</span>
        </div>
      </p>
      <div className="overflow-y-auto flex-1">
        {loading && (
          <div className="flex justify-center mt-5">
            <LoadingElement />
          </div>
        )}
        {!loading && !messageListData?.length ? (
          <ListEmpty />
        ) : (
          messageListData.map(i => {
            return (
              <div
                className={classNames('message-data', {
                  'is-select': id === i.id,
                })}
                key={i.id}
                onClick={() => selectClick(i)}
              >
                <ListItem itemData={i} isActive={false} />
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
