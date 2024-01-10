import React from 'react'
import Link from '@/components/link'
import Icon from '@/components/icon'
import Styles from './index.module.css'

interface NavigationBarProps {
  label: string
  url: string
  extra?: string | React.ReactNode
}

function NavigationBar({ label, url, extra }: NavigationBarProps) {
  return (
    <div className={Styles.scoped}>
      <div className="head-box">
        <Link href={url}>
          <Icon name="a-Notselected" fontSize={24} className="back-icon" />
        </Link>
        <span>{label}</span>
      </div>
      {extra}
    </div>
  )
}

export default NavigationBar
