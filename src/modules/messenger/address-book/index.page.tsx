import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const AddressBook = lazy(() => import('@/features/messenger/address-book'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <AddressBook />
    </AsyncSuspenseServer>
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
