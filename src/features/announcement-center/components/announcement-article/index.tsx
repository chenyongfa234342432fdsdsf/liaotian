import { getArticleContent } from '@/apis/announcement-center'
import { useEffect, useState } from 'react'
import { formatDate } from '@/helper/date'
import { ImHelpCenterAnnouncementContentData } from '@/typings/apis/annoucement-center'
import { t } from '@lingui/macro'
import { usePageContext } from '@/hooks/use-page-context'
import { link } from '@/helper/link'
import LoadingElement from '@/components/loading-element'
import Styles from './index.module.css'

export default function AnnouncementArticle({ id }) {
  const [articleData, setArticleData] = useState<ImHelpCenterAnnouncementContentData>({})

  const { announcementCenter } = articleData
  const [loading, setLoading] = useState(false)
  // 获取文章数据
  const getArticleData = articleId => {
    setLoading(true)

    getArticleContent({ announceContentId: articleId }).then(res => {
      if (res.isOk && res.data) {
        setArticleData((res.data as ImHelpCenterAnnouncementContentData) || [])
      }
      setLoading(false)
    })
  }
  useEffect(() => {
    if (!id) return
    getArticleData(id)
  }, [id])

  return (
    <div className={Styles['announcement-article']}>
      {loading ? (
        <div className="flex justify-center items-center">
          <LoadingElement />
        </div>
      ) : (
        <div className="article-content">
          <div className="header">
            <h3>{announcementCenter?.name}</h3>
            <div className="date-time">{formatDate(announcementCenter?.pushTimeStramp || '')}</div>
          </div>
          <div className="article-html" dangerouslySetInnerHTML={{ __html: announcementCenter?.content || '' }}></div>
        </div>
      )}
    </div>
  )
}
