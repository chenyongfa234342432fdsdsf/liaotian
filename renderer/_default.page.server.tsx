import { escapeInject } from 'vike/server'
import { ThemeBusinessEnum, ThemeEnum } from '@/constants/base'
import { isChainstar, isMerchant } from '@/helper/env'
import { getSeo } from '@/helper/seo'

const passToClient = [
  'pageProps',
  'documentProps',
  'locale',
  'routeParams',
  'theme',
  'layoutParams',
  'path',
  'host',
  'headers',
  'needSeo',
  'authTo',
  'unAuthTo',
  'layoutProps',
]
async function render(pageContext: PageContext) {
  const { Page, pageProps, theme } = pageContext

  const { title, description } = getSeo(pageContext)
  const icoUrl = !isMerchant
    ? 'https://oss.chainstar.cloud/im-web/image/icon.ico'
    : 'https://oss.chainstar.cloud/im-web/image-plus/icon1.ico'
  const documentHtml = escapeInject`<!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <meta name="description" content="${description}" />
        <meta charset="utf8" version='1'/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        <meta name="renderer" content="webkit"/>
        <meta name="google" content="notranslate">
        <link rel="icon" href="${icoUrl}" type="image/x-icon" />

      </head>
      <body arco-theme=${ThemeEnum.light} theme-business=${isMerchant ? `merchant-${ThemeEnum.light}` : ''}>
        <div id="page-view"></div>
      </body>
    </html>` as any

  return {
    documentHtml,
  }
}
export { render }
export { passToClient }
