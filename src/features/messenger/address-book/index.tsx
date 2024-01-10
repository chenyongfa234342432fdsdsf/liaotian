import pinyin from 'pinyin'
import { link } from '@/helper/link'
import { Fragment, useEffect, useState } from 'react'
import { getV1ImChatFriendApplyListApiRequest, getV1ImChatFriendListApiRequest } from '@/apis/address-book'
import { YapiGetV1ImChatFriendListData } from '@/typings/yapi/ImChatFriendListV1GetApi'
import Icon from '@/components/icon'
import { Input } from '@nbit/arco'
import { YapiGetV1ImChatFriendApplyListData } from '@/typings/yapi/ImChatFriendApplyListV1GetApi'
// import {
//   getMessengerNewFriend,
//   getMessengerNewFriendNumber,
//   setMessengerNewFriend,
//   setMessengerNewFriendNumber,
// } from '@/helper/cache/messenger-new-friend'
import ws from '@/plugins/ws'
import { WsBizEnum, WsThrottleTimeEnum, WsTypesEnum } from '@/constants/ws'
import { WSThrottleTypeEnum } from '@/plugins/ws/constants'
import { createConversation } from '@/helper/conversation'
import { useAddressBookStore } from '@/store/address-book'
import NoDataImage from '@/components/no-data-image'
import { t } from '@lingui/macro'
import LoadingElement from '@/components/loading-element'
import { getTime } from '@/helper/getTime'
import ListEmpty from '@/components/list-empty'
import { useNewFriendStore } from '@/store/new-friend'
import styles from './index.module.css'
import Crew from './crew-component'
import AddressBookNav from './address-book-nav-component'

function AddressBook() {
  const { setOff } = useNewFriendStore()

  const { addressBookList, setAddressBookList, setApplyList } = useAddressBookStore()
  const [searchValue, setSearchValue] = useState('')
  // const [addressBookListSource, setAddressBookListSource] = useState<YapiGetV1ImChatFriendListData[]>()
  const [addressBookListSourceFilter, setAddressBookListSourceFilter] = useState<any>()
  const [searchValueFilter, setSearchValueFilter] = useState<YapiGetV1ImChatFriendListData[]>([])
  const [applyListSource, setApplyListSource] = useState<YapiGetV1ImChatFriendApplyListData[]>()
  const [isLoading, setISLoading] = useState<boolean>(false)
  const [news, setNews] = useState<any[]>([])
  // 新朋友未读申请个数
  const newApplyNumber = applyListSource?.filter(item => {
    if (item.applyStatus === 1 && getTime(item.applyTime) < 3 && !item.initiativeAdd) {
      return item
    }
    return null
  })
  let number
  if (news?.length === 0 || news === undefined) {
    number = ''
  } else {
    number = `${news.length}`
  }
  let amount
  if (!addressBookList?.length) {
    amount = false
  }
  if (addressBookList?.length) {
    amount = addressBookList?.length
  }
  const addressBookNavList = [
    {
      ico: 'icon_address_book_new_friend',
      nav: t`features_messenger_address_book_index_enlckk2obg`,
      link: '/messenger/new-friend',
    },
    {
      ico: 'icon_address_book_group',
      nav: t`features_select_contact_index_ursogloihf`,
      link: '/messenger/my-group',
    },
  ]

  const searchFilterArr = addressBookList?.filter(item => {
    if (item.nickName?.toLowerCase().includes(searchValue.toLowerCase())) {
      return item
    }
    return null
  })
  useEffect(() => {
    searchValue === ''
      ? setSearchValueFilter([])
      : setSearchValueFilter(searchFilterArr as YapiGetV1ImChatFriendListData[])
  }, [searchValue])
  function transformData(data) {
    const transformedData = data?.reduce((result, user) => {
      const name = user?.friendRemark || user?.nickName || ''
      let firstLetter = name[0] || ''
      const pinyinTemp = pinyin(firstLetter, { style: pinyin.STYLE_FIRST_LETTER })
      const pinyinName = pinyinTemp || [['']]

      let isE = ''

      if (Array.isArray(pinyinName) && pinyinName.length > 0 && pinyinName[0].length > 0) {
        isE = pinyinName[0][0].toUpperCase()
      }
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
    return Object.keys(transformedData || {})?.map(key => ({ [key]: transformedData[key] }))
  }
  // 自定义比较函数
  function customCompare(a, b) {
    const order = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'

    const keyA = Object.keys(a)[0]
    const keyB = Object.keys(b)[0]

    // 将键映射到其在order中的索引，如果键不在order中，则映射到最后一个位置
    const indexA = order.includes(keyA) ? order.indexOf(keyA) : order.length
    const indexB = order.includes(keyB) ? order.indexOf(keyB) : order.length

    // 对索引进行比较
    return indexA - indexB
  }

  // const friendList = async () => {
  //   const resfriendList = await getV1ImChatFriendListApiRequest({})

  //   setAddressBookListSource(resfriendList.data)
  // }
  // 新的朋友列表
  const applyList = async () => {
    const res = await getV1ImChatFriendApplyListApiRequest({})
    const { isOk, data } = res || {}
    if (isOk && data) {
      setApplyListSource(data)
    }
  }

  useEffect(() => {
    setISLoading(true)
    applyList()
    setAddressBookList().then(() => {
      setISLoading(false)
    })
    // friendList()
  }, [])
  // useEffect(() => {
  //   const data1 = getMessengerNewFriend()
  //   const data2 = getMessengerNewFriendNumber()
  //   const isdd = data2 === number
  //   console.log('data1=>', data1)
  //   console.log('data2=>', data2)
  //   console.log('isdd=>', isdd)
  // }, [])

  //
  useEffect(() => {
    const subs = {
      biz: WsBizEnum.im,
      type: WsTypesEnum.friendApply,
    }
    const callbackApply = res => {
      setAddressBookList()
      setNews(old => {
        return [...old, ...res]
      })
    }
    ws.subscribe({
      subs,
      callback: callbackApply,
      throttleType: WSThrottleTypeEnum.increment,
      throttleTime: WsThrottleTimeEnum.Market,
    })
  }, [])

  // 接入好友申请通过推送，改变等待验证状态
  useEffect(() => {
    const subs = {
      biz: WsBizEnum.im,
      type: WsTypesEnum.passFriendApply,
    }
    const callbackApplyPass = res => {
      setApplyList()
      setAddressBookList()
    }
    ws.subscribe({
      subs,
      callback: callbackApplyPass,
    })
  }, [])

  useEffect(() => {
    const resfriendListFilter = transformData(addressBookList)
    // 使用自定义比较函数对数组进行排序
    const sortedData = resfriendListFilter.sort(customCompare)
    setAddressBookListSourceFilter(sortedData)
  }, [addressBookList])
  return (
    <div className={styles['address-book']}>
      <AddressBookNav
        titleText={t`features_messenger_address_book_index_avctih0kfs`}
        right={
          <div
            onClick={() => {
              link('/messenger/addition')
            }}
          >
            <Icon name="icon_address_book_new_friend1" fontSize={24} className="icon-address-book-color" />
          </div>
        }
      />
      <div className="scroll-show">
        <div className="search-input">
          <Input
            type="text"
            className={'search-input-comm'}
            prefix={<Icon name="icon_chat_search" fontSize={20} />}
            suffix={
              searchValue.length && (
                <Icon
                  name="icon_chat_delete"
                  onClick={() => {
                    setSearchValue('')
                  }}
                />
              )
            }
            placeholder={t`features_group_components_search_input_index_tq98cmscdb`}
            value={searchValue}
            onChange={val => {
              setSearchValue(val)
            }}
          />
        </div>
        <div className="search-list">
          {searchValue.length > 0 && searchValueFilter.length === 0 ? (
            <NoDataImage
              name="no_search_result"
              footerText={t`features_group_components_search_friend_index_eppdggih18`}
            />
          ) : (
            searchValueFilter?.map(item => {
              return <Crew key={item?.nickName} crewName={item?.nickName} searchValue={searchValue} />
            })
          )}
        </div>
        {!searchValue.length && (
          <>
            <div className="address-book-nav">
              {addressBookNavList.map(item => {
                return (
                  <Fragment key={item?.nav}>
                    <div
                      className="nav-item"
                      onClick={() => {
                        link(item?.link)
                        item.nav === t`features_messenger_address_book_index_enlckk2obg` && setOff(false)
                      }}
                    >
                      <div className="nav-ico-box">
                        {item.nav === t`features_messenger_address_book_index_enlckk2obg` &&
                          (!!number?.length || !!newApplyNumber?.length) && <div className="tips-round"></div>}
                        <Icon name={item?.ico} fontSize={28} className="icon-color" />
                      </div>
                      <div className="nav-text">{item?.nav}</div>
                    </div>
                    <div className="item-line"></div>
                  </Fragment>
                )
              })}
            </div>
            {isLoading ? (
              <div className="flex justify-center mt-52">
                <LoadingElement />
              </div>
            ) : (
              <>
                <div className="address-book-list">
                  {addressBookListSourceFilter?.map((group, groupIndex) => (
                    <div key={groupIndex}>
                      {Object.keys(group).map(letter => (
                        <div key={letter}>
                          <div className="group-letter">{letter}</div>

                          {group[letter].map((contact, contactIndex) => (
                            <Fragment key={contact?.uid}>
                              <div
                                onClick={() => {
                                  // console.log('rescontactcontact=>', contact)
                                  createConversation({ friend: contact })
                                }}
                              >
                                <Crew
                                  crewName={contact?.friendRemark || contact?.nickName || ''}
                                  key={contact?.uid}
                                  img={contact?.avatarPath}
                                />
                              </div>
                            </Fragment>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="people-people-box">
                  <div className="people-people">
                    {amount ? (
                      t({
                        id: 'features_messenger_address_book_index_o9x9tnvjih',
                        values: { 0: amount },
                      })
                    ) : (
                      <ListEmpty text={t`features_messenger_address_book_index_xxp0fwyt5a`} />
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AddressBook
