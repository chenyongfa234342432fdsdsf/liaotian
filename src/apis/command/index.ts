import request, { MarkcoinRequest } from '@/plugins/request'
import {
  YapiPostV1ImCommandCheckUserCommandApiRequest,
  YapiPostV1ImCommandCheckUserCommandApiResponse,
} from '@/typings/yapi/ImCommandCheckUserCommandV1PostApi'
import {
  YapiPostV1ImCommandCommandResetApiRequest,
  YapiPostV1ImCommandCommandResetApiResponse,
} from '@/typings/yapi/ImCommandCommandResetV1PostApi'
import {
  YapiGetV1ImCommandGetUserCommandInfoApiRequest,
  YapiGetV1ImCommandGetUserCommandInfoApiResponse,
} from '@/typings/yapi/ImCommandGetUserCommandInfoV1GetApi'

/**
 * [验证口令↗](https://yapi.nbttfc365.com/project/82/interface/api/11614)
 * */
export const postV1ImCommandCheckUserCommandApiRequest: MarkcoinRequest<
  YapiPostV1ImCommandCheckUserCommandApiRequest,
  YapiPostV1ImCommandCheckUserCommandApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/command/checkUserCommand',
    method: 'POST',
    data,
  })
}
/**
 * [口令重置↗](https://yapi.nbttfc365.com/project/82/interface/api/19304)
 * */
export const postV1ImCommandCommandResetApiRequest: MarkcoinRequest<
  YapiPostV1ImCommandCommandResetApiRequest,
  YapiPostV1ImCommandCommandResetApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/command/commandReset',
    method: 'POST',
    data,
  })
}

/**
 * [获取已输入的口令信息↗](https://yapi.nbttfc365.com/project/82/interface/api/11604)
 * */
export const getV1ImCommandGetUserCommandInfoApiRequest: MarkcoinRequest<
  YapiGetV1ImCommandGetUserCommandInfoApiRequest,
  YapiGetV1ImCommandGetUserCommandInfoApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/command/getUserCommandInfo',
    method: 'GET',
    params,
  })
}
