import classNames from 'classnames'
import styles from './user-layout.module.css'

export function UserLayout({ children }) {
  return (
    <div className={styles['messenger-layout-wrapper']}>
      <div className="messenger-bg">
        <div className="bg-brand_color brand-bar"></div>
        <div className="flex-1 bg-button_animate"></div>
      </div>
      <div className="layout-contetn-wrapper">
        <div className="messenger-center">{children}</div>
      </div>
    </div>
  )
}
