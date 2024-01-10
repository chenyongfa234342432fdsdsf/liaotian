import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'

export async function updateVersion() {
  const update = await checkUpdate()
  if (update.shouldUpdate) {
    await installUpdate()
  }
}
