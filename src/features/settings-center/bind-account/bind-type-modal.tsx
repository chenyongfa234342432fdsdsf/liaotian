import { CommonModal } from '@/components/common-modal'
import { Radio, RadioGroup } from '@/components/radio'
import { BindAccountTypeEnum, enumValuesToOptions, getBindAccountTypeEnumLabel } from '@/constants/my-wallet'
import { map } from 'lodash'
import { useState } from 'react'
import { t } from '@lingui/macro'

export function BindTypeModal({ onSelect, ...rest }) {
  const [bindType, setBindType] = useState(BindAccountTypeEnum.Third)
  const options = enumValuesToOptions(Object.values(BindAccountTypeEnum), getBindAccountTypeEnumLabel)

  return (
    <CommonModal
      title={t`features_settings_center_bind_account_index_ooh7tnooc0`}
      icon={null}
      {...rest}
      onOk={() => onSelect(bindType)}
    >
      <RadioGroup value={bindType} onChange={setBindType}>
        {map(options, i => (
          <label key={i.value} className="flex mb-6 last:mb-0">
            <Radio size={20} value={i.value} />
            <span className="ml-4 text-base cursor-pointer">{i.label}</span>
          </label>
        ))}
      </RadioGroup>
    </CommonModal>
  )
}
