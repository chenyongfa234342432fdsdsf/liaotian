import { Input, Message } from '@nbit/arco'
import { useGroupStore } from '@/store/group'
import { useState } from 'react'
import { createGroup } from '@/apis/group'
import { createConversation } from '@/helper/conversation'
import { IGroup } from '@/typings/apis/address-book'
import { link } from '@/helper/link'
import { t } from '@lingui/macro'
import { baseAddressBookStore } from '@/store/address-book'
import { useRequest } from 'ahooks'
import NavComponent from '../components/nav-component'
import GroupImgUpload from '../components/group-img-upload'
import Styles from './index.module.css'
import Crew from '../components/crew-component'
import ConfirmBtn from '../components/confirm-btn'

export default function CreateGroup() {
  const [groupName, setGroupName] = useState('')
  const [headImage, setHeadImage] = useState('')
  const { groupSelectedList } = useGroupStore()
  const { setAddressBookList, setMyGroupList, setJoinGroupList } = baseAddressBookStore.getState()
  const [isLoading, setIsLoading] = useState(false)
  const createGroupSend = async () => {
    setIsLoading(true)
    const userIDs = groupSelectedList.reduce((pre: number[], cur) => {
      return [...pre, cur.uid]
    }, [])
    const res = await createGroup({
      groupName,
      headImage,
      member: userIDs,
    })

    setIsLoading(false)
    if (res.isOk && res.data) {
      link('/messenger')
      setJoinGroupList()
      setMyGroupList()
      Message.success(t`features_group_create_group_index_vngubrgasg`)
      // 跳转进群聊天
      createConversation({
        group: {
          groupName,
          headImage,
          groupId: res.data.groupId,
          messageDisturb: 1,
        } as IGroup,
      })
    }
  }
  return (
    <div className={Styles['crate-group']}>
      <NavComponent titleText={t`features_group_create_group_index_klqpjyuhzi`} />
      <div className="group-info">
        <div className="bg-card_bg_color_03 -mt-8 pt-8">
          <GroupImgUpload onHeadImgChange={val => setHeadImage(val)} />
        </div>
        <div className="group-name-text">{t`features_group_create_group_index_7hraoetkc6`}</div>
        <Input
          className="group-name-input"
          placeholder={t`features_group_create_group_index_knk6ua2wn0`}
          onChange={val => setGroupName(val)}
        />
        <div className="px-4 bg-card_bg_color_03">
          <div className="separate-line1"></div>
        </div>
        <div className="separate-line"></div>
        <div className="separate-line2"></div>
        {/* 群成员 */}
        <div className="selected-list">
          <p className="mb-3 text-text_color_02">{t`features_group_create_group_index_hppnv4p8ie`}</p>
          <div>
            {groupSelectedList.map((contact, index) => {
              return (
                <Crew
                  line={!(index === groupSelectedList.length - 1)}
                  friendInfo={contact}
                  key={index}
                  isShowSelected={false}
                />
              )
            })}
          </div>
        </div>
        {groupName && <ConfirmBtn isLoading={isLoading} clickFunc={createGroupSend} />}
      </div>
    </div>
  )
}
