import request, { MarkcoinRequest } from '@/plugins/request'
import {
  YapiGetV1ImChatGroupHasOngoingCallApiRequest,
  YapiGetV1ImChatGroupHasOngoingCallApiResponse,
} from '@/typings/yapi/ImChatGroupHasOngoingCallV1GetApi'
import {
  YapiPostV1ImChatRoomCreateApiRequest,
  YapiPostV1ImChatRoomCreateApiResponse,
} from '@/typings/yapi/ImChatRoomCreateV1PostApi'

/**
 * [创建房间↗](https://yapi.nbttfc365.com/project/82/interface/api/11669)
 * */
export const postV1ImChatRoomCreateApiRequest: MarkcoinRequest<
  YapiPostV1ImChatRoomCreateApiRequest,
  YapiPostV1ImChatRoomCreateApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/room/create',
    method: 'POST',
    data,
  })
}

/**
 * [查询群组是否有进行中的群聊↗](https://yapi.nbttfc365.com/project/82/interface/api/18909)
 * */
export const getV1ImChatGroupHasOngoingCallApiRequest: MarkcoinRequest<
  YapiGetV1ImChatGroupHasOngoingCallApiRequest,
  YapiGetV1ImChatGroupHasOngoingCallApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/chat/group/hasOngoingCall',
    method: 'GET',
    params,
  })
}
