import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const PersonalInformation = lazy(() => import('@/features/settings-center/personal-information'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <PersonalInformation />
    </AsyncSuspenseServer>
  )
}

export { Page }
