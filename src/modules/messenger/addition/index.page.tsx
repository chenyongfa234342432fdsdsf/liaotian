import AsyncSuspense from '@/components/async-suspense'
import ErrorBoundary from '@/components/error-boundary'
import React from 'react'

const Addition = React.lazy(() => import('@/features/messenger/addition'))

function Page() {
  return (
    <AsyncSuspense>
      <ErrorBoundary>
        <Addition />
      </ErrorBoundary>
    </AsyncSuspense>
  )
}

async function onBeforeRender(pageContext: PageContext) {
  const pageProps = {}
  const layoutParams = {}
  return {
    pageContext: {
      // unAuthTo: '/login?redirect=/personal-center/settings',
      pageProps,
      layoutParams,
      // documentProps: getUserPageDefaultDescribeMeta(t`user.field.reuse_08`, UserModuleDescribeKeyEnum.default),
    },
  }
}

export { Page, onBeforeRender }
