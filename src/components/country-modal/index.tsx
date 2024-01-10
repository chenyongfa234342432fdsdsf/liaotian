import React, { useState, useRef, useEffect } from 'react'
import pinyin from 'pinyin'
import Icon from '@/components/icon'
import { Modal, Input, Message } from '@nbit/arco'
import { oss_area_code_image_domain_address } from '@/constants/oss'
import LazyImage from '@/components/lazy-image'
import { baseCommonStore } from '@/store/common'
import { businessCountryInfo } from '@/apis/settings-center'
import {
  YapiGetV1ImChatImBusinessCountryInfoQueryData,
  YapiGetV1ImChatImBusinessCountryInfoQueryListApiResponse,
} from '@/typings/yapi/ImChatImBusinessCountryInfoQueryListV1GetApi'
import { t } from '@lingui/macro'
import Styles from './index.module.css'

interface CountryModalProps {
  visible: boolean
  onClose: () => void
  onSelect: (data: { countryName: string; countryEnCode: string; countryShortName: string }) => void
}
function CountryModal({ visible, onClose, onSelect }: CountryModalProps) {
  const commonStore = baseCommonStore.getState()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [countries, setCountries] = useState({})
  const [filteredCountries, setFilteredCountries] = useState({})
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [countriesData, setCountriesData] = useState<YapiGetV1ImChatImBusinessCountryInfoQueryData>()

  const handleSearch = (value: string) => {
    const lowerCaseValue = value.trim().toLowerCase() // 将搜索关键词转换为小写
    setSearchKeyword(lowerCaseValue)
    // 过滤符合搜索关键字的国家/地区
    const filtered = {}
    for (const letter in countries) {
      if (Object.prototype.hasOwnProperty.call(countries, letter)) {
        const filteredCountriesInLetter = countries[letter].filter(
          country =>
            country.countryName.toLowerCase().indexOf(value) !== -1 ||
            country.countryEnCode.toString().indexOf(lowerCaseValue) !== -1
        )
        if (filteredCountriesInLetter.length > 0) {
          filtered[letter] = filteredCountriesInLetter
        }
      }
    }
    setFilteredCountries(filtered)
  }

  // 选择国家
  const handleCountryClick = country => {
    setSelectedCountry(country)
  }

  const handleOk = () => {
    if (!selectedCountry) {
      Message.error(t`features_users_create_account_index_0dlxrrysk4`)
      return
    }
    onSelect(selectedCountry)
    setSearchKeyword('')
    onClose()
  }

  const handleCancel = () => {
    setSearchKeyword('')
    onClose()
  }

  const dataProcessing = countriesData => {
    // 将国家名称转换成拼音
    const countriesWithPinyin = countriesData.map(country => {
      const pinyinName =
        commonStore.locale === 'en-US'
          ? country.countryName.charAt(0).toUpperCase()
          : pinyin(country.countryName, { style: pinyin.STYLE_FIRST_LETTER })[0][0].toUpperCase()
      return { ...country, pinyinName }
    })
    // 按拼音首字母将国家分组
    const groupedCountries: any = countriesWithPinyin.reduce((result, country) => {
      const { pinyinName, ...rest } = country
      if (!result[pinyinName]) {
        result[pinyinName] = []
      }
      result[pinyinName].push({ ...rest })
      return result
    }, {})

    setCountries(groupedCountries)
  }

  const getbusinessCountryInfo = () => {
    businessCountryInfo({}).then(res => {
      if (res.isOk && res.data) {
        dataProcessing(res.data)
        setCountriesData(res.data)
      }
    })
  }

  useEffect(() => {
    getbusinessCountryInfo()
  }, [])

  return (
    <div>
      <Modal
        className={Styles.scoped}
        style={{ width: '500px', height: '552px', boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.15)', padding: '24px' }}
        title={<div style={{ textAlign: 'left' }}>{t`components_country_modal_index_nscvohqorw`}</div>}
        visible={visible}
        closable={false}
        okText={t`components_pop_box_index_xjmp7i51ci`}
        cancelText={t`features_group_components_comfirm_btn_pop_index_2sr1guu0iy`}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <div className="country-search">
          <Input
            className="country-search-input"
            prefix={<Icon name="icon_chat_search" className="text-icon_color text-sm" />}
            placeholder={t`features_group_components_search_input_index_tq98cmscdb`}
            onChange={handleSearch}
          />
        </div>
        <div className="country-list">
          {Object.keys(searchKeyword ? filteredCountries : countries)
            .sort()
            .map((letter, index) => {
              return (
                <div key={index}>
                  <h3 className="letter">{letter}</h3>
                  <ul>
                    {(searchKeyword ? filteredCountries[letter] : countries[letter]).map((country, inx) => (
                      <li className="country-item" key={inx} onClick={() => handleCountryClick(country)}>
                        {selectedCountry === country ? (
                          <Icon name="icon_register_single_selected" fontSize={20} className="country-icon-active" />
                        ) : (
                          <Icon name="icon_register_single_unselected" fontSize={20} className="country-icon" />
                        )}
                        <LazyImage src={`${oss_area_code_image_domain_address}${country.countryShortName}.png`} />
                        <div className="country-area-code">
                          <span className="country-name">{country.countryName}</span>
                          <span className="country-code">+{country.countryEnCode}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
        </div>
      </Modal>
    </div>
  )
}
export default CountryModal
