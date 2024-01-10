import { useMessengerRightDrawer } from '@/hooks/use-messenger-right-drawer'
import { Input } from '@/components/input'
import Icon from '@/components/icon'
import { useRef, useState } from 'react'
import { t } from '@lingui/macro'
import { useDebounce, useInfiniteScroll, useRequest, useUpdateEffect } from 'ahooks'
import { getImInstance } from '@/plugins/im/core'
import { baseImStore, useImStore } from '@/store/im'
import { ZIMMessageOrder, ZIMMessageType } from '@/plugins/im/constants'
import { Spin } from '@nbit/arco'
import { ZIMMessage } from 'zego-zim-web'
import { useDisplayMessages } from '@/hooks/use-messages'
import { Empty } from './empty'
import { MessageList } from './message-list'
import style from './index.module.css'
import { MessengerRightNavBar } from '../messenger-right-drawer'

export function SearchMessage(props: { onClose: () => void }) {
  const zim = getImInstance()
  const { onClose } = props
  const [keyword, setKeyword] = useState('')
  const { currentConversation } = useImStore()
  const { conversationID, type } = currentConversation!
  const ref = useRef<HTMLDivElement>(null)
  const debounceKeyword = useDebounce(keyword, {
    wait: 300,
  })
  const { data, loading, loadingMore, reload } = useInfiniteScroll<{ list: ZIMMessage[]; nextMessage?: ZIMMessage }>(
    async d => {
      if (keyword === '') {
        return { list: [] }
      }
      const resp = await zim.searchLocalMessages(conversationID, type, {
        count: 20,
        keywords: [debounceKeyword],
        senderUserIDs: [],
        messageTypes: [ZIMMessageType.Text, ZIMMessageType.File],
        subMessageTypes: [],
        startTime: 0,
        endTime: 0,
        order: ZIMMessageOrder.Descending,
        nextMessage: d?.nextMessage,
      })
      return {
        list: resp.messageList,
        nextMessage: resp.nextMessage,
      }
    },
    {
      target: ref,
      isNoMore: d => d?.nextMessage === undefined,
    }
  )
  useUpdateEffect(() => {
    reload()
  }, [debounceKeyword])
  const message = useDisplayMessages(data?.list ?? [])
  return (
    <div className={style['search-message-box']}>
      <MessengerRightNavBar
        title={t`features_messenger_search_message_index_0kaub4zzrz`}
        onClose={onClose}
        isCloseIcon
      />
      <div className="content bg-slate-500">
        <Input
          className={'with-search search-input '}
          onChange={value => {
            setKeyword(value)
          }}
          allowClear
          placeholder={t`features_group_components_search_input_index_tq98cmscdb`}
          prefix={<Icon name="icon_chat_search" className="text-icon_color" />}
        />
        {data?.list && data.list.length > 0 ? (
          <div className="list-box" ref={ref}>
            <MessageList messages={message} keyword={keyword} />
            {loadingMore && <Spin />}
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  )
}
