import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const AddAccount = lazy(() => import('@/features/settings-center/add-account'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <AddAccount />
    </AsyncSuspenseServer>
  )
}

export { Page }
