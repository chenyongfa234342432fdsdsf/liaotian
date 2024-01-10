import { getUserPageDefaultDescribeMeta } from '@/helper/user'
import { UserModuleDescribeKeyEnum } from '@/constants/user'
import AsyncSuspenseServer from '@/components/async-suspense-server'
import { lazy } from 'react'
import { t } from '@lingui/macro'

const AnnouncementCenter = lazy(() => import('@/features/announcement-center'))

function Page() {
  return (
    <AsyncSuspenseServer>
      <AnnouncementCenter />
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
      pageProps,
      layoutParams,
      documentProps: getUserPageDefaultDescribeMeta(
        t`features_announcement_center_components_message_list_index_x_ntlrzyyu`,
        UserModuleDescribeKeyEnum.default
      ),
    },
  }
}

export { Page, onBeforeRender }
