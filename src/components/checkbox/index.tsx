import classNames from 'classnames'
import Icon from '../icon'

export function createCheckboxRender(size: number, className?: string) {
  return function ({ checked }) {
    return (
      <Icon
        className={classNames(className, checked ? 'text-brand_color' : 'text-icon_color', {
          checked,
        })}
        style={{
          // 实际尺寸大一点才行
          fontSize: size + 2,
        }}
        name={checked ? 'icon_chat_selected' : 'icon_chat_not_selected'}
      />
    )
  }
}

export const defaultCheckboxRender = createCheckboxRender(18)
