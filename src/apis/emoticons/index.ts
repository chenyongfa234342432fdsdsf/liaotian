import request, { MarkcoinRequest, MarkcoinResponse } from '@/plugins/request'
import { oss_svg_image_domain_address } from '@/constants/oss'
import axios from 'axios'
/**
 * [获取表情包分组配置文件]
 * */
export const getEmoticonsGroupJson = params => {
  return axios({
    url: `${oss_svg_image_domain_address}emojis_3d/emoji.json`,
    method: 'GET',
    params,
  })
}
