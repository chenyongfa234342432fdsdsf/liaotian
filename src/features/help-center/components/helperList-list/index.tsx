import Icon from '@/components/icon'
import classNames from 'classnames'
import { t } from '@lingui/macro'
import LoadingElement from '@/components/loading-element'
import ListEmpty from '@/components/list-empty'
import { link } from '@/helper/link'
import { usePageContext } from '@/hooks/use-page-context'
import { useNavigateOwnParams } from '@/hooks/use-navigate-own-params'
import Styles from './index.module.css'
import ListItem from './components/list-item'

export default function HelperList({ articleList, loading, id }) {
  const { navigateOwnLink } = useNavigateOwnParams()
  const selectClick = selectData => {
    navigateOwnLink({ id: selectData.id })
  }

  const ctx = usePageContext()
  const searchParams = ctx?.urlParsed?.search?.id ?? ''

  let backUrl = searchParams.split('?')[1]?.split('=')[1]

  return (
    <div className={Styles['message-list']}>
      <p className="head">
        <div className="title">
          <Icon name="a-Notselected" onClick={() => link(backUrl || '/')} />
          <span>{t`features_help_center_components_helperlist_list_index_niy4vxif4k`}</span>
        </div>
      </p>
      <div className="overflow-y-auto flex-1">
        {loading && (
          <div className="flex justify-center mt-5">
            <LoadingElement />
          </div>
        )}
        {!loading && !articleList?.length ? (
          <ListEmpty />
        ) : (
          articleList.map(i => {
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
