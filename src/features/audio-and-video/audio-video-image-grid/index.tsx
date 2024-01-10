import React, { ReactNode } from 'react'
import styles from './index.module.css'

export interface Props {
  children: ReactNode | ReactNode[]
  defaultIndex?: number
}
function AudioVideoImageGrid({ children }) {
  const imgList = React.Children.toArray(children).filter(item => item !== ' ')
  return (
    <div className={styles['audio-video-image-grid']}>
      {imgList.map((item, index) => (
        <div key={index} className="audio-video-image-grid-item">
          {item}
        </div>
      ))}
    </div>
  )
}

export default AudioVideoImageGrid
