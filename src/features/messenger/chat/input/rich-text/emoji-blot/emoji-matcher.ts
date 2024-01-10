import { Delta } from 'quill'
import { IEmojiInfoType } from '@/typings/im'
import Emoji, { getEmojiInfoByFile } from '@/components/emoji'
import { Quill } from 'react-quill'
import { EmojiBlotName } from './index'

const DeltaStatic: typeof Delta = Quill.import('delta')

/**
 * 粘贴板中文本匹配 emoji 并插入
 */
export const textEmojiMatcher = (node: Node, delta: Delta) => {
  const splitBy = '<&|&>'
  const text = delta.ops![0].insert
  const emojiText = Emoji({
    str: text,
    replaceFunc(emojiInfo) {
      return `${splitBy}${emojiInfo.glyph}${splitBy}`
    },
  }) as string
  const emojiTextArr = emojiText.split(splitBy)
  const result = new DeltaStatic()
  emojiTextArr.forEach(item => {
    const withEmojiText = Emoji({
      str: item,
    }) as string
    if (withEmojiText.includes('image')) {
      result.insert({
        [EmojiBlotName]: {
          glyph: item,
        },
      })
    } else {
      result.insert(item)
    }
  })
  return result
}
/**
 * 粘贴板中图片匹配 emoji 并插入
 */
export const imageEmojiMatcher = (node: Node, delta: Delta) => {
  const image: {
    image: string
  } = delta.ops![0].insert
  // 如果是表情地址
  if (image.image.includes('im-web/image/emoji')) {
    return new DeltaStatic([
      {
        insert: {
          [EmojiBlotName]: {
            glyph: getEmojiInfoByFile(image.image.split('/').pop()!)?.glyph,
          },
        },
      },
    ])
  }
  // 否则对图片返回空
  return new DeltaStatic()
}
