import { ReactNode, useEffect, useState } from 'react'
import Highlighter from 'react-highlight-words'
import LazyImage from '@/components/lazy-image'
import Icon from '@/components/icon'
import { fa } from 'make-plural'
import classNames from 'classnames'
import ChatAvatar from '@/components/chat-avatar'
import { ZIMConversationType } from '@/plugins/im/constants'
import styles from './index.module.css'

interface ICrew {
  // icon: string
  searchValue?: string
  right?: ReactNode
  line?: boolean
  isSelect?: boolean
  isShowSelected?: boolean
  selectClick?: (friendInfo) => void
  friendInfo: any
  /** 是否禁用 */
  disabled?: boolean
  avatarSize?: number
}
function Crew(props: ICrew) {
  const {
    friendInfo,
    right,
    searchValue = '',
    line = true,
    isShowSelected = true,
    selectClick,
    isSelect,
    disabled,
    avatarSize = 48,
  } = props
  const { avatarPath, nickName, friendRemark, type } = friendInfo

  return (
    <div className={styles.crew}>
      <div
        className="nav-item"
        onClick={() => {
          if (disabled) return
          selectClick &&
            selectClick({
              friendInfo,
              isSelect: !isSelect,
            })
        }}
      >
        <div className="nav-item-left">
          {isShowSelected && (
            <div className="select-icon">
              {isSelect ? (
                <Icon
                  className={classNames('selected-icon', {
                    disabled,
                  })}
                  name="icon_chat_selected"
                />
              ) : (
                <Icon
                  className={classNames('not-selected-icon', {
                    disabled,
                  })}
                  name="icon_chat_not_selected"
                />
              )}
            </div>
          )}
          <div
            className={classNames('nav-ico-box', {
              disabled,
            })}
          >
            <ChatAvatar
              className="chat-avatar"
              size={avatarSize}
              src={avatarPath}
              isGroup={type === ZIMConversationType.Group}
            />
          </div>
          <div
            className={classNames('nav-text', {
              disabled,
            })}
          >
            {
              <Highlighter
                caseSensitive={false}
                highlightClassName="highlighted"
                searchWords={[searchValue]}
                autoEscape
                textToHighlight={friendRemark || nickName || ''}
              />
            }
          </div>
        </div>
        <div className="nav-item-right">{right}</div>
      </div>
      {line && <div className="line"></div>}
    </div>
  )
}

export default Crew
