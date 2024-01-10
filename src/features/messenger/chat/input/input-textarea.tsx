import { useEffect, useMemo, useRef, useState } from 'react'
import { renderToString } from 'react-dom/server'
import { useImStore } from '@/store/im'
import { ZIMConversationType } from '@/plugins/im/constants'
import { useEventListener, useMount, useUpdate, useUpdateEffect } from 'ahooks'
import { useMessengerStore } from '@/store/messenger'
import Icon from '@/components/icon'
import { t } from '@lingui/macro'
import classNames from 'classnames'
import { useAddressBookStore } from '@/store/address-book'
import ChatAvatar from '@/components/chat-avatar'
import { Avatar } from '@nbit/arco'
import { popBoxConfirm } from '@/components/pop-box'
import { MENTION_ALL_ID } from '@/helper/message-mention'
import { isSameUid, useCurrentGroupDetail } from '@/helper/address-book'
import { baseUserStore } from '@/store/user'
import ReactQuill, { Quill, UnprivilegedEditor } from 'react-quill'
import { DeltaStatic, Sources } from 'quill'
// @ts-ignore
import QuillMention from 'quill-mention'
import { GroupHideNormalMembers } from '@/constants/group'
import { emoticonsTypes } from '@/components/emoticons'
import { EmojiBlotName } from './rich-text/emoji-blot'
import styles from './input-textarea.module.css'
import { ChatAudio } from './chat-audio'
import { getMessageInfoFromQuillDelta } from './rich-text'
import { InputEmoji } from './input-emoji'
import { textEmojiMatcher, imageEmojiMatcher } from './rich-text/emoji-blot/emoji-matcher'

Quill.register('modules/mention', QuillMention)

export function InputTextarea({
  sendMessage,
  onPasteMedia,
}: {
  sendMessage: (plainTextValue, mentions: string) => void
  onPasteMedia: (mediaFile: File) => void
}) {
  const imStore = useImStore()
  const [selectedEmoji, setselectedEmoji] = useState<emoticonsTypes>()
  const currentConversation = imStore.currentConversation
  const isGroup = currentConversation?.type === ZIMConversationType.Group
  const [composition, setComposition] = useState(false)
  const { chatMessagesScrollIntoBottom, messageByReEdit, setMessageByReEdit } = useMessengerStore()
  // 编辑器内容
  const [value, setValue] = useState('')
  const mentionInputRef = useRef<ReactQuill>(null)
  const [focused, setFocused] = useState(false)
  const [selection, setSelection] = useState<ReactQuill.Range>(null)
  const quillEditor = mentionInputRef.current?.getEditor()
  const [plainTextValue, mentionStr] = quillEditor
    ? getMessageInfoFromQuillDelta(mentionInputRef.current!.getEditor().getContents())
    : ['', '']

  const onChangeSelection = (range: ReactQuill.Range) => {
    // 为 null 的时候不需要保存
    if (range) {
      setSelection(range)
    }
    setFocused(!!range)
  }
  useUpdateEffect(() => {
    if (focused && selection) {
      const editor = mentionInputRef.current!.getEditor()
      // 光标在表情位置获取不对，所以这里单独处理，默认第一次获取焦点时移动到最后
      editor.setSelection(editor.getLength(), 0)
    }
  }, [focused])

  const send = () => {
    if (!value || composition) {
      return
    }
    sendMessage(plainTextValue, mentionStr)
    chatMessagesScrollIntoBottom()
    // 回车时会触发默认的换行，所以要延迟清空
    setTimeout(() => {
      setValue('')
    }, 20)
  }
  const sendRef = useRef(send)
  sendRef.current = send
  const inputRef = useRef<HTMLInputElement | undefined>()
  inputRef.current = mentionInputRef?.current?.getEditor().root.querySelector('input') || undefined

  useEventListener(
    'keydown',
    e => {
      if (e.code === 'Enter') {
        e.preventDefault()
        send()
      }
    },
    {
      target: inputRef,
    }
  )
  useEventListener(
    'compositionstart',
    e => {
      setComposition(true)
    },
    {
      target: inputRef,
    }
  )
  useEventListener(
    'compositionend',
    e => {
      setComposition(false)
    },
    {
      target: inputRef,
    }
  )
  // 功能和交互不完善，暂不开启
  const enablePastImage = false
  useEventListener('paste', async e => {
    if (!enablePastImage || !currentConversation) {
      return
    }
    // 处理图片
    const items = e.clipboardData?.items
    if (!items) {
      return
    }
    const image = Array.from(items).find(item => item.type.indexOf('image') !== -1)
    if (!image) {
      return
    }
    const file = image.getAsFile()
    if (!file) {
      return
    }
    const url = URL.createObjectURL(file)
    await popBoxConfirm(
      t`features_messenger_chat_input_input_textarea_jjlzchijlo`,
      <img src={url} className="w-40" alt="" />
    )
    onPasteMedia(file)
  })

  useUpdateEffect(() => {
    if (messageByReEdit) {
      setValue(messageByReEdit)
      setTimeout(() => {
        mentionInputRef.current?.getEditor().focus()
      }, 20)
    }
    setMessageByReEdit('')
  }, [messageByReEdit])
  useUpdateEffect(() => {
    if (selectedEmoji) {
      const editor = mentionInputRef.current!.getEditor()
      editor.insertEmbed(selection?.index || 0, EmojiBlotName, selectedEmoji)
      const index = (selection?.index || 0) + 1
      setSelection({
        index,
        length: 0,
      })

      // 这里初始化不知道为什么第一次输入表情会被删除，所以要单独处理
      setTimeout(() => {
        // 1 是因为有默认的换行符
        if (editor.getLength() === 1) {
          editor.insertEmbed(selection?.index || 0, EmojiBlotName, selectedEmoji)
        }
      }, 40)
    }
  }, [selectedEmoji])
  useUpdateEffect(() => {
    // 重置状态
    setValue('')
  }, [currentConversation?.conversationID])
  const { groupMembers } = useAddressBookStore()
  const currentGroupDetail = useCurrentGroupDetail()
  const showNormalUser = currentGroupDetail?.groupData?.isHideUser === GroupHideNormalMembers.show
  const users = useMemo(() => {
    const list = (groupMembers?.[currentConversation?.conversationID || ''] || []).map(user => {
      return {
        id: user.uid as string | number,
        // 取真实昵称，不考虑群昵称和备注
        display: user.realNickName,
        value: user.realNickName,
        ...user,
      }
    })
    const self = list.find(item => isSameUid(item.id, baseUserStore.getState().userInfo.uid))
    // 管理员才有所有人可展示 & 群未关闭展示普通账号
    if (showNormalUser && (self?.lord || self?.isAdministrator)) {
      list.unshift({
        id: MENTION_ALL_ID,
        display: t`features_messenger_chat_input_input_textarea_pdwrrndr4p`,
        value: t`features_messenger_chat_input_input_textarea_pdwrrndr4p`,
      } as any)
    }
    return list
  }, [currentConversation?.conversationID, groupMembers, showNormalUser])
  const onChange = function (newValue: string, delta: DeltaStatic, source: Sources, editor: UnprivilegedEditor) {
    setValue(newValue.replace(/\n$/, ''))
  }
  const renderSuggestion = (suggestion: typeof users[0]) => {
    const isAll = suggestion.id === MENTION_ALL_ID
    const prevent = e => {
      e.preventDefault()
      e.stopPropagation()
    }
    if (isAll) {
      return (
        <div>
          <div className="mention-item">
            <Avatar size={28} className="!bg-brand_color text-button_text_01 mr-2">
              @
            </Avatar>
            <span className="mr-2">{t`features_messenger_chat_input_input_textarea_pdwrrndr4p`}</span>
            <span className="text-xs font-medium text-text_color_02">{t`features_messenger_chat_input_input_textarea_lo5csyv5p1`}</span>
          </div>
          <div onClick={prevent} className="cursor-default text-xs text-text_color_02 pt-3 pb-2 px-3">
            {t`features_messenger_chat_input_input_textarea_p7y2ocjgii`}
          </div>
        </div>
      )
    }
    return (
      <div className="mention-item">
        <ChatAvatar className="mr-2" size={28} src={suggestion.avatarPath} />
        {suggestion.display.replace('@', '')}
      </div>
    )
  }
  const usersRef = useRef(users)
  usersRef.current = users
  const editorModulesRef = useRef({
    toolbar: false,
    mention: {
      allowedChars: /^.*$/,
      mentionDenotationChars: ['@'],
      // 这个空格是不展示出来的，所以要去掉，单独处理
      spaceAfterInsert: true,
      source(searchTerm, renderList) {
        const list = usersRef.current.filter(item => {
          return searchTerm ? item.display.toUpperCase().includes(searchTerm.toUpperCase()) : true
        })
        renderList(list, searchTerm)
      },
      renderItem(item) {
        const div = document.createElement('div')
        div.innerHTML = renderToString(renderSuggestion(item))
        return div
      },
      onSelect(item, insertItem) {
        insertItem(item)
      },
    },
    keyboard: {
      bindings: {
        // 重写回车事件，不换行，发送消息
        enter: {
          key: 13,
          handler(range, context) {
            sendRef.current()
            return false
          },
        },
      },
    },
    clipboard: {
      newLines: false,
      matchers: [
        [Node.TEXT_NODE, textEmojiMatcher],
        ['img', imageEmojiMatcher],
      ],
    },
  })

  return (
    <div className="flex-1 flex items-center">
      <div
        className={classNames(styles['input-textarea-wrapper'], {
          'is-focused': focused,
        })}
      >
        <div className="mr-2">
          <InputEmoji onChange={setselectedEmoji} />
        </div>
        <ReactQuill
          formats={['emoji', 'mention', 'image']}
          ref={mentionInputRef}
          modules={editorModulesRef.current}
          value={value}
          placeholder={t`features_messenger_chat_input_input_textarea_betpbce5n2`}
          onChange={onChange}
          onChangeSelection={onChangeSelection}
        />
      </div>
      {plainTextValue ? (
        <Icon onClick={send} name="icon_chat_send" className="text-icon_color hover:text-brand_color text-2xl" />
      ) : (
        <ChatAudio />
      )}
    </div>
  )
}
