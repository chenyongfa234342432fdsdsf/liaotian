import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const VerifyIdentidy = lazy(() => import('@/features/settings-center/verify-identidy'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <VerifyIdentidy />
    </AsyncSuspenseServer>
  )
}

export { Page }
