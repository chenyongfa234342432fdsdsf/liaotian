import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const AboutUs = lazy(() => import('@/features/settings-center/about-us'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <AboutUs />
    </AsyncSuspenseServer>
  )
}
export { Page }
