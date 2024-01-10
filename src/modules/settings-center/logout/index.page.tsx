import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const Logout = lazy(() => import('@/features/settings-center/logout'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <Logout />
    </AsyncSuspenseServer>
  )
}

export { Page }
