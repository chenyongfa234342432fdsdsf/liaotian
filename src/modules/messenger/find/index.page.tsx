import Find from '@/features/messenger/find'

function Page() {
  return <Find />
}

async function onBeforeRender(pageContext: PageContext) {
  const pageProps = {}
  const layoutParams = {}
  return {
    pageContext: {
      layoutParams,
    },
  }
}

export { Page, onBeforeRender }
