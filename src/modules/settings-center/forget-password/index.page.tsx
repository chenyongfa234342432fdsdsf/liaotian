import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const ForgetPassword = lazy(() => import('@/features/settings-center/change-password/forget-password'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <ForgetPassword />
    </AsyncSuspenseServer>
  )
}

export { Page }
