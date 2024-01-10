import { memo } from 'react'
import { Input } from '@nbit/arco'
import { useMemoizedFn } from 'ahooks'
import { t } from '@lingui/macro'
import cn from 'classnames'
import Icon from '@/components/icon'
// import AreacodeSelect from '@/features/user/initial-person/areacode-select'
import styles from './index.module.css'

type Props = {
  onChange?: (e: any) => void
  value?: any
  error?: boolean
}

type AreacodeSelect = Partial<Record<'cnNmae' | 'imgUrl' | 'label' | 'name' | 'src' | 'value', string>>

function AreacodeForm(props: Props) {
  const { onChange, value } = props

  const onAreacodeSelect = useMemoizedFn((selectvalue, selectExtra) => {
    onChange && onChange({ phone: value?.phone, areacode: selectvalue, areaName: selectExtra?.remark })
  })

  const onAreacodeInput = e => {
    // 去掉出数字外的其他符号
    onChange &&
      onChange({
        phone: e.trim().replace(/[^0-9]/g, ''),
        areacode: value?.areacode,
        areaName: value?.areaName,
      })
  }

  return (
    <div className={styles.container}>
      <div className={cn({ 'error-container': props?.error })}>
        <div className="container">
          <div className="areacodeselect">+86</div>
          <div className="areacodeselect-input">
            <Input placeholder="请输入您的手机号" maxLength={18} onChange={onAreacodeInput} value={value?.phone} />
            <div className="phone-icon">
              <Icon name="phone_icon1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(AreacodeForm)
