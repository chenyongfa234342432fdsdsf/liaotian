import React, { CSSProperties } from 'react'
import Styles from './index.module.css'

type ListProps = {
  children: React.ReactNode
  label: string
  style?: CSSProperties
  handleDiv?: () => void
}

function DisplayList({ children, label, style, handleDiv }: ListProps) {
  return (
    <div className={Styles.scoped} style={style}>
      <div className="listbox" onClick={handleDiv}>
        <span className="list-label">{label}</span>
        <div className="flex-1 h-full items-center flex justify-end">{children}</div>
      </div>
    </div>
  )
}

export default DisplayList
