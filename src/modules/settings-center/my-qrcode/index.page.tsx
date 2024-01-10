import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const MyQrcode = lazy(() => import('@/features/settings-center/my-qrcode'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <MyQrcode />
    </AsyncSuspenseServer>
  )
}

export { Page }
