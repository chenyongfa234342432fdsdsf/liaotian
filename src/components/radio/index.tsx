import { RadioProps as ArcoRadioProps, Radio as ArcoRadio } from '@nbit/arco'
import Icon from '../icon'
import styles from './index.module.css'

type RadioProps = { size?: number } & ArcoRadioProps

export function Radio(props: RadioProps) {
  const { size, ...rest } = props
  return (
    <ArcoRadio {...rest} className={styles.radio}>
      {({ checked }) => {
        return (
          <Icon
            fontSize={size}
            className={checked ? 'text-brand_color' : 'text-icon_color'}
            name={checked ? 'icon_register_single_selected' : 'icon_register_single_unselected'}
          />
        )
      }}
    </ArcoRadio>
  )
}

export const RadioGroup = ArcoRadio.Group
