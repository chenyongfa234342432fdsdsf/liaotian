import Request, { MarkcoinRequest } from '@/plugins/request'
import {
  YapiPostV1ImChatImSendMassInfoCreateCircleApiRequest,
  YapiPostV1ImChatImSendMassInfoCreateCircleApiResponse,
} from '@/typings/yapi/ImChatImSendMassInfoCreateCircleV1PostApi'
import {
  YapiPostV1ImChatImSendMassInfoDeleteCircleApiRequest,
  YapiPostV1ImChatImSendMassInfoDeleteCircleApiResponse,
} from '@/typings/yapi/ImChatImSendMassInfoDeleteCircleV1PostApi'
import {
  YapiGetV1ImChatImSendMassInfoQueryListApiRequest,
  YapiGetV1ImChatImSendMassInfoQueryListApiResponse,
} from '@/typings/yapi/ImChatImSendMassInfoQueryListV1GetApi'

/**
 * [助手 - 查询用户群发消息↗](https://yapi.nbttfc365.com/project/82/interface/api/11914)
 * */
export const getV1ImChatImSendMassInfoQueryListApiRequest: MarkcoinRequest<
  YapiGetV1ImChatImSendMassInfoQueryListApiRequest,
  YapiGetV1ImChatImSendMassInfoQueryListApiResponse
> = params => {
  return Request({
    path: '/v1/im/chat/imSendMassInfo/queryList',
    method: 'GET',
    params,
  })
}

/**
 * [助手 - 信息群发↗](https://yapi.nbttfc365.com/project/82/interface/api/11839)
 * */
export const postV1ImChatImSendMassInfoCreateCircleApiRequest: MarkcoinRequest<
  YapiPostV1ImChatImSendMassInfoCreateCircleApiRequest,
  YapiPostV1ImChatImSendMassInfoCreateCircleApiResponse
> = data => {
  return Request({
    path: '/v1/im/chat/imSendMassInfo/createCircle',
    method: 'POST',
    data,
  })
}

/**
 * [助手 - 删除群发↗](https://yapi.nbttfc365.com/project/82/interface/api/11919)
 * */
export const postV1ImChatImSendMassInfoDeleteCircleApiRequest: MarkcoinRequest<
  YapiPostV1ImChatImSendMassInfoDeleteCircleApiRequest,
  YapiPostV1ImChatImSendMassInfoDeleteCircleApiResponse['data']
> = data => {
  return Request({
    path: '/v1/im/chat/imSendMassInfo/deleteCircle',
    method: 'POST',
    data,
  })
}
