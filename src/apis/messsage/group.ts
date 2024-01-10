import request, { MarkcoinRequest } from '@/plugins/request'
import {
  YapiPostV1ImChatGroupWithdrawMessageAddRecordApiRequest,
  YapiPostV1ImChatGroupWithdrawMessageAddRecordApiResponse,
} from '@/typings/yapi/ImChatGroupWithdrawMessageAddRecordV1PostApi'
import {
  YapiGetV1ImChatGroupWithdrawMessageInfoApiRequest,
  YapiGetV1ImChatGroupWithdrawMessageInfoApiResponse,
} from '@/typings/yapi/ImChatGroupWithdrawMessageInfoV1GetApi'

/**
 * [群撤回消息列表↗](https://yapi.nbttfc365.com/project/82/interface/api/20817)
 * */
export const queryGroupRevokedMessages: MarkcoinRequest<
  YapiGetV1ImChatGroupWithdrawMessageInfoApiRequest,
  YapiGetV1ImChatGroupWithdrawMessageInfoApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/chat/group/withdrawMessage/info',
    method: 'GET',
    params,
  })
}

/**
 * [管理员撤回群消息↗](https://yapi.nbttfc365.com/project/82/interface/api/20810)
 * */
export const revokeGroupMessageByAdmin: MarkcoinRequest<
  YapiPostV1ImChatGroupWithdrawMessageAddRecordApiRequest
> = data => {
  return request({
    path: '/v1/im/chat/group/withdrawMessage/addRecord',
    method: 'POST',
    data,
  })
}
