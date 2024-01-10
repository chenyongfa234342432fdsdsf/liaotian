/** 与业务无关的 基础模块 */
/** */
/** 主题 */
export enum ThemeOptionEnum {
  light = 'light',
  dark = 'dark',
  system = 'system',
}
export enum ThemeEnum {
  light = 'light',
  dark = 'dark',
}
export enum ThemeBusinessEnum {
  chainstar = 'chainstar',
  default = '',
}

export enum ColorPlateEnum {
  binance = 'binance',
  okx = 'okx',
  kucoin = 'kucoin',
  default = '',
}

export const ThemeChartMap = {
  light: 'Light',
  dark: 'Dark',
}

export const pageOmitKeys = [
  '_serverFiles',
  '_parseUrl',
  '_pageRoutes',
  '_pageIsomorphicFileDefault',
  '_pageIsomorphicFile',
  '_pageContextRetrievedFromServer',
  '_onBeforeRouteHook',
  '_onBeforeRouteHook',
  '_objectCreatedByVitePluginSsr',
  '_isFirstRender',
  '_comesDirectlyFromServer',
  '_baseUrl',
  '_allPageIds',
  '_allPageFiles',
  'exports',
  'Page',
  '_baseAssets',
  '_getPageAssets',
  '_isPageContextRequest',
  '_isPreRendering',
  '_pageClientPath',
  '_pageId',
  '_pageServerFile',
  '_pageServerFileDefault',
  '_passToClient',
  //
  '_pageFilesLoaded',
  '_pageFilesAll',
  '_pageFilesAll',
  'pageExports',
  'exportsAll',
]
