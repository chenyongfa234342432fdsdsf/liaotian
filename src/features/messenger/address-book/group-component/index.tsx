import Icon from '@/components/icon'
import { IIMMessage } from '@/plugins/im/types'
import ChatAvatar from '@/components/chat-avatar'
import { useMyGroupStore } from '@/store/my-group'
import classNames from 'classnames'
import styles from './index.module.css'
import ConversationMessage from '../../conversations/message'

interface ICrew {
  img?: string
  icon?: string
  crewName: string
  right?: string
  line?: boolean
  number?: number
  messageDisturb?: boolean
  message?: IIMMessage
  time?: string | null
  groupItemWidth?: number
}
function GroupCom(props: ICrew) {
  const {
    crewName,
    right,
    line = true,
    img,
    icon = 'icon_address_book_new_friend',
    number,
    messageDisturb = false,
    message,
    time,
  } = props
  const { joinWidth, foundWidth } = useMyGroupStore()

  return (
    <div className={styles['group-com']}>
      <div className="nav-item">
        {/* 头像 */}
        <div className="nav-item-left">
          <div className="nav-ico-box">
            <ChatAvatar size={48} src={img} isGroup />
            {/* {img ? <img src={img} alt="" /> : <Icon name={icon} fontSize={24} className="icon-color" />} */}
          </div>
        </div>
        {/* 右侧 */}
        <div className="nav-item-right">
          <div className="right-top">
            <div>
              <div className="group-name">
                {crewName}
                <span className="group-number">({number})</span>
              </div>
            </div>
            <div>{time}</div>
          </div>
          <div className="right-bottom">
            <div
              className={classNames(
                'w',
                (joinWidth === 399 || foundWidth === 399) && 'message2',
                (joinWidth === 479 || foundWidth === 479) && 'message3'
              )}
            >
              <ConversationMessage message={message} />
            </div>
            <div>{messageDisturb && <Icon name="icon_chat_do_not_disturb" />}</div>
          </div>
        </div>
      </div>
      {line && <div className="line"></div>}
    </div>
  )
}

export default GroupCom
