import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const AccountSecurity = lazy(() => import('@/features/settings-center/account-security'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <AccountSecurity />
    </AsyncSuspenseServer>
  )
}

export { Page }
