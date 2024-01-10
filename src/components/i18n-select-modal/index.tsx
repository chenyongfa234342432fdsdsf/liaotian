import { I18nsMap } from '@/constants/i18n'
import { useRef } from 'react'
import { setLocale } from '@/helper/i18n'
import { useCommonStore } from '@/store/common'
import { t } from '@lingui/macro'
import { Button, Modal, Select } from '@nbit/arco'
import { useSafeState } from 'ahooks'
import style from './index.module.css'
import { Radio, RadioGroup } from '../radio'

function I18nSelect() {
  const { locale } = useCommonStore()
  const [currentLang, setCurrentLang] = useSafeState(locale)

  return (
    <div className={style['lang-select']}>
      <RadioGroup
        value={currentLang}
        onChange={_locale => {
          setCurrentLang(_locale)
        }}
      >
        {Object.keys(I18nsMap).map(lang => {
          return (
            <label className="lang-item" key={lang}>
              <Radio value={lang} size={20} />
              <span className="lang-text">{I18nsMap[lang]}</span>
            </label>
          )
        })}
      </RadioGroup>

      <div className={'footer '}>
        <Button
          type="outline"
          onClick={() => {
            Modal.destroyAll()
          }}
        >{t`features_group_components_comfirm_btn_pop_index_2sr1guu0iy`}</Button>
        <Button
          onClick={() => {
            setLocale(currentLang)
            Modal.destroyAll()
          }}
          type="primary"
        >{t`components_i18n_select_modal_index_cl__sphiqv`}</Button>
      </div>
    </div>
  )
}

function I18nSelectModal() {
  const config = {
    className: style.select,
    title: <div>{t`components_i18n_select_modal_index_581ygzfivm`}</div>,
    content: <I18nSelect />,
    closable: false,
    closeIcon: null,
    footer: null,
  }
  const openI18nSelect = () => {
    Modal.info!(config)
  }
  return {
    openI18nSelect,
  }
}

export function I18nSelectChoose() {
  const Option = Select.Option
  const { locale } = useCommonStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentLang, setCurrentLang] = useSafeState(locale)
  return (
    <div className={style['lang-drop-down']} ref={containerRef}>
      <Select
        style={{ width: 'auto' }}
        className="drop-down"
        getPopupContainer={() => containerRef.current as Element}
        defaultValue={currentLang}
        onChange={_locale => {
          setCurrentLang(_locale)
          setLocale(_locale)
        }}
      >
        {Object.keys(I18nsMap).map(lang => {
          return (
            <Option key={lang} value={lang}>
              {I18nsMap[lang]}
            </Option>
          )
        })}
      </Select>
    </div>
  )
}

export default I18nSelectModal
