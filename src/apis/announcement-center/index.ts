import request, { MarkcoinRequest, MarkcoinResponse } from '@/plugins/request'
import {
  YapiGetV1ImHelpCenterAnnouncementListApiRequest,
  YapiGetV1ImHelpCenterAnnouncementListApiResponse,
} from '@/typings/yapi/ImHelpCenterAnnouncementListV1GetApi'
import {
  YapiGetV1ImHelpCenterNoticeListApiRequest,
  YapiGetV1ImHelpCenterNoticeListApiResponse,
} from '@/typings/yapi/ImHelpCenterNoticeListV1GetApi'
import {
  YapiGetV1ImChatFriendListApiRequest,
  YapiGetV1ImChatFriendListApiResponse,
} from '@/typings/yapi/ImChatFriendListV1GetApi'
import {
  YapiGetV1ImHelpCenterAnnouncementContentApiRequest,
  YapiGetV1ImHelpCenterAnnouncementContentApiResponse,
} from '@/typings/yapi/ImHelpCenterAnnouncementContentV1GetApi'
import {
  YapiGetV1ImHelpCenterHorseLampApiRequest,
  YapiGetV1ImHelpCenterHorseLampApiResponse,
} from '@/typings/yapi/ImHelpCenterHorseLampV1GetApi'
import {
  YapiGetV1ImHelpCenterNoticeLatestApiRequest,
  YapiGetV1ImHelpCenterNoticeLatestApiResponse,
} from '@/typings/yapi/ImHelpCenterNoticeLatestV1GetApi'
/**
 * 公告中心列表页
 * https://yapi.nbttfc365.com/project/82/interface/api/12179
 */
export const getMessageCenterList: MarkcoinRequest<
  Partial<YapiGetV1ImHelpCenterAnnouncementListApiRequest>,
  YapiGetV1ImHelpCenterAnnouncementListApiResponse['data']
> = params => {
  return request({
    path: '/v1/im-helpCenter/announcementList',
    method: 'GET',
    params,
  })
}
/**
 * 公告中心正文页
 * https://yapi.nbttfc365.com/project/82/interface/api/12184
 */
export const getArticleContent: MarkcoinRequest<
  Partial<YapiGetV1ImHelpCenterAnnouncementContentApiRequest>,
  YapiGetV1ImHelpCenterAnnouncementContentApiResponse['data']
> = params => {
  return request({
    path: '/v1/im-helpCenter/announcement/content',
    method: 'GET',
    params,
  })
}

/**
 * 系统公告列表
 * https://yapi.nbttfc365.com/project/82/interface/api/12439
 */
export const getNoticeList: MarkcoinRequest<
  Partial<YapiGetV1ImHelpCenterNoticeListApiRequest>,
  YapiGetV1ImHelpCenterNoticeListApiResponse
> = params => {
  return request({
    path: '/v1/im-helpCenter/noticeList',
    method: 'GET',
    params,
  })
}
/**
 * 查看好友列表
 * https://yapi.nbttfc365.com/project/82/interface/api/11549
 */
export const getFriendList: MarkcoinRequest<
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
 * 公告中心的跑马灯
 * https://yapi.nbttfc365.com/project/82/interface/api/12429
 */
export const getHorseLamp: MarkcoinRequest<
  YapiGetV1ImHelpCenterHorseLampApiRequest,
  YapiGetV1ImHelpCenterHorseLampApiResponse
> = params => {
  return request({
    path: '/v1/im-helpCenter/horseLamp',
    method: 'GET',
    params,
  })
}
/**
 * 系统公告最新一条
 * https://yapi.nbttfc365.com/project/82/interface/api/15094
 */
export const getlastNewNotice: MarkcoinRequest<
  YapiGetV1ImHelpCenterNoticeLatestApiRequest,
  YapiGetV1ImHelpCenterNoticeLatestApiResponse
> = params => {
  return request({
    path: '/v1/im-helpCenter/noticeLatest',
    method: 'GET',
    params,
  })
}
