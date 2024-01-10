import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const MyWallet = lazy(() => import('@/features/settings-center/my-wallet'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <MyWallet />
    </AsyncSuspenseServer>
  )
}

export { Page }
