import { PLATFORM_ENUM } from '@/constants/env'
import { envUtils } from '@nbit/utils'

export async function getCurrentPlatform() {
  if (typeof window === 'undefined') {
    return PLATFORM_ENUM.WEB
  }

  const platform = await import('@tauri-apps/api')
    .then(res => {
      return res.os.type()
    })
    .catch(e => {})
  // 暂不考虑 H5
  return platform === 'Darwin'
    ? PLATFORM_ENUM.MAC
    : platform === 'Windows_NT'
    ? PLATFORM_ENUM.WINDOWS
    : platform === 'Linux'
    ? PLATFORM_ENUM.LINUX
    : PLATFORM_ENUM.WEB
}
export function getDefaultAccessKey(platform: string) {
  return (
    {
      WEB: import.meta.env.VITE_MARKCOIN_ACCESS_KEY,
      MAC: import.meta.env.VITE_MARKCOIN_ACCESS_KEY_MAC,
      WINDOWS: import.meta.env.VITE_MARKCOIN_ACCESS_KEY_WINDOWS,
    }[platform] || import.meta.env.VITE_MARKCOIN_ACCESS_KEY
  )
}
const { EnvTypesEnum, getEnvAwsS3Config } = envUtils

/** 获取是否是 NodeJs 服务器环境 */
export const envIsServer = import.meta.env.SSR
/** 获取是否是客户端环境 */
export const envIsClient = !envIsServer
/** 是否是开发环境 */
export const envIsDev = import.meta.env.VITE_NEWBIT_ENV === EnvTypesEnum.development
/** 是否是测试环境 */
export const envIsTest = import.meta.env.VITE_NEWBIT_ENV === EnvTypesEnum.test
/** 是否是 sg dev 环境 */
export const envIsSGDev = import.meta.env.VITE_NEWBIT_ENV === EnvTypesEnum.dev

export const envIsBuild = !envIsDev

export const baseUrl = envIsClient
  ? import.meta.env.VITE_MARKCOIN_BASE_URL
  : import.meta.env.VITE_MARKCOIN_SERVER_BASE_URL
export const otcUrl = import.meta.env.VITE_MARKCOIN_WS
export const swapUrl = import.meta.env.VITE_MARKCOIN_WS
/** 是否是生产环境 */
export const envIsProd = import.meta.env.VITE_NEWBIT_ENV === EnvTypesEnum.production
// 合约 ws
export const wsFuturesUrl = import.meta.env.VITE_MARKCOIN_WS_CONTRACT
// 期权 ws
export const wsOptionUrl = import.meta.env.VITE_MARKCOIN_WS_OPTION || wsFuturesUrl
// 现货 ws
export const wsUrl = import.meta.env.VITE_MARKCOIN_WS

export const port = import.meta.env.VITE_PORT
// git  最近的 id
export const gitCommitId = import.meta.env.VITE_GIT_COMMIT_ID

/** AWS S3 config */
export const awsS3Config = getEnvAwsS3Config(import.meta.env.VITE_NEWBIT_ENV)

export const newbitEnv = import.meta.env.VITE_NEWBIT_ENV

export const businessId = import.meta.env.VITE_MARKCOIN_BUSINESS_ID_CURRENT

export const H5Url = import.meta.env.VITE_MARKCOIN_H5_URL
export const WebUrl = import.meta.env.VITE_MARKCOIN_WEB_URL
/** 娱乐区 url */
export const RecreationWebUrl = import.meta.env.VITE_MARKCOIN_RECREATION_WEB

export const ModuleConfig = import.meta.env.VITE_MARKCOIN_MODULE_CONFIG

export const templateId = import.meta.env.VITE_MARKCOIN_TEMPLATE_ID

// monkey business user
export const monkeyBid = '1'
export const isMonkey = import.meta.env.VITE_MARKCOIN_BUSINESS_ID === monkeyBid

// chainstar as default business user
export const isChainstar = !isMonkey

// IM merchant mode
export const isMerchant = isChainstar

/** zego sdk appID TODO: 从 s3 获取 */
export const zegoSdkAppId = Number(
  (isMerchant
    ? import.meta.env.VITE_MARKCOIN_ZEGO_SDK_APP_ID_MERCHANT
    : import.meta.env.VITE_MARKCOIN_ZEGO_SDK_APP_ID) || '1024650793'
)
export const isPlatformWeb = !import.meta.env.TAURI_PLATFORM
export const isPlatformDeskTop = ['windows', 'macos', 'linux'].includes(import.meta.env.TAURI_PLATFORM)
