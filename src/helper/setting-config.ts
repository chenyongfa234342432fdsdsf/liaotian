import { getV1ImChatImUserIndividualQueryEntityApiRequest } from '@/apis/settings-center'
import { setChatConfiguration } from '@/helper/cache/user'

/** 获取用户个性化-查询 */
export async function updateQueryEntity() {
  const res = await getV1ImChatImUserIndividualQueryEntityApiRequest({})
  const { data } = res || {}
  if (data) {
    data.videoCallBeauty = 2 // 接口没这个视频美颜字段，自定义
    setChatConfiguration(data)
  }
}
