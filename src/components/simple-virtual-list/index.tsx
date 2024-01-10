import { useDebounceFn, useEventListener, usePrevious, useScroll, useThrottleFn } from 'ahooks'
import { ReactNode, useEffect, useRef, useState } from 'react'

type ISimpleVirtualListProps<T> = {
  /** 分页的数量 */
  pageSize: number
  /** 全部数据 */
  data: T[]
  /** 渲染函数 */
  render: (data: T) => ReactNode
  /** 默认数据从最开始展示，传入 true 可以从最后一条展现 */
  reverse?: boolean
  /** 获取下一页数据 */
  loadNext?: (current?: T) => Promise<T[]>
  /** 获取上一页数据 */
  loadPrev?: (current: T) => Promise<T[]>
  compare?: (a: T, b: T) => boolean
  getKey: (item: T, index: number) => string
}

/**
 * 简易的虚拟列表
 * 用第三方组件的太复杂了而且也很多 bug，所以自己写一个简单的
 * 核心逻辑是展现固定数量的数据，和其他组件不同，这个组件不会自己去计算高度，而是触顶触底之后加载数据，然后将多余的数据去除
 * 父元素需要定高
 */
function SimpleVirtualList<T>(props: ISimpleVirtualListProps<T>) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const displayCount = props.pageSize * 3
  // 第一次的时候默认展示全部数据
  const [displayData, setDisplayData] = useState<T[]>([])
  // 上次浏览时的数据是
  const preViewDataRef = useRef<T | null>(null)
  const updateDisplayData = (res: T[], isAppend = false) => {
    if (res.length === 0) {
      return
    }
    setDisplayData(old => {
      let temp = [...(isAppend ? [] : res), ...old, ...(isAppend ? res : [])]
      if (temp.length > displayCount) {
        // 超出了的话，按情况截取一半
        const half = temp.length - displayCount

        temp = temp.slice(isAppend ? half : 0, isAppend ? undefined : displayCount)
      }

      return temp
    })
  }
  const compare = props.compare || ((a, b) => a === b)
  const [loading, setLoading] = useState(false)
  const startIndex = displayData[0] ? props.data.findIndex(item => compare(item, displayData[0])) : 0
  const endIndex = displayData[0]
    ? props.data.findIndex(item => compare(item, displayData[displayData.length - 1]))
    : -1
  const scrollPosition = useScroll(wrapperRef)
  const preScrollPosition = usePrevious(scrollPosition)
  const isUp = scrollPosition && preScrollPosition ? scrollPosition.top < preScrollPosition.top : false
  const setDataIngRef = useRef(false)
  const onToBottom = () => {
    // 触底
    if ((endIndex > -1 || displayData.length === 0) && endIndex < props.data.length - 1) {
      setDataIngRef.current = true
      preViewDataRef.current = displayData[displayData.length - 1]
      // 先把还没加载完的加进去
      updateDisplayData(props.data.slice(endIndex + 1, Math.min(props.data.length, endIndex + 1 + displayCount)), true)
      return
    }
    if (loading || !props.loadNext || isUp) {
      return
    }
    setLoading(true)
    const current = displayData[displayData.length - 1]
    props
      .loadNext(current)
      .then(res => {
        updateDisplayData(res, true)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const onToTop = () => {
    if (startIndex > 0 || displayData.length === 0) {
      setDataIngRef.current = true
      preViewDataRef.current = displayData[0]
      // 先把还没加载完的加进去
      updateDisplayData(props.data.slice(Math.max(0, startIndex - displayCount), startIndex))
      return
    }
    // 触顶
    if (loading || !props.loadPrev) {
      return
    }
    setLoading(true)
    const current = displayData[0]
    props
      .loadPrev(current)
      .then(res => {
        updateDisplayData(res, false)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const { run: onScrollDebounce } = useDebounceFn(
    () => {
      const { scrollTop, scrollHeight, clientHeight } = wrapperRef.current!
      if (scrollTop <= 100 && isUp) {
        onToTop()
      }
      if (scrollHeight - scrollTop - clientHeight <= 100 && isUp) {
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

  const childrenRefs = useRef<HTMLDivElement[]>([])
  useEffect(() => {
    setDataIngRef.current = false
    if (displayData.length > 0) {
      if (preViewDataRef.current) {
        // TODO: 滚动到到之前的位置
        // const index = displayData.findIndex(item => compare(item, preViewDataRef.current as T))
        // wrapperRef.current!.scrollTop = childrenRefs.current[index].offsetTop
      }
      return
    }
    const isSameData = props.data.every((item, index) => compare(item, props.data[index]))
    if (!isSameData) {
      setDisplayData([])
    }
    if (props.reverse) {
      onToBottom()
    } else {
      onToTop()
    }
  }, [props.data, displayData])

  return (
    <div onWheel={onWheelThrottle} onScroll={onScrollDebounce} className="h-full overflow-y-auto" ref={wrapperRef}>
      {displayData.map((item, index) => {
        return (
          <div
            ref={el => {
              childrenRefs.current[index] = el!
            }}
            key={props.getKey(item, index)}
          >
            {props.render(item)}
          </div>
        )
      })}
    </div>
  )
}

export default SimpleVirtualList
