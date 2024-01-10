import { t } from '@lingui/macro'
import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const FriendBook = lazy(() => import('@/features/group/components/search-friend'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <FriendBook />
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
