function Page() {
  return 'null--------'
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
