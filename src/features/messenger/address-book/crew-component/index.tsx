import { ReactNode } from 'react'
import Highlighter from 'react-highlight-words'
import Icon from '@/components/icon'
import ChatAvatar from '@/components/chat-avatar'
import styles from './index.module.css'

interface ICrew {
  img?: string
  icon?: string
  crewName: string
  searchValue?: string
  right?: ReactNode
  line?: boolean
}
function Crew(props: ICrew) {
  const { crewName, right, searchValue = '', line = true, img, icon = 'icon_address_book_new_friend' } = props
  return (
    <div className={styles.crew}>
      <div className="nav-item">
        <div className="nav-item-left">
          <div className="nav-ico-box">
            <ChatAvatar size={48} src={img} />
            {/* {img ? <img src={img} alt="" /> : <Icon name={icon} fontSize={24} className="icon-color" />} */}
          </div>
          <div className="nav-text">
            {
              <Highlighter
                caseSensitive={false}
                highlightClassName="highlighted"
                searchWords={[searchValue]}
                autoEscape
                textToHighlight={crewName}
              />
            }
          </div>
        </div>
        <div className="nav-item-right">{right}</div>
      </div>
      {line && <div className="line"></div>}
    </div>
  )
}

export default Crew
