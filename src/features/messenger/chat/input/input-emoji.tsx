import Emoticons from '@/components/emoticons'
import Icon from '@/components/icon'
import { useClickAway } from 'ahooks'
import { ComponentProps, useRef, useState } from 'react'

export function InputEmoji({ onChange }: ComponentProps<typeof Emoticons>) {
  const [emojiVisible, setEmojiVisible] = useState(false)
  const wrapperRef = useRef(null)
  useClickAway(() => {
    setEmojiVisible(false)
  }, wrapperRef)
  return (
    <div ref={wrapperRef}>
      <Icon
        onClick={() => setEmojiVisible(!emojiVisible)}
        name="icon_chat_expression"
        className="text-brand_color text-2xl"
      />
      {emojiVisible && (
        <div className="absolute bottom-16 left-0 z-10">
          <Emoticons onChange={onChange} />
        </div>
      )}
    </div>
  )
}
