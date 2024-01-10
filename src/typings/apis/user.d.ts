import {
    YapiPostV1ImChatRegisterEmailApiResponse,
  } from '@/typings/yapi/ImChatRegisterEmailV1PostApi'
  import {
    YapiPostV1ImChatLoginScanApiRequest
  } from '@/typings/yapi/ImChatLoginScanV1PostApi'

/** 添加字段类型 */
type AdditionalField = {
    zeGoToken?: string;
  }
  
  /** 注册返回信息 */
  export type YapiPostV1ImChatRegisterEmailApiNewResponse = YapiPostV1ImChatRegisterEmailApiResponse & AdditionalField;

   /** 扫码提交的信息 */
   export type YapiPostV1ImChatLoginScanApiNewRequest = YapiPostV1ImChatLoginScanApiRequest & {tokenTtl?: number};