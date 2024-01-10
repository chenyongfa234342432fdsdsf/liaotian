import { MarkcoinRequestConfig } from '@/plugins/request'
import removeCustomConfig from './remove-custom-config'
import setContentTypeAndData from './set-content-type-and-data'
import setDefaultConfig from './set-default-config'
import setBaseParams from './set-base-params'

export type RequestInterceptorType = {
  onFulfilled: (input: MarkcoinRequestConfig) => MarkcoinRequestConfig | Promise<MarkcoinRequestConfig>
  onRejected?: (...args) => any
}

const RequestInterceptors: RequestInterceptorType[] = [
  setDefaultConfig,
  setContentTypeAndData,
  setBaseParams,
  removeCustomConfig,
]

// reverse 是为了适配 Axios，使其按照上面配置的顺序依次拦截 Request
export default RequestInterceptors.reverse()
