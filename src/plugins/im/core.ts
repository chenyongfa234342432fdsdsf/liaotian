import { envIsClient, zegoSdkAppId } from '@/helper/env'
import type ZIM from 'zego-zim-web'
import { ZegoExpressEngine } from 'zego-express-engine-webrtc'

// 考虑 AppId 不会更换，一旦更换数据也没有了，所以构建时获取，就不异步传入了

let zim: ZIM

if (envIsClient) {
  import('zego-zim-web').then(module => {
    const Zim = module.default
    Zim.create({ appID: zegoSdkAppId })
    zim = Zim.getInstance()
    zim.setLogConfig({
      logLevel: 'error',
    })
  })
}
/**
 * 获取 IM 实例
 */
export function getImInstance() {
  return zim
}

/**
 * 获取 IM 实例
 */
export function getImAudioAndVideoSdkAppId() {
  return zegoSdkAppId
}
