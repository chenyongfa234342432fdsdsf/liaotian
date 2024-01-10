function Page() {
  return ''
}

async function onBeforeRender(pageContext: PageContext) {
  const pageProps = {}
  const layoutParams = {}
  return {
    pageContext: {
      unAuthTo: '/login?redirect=/',
      authTo: '/messenger',
      pageProps,
      layoutParams,
    },
  }
}

export { Page, onBeforeRender }
