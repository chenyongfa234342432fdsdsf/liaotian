import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const AddBankCard = lazy(() => import('@/features/settings-center/add-bank-card'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <AddBankCard />
    </AsyncSuspenseServer>
  )
}

export { Page }
