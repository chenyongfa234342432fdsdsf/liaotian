import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const Messenger = lazy(() => import('@/features/messenger'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <Messenger />
    </AsyncSuspenseServer>
  )
}
async function onBeforeRender(pageContext: PageContext) {
  const pageProps = {}
  const layoutParams = {}
  return {
    pageContext: {
      unAuthTo: '/login?redirect=/',
      pageProps,
      layoutParams,
    },
  }
}

export { Page, onBeforeRender }
