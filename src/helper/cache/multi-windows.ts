import engine from 'store/src/store-engine'
import storages from 'store/storages/all'
import json2 from 'store/plugins/json2'
import { envIsClient } from '../env'

let nameSpace = 'main'
if (envIsClient) {
  const webview = window?.__TAURI_METADATA__
  if (webview) {
    nameSpace = webview?.__currentWindow?.label || 'main'
  }
}
const multiWindowsCacheUtils = engine.createStore(storages, [json2], nameSpace)

export default multiWindowsCacheUtils
