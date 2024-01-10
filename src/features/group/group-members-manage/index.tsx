import Icon from '@/components/icon'
import { getFriendList } from '@/apis/announcement-center'
import { useState, useEffect } from 'react'
import {
  addGroupMember,
  getGroupMembers,
  removeMember,
  addAdministrator,
  removeAdministrator,
  getAdministratorList,
} from '@/apis/group'
import { YapiGetV1ImChatFriendListData } from '@/typings/yapi/ImChatFriendListV1GetApi'
import { useGroupStore } from '@/store/group'
import { useImStore } from '@/store/im'
import { GroupEnum } from '@/constants/group'
import { userToast } from '@/features/users/user-toast'
import { YapiGetV1ImChatGroupAdministratorListData } from '@/typings/yapi/ImChatGroupAdministratorV1GetApi'
import { getImInstance } from '@/plugins/im/core'
import NoDataImage from '@/components/no-data-image'
import LoadingElement from '@/components/loading-element'
import ListEmpty from '@/components/list-empty'
import { t } from '@lingui/macro'
import { ZIMConversationType } from '@/plugins/im/constants'
import { Message, Spin } from '@nbit/arco'
import { updateGroupMembers } from '@/helper/address-book'
import Styles from './index.module.css'
import Crew from '../components/crew-component'
import SearchInput from '../components/search-input'
import ConfirmBtn from '../components/confirm-btn'

export default function AddNewMembers({ noHeader, onClose }: { noHeader?: boolean; onClose: () => void }) {
  const [friendList, setFriendList] = useState<any>([])
  const [groupMemberList, setGroupMember] = useState<any>([])
  const [searchValue, setSearchValue] = useState('')
  const [selectedMembers, setSelectedMembers] = useState<YapiGetV1ImChatFriendListData[]>([])
  const [administratorList, setAdministratorList] = useState<YapiGetV1ImChatGroupAdministratorListData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { groupOperateMark, setGroupOperateMark } = useGroupStore()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const { currentConversation } = useImStore()
  const zim = getImInstance()

  const operateNameMap = {
    [GroupEnum.add]: t`features_group_group_members_manage_index_4zzexhrrt3`,
    [GroupEnum.del]: t`features_group_group_members_manage_index_nvb7r5gsdh`,
    [GroupEnum.addGroup]: t`features_group_group_manage_index_tcjzrkguez`,
    [GroupEnum.delGroup]: t`features_group_group_members_manage_index_cjcyin8hbg`,
  }
  const setShowFriendList = () => {
    let filterList = [] as any[]
    /** 如果是添加群成员 */
    if (groupOperateMark === GroupEnum.add) {
      /** 列表显示时将群成员进行筛选出去 */
      filterList = friendList.filter(i => !groupMemberList.find(item => item.uid === i.uid))
    }
    /** 如果是去除群成员/添加群管理 */
    if (groupOperateMark === GroupEnum.del || groupOperateMark === GroupEnum.addGroup) {
      /** 将群主进行筛选掉 */
      // filterList = groupMemberList.filter(i => !i.lord)
      filterList = groupMemberList
    }
    /** 如果是移除群管理 */
    if (groupOperateMark === GroupEnum.delGroup) {
      filterList = administratorList
    }
    const searchFilterArr = filterList.filter(item => {
      if (item.nickName?.toLowerCase()?.includes(searchValue.toLowerCase())) {
        return item
      }
      return null
    })
    return searchValue ? searchFilterArr : filterList
  }
  const closeModel = () => {
    setSelectedMembers([])
    setGroupOperateMark('')
    /** 更新群成员信息 */
    updateGroupMembers(currentConversation?.conversationID || '')
    onClose()
  }
  useEffect(() => {
    setSearchValue('')
    setSelectedMembers([])
    setIsLoading(true)
    /** 获取好友列表 */
    getFriendList({}).then(res => {
      setIsLoading(false)
      if (res.isOk) {
        setFriendList(res.data)
      }
    })
    if (currentConversation?.conversationID) {
      /** 获取当前群成员列表 */
      getGroupMembers({
        groupId: currentConversation?.conversationID || '',
        listType: 1,
      }).then(res => {
        setIsLoading(false)
        if (res.isOk) {
          setGroupMember(res.data)
        }
      })
    }
    if (currentConversation?.conversationID && groupOperateMark === GroupEnum.delGroup) {
      /** 获取群管理列表 */
      getAdministratorList({
        groupId: currentConversation?.conversationID,
      }).then(res => {
        setIsLoading(false)
        if (res.isOk && res.data) {
          setAdministratorList(res.data)
        }
      })
    }
  }, [currentConversation?.conversationID, groupOperateMark])

  /** 对群组人员进行新建移除 */
  const crudMember = () => {
    setConfirmLoading(true)
    const groupId = currentConversation?.conversationID || ''
    /** 新增群成员 */
    if (groupOperateMark === GroupEnum.add) {
      /** 先进行即时的新增 */
      const addUids = selectedMembers.reduce((pre: number[], cur) => {
        return [...pre, cur.uid]
      }, [])
      zim
        .inviteUsersIntoGroup(addUids.map(String), groupId)
        .then(response => {
          addGroupMember({
            addUids,
            groupId,
          }).then(res => {
            setConfirmLoading(false)
            if (res.data?.success) {
              Message.success(t`features_group_group_members_manage_index_6dl6ctcsn8`)
              closeModel()
            }
          })
        })
        .catch(err => {
          setConfirmLoading(false)
          Message.error(t`features_group_group_members_manage_index_0fcwh66lid`)
        })
    }
    /** 移除群成员 */
    if (groupOperateMark === GroupEnum.del) {
      const removeUids = selectedMembers.reduce((pre: number[], cur) => {
        return [...pre, cur.uid]
      }, [])
      removeMember({
        removeUids,
        groupId,
      }).then(res => {
        if (res.data?.success) {
          Message.success(t`features_group_group_members_manage_index_4lljdxzwgv`)
          closeModel()
        }
        setConfirmLoading(false)
      })
    }
    /** 添加群管理 */
    if (groupOperateMark === GroupEnum.addGroup) {
      addAdministrator({
        addUids: selectedMembers.reduce((pre: number[], cur) => {
          return [...pre, cur.uid]
        }, []),
        groupId,
      }).then(res => {
        if (res.data?.success) {
          Message.success(t`features_group_group_members_manage_index_jtmvijhrxx`)
          closeModel()
        }
        setConfirmLoading(false)
      })
    }
    /** 移除群管理 */
    if (groupOperateMark === GroupEnum.delGroup) {
      removeAdministrator({
        removeUids: selectedMembers.reduce((pre: number[], cur) => {
          return [...pre, cur.uid]
        }, []),
        groupId: currentConversation?.conversationID || '',
      }).then(res => {
        if (res.data?.success) {
          Message.success(t`features_group_group_members_manage_index_fmek2qlutu`)
          closeModel()
        }
        setConfirmLoading(false)
      })
    }
  }
  /** 是否需要禁用 */
  const isNeedDisabled = contact => {
    // if(groupOperateMark.g)
  }
  return (
    <div className={Styles['members-manage']}>
      {!noHeader && (
        <header>
          <Icon name="a-Notselected" />
          <span>{operateNameMap[groupOperateMark] || ''}</span>
        </header>
      )}
      <div className="pl-4">
        <div className=" mt-4 mb-6 pr-4">
          <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
        {/* loading 显示 */}
        {isLoading ? (
          <div className="flex justify-center">
            <LoadingElement />
          </div>
        ) : setShowFriendList()?.length ? (
          setShowFriendList()?.map((contact, index) => {
            return (
              <Crew
                line={!(index === setShowFriendList().length - 1)}
                friendInfo={contact}
                key={index}
                isSelect={
                  !!selectedMembers.filter(item => contact.uid === item.uid).length ||
                  ((contact.administrator || contact.lord) && groupOperateMark === GroupEnum.addGroup)
                }
                searchValue={searchValue}
                right={
                  contact.administrator || groupOperateMark === GroupEnum.delGroup ? (
                    <span className="text-brand_color py-[1px] px-1  bg-brand_color_special_02 rounded">{t`features_group_group_members_manage_index_5cucpjz9ym`}</span>
                  ) : (
                    contact.lord && (
                      <span className="text-brand_color py-[1px] px-1  bg-brand_color_special_02 rounded">{t`features_group_group_members_manage_index_qgyohgesjw`}</span>
                    )
                  )
                }
                disabled={contact.administrator || contact.lord}
                selectClick={selectData => {
                  const { friendInfo, isSelect } = selectData
                  if (isSelect) {
                    // 直接添加进入选择数组中
                    setSelectedMembers([...selectedMembers, friendInfo])
                  } else {
                    // 取消选中数据
                    setSelectedMembers(selectedMembers.filter(item => friendInfo.uid !== item.uid))
                  }
                }}
              />
            )
          })
        ) : searchValue ? (
          <NoDataImage
            name="no_search_result"
            footerText={t`features_group_components_search_friend_index_eppdggih18`}
          />
        ) : (
          <ListEmpty />
        )}
      </div>
      <div className="people-people-box">
        {setShowFriendList().length && !isLoading ? (
          <div className="people-people">
            {t({
              id: 'features_group_components_search_friend_index_pol3ckrodh',
              values: { 0: selectedMembers.length },
            })}
          </div>
        ) : null}
      </div>
      {selectedMembers.length ? <ConfirmBtn isLoading={confirmLoading} clickFunc={crudMember} /> : null}
    </div>
  )
}
