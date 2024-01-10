import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const CheckinCenter = lazy(() => import('@/features/checkin-center'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <CheckinCenter />
    </AsyncSuspenseServer>
  )
}

async function onBeforeRender(pageContext: PageContext) {
  const pageProps = {}
  const layoutParams = {
    fullScreen: true,
  }
  return {
    pageContext: {
      unAuthTo: '/login?redirect=/',
      pageProps,
      layoutParams,
    },
  }
}

export { Page, onBeforeRender }
