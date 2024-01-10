import { useDebounceFn, useEventListener, usePrevious, useScroll, useThrottleFn, useUpdateEffect } from 'ahooks'
import { ReactNode, forwardRef, useEffect, useRef, useState } from 'react'

type IListWrapperProps = {
  /** 获取下一页数据 */
  loadNext?: () => any
  /** 获取上一页数据 */
  loadPrev?: () => any
  threshold?: number
  children?: ReactNode
  className?: string
  /** 向下加载完成后如果需要保持滚动，就让这个数字 + 1 即可 */
  keepScrollAfterLoadNext?: number
  /** 同上 */
  keepScrollAfterLoadPrevAfter?: number
}

/**
 * 包含了触顶和触底的逻辑
 */
function ListWrapperComponent(props: IListWrapperProps, ref) {
  const { threshold = 20 } = props
  let wrapperRef = useRef<HTMLDivElement>(null)
  wrapperRef = ref || wrapperRef
  const scrollPosition = useScroll(wrapperRef)
  const preScrollPosition = usePrevious(scrollPosition)
  const isUp = scrollPosition && preScrollPosition ? scrollPosition.top < preScrollPosition.top : false
  // 向上加载之前的高度
  const preAllHeight = useRef(0)
  // 向下加载之前的滚动
  const preScrollTop = useRef(0)
  const onToBottom = () => {
    preScrollTop.current = Math.max(wrapperRef.current!.scrollTop, 0)
    props.loadNext?.()
  }
  const onToTop = () => {
    preAllHeight.current = Math.max(wrapperRef.current!.scrollHeight - threshold, 0)
    props.loadPrev?.()
  }
  const { run: onScrollDebounce } = useDebounceFn(
    () => {
      const { scrollTop, scrollHeight, clientHeight } = wrapperRef.current!
      if (scrollTop <= threshold && isUp) {
        onToTop()
      }
      if (scrollHeight - scrollTop - clientHeight <= threshold && isUp) {
        onToBottom()
      }
    },
    {
      wait: 30,
    }
  )
  const { run: onWheelThrottle } = useThrottleFn(
    e => {
      if (!wrapperRef.current) {
        return
      }
      // 滚轮只监听到顶的时的处理
      if (
        e.deltaY > 0 &&
        wrapperRef.current.scrollHeight - wrapperRef.current.scrollTop - wrapperRef.current.clientHeight < 20
      ) {
        onToBottom()
      } else if (e.deltaY < 0 && wrapperRef.current.scrollTop === 0) {
        onToTop()
      }
    },
    {
      wait: 1000,
      trailing: false,
    }
  )

  useUpdateEffect(() => {
    const preHeight = preAllHeight.current
    wrapperRef.current!.scrollTop = wrapperRef.current!.scrollHeight - preHeight
  }, [props.keepScrollAfterLoadPrevAfter])

  useUpdateEffect(() => {
    const preScroll = preScrollTop.current
    wrapperRef.current!.scrollTop = preScroll
  }, [props.keepScrollAfterLoadNext])

  return (
    <div onWheel={onWheelThrottle} onScroll={onScrollDebounce} className={props.className} ref={wrapperRef}>
      {props.children}
    </div>
  )
}

export const ListWrapper = forwardRef(ListWrapperComponent)
