import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const BindMobile = lazy(() => import('@/features/settings-center/bind-mobile'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <BindMobile />
    </AsyncSuspenseServer>
  )
}

export { Page }
