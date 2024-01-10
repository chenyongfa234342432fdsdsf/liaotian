import { useEffect, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import {
  getV1ImChatFriendAddSearchApiRequest,
  postV1ImChatFriendAddApiRequest,
  postV1ImChatGroupApplyApiRequest,
} from '@/apis/address-book'
import { getImInstance } from '@/plugins/im/core'
import { YapiGetV1ImChatFriendAddSearchData } from '@/typings/yapi/ImChatFriendAddSearchV1GetApi'
import Icon from '@/components/icon'
import { Input, Message } from '@nbit/arco'
import ConfirmBtnPop from '@/features/group/components/comfirm-btn-pop'
import MaskSecondConfirm from '@/features/group/components/masking-pop'
import NoDataImage from '@/components/no-data-image'
import LoadingElement from '@/components/loading-element'
import { t } from '@lingui/macro'
import Crew from '../address-book/crew-component'
import styles from './index.module.css'
import AddressBookNav from '../address-book/address-book-nav-component'

/**
 *注意点：点击添加，弹窗后，对方需要同意，添加按钮的改变
 *加群sdk
 *
 */
interface IGroup {
  groupId: string
  // isGroup: boolean
  groupName?: string
}
interface IPeople {
  uid: number
  // isPeople: boolean
  nickName: string
}
enum PopGroupEnum {
  pop = 1,
  group = 2,
}
function Addition() {
  const zim = getImInstance()
  const searchRef = useRef<HTMLDivElement>(null)
  const [searchValue, setSearchValue] = useState('')
  const [isSearchBox, setIsSearchBox] = useState(true)
  const [isPop, setIsPop] = useState(false) // 控制弹窗
  const [isPopGroup, setIsPopGroup] = useState(0) // 控制添加人群
  const [peopleData, setPeopleData] = useState<IPeople>({ uid: 0, nickName: '' }) // 人请求数据
  const [groupData, setGroupData] = useState<IGroup>({ groupId: '', groupName: '' }) // 群请求数据
  const [isLoading, setISLoading] = useState<boolean>(false)

  const [addSearchList, setAddSearchList] = useState<YapiGetV1ImChatFriendAddSearchData>({
    userData: [],
    groupData: [],
  })

  // 关键字搜索
  const addSearch = async searchVle => {
    setISLoading(true)
    const res = await getV1ImChatFriendAddSearchApiRequest({ keyword: searchVle })
    setISLoading(false)

    const { isOk, data } = res || {}
    if (isOk && data) {
      setAddSearchList(data as YapiGetV1ImChatFriendAddSearchData)
    }
  }
  // 添加好友申请

  const add = async uid => {
    setIsPop(false)

    const res = await postV1ImChatFriendAddApiRequest({ uid })
    const { isOk, data } = res || {}
    if (isOk && data?.success) {
      Message.success(t`features_messenger_addition_index_t0o7celfir`)
    } else {
      Message.error(t`features_messenger_addition_index_79dzbswbuk`)
    }
  }
  // 入群申请
  const groupApply = async groupId => {
    setIsPop(false)

    const res = await postV1ImChatGroupApplyApiRequest({ groupId })
    const { isOk, data } = res || {}
    if (isOk && data?.success) {
      Message.success(t`features_messenger_addition_index_cprqb5qgyz`)
    }
  }
  // 入群申请sdk
  const groupApplySDK = async groupId => {
    const zimJoin = zim.joinGroup(groupId.toString())
    zimJoin
      .then(groupInfo => {
        groupApply(groupInfo.groupInfo.baseInfo.groupID)
      })
      .catch(cas => {
        Message.success(t`features_messenger_addition_index_gnkdmx1nh1`)
      })
  }
  const applyConfirm = (groupId?, uid?) => {
    if (isPopGroup === PopGroupEnum.pop) {
      add(uid)
    }
    if (isPopGroup === PopGroupEnum.group) {
      groupApplySDK(groupId)
    }
  }
  useEffect(() => {}, [addSearchList])

  return (
    <div className={styles.addition}>
      <AddressBookNav titleText={t`features_messenger_addition_index_pngdv3umj8`} />
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
                    setAddSearchList({
                      userData: [],
                      groupData: [],
                    })
                  }}
                />
              )
            }
            placeholder={t`features_group_components_search_input_index_tq98cmscdb`}
            value={searchValue}
            onChange={val => {
              val.length === 0 &&
                setAddSearchList({
                  userData: [],
                  groupData: [],
                })
              setSearchValue(val)
              setIsSearchBox(true)
            }}
            onPressEnter={() => {
              searchRef.current?.click()
            }}
          />
        </div>
        {isLoading ? (
          <div className="flex justify-center mt-52">
            <LoadingElement />
          </div>
        ) : (
          <div>
            {!!searchValue.length && isSearchBox && (
              <div
                className="nav-item"
                ref={searchRef}
                onClick={() => {
                  addSearch(searchValue)
                  setIsSearchBox(false)
                }}
              >
                <div className="nav-item-left">
                  <div className="nav-ico-box">
                    <Icon name="icon_address_book_invite_friend" fontSize={20} className="icon-color" />
                  </div>
                  <div className="nav-text">
                    <div className="search-tips">{t`features_messenger_addition_index_bb0pp6w1mo`}</div>
                    <Highlighter
                      highlightClassName="highlighted"
                      searchWords={[searchValue]}
                      autoEscape
                      textToHighlight={searchValue}
                    />
                  </div>
                </div>
                <div className="nav-item-right"></div>
              </div>
            )}
            {!!addSearchList?.userData.length && searchValue.length !== 0 && (
              <div className="seek seek-p">
                <div className="seek-title">{t`features_messenger_addition_index_dpifdzvxuo`}</div>
                <div>
                  {addSearchList?.userData?.map(item => {
                    const rightP = item.alreadyAdd ? (
                      <div className="add-text">
                        <Icon name="icon_address_book_added" className="added" />
                        {t`features_messenger_addition_index_j3tuca3fsx`}
                      </div>
                    ) : (
                      <div
                        className="add-btn"
                        onClick={() => {
                          setIsPop(true)
                          setIsPopGroup(PopGroupEnum.pop)
                          setPeopleData({ uid: item.uid, nickName: item.nickName })
                        }}
                      >
                        {t`features_messenger_addition_index_hi1mctpr4u`}
                      </div>
                    )
                    return (
                      <Crew key={item.nickName} crewName={item.nickName} searchValue={searchValue} right={rightP} />
                    )
                  })}
                </div>
              </div>
            )}
            {!!addSearchList?.groupData.length && searchValue.length !== 0 && (
              <div className="seek">
                <div className="seek-title">{t`features_messenger_addition_index_2eiozsmyrc`}</div>
                <div>
                  {addSearchList?.groupData?.map(item => {
                    const rightG = item.alreadyAdd ? (
                      <div className="add-btn">{t`features_select_contact_group_f2v65kjlnm`}</div>
                    ) : (
                      <div
                        className="add-btn"
                        onClick={() => {
                          setIsPop(true)
                          setIsPopGroup(PopGroupEnum.group)
                          setGroupData({ groupId: item.groupId, groupName: item.groupName })
                        }}
                      >{t`features_messenger_addition_index_yzmdmfxw1y`}</div>
                    )
                    return (
                      <Crew
                        key={item.groupName}
                        crewName={item.groupName}
                        searchValue={searchValue}
                        right={rightG}
                        icon="icon_address_book_group"
                      />
                    )
                  })}
                </div>
              </div>
            )}
            {!addSearchList?.groupData.length &&
              !addSearchList?.userData.length &&
              searchValue.length !== 0 &&
              !isSearchBox && (
                <NoDataImage
                  name="no_search_result"
                  footerText={t`features_group_components_search_friend_index_eppdggih18`}
                />
              )}
          </div>
        )}
      </div>
      {isPop && (
        <MaskSecondConfirm>
          {
            <ConfirmBtnPop
              title={isPopGroup === PopGroupEnum.pop ? peopleData.nickName || '' : groupData.groupName || ''}
              content={
                isPopGroup === PopGroupEnum.pop
                  ? t`features_messenger_addition_index_1fx0wn_hbe`
                  : t`features_messenger_addition_index_0xlu0rnf6e`
              }
              confirmEvent={() => {
                applyConfirm(groupData.groupId, peopleData.uid)
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
export default Addition
