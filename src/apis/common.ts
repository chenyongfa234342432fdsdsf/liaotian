import request, { MarkcoinRequest, MarkcoinResponse } from '@/plugins/request'
import { baseCommonStore } from '@/store/common'
import {
  YapiGetV1ImOpenapiComCodeGetCodeDetailListApiRequest,
  YapiGetV1ImOpenapiComCodeGetCodeDetailListData,
} from '@/typings/yapi/ImOpenapiComCodeGetCodeDetailListV1GetApi'

/**
 * 获取数据字典列表
 * https://yapi.nbttfc365.com/project/44/interface/api/3595
 */
export const getCodeDetailList: MarkcoinRequest<
  Partial<YapiGetV1ImOpenapiComCodeGetCodeDetailListApiRequest>,
  YapiGetV1ImOpenapiComCodeGetCodeDetailListData[]
> = params => {
  return request({
    path: '/v1/openapi/com/code/getCodeDetailList',
    method: 'GET',
    params: {
      lanType: baseCommonStore.getState().locale,
      ...params,
    },
  })
}

/**
 * 获取国家数据
 * https://yapi.nbttfc365.com/project/44/interface/api/12204
 */
export const getAccessToNationalData: MarkcoinRequest<
  Partial<YapiGetV1ImOpenapiComCodeGetCodeDetailListApiRequest>,
  YapiGetV1ImOpenapiComCodeGetCodeDetailListData[]
> = params => {
  const { locale, businessId } = baseCommonStore.getState()
  return request({
    path: '/v1/openapi/com/code/getCountryList',
    method: 'GET',
    params: {
      lanType: locale,
      businessId,
      ...params,
    },
  })
}

/**
 * 批量获取数据字典列表
 * https://yapi.nbttfc365.com/project/44/interface/api/3715
 */
export const getCodeDetailListBatch = async (codeVals: string[], isUseFastPayApi?: boolean) => {
  const res: MarkcoinResponse<{
    [x: string]: {
      [y: string]: YapiGetV1ImOpenapiComCodeGetCodeDetailListData[]
    }
  }> = await request({
    path: '/v1/openapi/com/code/batchGetCodeDetailList',
    method: 'GET',
    params: {
      lanTypes: baseCommonStore.getState().locale,
      codeVals: codeVals.join(','),
    },
    isUseFastPayApi,
  })
  if (!res.isOk || !res.data) {
    return codeVals.map(() => [])
  }

  return codeVals.map(codeVal => {
    const result = res.data?.[codeVal]
    // 只取一种语言
    return Object.values(result || {})[0] || []
  })
}
