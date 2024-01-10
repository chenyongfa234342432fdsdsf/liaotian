import { getV1ImChatFriendApplyListApiRequest, postV1ImChatFriendPassApplyApiRequest } from '@/apis/address-book'
import { useEffect, useState } from 'react'
import { YapiGetV1ImChatFriendApplyListData } from '@/typings/yapi/ImChatFriendApplyListV1GetApi'
import { Input } from '@nbit/arco'
import Icon from '@/components/icon'
import { useAddressBookStore } from '@/store/address-book'
import { YapiGetV1ImChatFriendListData } from '@/typings/yapi/ImChatFriendListV1GetApi'
import { createConversation } from '@/helper/conversation'
import MaskSecondConfirm from '@/features/group/components/masking-pop'
import ConfirmBtnPop from '@/features/group/components/comfirm-btn-pop'
import NoDataImage from '@/components/no-data-image'
import LoadingElement from '@/components/loading-element'
import { useMessengerRightDrawer } from '@/hooks/use-messenger-right-drawer'
import { useNewFriendStore } from '@/store/new-friend'
import { t } from '@lingui/macro'
import { getTime } from '@/helper/getTime'
import { WsBizEnum, WsTypesEnum } from '@/constants/ws'
import ws from '@/plugins/ws'
import AddressBookNav from '../address-book/address-book-nav-component'
import Crew from '../address-book/crew-component'
import styles from './index.module.css'
import { Stranger } from './stranger'
/**
 *注意点：点击添加，弹窗后，对方需要同意，添加按钮的改变
 *重新请求接口
 */
interface IApplyAdd {
  recordId: string
  nickName: string
}
// 申请状态
enum applicationStatusEnum {
  toBeAdded = 1, // 待添加
  haveBeenAdded = 2, // 已添加
  expired = 3, // 已过期
}
function NewFriend() {
  const [open, close] = useMessengerRightDrawer()
  const { setNewFriendItem } = useNewFriendStore()
  const { addressBookList, setAddressBookList, applyList } = useAddressBookStore()
  const [applyListSource, setApplyListSource] = useState<YapiGetV1ImChatFriendApplyListData[]>([])
  // const [applyListItem, setApplyListItem] = useState<YapiGetV1ImChatFriendApplyListData | undefined>()
  const [searchValue, setSearchValue] = useState('')
  const [isAddOk, setIsAddOk] = useState('')
  const [isPop, setIsPop] = useState(false)
  const [applyAddData, setApplyAddData] = useState<IApplyAdd>({ recordId: '', nickName: '' }) // 通过请求数据
  const [searchValueFilter, setSearchValueFilter] = useState<YapiGetV1ImChatFriendApplyListData[]>([])
  const [isLoading, setISLoading] = useState<boolean>(false)

  const three = 3 // 三天为基线
  const NearlyThreeDays = applyListSource?.filter(item => {
    const distanceDays = getTime(item.applyTime)
    if (distanceDays <= three) {
      return item
    }
    return null
  })
  const ThreeDaysAgo = applyListSource?.filter(item => {
    const distanceDays = getTime(item.applyTime)

    if (distanceDays > three) {
      return item
    }
    return null
  })
  const NearlyThreeDaysSearchValueFilter = searchValueFilter?.filter(item => {
    const distanceDays = getTime(item.applyTime)
    if (distanceDays <= three) {
      return item
    }
    return null
  })
  const ThreeDaysAgoSearchValueFilter = searchValueFilter?.filter(item => {
    const distanceDays = getTime(item.applyTime)

    if (distanceDays > three) {
      return item
    }
    return null
  })
  // 通过好友请求
  const applyAdd = async (recordId: string) => {
    const res = await postV1ImChatFriendPassApplyApiRequest({ recordId })
    if (res?.data) {
      setIsPop(false)
      setIsAddOk(applyAddData.nickName)
    }
  }
  // 新的朋友列表
  const applyLists = async () => {
    setISLoading(true)
    const res = await getV1ImChatFriendApplyListApiRequest({})
    setISLoading(false)

    const { isOk, data } = res || {}
    if (isOk && data) {
      setApplyListSource(data)
    }
  }
  useEffect(() => {
    applyLists()
    setAddressBookList()
  }, [applyList])

  const searchFilterArr = applyListSource?.filter(item => {
    if (item.nickName?.toLowerCase().includes(searchValue.toLowerCase())) {
      return item
    }
    return null
  })
  useEffect(() => {
    searchValue === ''
      ? setSearchValueFilter([])
      : setSearchValueFilter(searchFilterArr as YapiGetV1ImChatFriendApplyListData[])
  }, [searchValue])

  const isConversation = info => {
    const filterAddBookList = addressBookList.filter((addBook: YapiGetV1ImChatFriendListData) => {
      if (addBook.nickName === info.nickName) {
        return addBook
      }
      return null
    })
    if (filterAddBookList.length === 0) {
      setNewFriendItem(info)
      open(<Stranger onClose={close} />)
    }
    if (filterAddBookList.length > 0) {
      // console.log('我是好友=>')
      close()
      createConversation({ friend: filterAddBookList[0] })
    }
  }
  function applyListCom(days: YapiGetV1ImChatFriendApplyListData[], ago: YapiGetV1ImChatFriendApplyListData[]) {
    return (
      <div className="scroll-show">
        {/* 封装组件 */}
        {!!days?.length && (
          <div className="new-friends-list near">
            <div className="new-friends-lis-title">{t`features_messenger_new_friend_index_rv5hzy39dd`}</div>
            <div>
              {days?.map(item => {
                let rightNear

                if (item?.applyStatus === applicationStatusEnum.toBeAdded) {
                  rightNear =
                    isAddOk === item?.nickName ? (
                      (rightNear = (
                        <div className="add-text">
                          {/* <Icon name="icon_address_book_added" className="added" /> */}
                          {t`features_messenger_addition_index_j3tuca3fsx`}
                        </div>
                      ))
                    ) : item?.initiativeAdd ? (
                      <div className="add-text">
                        <Icon name="icon_address_book_added" className="added" />
                        {t`features_messenger_new_friend_index_0mcf2pkakz`}
                      </div>
                    ) : (
                      <div
                        className="add-btn"
                        onClick={e => {
                          e.stopPropagation()
                          setApplyAddData({ recordId: item?.recordId.toString(), nickName: item?.nickName })
                          applyLists()
                          setIsPop(true)
                        }}
                      >{t`features_messenger_addition_index_hi1mctpr4u`}</div>
                    )
                }
                if (item?.initiativeAdd === true && item?.applyStatus === applicationStatusEnum.haveBeenAdded) {
                  rightNear = (
                    <div className="add-text">
                      <Icon name="icon_address_book_added" className="added" />
                      {t`features_messenger_addition_index_j3tuca3fsx`}
                    </div>
                  )
                }
                if (item?.initiativeAdd === false && item?.applyStatus === applicationStatusEnum.haveBeenAdded) {
                  rightNear = <div className="add-text">{t`features_messenger_addition_index_j3tuca3fsx`}</div>
                }

                return (
                  <div
                    key={item?.recordId}
                    onClick={() => {
                      isConversation(item)
                    }}
                  >
                    <Crew
                      crewName={item?.nickName}
                      right={rightNear}
                      img={item?.avatarPath}
                      searchValue={searchValue}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )}
        {!!ago?.length && (
          <div className="new-friends-list">
            <div className="new-friends-lis-title">{t`features_messenger_new_friend_index_p6tq9ytho9`}</div>
            <div>
              {ago?.map(item => {
                let threeAgoText
                if (item?.initiativeAdd === true && item?.applyStatus === applicationStatusEnum.haveBeenAdded) {
                  threeAgoText = (
                    <div className="add-text">
                      <Icon name="icon_address_book_added" className="added" />
                      {t`features_messenger_addition_index_j3tuca3fsx`}
                    </div>
                  )
                }
                if (
                  item?.initiativeAdd === true &&
                  (item?.applyStatus === applicationStatusEnum.expired ||
                    item?.applyStatus === applicationStatusEnum.toBeAdded)
                ) {
                  threeAgoText = (
                    <div className="add-text">
                      <Icon name="icon_address_book_added" className="added" />
                      {t`features_messenger_chat_message_custom_red_pocket_message_uqobfipajg`}
                    </div>
                  )
                }
                if (item?.initiativeAdd === false && item?.applyStatus === applicationStatusEnum.haveBeenAdded) {
                  threeAgoText = <div className="add-text">{t`features_messenger_addition_index_j3tuca3fsx`}</div>
                }
                if (
                  item?.initiativeAdd === false &&
                  (item?.applyStatus === applicationStatusEnum.expired ||
                    item?.applyStatus === applicationStatusEnum.toBeAdded)
                ) {
                  threeAgoText = (
                    <div className="add-text">{t`features_messenger_chat_message_custom_red_pocket_message_uqobfipajg`}</div>
                  )
                }

                return (
                  <div
                    key={item?.recordId}
                    onClick={() => {
                      isConversation(item)
                    }}
                  >
                    <Crew
                      crewName={item?.nickName}
                      right={threeAgoText}
                      img={item?.avatarPath}
                      searchValue={searchValue}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }
  // 搜索的渲染和正常渲染
  const threeDaysSearch = applyListCom(NearlyThreeDaysSearchValueFilter, ThreeDaysAgoSearchValueFilter)
  const threeDays = applyListCom(NearlyThreeDays, ThreeDaysAgo)
  return (
    <div className={styles['new-friend']}>
      <AddressBookNav titleText={t`features_messenger_address_book_index_enlckk2obg`} />
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
      {searchValue.length > 0 && searchValueFilter.length === 0 ? (
        <div>
          <NoDataImage
            name="no_search_result"
            footerText={t`features_group_components_search_friend_index_eppdggih18`}
          />
        </div>
      ) : (
        threeDaysSearch
      )}
      {isLoading ? (
        <div className="flex justify-center mt-52">
          <LoadingElement />
        </div>
      ) : (
        !searchValue.length && threeDays
      )}

      {isPop && (
        <MaskSecondConfirm>
          {
            <ConfirmBtnPop
              title={applyAddData?.nickName}
              content={t`features_messenger_addition_index_1fx0wn_hbe`}
              confirmEvent={() => {
                applyAdd(applyAddData?.recordId)
              }}
              cancelEvent={() => {
                setIsPop(false)
              }}
            />
          }
        </MaskSecondConfirm>
      )}
    </div>
  )
}

export default NewFriend
