import React, { useState, useRef, useEffect } from 'react'
import Icon from '@/components/icon'
import { Input } from '@nbit/arco'
import LoadingElement from '@/components/loading-element'
import ListEmpty from '@/components/list-empty'
import { t } from '@lingui/macro'
import dayjs from 'dayjs'
import { useLayoutStore } from '@/store/layout'
import { useMount, useRequest } from 'ahooks'
import { getV1ImChatImBlockListQueryList, postV1ImChatImBlockListRemoveApiRequest } from '@/apis/settings-center'
import { YapiGetV1ImChatImBlockListQueryListApiResponse } from '@/typings/yapi/ImChatImBlockListQueryListV1GetApi'
import ChatAvatar from '@/components/chat-avatar'
import { popBoxConfirmWithLoading } from '@/components/pop-box'
import NavigationBar from '../navigation-bar'
import Styles from './index.module.css'

function BlackItem({ data, deleteBlackList }) {
  const formatTime = val => {
    if (!val || typeof val !== 'number' || isNaN(val)) return ''
    return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
  }
  // 移除黑名单
  const handleRemove = quiltUid => {
    return popBoxConfirmWithLoading({
      content: t`features_settings_center_black_list_index_9zsqyajwgg`,
      onCommit: async () => {
        const res = await postV1ImChatImBlockListRemoveApiRequest({ quiltUid })
        if (res.isOk && res.data?.success) {
          deleteBlackList()
        }
      },
    })
  }

  return (
    <div className="list-item">
      <ChatAvatar size={48} className="overflow-hidden flex-shrink-0 headurl" src={data.avatarPath} />
      <div className="list-info flex h-12 flex-1 ml-3">
        <div className="flex flex-col flex-1 h-12 justify-between">
          <h3 className="text-text_color_01 text-base">{data.nickName}</h3>
          <p className="text-text_color_03 text-sm">
            {t`features_settings_center_black_list_index_nhe530dklj`} {formatTime(data.blockDate)}
          </p>
        </div>
        <Icon
          name="icon_group_chat_leave_group"
          fontSize={20}
          className="text-icon_color pr-4 h-12"
          onClick={() => handleRemove(data.quiltUid)}
        />
      </div>
    </div>
  )
}

function BlackList() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [backData, setbackData] = useState<YapiGetV1ImChatImBlockListQueryListApiResponse[]>([])
  const [filteredBackData, setFilteredBackData] = useState<YapiGetV1ImChatImBlockListQueryListApiResponse[]>([])
  const { loading, data, run } = useRequest(getV1ImChatImBlockListQueryList)

  // 搜索
  const handleSearch = (value: string) => {
    const lowerCaseValue = value.trim().toLowerCase() // 将搜索关键词转换为小写
    setSearchKeyword(lowerCaseValue)
    const filteredBlackList = backData.filter(val => val.nickName.toLowerCase().indexOf(lowerCaseValue) !== -1)
    if (filteredBlackList.length > 0) {
      setFilteredBackData(filteredBlackList)
    }
  }

  // 移除回调
  const deleteBlackList = quiltUid => {
    const updatedBackData = backData.filter(item => item.quiltUid !== quiltUid)
    setbackData(updatedBackData)

    const updatedFilteredBackData = filteredBackData.filter(item => item.quiltUid !== quiltUid)
    setFilteredBackData(updatedFilteredBackData)
  }

  useEffect(() => {
    const res = data
    if (res?.isOk && res?.data) {
      setbackData(res.data || [])
    }
  }, [data])

  return (
    <div className={Styles.scoped}>
      <NavigationBar label={t`features_settings_center_black_list_index_fw_nemor77`} url="/chat-settings" />
      <div className="content">
        <div className="black-search">
          <Input
            className="black-search-input"
            prefix={<Icon name="icon_chat_search" className="text-icon_color text-sm" />}
            placeholder={t`features_group_components_search_input_index_tq98cmscdb`}
            onChange={handleSearch}
          />
        </div>
        <div className="list-box">
          {loading && (
            <div className="flex justify-center mt-5">
              <LoadingElement />
            </div>
          )}
          {!loading && !backData?.length ? (
            <ListEmpty />
          ) : (
            (searchKeyword ? filteredBackData : backData).map((val, index) => {
              return <BlackItem key={index} data={val} deleteBlackList={() => deleteBlackList(val.quiltUid)} />
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default BlackList
