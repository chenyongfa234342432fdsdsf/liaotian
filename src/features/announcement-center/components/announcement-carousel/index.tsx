import { Carousel, Typography } from '@nbit/arco'
import { useEffect, useState } from 'react'
import { getHorseLamp } from '@/apis/announcement-center'
import { YapiGetV1ImHelpCenterHorseLampApiResponse } from '@/typings/yapi/ImHelpCenterHorseLampV1GetApi'
import Icon from '@/components/icon'
import { link } from '@/helper/link'
import { getAnnouncementArticleUrl, getAnnouncementPagePath } from '@/helper/route/announcement'
import cn from 'classnames'
import Styles from './index.module.css'

export default function AnnouncementCarousel() {
  const [lampList, setLampList] = useState<YapiGetV1ImHelpCenterHorseLampApiResponse['lampList']>([])
  /** 获取公告轮播图 */
  useEffect(() => {
    getHorseLamp({}).then(res => {
      if (res.isOk && res.data) {
        setLampList(res.data.lampList || [])
      }
    })
  }, [])
  return (
    <div className={cn(Styles['announcement-carousel'], { '!hidden': !lampList?.length })}>
      <div className="icon-chat-speaker ">
        <Icon className="text-[8px]" name="icon_chat_speaker" />
      </div>
      <div className="w-[100%] ">
        <Carousel direction="vertical" autoPlay showArrow="never" indicatorType="never">
          {lampList?.map((item, index) => (
            <Typography.Paragraph key={index} ellipsis>
              <div className="text-brand_color cursor-pointer" onClick={() => link(getAnnouncementArticleUrl(item.id))}>
                {item.name}
              </div>
            </Typography.Paragraph>
          ))}
        </Carousel>
      </div>
      <Icon className="text-sm ml-2" name="icon_chat_announcement" onClick={() => link(getAnnouncementPagePath())} />
    </div>
  )
}
