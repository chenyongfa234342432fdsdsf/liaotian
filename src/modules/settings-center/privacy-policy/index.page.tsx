import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const PrivacyPolicy = lazy(() => import('@/features/settings-center/privacy-policy'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <PrivacyPolicy />
    </AsyncSuspenseServer>
  )
}
export { Page }
