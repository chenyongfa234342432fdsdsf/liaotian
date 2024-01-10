import {
    YapiGetV1ImChatImUserIndividualQueryEntityApiResponse
  } from '@/typings/yapi/ImChatImUserIndividualQueryEntityV1GetApi'
  import {
    YapiPostV1ImChatImUserIndividualConfigurationApiRequest,
  } from '@/typings/yapi/ImChatImUserIndividualConfigurationV1PostApi'

  import {YapiGetV1ImChatImBusinessCountryInfoQueryData} from '@/typings/yapi/ImChatImBusinessCountryInfoQueryListV1GetApi'
  /** 个性化设置获取 */
  export type YapiGetV1ImChatImUserIndividualQueryEntityApiNewResponse = YapiGetV1ImChatImUserIndividualQueryEntityApiResponse & {mobileHideSet:number,videoCallBeauty?:number};

  export type YapiPostV1ImChatImUserIndividualConfigurationApiNewRequest = YapiPostV1ImChatImUserIndividualConfigurationApiRequest & {mobileHideSet:number,videoCallBeauty?:number};

  //国家地理查询
  export type YapiGetV1ImChatImBusinessCountryInfoQueryNewData=YapiGetV1ImChatImBusinessCountryInfoQueryData &{find: any}