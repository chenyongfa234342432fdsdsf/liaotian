import { oss_svg_image_domain_address } from '@/constants/oss'
import { ReactNode, useEffect, useState } from 'react'
import { IEmojiInfoType } from '@/typings/im'
import LazyImage from '../lazy-image'
import emojiJson from '../emoticons/emoji.json'
import { getRegExpEmoji, emojiToUnicode } from './emoji'

type EmojiType = ReactNode | string
type ReplaceFunc = (emojiInfo: IEmojiInfoType) => string
interface EmojiProps {
  str?: string
  url?: string
  replaceFunc?: ReplaceFunc
}

function emojiRegMatch(str: string, emojiInfoArray: IEmojiInfoType[], replaceFunc?: ReplaceFunc) {
  const reg = getRegExpEmoji('g')
  let result = str.replace(reg, function (char) {
    /** 匹配对应的表情包获取图片地址 */
    const emojiUnicode = emojiToUnicode(char)
    let emojiInfo = emojiInfoArray.find(i => {
      /** 转换还原为对应的 unicode 再进行对比 */
      return i.unicode === emojiUnicode
    })
    if (emojiInfo) {
      /** 如果外部有传替换函数，则使用替换函数传回来的内容 */
      if (replaceFunc) {
        return replaceFunc(emojiInfo)
      }
      return `<image style="width:20px; height:20px; display:inline-block;" src=${oss_svg_image_domain_address}emojis_3d/${emojiInfo?.file} />`
    }
    return ''
  })
  return result
}
export function getEmojiInfoByFile(file: string) {
  const emojiInfoArray = Object.keys(emojiJson).reduce((prev, cur) => {
    return [...prev, ...emojiJson[cur]]
  }, [] as any)
  return emojiInfoArray.find(i => i.file === file) as IEmojiInfoType
}
export default function Emoji({ str = '', url = '', replaceFunc }: EmojiProps): EmojiType {
  /** 获取所有的表情包数据 */
  const emojiInfoArray = Object.keys(emojiJson).reduce((prev, cur) => {
    return [...prev, ...emojiJson[cur]]
  }, [] as any)
  const matchStr = emojiRegMatch(str, emojiInfoArray, replaceFunc)

  if (url) {
    return <LazyImage className="w-5 h-5 inline-block" src={`${oss_svg_image_domain_address}emojis_3d/${url}`} />
  } else {
    return matchStr || ''
  }
}
