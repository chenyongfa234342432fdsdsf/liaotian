import { useState } from 'react'
import { Statistic } from '@nbit/arco'
import { t } from '@lingui/macro'
import styles from './index.module.css'

const Countdown = Statistic.Countdown

function UserCountDown({ onSend, defaultText = '发送', resendText = '重新发送' }) {
  const [start, setStart] = useState<boolean>(false)
  const [text, setText] = useState<string>(defaultText)
  const now = Date.now()
  const value = now + 60 * 1000

  const handleSend = async () => {
    const isTrue = await onSend()
    isTrue && setStart(true)
  }

  return (
    <div className={`user-count-down ${styles.scoped}`}>
      <Countdown
        value={value}
        format="s"
        start={start}
        now={now}
        onFinish={() => {
          setStart(false)
          setText(resendText)
        }}
        renderFormat={(_, values) => {
          return (
            <div className="user-count-down-btn-wrap">
              <button type="button" disabled={start} onClick={handleSend}>
                {start ? `${values}s` : text}
              </button>
            </div>
          )
        }}
      />
    </div>
  )
}

export default UserCountDown
