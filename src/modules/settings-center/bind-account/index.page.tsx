import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const BindAccount = lazy(() => import('@/features/settings-center/bind-account'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <BindAccount />
    </AsyncSuspenseServer>
  )
}

export { Page }
