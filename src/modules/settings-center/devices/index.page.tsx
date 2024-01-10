import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const Devices = lazy(() => import('@/features/settings-center/devices'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <Devices />
    </AsyncSuspenseServer>
  )
}

export { Page }
