import { createRoot } from 'react-dom/client'
import { ThemeEnum } from '@/constants/base'
import { onInstallForClient } from '@/helper/lifecycle/client'
import { baseCommonStore } from '@/store/common'
import { getSeo } from '@/helper/seo'
import { getRedirectUrl } from '@/helper/auth'
import { link } from '@/helper/link'
import { isMerchant } from '@/helper/env'
import '@/style/layout.css'
import { dynamicActivate, getFirstLang } from '@/helper/i18n'
import Layout from './layout'

let root
export const clientRouting = true
export const prefetchStaticAssets = { when: 'VIEWPORT' }
export const hydrationCanBeAborted = true
async function render(pageContext: PageContext) {
  const { Page, pageProps, authTo, unAuthTo, urlParsed } = pageContext
  const redirectUrl = getRedirectUrl(authTo, unAuthTo, urlParsed.search?.go)
  const isRedirectTo = !!redirectUrl
  const { theme, locale, setLocale } = baseCommonStore.getState()

  // default lang
  const userDefaultLang = navigator.language
  const firstLang = getFirstLang(locale, userDefaultLang)

  if (!locale) setLocale(firstLang)

  const appLayout = <Layout pageContext={pageContext}>{!isRedirectTo && <Page {...pageProps} />}</Layout>

  const container = document.getElementById('page-view')!
  if (pageContext.isHydration) {
    // await onInstallForApp(pageContext)
    const lang = firstLang
    await dynamicActivate(lang)
    if (!root) {
      root = createRoot(container)
    }
    root.render(appLayout)
    if (isRedirectTo) {
      link(redirectUrl, { overwriteLastHistoryEntry: true })
    }
    onInstallForClient(pageContext)
    return
  }
  if (!root) {
    root = createRoot(container)
  }
  root.render(appLayout)
  const { title, description } = getSeo(pageContext)
  document.title = title
  document?.querySelector('meta[name="description"]')?.setAttribute('content', description)
  document.body.setAttribute('theme', theme || ThemeEnum.light)
  isMerchant && document.body.setAttribute('theme-business', `merchant-${theme || ThemeEnum.light}`)
  if (isRedirectTo) {
    link(redirectUrl, { overwriteLastHistoryEntry: true })
  }
}

function onHydrationEnd() {}

export { render, onHydrationEnd }
