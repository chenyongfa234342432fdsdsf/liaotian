import request, { MarkcoinRequest } from '@/plugins/request'
import {
  YapiPostV1ImChatImUserBindDeleteApiRequest,
  YapiPostV1ImChatImUserBindDeleteApiResponse,
} from '@/typings/yapi/ImChatImUserBindDeleteV1PostApi'
import {
  YapiGetV1ImChatImUserBindListApiRequest,
  YapiGetV1ImChatImUserBindListApiResponse,
} from '@/typings/yapi/ImChatImUserBindListV1GetApi'
import {
  YapiGetV1ImChatImWalletTrendsConfigApiRequest,
  YapiGetV1ImChatImWalletTrendsConfigApiResponse,
} from '@/typings/yapi/ImChatImWalletTrendsConfigV1GetApi'
import {
  YapiPostV1ImChatUserBankCardAddApiRequest,
  YapiPostV1ImChatUserBankCardAddApiResponse,
} from '@/typings/yapi/ImChatUserBankCardAddV1PostApi'
import {
  YapiPostV1ImChatUserBankCardDeleteApiRequest,
  YapiPostV1ImChatUserBankCardDeleteApiResponse,
} from '@/typings/yapi/ImChatUserBankCardDeleteV1PostApi'
import {
  YapiGetV1ImChatUserBankCardListApiRequest,
  YapiGetV1ImChatUserBankCardListApiResponse,
} from '@/typings/yapi/ImChatUserBankCardListV1GetApi'
import {
  YapiPostV1ImChatUserBankCardModifyApiRequest,
  YapiPostV1ImChatUserBankCardModifyApiResponse,
} from '@/typings/yapi/ImChatUserBankCardModifyV1PostApi'
import {
  YapiPostV1ImUserBalanceBankCardWithdrawApiRequest,
  YapiPostV1ImUserBalanceBankCardWithdrawApiResponse,
} from '@/typings/yapi/ImUserBalanceBankCardWithdrawV1PostApi'
import {
  YapiGetV1ImUserBalanceGetBillLogListApiRequest,
  YapiGetV1ImUserBalanceGetBillLogListApiResponse,
} from '@/typings/yapi/ImUserBalanceGetBillLogListV1GetApi'
import {
  YapiGetV1ImUserBalanceWithdrawListApiRequest,
  YapiGetV1ImUserBalanceWithdrawListApiResponse,
} from '@/typings/yapi/ImUserBalanceWithdrawListV1GetApi'
import {
  YapiPostV1ImUserBalanceWithdrawApiRequest,
  YapiPostV1ImUserBalanceWithdrawApiResponse,
} from '@/typings/yapi/ImUserBalanceWithdrawV1PostApi'
import {
  YapiGetV1ImWithdrawSettingGetCoinListApiRequest,
  YapiGetV1ImWithdrawSettingGetCoinListApiResponse,
} from '@/typings/yapi/ImWithdrawSettingGetCoinListV1GetApi'
import {
  YapiPostInnerV1ImChatBindCheckAndBindApiRequest,
  YapiPostInnerV1ImChatBindCheckAndBindApiResponse,
} from '@/typings/yapi/InnerImChatBindCheckAndBindV1PostApi'
import {
  YapiPostInnerV1ImChatBindGetThirdUserInfoV2ApiRequest,
  YapiPostInnerV1ImChatBindGetThirdUserInfoV2ApiResponse,
} from '@/typings/yapi/InnerImChatBindGetThirdUserInfoV2PostApi'
import {
  YapiPostInnerV1ImChatBindSendCheckApiRequest,
  YapiPostInnerV1ImChatBindSendCheckApiResponse,
} from '@/typings/yapi/InnerImChatBindSendCheckV1PostApi'

/**
 * [提现记录分页列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11479)
 * */
export const getV1ImUserBalanceWithdrawListApiRequest: MarkcoinRequest<
  YapiGetV1ImUserBalanceWithdrawListApiRequest,
  YapiGetV1ImUserBalanceWithdrawListApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/userBalance/withdrawList',
    method: 'GET',
    params,
  })
}

/**
 * [财务记录分页列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11469)
 * */
export const getV1ImUserBalanceGetBillLogListApiRequest: MarkcoinRequest<
  YapiGetV1ImUserBalanceGetBillLogListApiRequest,
  YapiGetV1ImUserBalanceGetBillLogListApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/userBalance/getBillLogList',
    method: 'GET',
    params,
  })
}

/**
 * [用户绑定账户列表↗](https://yapi.nbttfc365.com/project/82/interface/api/15194)
 * */
export const getUserBindList: MarkcoinRequest<
  YapiGetV1ImChatImUserBindListApiRequest,
  YapiGetV1ImChatImUserBindListApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/chat/imUserBind/list',
    method: 'GET',
    params,
  })
}

/**
 * [获取三方用户信息↗](https://yapi.nbttfc365.com/project/82/interface/api/15174)
 * */
export const postBindGetThirdUserInfo: MarkcoinRequest<
  YapiPostInnerV1ImChatBindGetThirdUserInfoV2ApiRequest,
  YapiPostInnerV1ImChatBindGetThirdUserInfoV2ApiResponse['data']
> = data => {
  return request({
    path: '/inner/v1/im/chat/bind/getThirdUserInfoV2',
    method: 'POST',
    signature: true,
    data,
  })
}

/**
 * [删除绑定↗](https://yapi.nbttfc365.com/project/82/interface/api/15189)
 * */
export const postV1ImChatImUserBindDeleteApiRequest: MarkcoinRequest<
  YapiPostV1ImChatImUserBindDeleteApiRequest,
  YapiPostV1ImChatImUserBindDeleteApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/imUserBind/delete',
    method: 'POST',
    data,
  })
}

/**
 * [发起提现↗](https://yapi.nbttfc365.com/project/82/interface/api/11474)
 * */
export const postV1ImUserBalanceWithdrawApiRequest: MarkcoinRequest<
  YapiPostV1ImUserBalanceWithdrawApiRequest,
  YapiPostV1ImUserBalanceWithdrawApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/userBalance/withdraw',
    method: 'POST',
    data,
  })
}

/**
 * [获取可用币种列表↗](https://yapi.nbttfc365.com/project/82/interface/api/11644)
 * */
export const getV1ImWithdrawSettingGetCoinListApiRequest: MarkcoinRequest<
  YapiGetV1ImWithdrawSettingGetCoinListApiRequest,
  YapiGetV1ImWithdrawSettingGetCoinListApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/withdrawSetting/getCoinList',
    method: 'GET',
    params,
  })
}

/**
 * [添加银行卡↗](https://yapi.nbttfc365.com/project/82/interface/api/20740)
 * */
export const postV1ImChatUserBankCardAddApiRequest: MarkcoinRequest<
  YapiPostV1ImChatUserBankCardAddApiRequest,
  YapiPostV1ImChatUserBankCardAddApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/user/bankCard/add',
    method: 'POST',
    data,
  })
}

/**
 * [删除银行卡↗](https://yapi.nbttfc365.com/project/82/interface/api/20754)
 * */
export const postV1ImChatUserBankCardDeleteApiRequest: MarkcoinRequest<
  YapiPostV1ImChatUserBankCardDeleteApiRequest,
  YapiPostV1ImChatUserBankCardDeleteApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/user/bankCard/delete',
    method: 'POST',
    data,
  })
}

/**
 * [修改银行卡↗](https://yapi.nbttfc365.com/project/82/interface/api/20761)
 * */
export const postV1ImChatUserBankCardModifyApiRequest: MarkcoinRequest<
  YapiPostV1ImChatUserBankCardModifyApiRequest,
  YapiPostV1ImChatUserBankCardModifyApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/chat/user/bankCard/modify',
    method: 'POST',
    data,
  })
}

/**
 * [银行卡列表↗](https://yapi.nbttfc365.com/project/82/interface/api/20747)
 * */
export const getV1ImChatUserBankCardListApiRequest: MarkcoinRequest<
  YapiGetV1ImChatUserBankCardListApiRequest,
  YapiGetV1ImChatUserBankCardListApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/chat/user/bankCard/list',
    method: 'GET',
    params,
  })
}

/**
 * [银行卡体现↗](https://yapi.nbttfc365.com/project/82/interface/api/20775)
 * */
export const postV1ImUserBalanceBankCardWithdrawApiRequest: MarkcoinRequest<
  YapiPostV1ImUserBalanceBankCardWithdrawApiRequest,
  YapiPostV1ImUserBalanceBankCardWithdrawApiResponse['data']
> = data => {
  return request({
    path: '/v1/im/userBalance/bankCard/withdraw',
    method: 'POST',
    data,
  })
}

/**
 * [三方平台安全校验发送↗](https://yapi.nbttfc365.com/project/82/interface/api/15179)
 * */
export const postInnerV1ImChatBindSendCheckApiRequest: MarkcoinRequest<
  YapiPostInnerV1ImChatBindSendCheckApiRequest,
  YapiPostInnerV1ImChatBindSendCheckApiResponse['data']
> = data => {
  return request({
    path: '/inner/v1/im/chat/bind/sendCheck',
    method: 'POST',
    data,
  })
}

/**
 * [验证码校验及绑定↗](https://yapi.nbttfc365.com/project/82/interface/api/15184)
 * */
export const postInnerV1ImChatBindCheckAndBindApiRequest: MarkcoinRequest<
  YapiPostInnerV1ImChatBindCheckAndBindApiRequest,
  YapiPostInnerV1ImChatBindCheckAndBindApiResponse['data']
> = data => {
  return request({
    path: '/inner/v1/im/chat/bind/checkAndBind',
    method: 'POST',
    data,
  })
}

/**
 * [IM动态配置列表↗](https://yapi.nbttfc365.com/project/82/interface/api/15144)
 * */
export const getV1ImChatImWalletTrendsConfigApiRequest: MarkcoinRequest<
  YapiGetV1ImChatImWalletTrendsConfigApiRequest,
  YapiGetV1ImChatImWalletTrendsConfigApiResponse['data']
> = params => {
  return request({
    path: '/v1/im/chat/imWalletTrendsConfig',
    method: 'GET',
    params,
  })
}
