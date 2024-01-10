import Request, { MarkcoinRequest } from '@/plugins/request'
import {
  YapiPostV1ImChatImBlockListBlockApiRequest,
  YapiPostV1ImChatImBlockListBlockApiResponse,
} from '@/typings/yapi/ImChatImBlockListBlockV1PostApi'

/**
 * [黑名单 - 拉黑↗](https://yapi.nbttfc365.com/project/82/interface/api/11854)
 * */
export const postV1ImChatImBlockListBlockApiRequest: MarkcoinRequest<
  YapiPostV1ImChatImBlockListBlockApiRequest,
  YapiPostV1ImChatImBlockListBlockApiResponse['data']
> = data => {
  return Request({
    path: '/v1/im/chat/imBlockList/block',
    method: 'POST',
    data,
  })
}
