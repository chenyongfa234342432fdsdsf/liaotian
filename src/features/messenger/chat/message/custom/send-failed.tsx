import { MessageSendFailTypeEnum } from '@/plugins/im/constants'
import { IIMMessageSendFailMessageContent } from '@/plugins/im/types'
import { t } from '@lingui/macro'
import { addFriend } from '@/helper/address-book'
import { useImStore } from '@/store/im'
import { useEffect, useRef } from 'react'
import classNames from 'classnames'
import { IMessageProps } from '../base'

function NotFriend({ data, inConversation, message }: IMessageProps<undefined, IIMMessageSendFailMessageContent>) {
  // 可以认为只会在当前会话中出现
  const id = 'add_friend'
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const add = () => {
    if (inConversation) return
    addFriend(message?.senderUserID)
  }
  useEffect(() => {
    const el = wrapperRef.current!.querySelector(`#${id}`)
    el?.addEventListener('click', add)
    return () => {
      el?.removeEventListener('click', add)
    }
  })
  const html = t({
    id: `features_messenger_chat_message_custom_send_failed_cahcplicfg`,
    values: { 0: id },
  })
  // id方式桌面端有 bug
  return (
    <span ref={wrapperRef}>
      {t`features_messenger_chat_message_custom_send_failed_3fmj8r_hi9`}
      <span
        onClick={add}
        id="{0}"
        className={classNames(!inConversation ? 'text-brand_color cursor-pointer mx-px' : '')}
      >
        {t`features_messenger_addition_index_pngdv3umj8`}
      </span>
      {t`features_messenger_chat_message_custom_send_failed_pyme0grqlz`}
    </span>
  )
}
const componentsMap = {
  [MessageSendFailTypeEnum.notFriend]: NotFriend,
}

function getFailedReason(type: MessageSendFailTypeEnum) {
  return {
    [MessageSendFailTypeEnum.notFriend]: t`features_messenger_chat_message_custom_send_failed_edc4b49rhk`,
    [MessageSendFailTypeEnum.youBlocked]: t`features_messenger_chat_message_custom_send_failed_plse0q9s_f`,
    [MessageSendFailTypeEnum.youAreBlocked]: t`features_messenger_chat_message_custom_send_failed_ap_lh8wrm_`,
    [MessageSendFailTypeEnum.otherBlocked]: t`features_messenger_chat_message_custom_send_failed_szqwkabtkd`,
    [MessageSendFailTypeEnum.yourAccountBlocked]: t`features_messenger_chat_message_custom_send_failed_ci415ki0bh`,
    [MessageSendFailTypeEnum.otherAccountCancelled]: t`features_messenger_chat_message_custom_send_failed_7muom7relx`,
    [MessageSendFailTypeEnum.sensitiveContent]: t`features_messenger_chat_message_custom_send_failed_djr2rsm7pd`,
    [MessageSendFailTypeEnum.groupIsBan]: t`features_messenger_chat_message_custom_send_failed_zj1i0j9cvt`,
    [MessageSendFailTypeEnum.isBanInGroup]: t`features_messenger_chat_message_custom_send_failed_skbd77wnsp`,
  }[type]
}

export function SendFailedMessage({ data, ...rest }: IMessageProps<undefined, IIMMessageSendFailMessageContent>) {
  const text = t`features_messenger_chat_message_custom_send_failed_mkobftp6qr`
  const Component = componentsMap[data!.type]
  return (
    <span className="text-text_color_02 message-text">
      {Component ? (
        <Component data={data} {...rest} />
      ) : (
        <>
          {text}
          {t`features_messenger_chat_message_custom_send_failed_afhp0bx_xs`}
          {getFailedReason(data!.type)}
        </>
      )}
    </span>
  )
}
