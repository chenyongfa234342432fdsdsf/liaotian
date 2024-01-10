import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const TransferAssets = lazy(() => import('@/features/settings-center/transfer-assets'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <TransferAssets />
    </AsyncSuspenseServer>
  )
}

export { Page }
