import axios from 'axios'
import { envUtils } from '@nbit/utils'

const { getEnvS3Url, S3UrlNameEnum, ExtTypesEnum, EnvTypesEnum, getEnvSecretS3KeyConfig } = envUtils
/**
 * 动态获取不同商户、环境下的 s3 相关地址
 */
export async function getEnvUrlConfig(businessId, mode) {
  const url = getEnvS3Url(mode, businessId, S3UrlNameEnum.dnsConfig, ExtTypesEnum.im)
  return axios
    .get(url)
    .then(res => res.data)
    .catch(e => {
      console.error(e)
      console.error('动态获取不同商户、环境下的 s3 相关地址错误，请检查 businessId 是否正确')
      console.error(`businessId: ${businessId}`)
      console.error(url)
      typeof window === 'undefined' && process.exit(1)
    })
}

export async function getKeyConfig(accesskey, mode) {
  const url = getEnvSecretS3KeyConfig(
    mode,
    accesskey,
    mode === EnvTypesEnum.production ? ExtTypesEnum.im : ExtTypesEnum.default
  )
  return axios
    .get(url)
    .then(res => res.data)
    .catch(e => {
      console.error(e)
      console.error('动态获取 s3 accesskey 对应的 secretKey 配置，请检查 accesskey 是否正确')
      console.error(`accesskey: ${accesskey}`)
      console.error(url)
      process.exit(1)
    })
}

/**
 * 更具环境、businessId、接口动态注入环境变量
 */
export async function injectEnvConfig(preConfig, mode, businessId = '1') {
  if (mode === 'multibuild') {
    return
  }
  const envUrlConfig = await getEnvUrlConfig(businessId, mode)
  let resConfig: Record<string, string> = {}
  const baseUrl = `${envUrlConfig.API.bff}api/forward/`
  resConfig.VITE_MARKCOIN_BASE_URL = baseUrl
  resConfig.VITE_MARKCOIN_SERVER_BASE_URL =
    mode === EnvTypesEnum.development ? baseUrl : 'http://newbit-bff.core.svc:4100/api/forward/'
  resConfig.VITE_MARKCOIN_WS = envUrlConfig.WS_IM?.web ? envUrlConfig.WS_IM?.web : envUrlConfig.WS_SPOT?.web
  resConfig.VITE_MARKCOIN_H5_URL = envUrlConfig?.H5?.h5
  resConfig.VITE_MARKCOIN_WEB_URL = envUrlConfig?.H5?.web
  resConfig.VITE_MARKCOIN_TEMPLATE_ID = envUrlConfig?.MAINPAGE_TEMPLATE?.web
  resConfig.VITE_MARKCOIN_ACCESS_KEY = envUrlConfig?.ACCESS_KEY?.web
  resConfig.VITE_MARKCOIN_ACCESS_KEY_MAC = envUrlConfig?.ACCESS_KEY?.mac
  resConfig.VITE_MARKCOIN_ACCESS_KEY_WINDOWS = envUrlConfig?.ACCESS_KEY?.windows

  resConfig = { ...resConfig, ...preConfig }
  Object.keys(resConfig).forEach(k => {
    process.env[k] = resConfig[k]
  })
}
