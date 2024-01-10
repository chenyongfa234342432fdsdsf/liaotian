import Icon from '@/components/icon'
import Link from '@/components/link'
import { YapiGetV1ImDiscoverGetDiscoverListData } from '@/typings/yapi/ImDiscoverGetDiscoverListV1GetApi'
import classNames from 'classnames'
import { useState } from 'react'

interface ICardList {
  item: YapiGetV1ImDiscoverGetDiscoverListData
}

function CardList(props: ICardList) {
  const { columnName, columnIcon, list } = props.item
  const [error, setError] = useState(true)
  const [errorIcon, setErrorIcon] = useState(true)

  const handleImageError = () => {
    setError(false)
    // 可以在加载失败时更新图片地址，或者显示备用的图片
    // setImageSrc('备用图片地址');
  }
  const handleIconError = () => {
    setErrorIcon(false)
  }
  return (
    <div className="list-box">
      <div className="column-name">
        {columnName}
        {error && <img src={columnIcon} alt="" onError={handleImageError} />}
      </div>

      <div className="list">
        {list?.map(item => {
          return (
            <Link key={item.discoverTitle} href={item.linkUrl || ''} target className="list-items">
              <div className={classNames('img', !errorIcon && 'img-error')}>
                {errorIcon ? (
                  <img src={item.discoverIcon} alt="" onError={handleIconError} />
                ) : (
                  <Icon name="icon_found_load_fail" className="error-icon" />
                )}
              </div>
              <div className="text">{item.discoverTitle}</div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
export default CardList
