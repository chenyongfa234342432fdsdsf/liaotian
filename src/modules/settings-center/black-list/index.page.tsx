import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const BlackList = lazy(() => import('@/features/settings-center/black-list'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <BlackList />
    </AsyncSuspenseServer>
  )
}
export { Page }
