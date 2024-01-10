import { ReactNode } from 'react'
import Icon from '@/components/icon'
import { useNewFriendStore } from '@/store/new-friend'
import styles from './index.module.css'

interface ICrew {
  // icon: string
  titleText: string
  right?: ReactNode
}
function AddressBookNav(props: ICrew) {
  const { titleText, right } = props
  const { setOff } = useNewFriendStore()

  return (
    <div className={styles['address-book-nav']}>
      <div className="foot-box">
        <div className="nav-left flex">
          <div
            className="cdup"
            onClick={() => {
              window.history.back()
              setOff(true)
            }}
          >
            <Icon name="a-Notselected" />
          </div>
          <div className="page-title ml-6">{titleText}</div>
        </div>
        <div className="nav-right">{right}</div>
      </div>
    </div>
  )
}

export default AddressBookNav
