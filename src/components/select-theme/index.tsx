import style from '@/components/i18n-select-modal/index.module.css'
import { Button, Modal } from '@nbit/arco'
import { t } from '@lingui/macro'
import { useRef, useState } from 'react'
import { ThemeOptionEnum } from '@/constants/base'
import { useCommonStore } from '@/store/common'
import PopBox, { PopBoxProps } from '../pop-box'
import { Radio, RadioGroup } from '../radio'

function ThemeSelect(props: { theme: ThemeOptionEnum; onChange: (theme: ThemeOptionEnum) => void }) {
  const { theme, onChange } = props
  return (
    <div className={style['lang-select']}>
      <RadioGroup value={theme} onChange={value => onChange(value)}>
        <label className="lang-item">
          <Radio size={20} value={ThemeOptionEnum.light} />
          <span className="lang-text">{t`components_select_theme_index_kxxh3dyhun`}</span>
        </label>

        <label className="lang-item">
          <Radio size={20} value={ThemeOptionEnum.dark} />
          <span className="lang-text">{t`components_select_theme_index_9vwjwwqazh`}</span>
        </label>

        <label className="lang-item">
          <Radio size={20} value={ThemeOptionEnum.system} />
          <span className="lang-text">
            {t`components_select_theme_index_gt4wu0mmwa`}
            <span className="text-xs text-text_color_02 pl-1">{t`components_select_theme_index_0goie8lvng`}</span>
          </span>
        </label>
      </RadioGroup>
    </div>
  )
}
type ThemeSelectModalProps = Omit<PopBoxProps, 'title' | 'content'>
export function SelectTheme(props: ThemeSelectModalProps) {
  const { themeOption, setThemeOption } = useCommonStore()
  const ref = useRef(themeOption)
  return (
    <PopBox
      title={t`components_select_theme_index__2kufy39sf`}
      content={<ThemeSelect theme={themeOption} onChange={setThemeOption} />}
      {...props}
      onClose={() => {
        props.onClose()
        setThemeOption(ref.current)
      }}
      onCommit={() => {
        props.onCommit()
      }}
    />
  )
}
