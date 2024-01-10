import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const SettingsCenter = lazy(() => import('@/features/settings-center'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <SettingsCenter />
    </AsyncSuspenseServer>
  )
}

export { Page }
