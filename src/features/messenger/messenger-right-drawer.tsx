import classNames from 'classnames'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal, render, unmountComponentAtNode } from 'react-dom'
import { HOME_RIGHT_DRAWER_ID } from '@/constants/dom'
import { useMount, useSafeState, useUpdate, useUpdateEffect } from 'ahooks'
import { envIsServer } from '@/helper/env'
import { useMessengerStore } from '@/store/messenger'
import Icon from '@/components/icon'
import { useImStore } from '@/store/im'
import styles from './messenger-right-drawer.module.css'

export type IMessengerRightDrawerProps = {
  visible?: boolean
  onClose?: () => void
  children?: ReactNode
  destroyOnClose?: boolean
}

export function MessengerRightDrawer(props: IMessengerRightDrawerProps) {
  const [loaded, setLoaded] = useState(false)
  const [selfCount, setSelfCount] = useSafeState(0)
  const { currentConversation } = useImStore()
  const { drawersCount, increaseDrawersCount, decreaseDrawersCount } = useMessengerStore()
  useEffect(() => {
    if (props.visible) {
      increaseDrawersCount()
      setLoaded(true)
      // 进场时，zIndex 的变化需要比动画开始早，反之则晚
      setTimeout(() => {
        setSelfCount(drawersCount + 1)
      }, 100)
      // 加载过才能卸载
    } else if (loaded) {
      decreaseDrawersCount()
      // 动画结束后再减少
      setTimeout(() => {
        setSelfCount(0)
      }, 100)
    }
  }, [props.visible])
  useUpdateEffect(() => {
    props.onClose?.()
  }, [currentConversation?.conversationID])
  if (envIsServer) {
    return null
  }
  const container = document.querySelector(`#${HOME_RIGHT_DRAWER_ID}`)
  if (!loaded || !container) {
    return null
  }
  if (props.destroyOnClose && !props.visible) {
    return null
  }
  return createPortal(
    <div
      className={classNames(styles['drawer-content-wrapper'], {
        // 只用 visible 会有 zIndex 和动画不同步的问题
        'wrapper-invisible': (props.visible && selfCount === 0) || !props.visible,
      })}
      style={{
        zIndex: props.visible && selfCount === 0 ? 999 : selfCount,
      }}
    >
      {props.children}
    </div>,
    container as Element
  )
}

interface IMessengerRightNavBar {
  title?: string
  onClose: () => void
  isCloseIcon?: boolean
}
export const MessengerRightNavBar = React.forwardRef((props: IMessengerRightNavBar, ref: any) => {
  const { title, onClose, isCloseIcon } = props
  return (
    <div
      className={classNames(
        styles['messenger-right-nav-bar'],
        'bg-box_bg_color',
        {
          'bg-brand_color_animate': !isCloseIcon,
        },
        { 'border-line_color_02 border-b-2': isCloseIcon }
      )}
    >
      <span onClick={() => onClose()} ref={ref}>
        {isCloseIcon ? (
          <Icon className="close-icon" name="icon_chat_close" />
        ) : (
          <Icon className="back-icon" name="a-Notselected" />
        )}
      </span>

      {title && (
        <span className={classNames('ml-6 text-button_text_01 text-base', { 'text-text_color_01': isCloseIcon })}>
          {title}
        </span>
      )}
    </div>
  )
})
