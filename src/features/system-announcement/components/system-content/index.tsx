import { oss_svg_image_domain_address } from '@/constants/oss'
import { getNoticeList } from '@/apis/announcement-center'
import { useMount } from 'ahooks'
import { useState } from 'react'
import { YapiGetV1ImHelpCenterNoticeListLampList } from '@/typings/yapi/ImHelpCenterNoticeListV1GetApi'
import { useCommonStore } from '@/store/common'
import SystemListItem from '../system-list-item'
import Styles from './index.module.css'

export default function SystemMessageContent() {
  const [systemMessageList, setSystemMessageList] = useState<YapiGetV1ImHelpCenterNoticeListLampList[]>([])
  const { theme } = useCommonStore()

  useMount(() => {
    getNoticeList({}).then(res => {
      if (res.isOk && res.data) {
        setSystemMessageList(res.data?.lampList || [])
      }
    })
  })
  return (
    <div
      className={Styles['system-content']}
      style={{
        backgroundImage: `url(${oss_svg_image_domain_address}icon_chat_bg_${theme}.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {systemMessageList.map(i => {
        return <SystemListItem key={i.id} itemData={i} />
      })}
    </div>
  )
}
