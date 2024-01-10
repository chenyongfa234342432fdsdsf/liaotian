import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const PaymentPassword = lazy(() => import('@/features/settings-center/payment-password'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <PaymentPassword />
    </AsyncSuspenseServer>
  )
}

export { Page }
