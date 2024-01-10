import { useRequest } from 'ahooks'
import { usePageContext } from '@/hooks/use-page-context'
import { YapiGetV1ImHelpCenterAnnouncementListDialogListData } from '@/typings/yapi/ImHelpCenterAnnouncementListV1GetApi'
import { getSupportMenu } from '@/apis/help-center'
import AnnouncementArticle from './components/announcement-article'
import styles from './index.module.css'
import HelperList from './components/helperList-list'

// 根据指定的字段将data扁平化
function flattenData(data, field) {
  if (!data.length) return []
  let res = []

  function fn(arr, result) {
    arr.forEach(item => {
      if (item[field] && item[field].length > 0) {
        fn(item[field], result)
      } else {
        result.push(item) // 将元素添加到结果数组中
      }
    })
  }

  fn(data, res)
  return res
}

export default function HelpCenter() {
  const { loading, data } = useRequest(getSupportMenu)
  const ctx = usePageContext()
  const urlParams = ctx?.urlParsed?.search?.id ?? ''
  const articleUrlId = urlParams.split('?')[0]
  const articleList: YapiGetV1ImHelpCenterAnnouncementListDialogListData[] = flattenData(
    data?.data?.dialogList || [],
    'catalogVOList'
  )
  const articleId = articleUrlId || articleList[0]?.id || ''
  return (
    <div className={styles['message-center']}>
      <div className="top-bg"></div>

      <div className="message-info">
        <div className="left-list">
          <HelperList articleList={articleList} loading={loading} id={articleId} />
        </div>
        <div className="right-content">
          <AnnouncementArticle id={articleId} />
        </div>
      </div>
    </div>
  )
}
