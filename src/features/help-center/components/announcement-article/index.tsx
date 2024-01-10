import { getArticleContent } from '@/apis/announcement-center'
import { useEffect, useState } from 'react'
import { formatDate } from '@/helper/date'
import { ImHelpCenterAnnouncementContentData } from '@/typings/apis/annoucement-center'
import { getSupportArticle } from '@/apis/help-center'
import LoadingElement from '@/components/loading-element'
import { usePageContext } from '@/hooks/use-page-context'
import Styles from './index.module.css'

export default function AnnouncementArticle({ id }) {
  const [articleData, setArticleData] = useState<any>({})

  const { helpCenterText } = articleData
  const [loading, setLoading] = useState(false)

  // 获取文章数据
  const getArticleData = articleId => {
    setLoading(true)

    getSupportArticle({ contentId: articleId }).then(res => {
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
            <h3>{helpCenterText?.name}</h3>
            <div className="date-time">{formatDate(helpCenterText?.pushTimeStramp || '')}</div>
          </div>
          <div className="article-html" dangerouslySetInnerHTML={{ __html: helpCenterText?.content || '' }}></div>
        </div>
      )}
    </div>
  )
}
