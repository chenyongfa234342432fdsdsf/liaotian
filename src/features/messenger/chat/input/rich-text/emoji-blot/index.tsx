import Emoji from '@/components/emoji'
import { IEmojiInfoType } from '@/typings/im'
import { renderToString } from 'react-dom/server'
import ReactQuill, { Quill, UnprivilegedEditor } from 'react-quill'

export const EmojiBlotName = 'emoji'

class EmojiBlot extends Quill.import('blots/embed') {
  static blotName = EmojiBlotName

  static tagName = 'span'

  static className = 'emoji-blot'

  static create(value: IEmojiInfoType) {
    const node = super.create(value)
    node.innerHTML = Emoji({
      str: value.glyph,
    })
    return EmojiBlot.setDataValues(node, value)
  }

  static setDataValues(element: HTMLSpanElement, data: IEmojiInfoType) {
    const domNode = element
    Object.keys(data).forEach(key => {
      domNode.dataset[key] = data[key]
    })
    return domNode
  }

  static value(node: HTMLElement) {
    return node.dataset
  }
}

Quill.register('blots/emoji', EmojiBlot)
