import pinyin from 'pinyin'
import { link } from '@/helper/link'
import { Fragment, ReactNode, useEffect, useMemo, useState } from 'react'
import { getFriendList } from '@/apis/announcement-center'
import Icon from '@/components/icon'
import { useGroupStore } from '@/store/group'
import { YapiGetV1ImChatFriendListData } from '@/typings/yapi/ImChatFriendListV1GetApi'
import classNames from 'classnames'
import NoDataImage from '@/components/no-data-image'
import LoadingElement from '@/components/loading-element'
import ListEmpty from '@/components/list-empty'
import { t } from '@lingui/macro'
import { useUpdateEffect } from 'ahooks'
import { flatten, isEmpty } from 'lodash'
import { Message } from '@nbit/arco'
import styles from './index.module.css'
import Crew from '../crew-component'
import NavComponent from '../nav-component'
import SearchInput from '../search-input'

// 自定义比较函数
function customCompare(a, b) {
  const order = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'

  const keyA = Object.keys(a)[0]
  const keyB = Object.keys(b)[0]

  // 将键映射到其在 order 中的索引，如果键不在 order 中，则映射到最后一个位置
  const indexA = order.includes(keyA) ? order.indexOf(keyA) : order.length
  const indexB = order.includes(keyB) ? order.indexOf(keyB) : order.length

  // 对索引进行比较
  return indexA - indexB
}
/** 最少创建群的好友选择数量 */
const MIN_FRIENDS_COUNT = 1
export function CommonFriendBook({
  navBar,
  onChange,
  onOk,
  selectAll,
  // max number of checkbox that an be selected
  limit,
  // display names of selected members instead of numbers of numbers
  displaySelectedMembers,
  avatarSize,
}: {
  navBar: ReactNode
  onChange: (friends: YapiGetV1ImChatFriendListData[]) => void
  onOk: () => void
  selectAll?: boolean
  limit?: number
  displaySelectedMembers?: boolean
  avatarSize?: number
}) {
  const [searchValue, setSearchValue] = useState('')
  const [friendList, setFriendList] = useState<any>([])
  const [sourceData, setSourceData] = useState<YapiGetV1ImChatFriendListData[]>([])
  const [groupSelectedList, setGroupSelectedList] = useState<YapiGetV1ImChatFriendListData[]>([])
  const [loading, setLoading] = useState(false)

  function transformData(data) {
    const transformedData = data.reduce((result, user) => {
      const name = user?.friendRemark || user?.nickName || ''
      let firstLetter = name[0]
      const pinyinName = pinyin(firstLetter, { style: pinyin.STYLE_FIRST_LETTER })
      const isE = pinyinName[0][0].toUpperCase()
      if (/^[A-Za-z]/.test(isE)) {
        firstLetter = isE
      } else {
        firstLetter = '#'
      }

      if (!result[firstLetter]) {
        result[firstLetter] = []
      }

      result[firstLetter].push({ ...user, isChecked: false })
      return result
    }, {})
    return Object.keys(transformedData).map(key => ({ [key]: transformedData[key] }))
  }

  useEffect(() => {
    const searchFilterArr = sourceData.filter(item => {
      if (item.nickName?.toLowerCase()?.includes(searchValue.toLowerCase())) {
        return item
      }
      return null
    })
    searchValue === '' ? setFriendList(transformData(sourceData)) : setFriendList(transformData(searchFilterArr))
  }, [searchValue])

  useUpdateEffect(() => {
    onChange(groupSelectedList)
  }, [groupSelectedList])

  useEffect(() => {
    setLoading(true)
    setGroupSelectedList([])
    getFriendList({})
      .then(res => {
        if (res.isOk && res.data) {
          setFriendList(transformData(res.data)?.sort(customCompare))
          setSourceData(res.data)
        }
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const sortedList = useMemo(() => {
    return Object.values(friendList)
      ?.reduce<YapiGetV1ImChatFriendListData[]>((a, c) => {
        const arr = flatten(Object.values(c as any) as YapiGetV1ImChatFriendListData[])
        a = [...a, ...arr]
        return a
      }, [])
      ?.slice(0, limit)
  }, [limit, friendList])

  useUpdateEffect(() => {
    if (selectAll) {
      setSearchValue('')
      const selected = limit ? sortedList : [...sourceData]
      setGroupSelectedList(selected)
    } else setGroupSelectedList([])
  }, [selectAll])

  const checkIsLimit = () => {
    if (limit && groupSelectedList.length >= limit) {
      Message.info(
        t({
          id: 'features_group_components_search_friend_index_quigezpgny',
          values: { 0: limit },
        })
      )
      return true
    }
    return false
  }

  return (
    <div className={`${styles['address-book']} friend-book`}>
      {navBar}

      <div className="scroll-show">
        <div className={classNames('pl-4 mt-4 mb-6 pr-4', { 'mb-4': limit })}>
          <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
        {limit && (
          <div className="pl-4 text-xs text-text_color_02 mb-4">
            {t({
              id: 'features_group_components_search_friend_index_1yndafdhfl',
              values: { 0: limit },
            })}
          </div>
        )}
        <div className="address-book-list">
          {/* 无数据 */}
          {!friendList?.length &&
            !loading &&
            (searchValue ? (
              <NoDataImage
                name="no_search_result"
                footerText={t`features_group_components_search_friend_index_eppdggih18`}
              />
            ) : (
              <ListEmpty />
            ))}
          {/* loading */}
          {loading ? (
            <div className="flex justify-center">
              <LoadingElement />
            </div>
          ) : (
            friendList?.map((group, groupIndex) => (
              <div key={groupIndex}>
                {Object.keys(group).map(letter => (
                  <div key={letter}>
                    <div className="group-letter">{letter}</div>
                    {group[letter]?.map((contact, contactIndex) => (
                      <Fragment key={contact?.uid}>
                        <Crew
                          avatarSize={avatarSize}
                          line={!(groupIndex === friendList.length - 1 && contactIndex === group[letter].length - 1)}
                          friendInfo={contact}
                          key={contactIndex}
                          searchValue={searchValue}
                          isSelect={groupSelectedList.filter(item => contact.uid === item.uid).length > 0}
                          selectClick={selectData => {
                            const { friendInfo, isSelect } = selectData
                            if (isSelect && checkIsLimit()) return
                            if (isSelect) {
                              // 直接添加进入选择数组中
                              setGroupSelectedList([...groupSelectedList, friendInfo])
                            } else {
                              // 取消选中数据
                              setGroupSelectedList(groupSelectedList.filter(item => friendInfo.uid !== item.uid))
                            }
                          }}
                        />
                      </Fragment>
                    ))}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="people-people-box">
        {friendList?.length && !loading ? (
          <div className="people-people">
            {displaySelectedMembers
              ? groupSelectedList?.map(s => s?.nickName || s.uid).join(', ')
              : t({
                  id: 'features_group_components_search_friend_index_pol3ckrodh',
                  values: { 0: groupSelectedList.length },
                })}
          </div>
        ) : null}
      </div>
      {groupSelectedList.length >= MIN_FRIENDS_COUNT && (
        <div
          className={classNames('jump')}
          onClick={() => {
            onOk()
          }}
        >
          <Icon name="icon_set_next_step" fontSize={46} />
        </div>
      )}
    </div>
  )
}

function FriendBook() {
  const { groupSelectedList, setGroupSelectedList } = useGroupStore()

  return (
    <CommonFriendBook
      navBar={<NavComponent titleText={t`features_group_components_search_friend_index_bo7tiepivf`} />}
      onChange={setGroupSelectedList}
      onOk={() => link('/group/create')}
    />
  )
}

export default FriendBook
