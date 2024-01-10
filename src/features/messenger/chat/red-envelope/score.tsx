import cls from 'classnames'
import { t } from '@lingui/macro'
import style from './score.module.css'

export function Score(props: { className?: string; score: number }) {
  return (
    <div className={cls(style.score, props.className)}>
      <div className="score">
        {props.score.toFixed(2)}
        <span className="points">{t`features_messenger_chat_red_envelope_receiver_pm1ruksqfc`}</span>
      </div>
      <div className="link">{t`features_messenger_chat_red_envelope_score_akn17fouoc`} &gt;</div>
    </div>
  )
}
