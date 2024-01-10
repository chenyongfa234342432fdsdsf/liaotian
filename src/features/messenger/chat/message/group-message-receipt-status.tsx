import { Popover, Progress, Spin } from '@nbit/arco'
import classNames from 'classnames'
import { ZIMGroupMemberInfo, ZIMGroupMessageReceiptMemberListQueriedResult, ZIMMessage } from 'zego-zim-web'
import { useRequest } from 'ahooks'
import { getImInstance } from '@/plugins/im/core'
import { useImStore } from '@/store/im'
import { useGroupStore } from '@/store/group'
import { useAddressBookStore } from '@/store/address-book'
import Icon from '@/components/icon'
import { useMemo } from 'react'
import ChatAvatar from '@/components/chat-avatar'
import { oss_svg_image_domain_address } from '@/constants/oss'
import { t } from '@lingui/macro'
import { ZIMMessageReceiptStatus } from '@/plugins/im/constants'
import { IIMMessage } from '@/plugins/im/types'
import style from './group-message-receipt-status.module.css'

enum ReceiptStatus {
  none,
  partial,
  all,
}
export function GroupMessageReceiptStatus(props: {
  message: IIMMessage
  className?: string
  atMembers?: number[]
  popoverClassName?: string
}) {
  const zim = getImInstance()
  const currentConversation = useImStore().currentConversation!
  const { readMemberCount, unreadMemberCount } = props.message
  const info = useRequest(
    async () => {
      if (readMemberCount !== undefined && unreadMemberCount !== undefined) {
        return {
          readMemberCount,
          unreadMemberCount,
        }
      }
      const resp = await zim.queryMessageReceiptsInfo(
        [props.message],
        currentConversation.conversationID,
        currentConversation.type
      )
      return resp.infos[0]
    },
    {
      refreshDeps: [readMemberCount, unreadMemberCount],
    }
  )
  if (info.data) {
    const total = info.data.readMemberCount + info.data.unreadMemberCount
    let status = ReceiptStatus.none
    if (info.data.readMemberCount === total && total > 0) {
      status = ReceiptStatus.all
    } else if (info.data.readMemberCount !== 0) {
      status = ReceiptStatus.partial
    }
    return (
      <div className={classNames(props.className)}>
        <Popover
          position="bottom"
          className={classNames(style.popover, props.popoverClassName)}
          trigger="click"
          content={<Details message={props.message} atMembers={props.atMembers} />}
        >
          <button className="flex items-center" type="button">
            {status === ReceiptStatus.none ? (
              <Icon name="icon_register_single_unselected" className="text-icon_color" fontSize={16} />
            ) : status === ReceiptStatus.partial ? (
              <RoundedProgress
                percent={(info.data.readMemberCount / (info.data.readMemberCount + info.data.unreadMemberCount)) * 100}
              />
            ) : (
              <Icon name="icon_set_logout_successful" className="text-brand_color" fontSize={16} />
            )}
          </button>
        </Popover>
      </div>
    )
  }
  return null
}

function UserList(props: {
  title: string
  users: ZIMGroupMemberInfo[]
  atMembers?: number[]
  border?: boolean
  avatarSize: number
}) {
  return (
    <div className={`scrollable ${props.border ? 'border-r border-line_color_02' : ''} `}>
      <div className="title">
        <div className="count">{props.users.length}</div>
        <div className="read-title">{props.title}</div>
      </div>
      {props.users.map(member => (
        <div key={member.userID} className="flex items-center gap-2">
          <div className="relative">
            <ChatAvatar isGroup={false} size={props.avatarSize} padding={10} src={member.memberAvatarUrl} />
            {props.atMembers?.includes(+member.userID) && (
              <img alt="at" className="absolute right-0 bottom-0" src={`${oss_svg_image_domain_address}at.svg`} />
            )}
          </div>
          <div className="text-text_color_01 text-sm text-ellipsis overflow-hidden whitespace-nowrap">
            {member.memberNickname ?? member.userName}
          </div>
        </div>
      ))}
    </div>
  )
}

function Details(props: { message: ZIMMessage; atMembers?: number[] }) {
  const zim = getImInstance()
  const { groupMembers } = useAddressBookStore()
  const conversation = useImStore().currentConversation!
  const members = groupMembers[conversation.conversationID]
  const { data: [read, unread] = [], loading } = useRequest(() => {
    return Promise.all([
      zim.queryGroupMessageReceiptReadMemberList(props.message, conversation.conversationID, {
        // 按照 members 长度，无法请求到已退群成员的阅读状态
        count: 10000,
        nextFlag: 0,
      }),
      zim.queryGroupMessageReceiptUnreadMemberList(props.message, conversation.conversationID, {
        count: 10000,
        nextFlag: 0,
      }),
    ])
  })

  return (
    <div className={style['details-box']}>
      {loading ? (
        <div className="col-span-2 flex items-center justify-center w-full ">
          <Spin />
        </div>
      ) : (
        <>
          <UserList
            avatarSize={24}
            title={t`features_messenger_chat_message_group_message_receipt_status_ut9f__vbuk`}
            atMembers={props.atMembers}
            users={read?.userList ?? []}
            border
          />
          <UserList
            avatarSize={28}
            title={t`features_messenger_chat_message_group_message_receipt_status_9939wr5syt`}
            atMembers={props.atMembers}
            users={unread?.userList ?? []}
          />
        </>
      )}
    </div>
  )
}
function RoundedProgress(props: { percent: number }) {
  return (
    <div className={style['rounded-progress']}>
      <Progress size="mini" type="circle" percent={props.percent} showText={false} />
    </div>
  )
}
