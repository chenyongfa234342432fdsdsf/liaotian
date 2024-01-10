import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const MassSendAssistant = lazy(() => import('@/features/mass-sending-assistant'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <MassSendAssistant />
    </AsyncSuspenseServer>
  )
}

export { Page }
