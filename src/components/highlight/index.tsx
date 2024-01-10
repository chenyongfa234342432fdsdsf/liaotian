import { ReactNode } from 'react'

export type IHighLightProps = {
  text: string
  keyword?: string
  className?: string
  highlightClassName?: string
}

function HighLight(props: IHighLightProps) {
  if (!props.keyword) {
    return <span className={props.className}>{props.text}</span>
  }
  const children = props.text
    .toUpperCase()
    .split((props.keyword || '').toUpperCase())
    .reduce((prev, current, index) => {
      if (!index) {
        return [current]
      }
      return prev.concat(props.keyword!, current)
    }, [] as string[])
  // 之前全部大写了，这里需要还原
  const finalChildren = children.map((item, index) => {
    let startIndex = 0
    for (let i = 0; i < index; i += 1) {
      startIndex += children[i].length
    }
    const text = props.text.slice(startIndex, startIndex + item.length)
    if (item === props.keyword) {
      return (
        <span key={`${props.keyword}${index}`} className={props.highlightClassName}>
          {text}
        </span>
      )
    }

    return text
  })

  return <span className={props.className}>{finalChildren}</span>
}

export default HighLight
