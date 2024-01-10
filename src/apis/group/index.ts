import request, { MarkcoinRequest, MarkcoinResponse } from '@/plugins/request'

import {
  YapiPostV1ImChatGroupCreateApiRequest,
  YapiPostV1ImChatGroupCreateApiResponse,
} from '@/typings/yapi/ImChatGroupCreateV1PostApi'

import {
  YapiGetV1ImChatGroupAllApiRequest,
  YapiGetV1ImChatGroupAllApiResponse,
} from '@/typings/yapi/ImChatGroupAllV1GetApi'

import {
  YapiPostV1ImChatGroupAddMemberApiRequest,
  YapiPostV1ImChatGroupAddMemberApiResponse,
} from '@/typings/yapi/ImChatGroupAddMemberV1PostApi'

import {
  ImChatGroupMemberApiRequest,
  ImChatGroupMemberApiResponse,
  SetNormalUserHideRequest,
  SetNormalUserHideResponse,
  banGroupRequest,
  banGroupResponse,
  getV1ImChatGroupInfoApiResponse,
} from '@/typings/apis/group'

import {
  YapiPostV1ImChatGroupRemoveMemberApiRequest,
  YapiPostV1ImChatGroupRemoveMemberApiResponse,
} from '@/typings/yapi/ImChatGroupRemoveMemberV1PostApi'
import {
  YapiPostV1ImChatGroupAddAdministratorApiRequest,
  YapiPostV1ImChatGroupAddAdministratorApiResponse,
} from '@/typings/yapi/ImChatGroupAddAdministratorV1PostApi'
import {
  YapiPostV1ImChatGroupRemoveAdministratorApiRequest,
  YapiPostV1ImChatGroupRemoveAdministratorApiResponse,
} from '@/typings/yapi/ImChatGroupRemoveAdministratorV1PostApi'
import {
  YapiGetV1ImChatGroupAdministratorApiRequest,
  YapiGetV1ImChatGroupAdministratorApiResponse,
} from '@/typings/yapi/ImChatGroupAdministratorV1GetApi'
import {
  YapiPostV1ImChatGroupDeleteGroupApiResponse,
  YapiPostV1ImChatGroupDeleteGroupApiRequest,
} from '@/typings/yapi/ImChatGroupDeleteGroupV1PostApi'
import {
  YapiGetV1ImChatGroupMyGroupApiRequest,
  YapiGetV1ImChatGroupMyGroupApiResponse,
} from '@/typings/yapi/ImChatGroupMyGroupV1GetApi'
import {
  YapiPostV1ImChatGroupExitGroupApiRequest,
  YapiPostV1ImChatGroupExitGroupApiResponse,
} from '@/typings/yapi/ImChatGroupExitGroupV1PostApi'
import {
  YapiPostV1ImChatGroupSettingUpdateApiRequest,
  YapiPostV1ImChatGroupSettingUpdateApiResponse,
} from '@/typings/yapi/ImChatGroupSettingUpdateV1PostApi'
import {
  YapiGetV1ImChatGroupInfoApiRequest,
  YapiGetV1ImChatGroupInfoApiResponse,
} from '@/typings/yapi/ImChatGroupInfoV1GetApi'
import {
  YapiPostV1ImChatGroupModifyGroupHeadImageApiRequest,
  YapiPostV1ImChatGroupModifyGroupHeadImageApiResponse,
} from '@/typings/yapi/ImChatGroupModifyGroupHeadImageV1PostApi'
import {
  YapiPostV1ImChatGroupReleaseAnnouncementApiRequest,
  YapiPostV1ImChatGroupReleaseAnnouncementApiResponse,
} from '@/typings/yapi/ImChatGroupReleaseAnnouncementV1PostApi'
import {
  YapiGetV1ImChatGroupGetGroupAnnouncementApiRequest,
  YapiGetV1ImChatGroupGetGroupAnnouncementApiResponse,
} from '@/typings/yapi/ImChatGroupGetGroupAnnouncementV1GetApi'
/**
 * 创建群组
 * https://yapi.nbttfc365.com/project/82/interface/api/12439
 */
export const createGroup: MarkcoinRequest<
  Partial<YapiPostV1ImChatGroupCreateApiRequest>,
  YapiPostV1ImChatGroupCreateApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/group/create',
    method: 'POST',
    data,
  })
}
/**
 * 查询所有的群组
 * https://yapi.nbttfc365.com/project/82/interface/api/12199
 */
export const queryAllGroup: MarkcoinRequest<
  YapiGetV1ImChatGroupAllApiRequest,
  YapiGetV1ImChatGroupAllApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/group/all',
    method: 'GET',
    data,
  })
}

/**
 * 添加群成员
 * https://yapi.nbttfc365.com/project/82/interface/api/12199
 */
export const addGroupMember: MarkcoinRequest<
  YapiPostV1ImChatGroupAddMemberApiRequest,
  YapiPostV1ImChatGroupAddMemberApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/group/addMember',
    method: 'POST',
    data,
  })
}
/**
 * 查询群成员
 * https://yapi.nbttfc365.com/project/82/interface/api/11409
 */
export const getGroupMembers: MarkcoinRequest<
  ImChatGroupMemberApiRequest,
  ImChatGroupMemberApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/chat/group/member',
    method: 'GET',
    params,
  })
}

/**
 * 移除群成员
 * https://yapi.nbttfc365.com/project/82/interface/api/11429
 */
export const removeMember: MarkcoinRequest<
  YapiPostV1ImChatGroupRemoveMemberApiRequest,
  YapiPostV1ImChatGroupRemoveMemberApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/group/removeMember',
    method: 'POST',
    data,
  })
}

/**
 * 添加群管理
 * https://yapi.nbttfc365.com/project/82/interface/api/11429
 */
export const addAdministrator: MarkcoinRequest<
  YapiPostV1ImChatGroupAddAdministratorApiRequest,
  YapiPostV1ImChatGroupAddAdministratorApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/group/addAdministrator',
    method: 'POST',
    data,
  })
}
/**
 * 移除群管理
 * https://yapi.nbttfc365.com/project/82/interface/api/11529
 */
export const removeAdministrator: MarkcoinRequest<
  YapiPostV1ImChatGroupRemoveAdministratorApiRequest,
  YapiPostV1ImChatGroupRemoveAdministratorApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/group/removeAdministrator',
    method: 'POST',
    data,
  })
}
/**
 * 群管理员列表
 * https://yapi.nbttfc365.com/project/82/interface/api/11499
 */
export const getAdministratorList: MarkcoinRequest<
  YapiGetV1ImChatGroupAdministratorApiRequest,
  YapiGetV1ImChatGroupAdministratorApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/chat/group/administrator',
    method: 'GET',
    params,
  })
}

/**
 * 解散群组
 * https://yapi.nbttfc365.com/project/82/interface/api/11449
 */
export const deleteGroup: MarkcoinRequest<
  YapiPostV1ImChatGroupDeleteGroupApiRequest,
  YapiPostV1ImChatGroupDeleteGroupApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/group/deleteGroup',
    method: 'POST',
    data,
  })
}
/**
 * [我的群组↗](https://yapi.nbttfc365.com/project/82/interface/api/11304)
 * */
export const getV1ImChatGroupMyGroupApiRequest: MarkcoinRequest<
  YapiGetV1ImChatGroupMyGroupApiRequest,
  YapiGetV1ImChatGroupMyGroupApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/chat/group/myGroup',
    method: 'GET',
    params,
  })
}

/**
 * [退出群组↗](https://yapi.nbttfc365.com/project/82/interface/api/11444)
 * */
export const postV1ImChatGroupExitGroupApiRequest: MarkcoinRequest<
  YapiPostV1ImChatGroupExitGroupApiRequest,
  YapiPostV1ImChatGroupExitGroupApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/group/exitGroup',
    method: 'POST',
    data,
  })
}

/**
 * [群设置信息更新↗](https://yapi.nbttfc365.com/project/82/interface/api/11634)
 * */
export const postV1ImChatGroupSettingUpdateApiRequest: MarkcoinRequest<
  YapiPostV1ImChatGroupSettingUpdateApiRequest,
  YapiPostV1ImChatGroupSettingUpdateApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/group/settingUpdate',
    method: 'POST',
    data,
  })
}

/**
 * [查询群组信息↗](https://yapi.nbttfc365.com/project/82/interface/api/11394)
 * */
export const getV1ImChatGroupInfoApiRequest: MarkcoinRequest<
  YapiGetV1ImChatGroupInfoApiRequest,
  getV1ImChatGroupInfoApiResponse
> = params => {
  return request({
    path: '/v1/im/chat/group/info',
    method: 'GET',
    params,
  })
}

/**
 * [修改群组头像↗](https://yapi.nbttfc365.com/project/82/interface/api/18874)
 * */
export const postV1ImChatGroupModifyGroupHeadImageApiRequest: MarkcoinRequest<
  YapiPostV1ImChatGroupModifyGroupHeadImageApiRequest,
  YapiPostV1ImChatGroupModifyGroupHeadImageApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/group/modifyGroupHeadImage',
    method: 'POST',
    data,
  })
}

/**
 * [发布群公告↗](https://yapi.nbttfc365.com/project/82/interface/api/11439)
 * */
export const postV1ImChatGroupReleaseAnnouncementApiRequest: MarkcoinRequest<
  YapiPostV1ImChatGroupReleaseAnnouncementApiRequest,
  YapiPostV1ImChatGroupReleaseAnnouncementApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/group/releaseAnnouncement',
    method: 'POST',
    data,
  })
}

/**
 * [查询群组公告↗](https://yapi.nbttfc365.com/project/82/interface/api/18899)
 * */
export const getV1ImChatGroupGetGroupAnnouncementApiRequest: MarkcoinRequest<
  YapiGetV1ImChatGroupGetGroupAnnouncementApiRequest,
  YapiGetV1ImChatGroupGetGroupAnnouncementApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/chat/group/getGroupAnnouncement',
    method: 'GET',
    params,
  })
}

/**
 * [普通群用户隐藏设置↗](https://yapi.nbttfc365.com/project/82/interface/api/20670)
 * */
export const setNormalUserHide: MarkcoinRequest<SetNormalUserHideRequest, SetNormalUserHideResponse> = data => {
  return request({
    path: '/v1/im/chat/group/userHideUpdate',
    method: 'POST',
    data,
  })
}
/**
 * [普通用户群禁言↗](https://yapi.nbttfc365.com/project/82/interface/api/20803)
 * */
export const banGroup: MarkcoinRequest<banGroupRequest, banGroupResponse> = data => {
  return request({
    path: '/v1/im/chat/group/banGroupUsers',
    method: 'POST',
    data,
  })
}
