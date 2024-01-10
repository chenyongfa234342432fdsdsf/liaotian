import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const MyGroup = lazy(() => import('@/features/messenger/my-group'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <MyGroup />
    </AsyncSuspenseServer>
  )
}

async function onBeforeRender(pageContext: PageContext) {
  const pageProps = {}
  const layoutParams = {}
  return {
    pageContext: {
      pageProps,
      layoutParams,
    },
  }
}

export { Page, onBeforeRender }
