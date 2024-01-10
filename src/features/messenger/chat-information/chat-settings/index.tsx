import { Switch } from '@nbit/arco'
import Icon from '@/components/icon'
import { useContext, useEffect, useState } from 'react'
import { useImStore } from '@/store/im'
import classNames from 'classnames'
import { ZIMConversationNotificationStatus } from '@/plugins/im/constants'
import {
  CommonChatSettingsSchema,
  CommonGroupChatSettingsSchema,
  GroupAdminCommonSettingsSchema,
  GroupChatSettingsSchema,
  MemberChatSettingsSchema,
  MemberCommonSettingsSchema,
  TSettingsSchema,
  UserChatSettingsSchema,
} from './schema'
import styles from './index.module.css'
import { UserChatInfoContext } from '..'

export function SettingCell(props: Partial<TSettingsSchema> & { onClick?: any; className?: string }) {
  const { name, icon, hasSwitch, hasModal, Modal, switchStatus, onClick, onTrigger, className } = props
  const [modalVisible, setmodalVisible] = useState(false)
  const [isChecked, setisChecked] = useState(switchStatus)

  useEffect(() => {
    setisChecked(switchStatus)
  }, [switchStatus])
  return (
    <div
      className={`${styles['setting-cell']} ${className}`}
      onClick={() => {
        hasModal && setmodalVisible(true)
        onClick && onClick()
      }}
    >
      {icon}
      <span className={classNames('mr-auto text-base', { 'ml-4': icon })}>{name}</span>
      {hasSwitch && (
        <Switch
          checked={isChecked}
          onChange={state => {
            if (onTrigger) {
              setisChecked(state)
              onTrigger(state)
            }
          }}
        />
      )}
      {(hasModal || onClick) && (
        <Icon
          onClick={() => {
            hasModal && setmodalVisible(true)
          }}
          className="setting-icon"
          name="icon_chat_arrow"
        />
      )}
      {Modal && hasModal && <Modal visible={modalVisible} setvisible={setmodalVisible} />}
    </div>
  )
}

function ChatSettingsSkeleton({ className, schema }: { className?: string; schema: Partial<TSettingsSchema>[] }) {
  return (
    <div className={`${className} flex flex-col space-y-8`}>
      {schema?.map((setting, idx) => (
        <SettingCell {...setting} key={idx} />
      ))}
    </div>
  )
}

export function UserChatSettings() {
  const contextUid = useContext(UserChatInfoContext)
  const userSettings = UserChatSettingsSchema(contextUid)
  const { currentConversation } = useImStore()

  // pinned chat
  userSettings[0].switchStatus = currentConversation?.isPinned || false
  // do no disturb chat
  userSettings[1].switchStatus =
    currentConversation?.notificationStatus === ZIMConversationNotificationStatus.DoNotDisturb || false

  return <ChatSettingsSkeleton schema={userSettings as any} />
}

export function CommonChatSettings() {
  return (
    <ChatSettingsSkeleton className={styles['common-contact-settings']} schema={CommonChatSettingsSchema() as any} />
  )
}
export function CommonGroupChatSettings() {
  return (
    <ChatSettingsSkeleton
      className={styles['common-contact-settings']}
      schema={CommonGroupChatSettingsSchema() as any}
    />
  )
}

export function GroupChatSettings() {
  const groupSettings = GroupChatSettingsSchema()
  const { currentConversation } = useImStore()

  // pinned chat
  groupSettings[0].switchStatus = currentConversation?.isPinned || false
  // do no disturb chat
  groupSettings[1].switchStatus =
    currentConversation?.notificationStatus === ZIMConversationNotificationStatus.DoNotDisturb || false

  return <ChatSettingsSkeleton schema={groupSettings} />
}

export function GroupAdminCommonSettings() {
  return (
    <ChatSettingsSkeleton className={styles['common-contact-settings']} schema={GroupAdminCommonSettingsSchema()} />
  )
}

export function MemberCommonSettings() {
  return (
    <ChatSettingsSkeleton className={styles['common-contact-settings']} schema={MemberCommonSettingsSchema() as any} />
  )
}

export function MemberChatSettings({ uid }) {
  return (
    <ChatSettingsSkeleton
      className={styles['not-friend-contact-settings']}
      schema={MemberChatSettingsSchema(uid) as any}
    />
  )
}
