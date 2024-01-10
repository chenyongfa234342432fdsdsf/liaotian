import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const CreateGroup = lazy(() => import('@/features/group/create-group'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <CreateGroup />
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
