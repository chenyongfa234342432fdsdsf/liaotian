import { t } from '@lingui/macro'
// import UserSettings from '@/features/user/personal-center/settings/index'
import { getUserPageDefaultDescribeMeta } from '@/helper/user'
import { UserModuleDescribeKeyEnum } from '@/constants/user'
import Link from '@/components/link'

function Page() {
  return (
    <div>
      {/* <div>setting 页</div> */}
      {/* <Link href="/"> go messenger</Link> */}
    </div>
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
      documentProps: getUserPageDefaultDescribeMeta(t`user.field.reuse_08`, UserModuleDescribeKeyEnum.default),
    },
  }
}

export { Page, onBeforeRender }
