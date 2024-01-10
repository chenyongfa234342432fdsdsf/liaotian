import { useImStore } from '@/store/im'
import { groupToConversation } from '@/helper/conversation'
import { useState } from 'react'
import Tabs from '@/components/tabs'
import classNames from 'classnames'
import { useAddressBookStore } from '@/store/address-book'
import { t } from '@lingui/macro'
import { ContactItem, IChildProps, renderContactItems } from './base'
import styles from './index.module.css'

enum TabEnum {
  created = 'created',
  joined = 'joined',
}

export function Group({ selectedContacts, onChange }: IChildProps) {
  const tabs = [
    {
      label: t`features_select_contact_group_iykozky04y`,
      id: TabEnum.created,
    },
    {
      label: t`features_select_contact_group_f2v65kjlnm`,
      id: TabEnum.joined,
    },
  ]
  const [selectedTab, setSelectedTab] = useState(TabEnum.created)
  const { joinGroupList, myGroupList } = useAddressBookStore()
  const conversations = (selectedTab === TabEnum.created ? myGroupList : joinGroupList).map(item =>
    groupToConversation(item)
  )
  return (
    <div className={styles['groups-wrapper']}>
      <div className="tabs">
        {tabs.map(item => {
          const onClick = () => {
            setSelectedTab(item.id)
          }
          return (
            <div
              onClick={onClick}
              key={item.id}
              className={classNames('tab', {
                'is-selected': selectedTab === item.id,
              })}
            >
              {item.label}
            </div>
          )
        })}
      </div>
      <div className="flex-1 overflow-y-auto">
        {renderContactItems({
          conversations,
          selectedContacts,
          onChange,
        })}
      </div>
    </div>
  )
}
