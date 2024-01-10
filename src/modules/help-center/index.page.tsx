import { getUserPageDefaultDescribeMeta } from '@/helper/user'
import { UserModuleDescribeKeyEnum } from '@/constants/user'
import { t } from '@lingui/macro'
import { lazy } from 'react'
import AsyncSuspenseServer from '@/components/async-suspense-server'

const HelpCenter = lazy(() => import('@/features/help-center'))

async function onBeforeRender(pageContext: PageContext) {
  const pageProps = {}
  const layoutParams = {
    fullScreen: true,
  }
  return {
    pageContext: {
      pageProps,
      layoutParams,
      documentProps: getUserPageDefaultDescribeMeta(
        t`features_help_center_components_helperlist_list_index_niy4vxif4k`,
        UserModuleDescribeKeyEnum.default
      ),
    },
  }
}
function Page() {
  return (
    <AsyncSuspenseServer>
      <HelpCenter />
    </AsyncSuspenseServer>
  )
}

export { Page, onBeforeRender }
