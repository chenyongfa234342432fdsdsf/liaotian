import classNames from 'classnames'
import { formatDate } from '@/helper/date'
import LazyImage from '@/components/lazy-image'
import Styles from './index.module.css'

export default function ListItem({ itemData, isActive }) {
  return (
    <div
      className={classNames(Styles['list-item'], {
        active: isActive,
      })}
    >
      <div className="item-info">
        <p className={classNames('item-title')}>
          <LazyImage src={itemData.logo} />
          {itemData.name}
        </p>
        <div className="text-text_color_02 mt-1">{formatDate(itemData.pushTimeStramp, 'HH:mm')}</div>
      </div>
    </div>
  )
}
