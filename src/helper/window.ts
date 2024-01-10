import { WebviewWindow } from '@tauri-apps/api/window'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz', 10)

export function openNewWindow() {
  const mainWindow = WebviewWindow.getByLabel('main')
  const labelId = nanoid()
  mainWindow?.innerPosition().then(position => {
    const webview = new WebviewWindow(labelId, {
      url: '/login',
      title: '',
      x: position.x + 10,
      y: position.y + 10,
      width: 1440,
      height: 900,
      minWidth: 1072,
      minHeight: 844,
    })
  })
}
