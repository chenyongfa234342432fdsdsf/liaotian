import request, { MarkcoinRequest } from '@/plugins/request'
import {
  YapiGetV1ImChatFriendAddSearchApiRequest,
  YapiGetV1ImChatFriendAddSearchApiResponse,
} from '@/typings/yapi/ImChatFriendAddSearchV1GetApi'
import {
  YapiPostV1ImChatFriendAddApiRequest,
  YapiPostV1ImChatFriendAddApiResponse,
} from '@/typings/yapi/ImChatFriendAddV1PostApi'
import {
  YapiGetV1ImChatFriendApplyListApiRequest,
  YapiGetV1ImChatFriendApplyListApiResponse,
} from '@/typings/yapi/ImChatFriendApplyListV1GetApi'
import {
  YapiPostV1ImChatFriendDeleteApiRequest,
  YapiPostV1ImChatFriendDeleteApiResponse,
} from '@/typings/yapi/ImChatFriendDeleteV1PostApi'
import {
  YapiGetV1ImChatFriendDetailApiRequest,
  YapiGetV1ImChatFriendDetailApiResponse,
} from '@/typings/yapi/ImChatFriendDetailV1GetApi'
import {
  YapiGetV1ImChatFriendListApiRequest,
  YapiGetV1ImChatFriendListApiResponse,
} from '@/typings/yapi/ImChatFriendListV1GetApi'
import {
  YapiPostV1ImChatFriendPassApplyApiRequest,
  YapiPostV1ImChatFriendPassApplyApiResponse,
} from '@/typings/yapi/ImChatFriendPassApplyV1PostApi'

import {
  YapiPostV1ImChatFriendUpdateApiRequest,
  YapiPostV1ImChatFriendUpdateApiResponse,
} from '@/typings/yapi/ImChatFriendUpdateV1PostApi'
import {
  YapiPostV1ImChatGroupApplyApiRequest,
  YapiPostV1ImChatGroupApplyApiResponse,
} from '@/typings/yapi/ImChatGroupApplyV1PostApi'
import {
  YapiGetV1ImChatImUserInfoRemarkData,
  YapiGetV1ImChatImUserInfoRemarkListApiRequest,
  YapiGetV1ImChatImUserInfoRemarkListApiResponse,
} from '@/typings/yapi/ImChatImUserInfoRemarkListV1GetApi'

/**
 * [查看好友列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11549)
 * */
export const getV1ImChatFriendListApiRequest: MarkcoinRequest<
  YapiGetV1ImChatFriendListApiRequest,
  YapiGetV1ImChatFriendListApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/chat/friend/list',
    method: 'GET',
    params,
  })
}
/**
 * [新的朋友↗](https://yapi.nbttfc365.com/project/82/interface/api/12164)
 * */
export const getV1ImChatFriendApplyListApiRequest: MarkcoinRequest<
  YapiGetV1ImChatFriendApplyListApiRequest,
  YapiGetV1ImChatFriendApplyListApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/chat/friend/applyList',
    method: 'GET',
    params,
  })
}
/**
 * [查看好友信息↗](https://yapi.nbttfc365.com/project/82/interface/api/11584)
 * */
export const getV1ImChatFriendDetailApiRequest: MarkcoinRequest<
  YapiGetV1ImChatFriendDetailApiRequest,
  YapiGetV1ImChatFriendDetailApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/chat/friend/detail',
    method: 'GET',
    params,
  })
}
/**
 * [添加好友↗](https://yapi.nbttfc365.com/project/82/interface/api/11609)
 * */
export const postV1ImChatFriendAddApiRequest: MarkcoinRequest<
  YapiPostV1ImChatFriendAddApiRequest,
  YapiPostV1ImChatFriendAddApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/friend/add',
    method: 'POST',
    data,
  })
}
/**
 * [搜索用户/群组↗](https://yapi.nbttfc365.com/project/82/interface/api/11994)
 * */
export const getV1ImChatFriendAddSearchApiRequest: MarkcoinRequest<
  YapiGetV1ImChatFriendAddSearchApiRequest,
  YapiGetV1ImChatFriendAddSearchApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/chat/friend/addSearch',
    method: 'GET',
    params,
  })
}
/**
 * [申请入群↗](https://yapi.nbttfc365.com/project/82/interface/api/12044)
 * */
export const postV1ImChatGroupApplyApiRequest: MarkcoinRequest<
  YapiPostV1ImChatGroupApplyApiRequest,
  YapiPostV1ImChatGroupApplyApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/group/apply',
    method: 'POST',
    data,
  })
}
/**
 * [通过好友申请↗](https://yapi.nbttfc365.com/project/82/interface/api/12159)
 * */
export const postV1ImChatFriendPassApplyApiRequest: MarkcoinRequest<
  YapiPostV1ImChatFriendPassApplyApiRequest,
  YapiPostV1ImChatFriendPassApplyApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/friend/passApply',
    method: 'POST',
    data,
  })
}
/**
 * [删除好友↗](https://yapi.nbttfc365.com/project/82/interface/api/11599)
 * */
export const deleteFriendRequest: MarkcoinRequest<
  YapiPostV1ImChatFriendDeleteApiRequest,
  YapiPostV1ImChatFriendDeleteApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/friend/delete',
    method: 'POST',
    data,
  })
}

/**
 * [获取所有备注的群组和好友列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11954)
 * */
export const getRemarkList: MarkcoinRequest<
  YapiGetV1ImChatImUserInfoRemarkListApiRequest,
  YapiGetV1ImChatImUserInfoRemarkData
> = params => {
  return request({
    path: '/v1/im/chat/imUserInfo/remarkList',
    method: 'GET',
    params,
  })
}

/**
 * [好友信息更新↗](https://yapi.nbttfc365.com/project/82/interface/api/11619)
 * */
export const postV1ImChatFriendUpdateApiRequest: MarkcoinRequest<
  YapiPostV1ImChatFriendUpdateApiRequest,
  YapiPostV1ImChatFriendUpdateApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/friend/update',
    method: 'POST',
    data,
  })
}
