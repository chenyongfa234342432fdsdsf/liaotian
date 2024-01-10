import { Input } from '@nbit/arco'
import Icon from '@/components/icon'
import { t } from '@lingui/macro'
import Styles from './index.module.css'

export default function SearchInput({ searchValue, setSearchValue }) {
  return (
    <Input
      prefix={<Icon name="icon_chat_search" />}
      className={Styles['search-input']}
      type="text"
      value={searchValue}
      placeholder={t`features_group_components_search_input_index_tq98cmscdb`}
      onChange={val => {
        setSearchValue(val)
      }}
      suffix={
        searchValue.length && (
          <Icon
            name="icon_chat_delete"
            onClick={() => {
              setSearchValue('')
            }}
          />
        )
      }
    />
  )
}
