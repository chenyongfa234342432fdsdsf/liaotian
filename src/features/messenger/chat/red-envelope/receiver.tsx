import classNames from 'classnames'
import { t } from '@lingui/macro'
import ChatAvatar from '@/components/chat-avatar'
import { formatTimeInRedPacket } from '@/helper/message'
import style from './receiver.module.css'

export function Receiver(props: { name: string; url?: string; time: string; score: number; underline?: boolean }) {
  return (
    <div className={style.receiver}>
      <div className="avatar-icon">
        <ChatAvatar size={40} src={props.url} />
      </div>
      <div className={classNames('msg', props.underline && 'border-bottom-underline', 'receiver-grid')}>
        <div className="name">{props.name}</div>
        <div className="score">
          {props.score.toFixed(2)} {t`features_messenger_chat_red_envelope_receiver_pm1ruksqfc`}
        </div>
        <div className="time">{formatTimeInRedPacket(+props.time)}</div>
      </div>
    </div>
  )
}
