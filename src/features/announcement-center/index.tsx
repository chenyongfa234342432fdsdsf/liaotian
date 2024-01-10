import { useMemo } from 'react'
import { useRequest } from 'ahooks'
import { getMessageCenterList } from '@/apis/announcement-center'
import { usePageContext } from '@/hooks/use-page-context'
import { YapiGetV1ImHelpCenterAnnouncementListAnnouncementTextVOListDialogListData } from '@/typings/yapi/ImHelpCenterAnnouncementListV1GetApi'
import { flatMap } from 'lodash'
import AnnouncementArticle from './components/announcement-article'
import MessageList from './components/message-list'
import styles from './index.module.css'

export default function Article() {
  const { loading, data } = useRequest(getMessageCenterList)

  const ctx = usePageContext()

  // 左侧菜单展示二级目录，隐藏一级目录
  const messageListData: YapiGetV1ImHelpCenterAnnouncementListAnnouncementTextVOListDialogListData[] = useMemo(
    () =>
      flatMap(data?.data?.dialogList || [], i => i?.announcementTextVOList ?? []).sort(
        (a, b) => b.pushTimeStramp - a.pushTimeStramp
      ),
    [data]
  )

  const articleId = ctx?.urlParsed?.search?.id || messageListData[0]?.id || ''
  return (
    <div className={styles['message-center']}>
      <div className="top-bg"></div>

      <div className="message-info">
        <div className="left-list">
          <MessageList messageListData={messageListData} loading={loading} id={articleId} />
        </div>
        <div className="right-content">
          <AnnouncementArticle id={articleId} />
        </div>
      </div>
    </div>
  )
}
