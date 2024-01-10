import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const ChangePassword = lazy(() => import('@/features/settings-center/change-password'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <ChangePassword />
    </AsyncSuspenseServer>
  )
}

export { Page }
