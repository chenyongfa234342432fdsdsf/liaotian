import { useDebounceFn, useMount, useSize } from 'ahooks'
import { useEffect, useRef, useState } from 'react'
import { CellMeasurer, CellMeasurerCache, List, AutoSizer } from 'react-virtualized/dist/commonjs'
import produce from 'immer'
import ChatMessage from './message'

export function MessagesVirtual({ loadMore, messages }) {
  // 设置虚拟列表要查看的数据条数
  const [listRowIndex, setListRowIndex] = useState(0)
  /** 虚拟列表 Dom */
  const chatWindowRef = useRef<any>(null)
  const loadingRef = useRef(false)
  const messagesRef = useRef(messages)
  messagesRef.current = messages
  const [heightList, setHeightList] = useState<number[]>([])
  const getRowHeight = ({ index }) => {
    return heightList[index] || 42
  }
  const cellMeasurerCacheRef = useRef(
    new CellMeasurerCache({
      defaultHeight: 109,
      fixedWidth: true,
    })
  )
  function rowRenderer({ index, key, parent, style }) {
    const message = messagesRef.current[index]
    if (!message) {
      return null
    }

    return (
      <CellMeasurer cache={cellMeasurerCacheRef.current} columnIndex={0} key={key} parent={parent} rowIndex={index}>
        {({ registerChild }) => {
          const onHeightChange = (height: number) => {
            setHeightList(
              produce(draft => {
                const realIndex = messages.findIndex(item => item.messageID === message.messageID)
                draft.splice(realIndex, 1, height)
              })
            )
            if (!height[index]) {
              setTimeout(() => {
                // chatWindowRef.current?.recomputeRowHeights(index)
              }, 500)
            }
          }
          return (
            <div
              ref={registerChild}
              style={{
                ...style,
              }}
            >
              <ChatMessage setHeight={onHeightChange} message={message} />
            </div>
          )
        }}
      </CellMeasurer>
    )
  }
  const virtualListWrapperRef = useRef<HTMLDivElement>(null)
  const virtualListWrapperRefSize = useSize(virtualListWrapperRef)

  const { run: onScrollChatList } = useDebounceFn(
    item => {
      if (loadingRef.current) {
        return
      }

      if (item.scrollTop < 30) {
        loadingRef.current = true
        loadMore()
      }
    },
    {
      wait: 300,
    }
  )

  useEffect(() => {
    chatWindowRef.current?.recomputeRowHeights()
  }, [virtualListWrapperRefSize?.width])

  return (
    <div ref={virtualListWrapperRef} className="relative h-full">
      <List
        ref={chatWindowRef}
        width={(virtualListWrapperRefSize?.width as number) || 0}
        height={virtualListWrapperRefSize?.height || 400}
        /** 展现条数 */
        rowCount={messages.length}
        overscanRowCount={20}
        /** 缓存 */
        deferredMeasurementCache={cellMeasurerCacheRef.current}
        /** 行高 */
        rowHeight={cellMeasurerCacheRef.current.rowHeight}
        /** 渲染dom */
        rowRenderer={rowRenderer}
        /** 滚动监听事件 */
        onScroll={onScrollChatList}
        /** 滚动定位 */
        scrollToIndex={listRowIndex}
      />
    </div>
  )
}
