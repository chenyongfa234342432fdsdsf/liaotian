import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const ChatSettings = lazy(() => import('@/features/settings-center/chat-settings'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <ChatSettings />
    </AsyncSuspenseServer>
  )
}

export { Page }
