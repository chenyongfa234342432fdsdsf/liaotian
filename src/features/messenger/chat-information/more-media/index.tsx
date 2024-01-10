import Tabs from '@/components/tabs'
import { useContext, useState } from 'react'
import { ZIMMessageType } from '@/plugins/im/constants'
import { IIMFileMessage, IIMImageMessage, IIMVideoMessage } from '@/plugins/im/types'
import dayjs from 'dayjs'
import Icon from '@/components/icon'
import { isEmpty } from 'lodash'
import NoDataImage from '@/components/no-data-image'
import { formatMessageTimeGroup, getFileIcon, getFileSizeHuman } from '@/helper/message'
import { useSearchHistoryMessages } from '@/hooks/use-messages'
import { t } from '@lingui/macro'
import ListEmpty from '@/components/list-empty'
import { link } from '@/helper/link'
import { MediaItem } from '../chat-media'
import styles from './index.module.css'
import { UserChatInfoContext } from '..'

const tabList = [
  {
    title: t`features_messenger_chat_information_more_media_index_lggmbdjilv`,
    id: 0,
  },
  // {
  //   title: '链接',
  //   id: 1,
  // },
  {
    title: t`features_messenger_chat_input_input_more_7zskrz9nl6`,
    id: 2,
  },
]

function MoreMedia() {
  const [tab, settab] = useState(tabList[0])

  let TabContent = <MediaList />

  // if (tab.id === 1) TabContent = <LinksList messages={linkMessages as IIMFileMessage[]} />
  if (tab.id === 2) TabContent = <FileList />
  return (
    <div className={styles['more-media']}>
      <Tabs value={tab.id} mode="line" tabList={tabList} onChange={settab} />
      {TabContent}
    </div>
  )
}

function MediaList() {
  const contextUid = useContext(UserChatInfoContext)
  const { messages: m, scrollRef } = useSearchHistoryMessages([ZIMMessageType.Image, ZIMMessageType.Video], contextUid)
  const data =
    (m as (IIMImageMessage | IIMVideoMessage)[])?.reduce((a, c) => {
      const date = dayjs(c.timestamp).format('YYYY-MM')
      a[date] = a?.[date] ? [...a[date], c] : [c]
      return a
    }, {} as Record<string, (IIMImageMessage | IIMVideoMessage)[]>) || {}

  if (isEmpty(data)) return <ListEmpty />

  return (
    <div ref={scrollRef} className="mx-6 my-1.5 tab-content">
      {Object.keys(data).map(key => (
        <div key={key}>
          <div className="mb-2 text-xs">{key}</div>
          <div className="img-media-items">
            {data[key]?.map((media, idx) => (
              <MediaItem key={idx} {...media} size={112} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// function LinkItem(props: any) {
//   const { imgUrl, title, description, url, timestamp, fromUser } = props
//   return (
//     <div className={styles['link-item']}>
//       <div className="flex flex-row">
//         <LazyImage src={imgUrl} width={92} height={92} />
//         <div className="link-info-container">
//           <div className="text-sm">{title}</div>
//           <div className="text-text_color_02">{description}</div>
//           <div>{url}</div>
//         </div>
//       </div>
//       <a className="pl-3 truncate text-base" href={url}>
//         {url}
//       </a>
//       <div className="flex pr-3 text-text_color_03">
//         <span className="ml-auto">{timestamp}</span>
//         <span>来自：{fromUser}</span>
//       </div>
//     </div>
//   )
// }

// function LinksList({ messages }: { messages: IIMFileMessage[] }) {
//   const data =
//     messages?.reduce((a, c) => {
//       const date = dayjs(c.timestamp).format('YYYY-MM')
//       a[date] = a?.[date] ? [...a[date], c] : [c]
//       return a
//     }, {} as Record<string, IIMFileMessage[]>) || {}

//   return (
//     <div>
//       {Object.keys(data)?.map(key => (
//         <div key={key}>
//           <span className="mb-2 text-xs">{key}</span>
//           <div className="list-item-container">
//             {data[key]?.map((link, idx) => (
//               <LinkItem {...link} key={idx} />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

function FileItem(props: IIMFileMessage) {
  const { fileName, fileSize, timestamp, senderUserID, fileDownloadUrl, extendedData } = props
  const { fromNickname } = JSON.parse(extendedData || '')
  return (
    <div
      className={styles['file-item']}
      onClick={() => {
        if (!fileDownloadUrl) return
        link(fileDownloadUrl, {
          target: true,
        })
      }}
    >
      <Icon className="file-icon" name={getFileIcon(fileName)} />
      <div className="ml-4">
        <div className="text-text_color_01 text-sm mb-2">{fileName}</div>
        <span className="mr-2">{getFileSizeHuman(fileSize / 1000)}</span>
        <span className="mr-2">{formatMessageTimeGroup(timestamp)}</span>
        <span>
          {t`features_messenger_chat_information_more_media_index_ye6pfhlxzr`}
          {fromNickname || senderUserID}
        </span>
      </div>
    </div>
  )
}

function FileList() {
  const contextUid = useContext(UserChatInfoContext)
  const { messages: m, scrollRef } = useSearchHistoryMessages([ZIMMessageType.File], contextUid)
  const data =
    (m as IIMFileMessage[])?.reduce((a, c) => {
      const date = dayjs(c.timestamp).format('YYYY-MM')
      a[date] = a?.[date] ? [...a[date], c] : [c]
      return a
    }, {} as Record<string, IIMFileMessage[]>) || {}

  if (isEmpty(data)) return <ListEmpty />
  return (
    <div ref={scrollRef} className="mx-6 my-1.5 tab-content">
      {Object.keys(data)?.map(key => (
        <div key={key}>
          <div className="mb-2 text-xs">{key}</div>
          <div className="list-item-container">
            {data[key]?.map((file, idx) => (
              <FileItem {...(file as IIMFileMessage)} key={idx} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MoreMedia
