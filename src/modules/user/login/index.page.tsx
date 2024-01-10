import { t } from '@lingui/macro'
import { getUserPageDefaultDescribeMeta } from '@/helper/user'
import { UserModuleDescribeKeyEnum } from '@/constants/user'
import Link from '@/components/link'
import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'

const Login = lazy(() => import('@/features/users/login'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <Login />
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
      // authTo: '/',
      pageProps,
      layoutParams,
      documentProps: getUserPageDefaultDescribeMeta(t`user.field.reuse_07`, UserModuleDescribeKeyEnum.default),
    },
  }
}

export { Page, onBeforeRender }
