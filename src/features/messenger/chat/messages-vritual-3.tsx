import SimpleVirtualList from '@/components/simple-virtual-list'
import ChatMessage from './message'

export function MessagesVirtual3({ messages, loadMore }: { messages: any[]; loadMore: any }) {
  return (
    <SimpleVirtualList
      reverse
      loadPrev={loadMore}
      data={messages}
      pageSize={20}
      compare={(a, b) => a.messageID === b.messageID}
      render={item => {
        return <ChatMessage message={item} />
      }}
      getKey={item => item.messageID}
    />
  )
}
