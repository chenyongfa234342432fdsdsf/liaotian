import classNames from 'classnames'
import LazyImage from '@/components/lazy-image'
import Icon from '@/components/icon'
import { getlastNewNotice } from '@/apis/announcement-center'
import { useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { formatDate } from '@/helper/date'
import { YapiGetV1ImHelpCenterNoticeLatestApiResponse } from '@/typings/yapi/ImHelpCenterNoticeLatestV1GetApi'
import Styles from './index.module.css'

type SystemSessionProps = {
  isActive?: boolean
}
export default function SystemSession({ isActive = false }: SystemSessionProps) {
  const [lastNoticle, setLastNoticle] = useState('')
  const [noticleData, setNoticleData] = useState<YapiGetV1ImHelpCenterNoticeLatestApiResponse>(
    {} as YapiGetV1ImHelpCenterNoticeLatestApiResponse
  )
  useEffect(() => {
    getlastNewNotice({}).then(res => {
      const { isOk, data } = res
      if (isOk && data) {
        setLastNoticle(data.content || '')
        setNoticleData(data)
      }
    })
  }, [])
  return (
    <div
      className={classNames(Styles['system-session'], {
        active: isActive,
      })}
    >
      <div className="icon-img">
        <Icon name="icon_chat_notice" />
      </div>
      <div className="system-content">
        <div className="title">
          {t`features_system_announcement_components_system_session_index_rakngm1wgx`}
          <span className="time">{formatDate(noticleData?.pushTimeStramp, 'HH:mm')}</span>
        </div>
        <div className="content">{lastNoticle}</div>
      </div>
    </div>
  )
}
