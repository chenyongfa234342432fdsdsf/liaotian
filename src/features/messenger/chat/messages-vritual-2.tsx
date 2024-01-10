import React, { useMemo, useRef, useState } from 'react'
import { useMount, useVirtualList } from 'ahooks'
import produce from 'immer'
import ChatMessage from './message'

export function MessagesVirtual2({ messages, loadMore }) {
  const containerRef = useRef(null)
  const wrapperRef = useRef(null)

  const originalList = messages

  const [heightList, setHeightList] = useState<Record<string, number>>({})

  const [list, scrollTo] = useVirtualList(originalList, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    itemHeight: (_, data) => {
      return heightList[data.messageID] || 42
    },
    overscan: 20,
  })
  const onScroll = e => {
    if (e.target.scrollTop <= 20) {
      loadMore()
    }
  }

  return (
    <div onScroll={onScroll} ref={containerRef} className="h-full overflow-y-auto">
      <div ref={wrapperRef}>
        {list.map(ele => {
          const onHeightChange = (height: number) => {
            // 不考虑更新的情况
            if (heightList[ele.data.messageID]) {
              return
            }
            setHeightList(
              produce(draft => {
                draft[ele.data.messageID] = height
              })
            )
          }
          return <ChatMessage key={ele.data.messageID} setHeight={onHeightChange} message={ele.data} />
        })}
      </div>
    </div>
  )
}
