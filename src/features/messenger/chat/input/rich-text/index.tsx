import { IEmojiInfoType } from '@/typings/im'
import { DeltaStatic } from 'quill'

type DeltaInsert =
  | string
  | {
      emoji: IEmojiInfoType
      mention: {
        denotationChar: string
        id: string
        value: string
        index: string
      }
    }
/** 从 quill 中获取要发送的格式化信息 */
export function getMessageInfoFromQuillDelta(delta: DeltaStatic) {
  let text = ''
  const mentions: string[] = []
  delta.forEach(op => {
    const insert: DeltaInsert = op.insert
    if (typeof insert === 'string') {
      text += op.insert
    } else if (insert.emoji) {
      text += insert.emoji.glyph
    } else if (insert.mention) {
      const mention = insert.mention
      const mentionText = `${insert.mention.denotationChar}${insert.mention.value}`
      mentions.push(`${mention.id},${text.length},${text.length + mentionText.length}`)
      text += mentionText
    }
  })
  // 去除末尾换行符
  text = text.replace(/\n$/g, '')

  return [text, mentions.join(';')] as const
}
