import { AxiosResponse } from 'axios'
import { BaseMarkcoinResponse } from '../..'
import responseHandler from './response-handler'

export type ResponseInterceptorType = {
  onFulfilled: (input: AxiosResponse<BaseMarkcoinResponse<any>>) => any
  onRejected?: (...args) => any
}

const ResponseInterceptors: ResponseInterceptorType[] = [responseHandler]

export default ResponseInterceptors
