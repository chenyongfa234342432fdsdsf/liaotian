import { Input } from '@nbit/arco'
import classNames from 'classnames'
import Icon from '@/components/icon'
import { useMemo, useState } from 'react'
import { useDebounce, useMount, useRequest, useUpdateEffect } from 'ahooks'
import { createPortal } from 'react-dom'
import { HOME_SEARCH_CONVERSATIONS_ID } from '@/constants/dom'
import { sortConversations, useSearchConversations } from '@/helper/conversation'
import AnnouncementCarousel from '@/features/announcement-center/components/announcement-carousel'
import { useImStore } from '@/store/im'
import { getConversationWithRemark, isSameUid } from '@/helper/address-book'
import { getImInstance } from '@/plugins/im/core'
import { IIMConversation, IIMConversationSearchInfo } from '@/plugins/im/types'
import { unionBy } from 'lodash'
import { t } from '@lingui/macro'
import { Conversation } from '../conversations/conversation'
import styles from './index.module.css'

function useConverSations(keyword: string) {
  const { conversations: allConversations } = useImStore()
  const [conversationListBySearch, setConversationListBySearch] = useState<IIMConversationSearchInfo[]>([])
  const zim = getImInstance()
  const conversationListWithContact = useSearchConversations(keyword)
  const { run: loadMore, loading } = useRequest(
    async () => {
      if (!keyword) {
        setConversationListBySearch([])
        return
      }
      const res = await zim.searchLocalConversations({
        // 搜索出来的结果应该不会太多，200 足够使用
        totalConversationCount: 200,
        keywords: [keyword],
        conversationMessageCount: 10,
        messageTypes: [],
        subMessageTypes: [],
        senderUserIDs: [],
        startTime: 0,
        endTime: 0,
      })
      setConversationListBySearch(res.conversationSearchInfoList)
    },
    {
      manual: true,
    }
  )
  useUpdateEffect(() => {
    loadMore()
  }, [keyword])
  const conversationList: IIMConversation[] = useMemo(() => {
    if (!keyword) {
      return []
    }
    // 通过消息搜索出来的，后面如果不需要，去掉即可
    const withMessageConversations = conversationListBySearch.map(conversationSearchInfo => {
      const conversation = allConversations.find(item => item.conversationID === conversationSearchInfo.conversationID)!
      return {
        ...conversation,
      }
    })
    // 通过名称搜索出来的，先通过消息搜索出来的去重，再映射为已有会话
    const withNameConversations = conversationListWithContact
      .filter(item => !withMessageConversations.find(message => isSameUid(message.conversationID, item.conversationID)))
      .map(conversationWithContact => {
        const conversation =
          allConversations.find(item => isSameUid(item.conversationID, conversationWithContact.conversationID)) || {}
        return { ...conversation, ...conversationWithContact }
      })

    const all = [...withMessageConversations, ...withNameConversations]
    return sortConversations(all).map(item => getConversationWithRemark(item))
  }, [allConversations, conversationListBySearch, keyword])

  return {
    conversationList,
    loadMore,
    loading,
  }
}
function List({ children }) {
  const el = document.querySelector(`#${HOME_SEARCH_CONVERSATIONS_ID}`)
  if (!el) {
    return null
  }
  return createPortal(children, el)
}
function MessengerSearch() {
  const [keyword, setKeyword] = useState('')
  const debounceKeyword = useDebounce(keyword, {
    wait: 300,
  })
  const { conversationList } = useConverSations(debounceKeyword)

  const [focused, setFocused] = useState(false)

  return (
    <div className={classNames(styles['search-wrapper'])}>
      <Input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={setKeyword}
        allowClear
        className="with-search"
        placeholder={t`features_group_components_search_input_index_tq98cmscdb`}
        prefix={<Icon name="icon_chat_search" className="text-icon_color text-xl/5" />}
      />
      <div
        className={classNames({
          hidden: conversationList.length > 0,
        })}
      >
        <AnnouncementCarousel />
      </div>

      {conversationList.length > 0 && (
        <List>
          <div className={styles['list-wrapper']}>
            {conversationList.map(conversation => {
              return <Conversation keyword={keyword} conversation={conversation} key={conversation.conversationID} />
            })}
          </div>
        </List>
      )}
    </div>
  )
}

export default MessengerSearch
