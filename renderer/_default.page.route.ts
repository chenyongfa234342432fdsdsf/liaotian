import { extractLocale } from '@/helper/i18n'

export function onBeforeRoute(pageContext) {
  let { urlOriginal, urlLogical } = pageContext
  const { urlWithoutLocale } = extractLocale(urlOriginal)

  // overwrite to maintenance path on maintenance mode on client
  return {
    pageContext: {
      urlLogical: urlWithoutLocale,
    },
  }
}
