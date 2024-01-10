import { ReactNode } from 'react'
import Icon from '@/components/icon'
import styles from './index.module.css'

interface ICrew {
  titleText: string
  right?: ReactNode
  leftIcon?: ReactNode
  onLeftIconClick?: () => void
}
function NavComponent(props: ICrew) {
  const {
    titleText,
    right,
    leftIcon = <Icon name="a-Notselected" />,
    onLeftIconClick = () => {
      window.history.back()
    },
  } = props
  return (
    <div className={`${styles['address-book-nav']} nav-component`}>
      <div className="foot-box">
        <div className="nav-left flex">
          <div
            className="cdup"
            onClick={() => {
              onLeftIconClick()
            }}
          >
            {leftIcon}
          </div>
          <div className="page-title ml-6">{titleText}</div>
        </div>
        <div className="nav-right">{right}</div>
      </div>
    </div>
  )
}

export default NavComponent
