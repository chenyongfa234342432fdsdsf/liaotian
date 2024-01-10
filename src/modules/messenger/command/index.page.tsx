import Command from '@/features/messenger/command'

function Page() {
  return <Command />
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
