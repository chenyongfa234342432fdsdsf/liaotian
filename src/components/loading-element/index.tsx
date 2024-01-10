import { oss_svg_image_domain_address } from '@/constants/oss'
import { envIsServer, isMerchant } from '@/helper/env'
import { createPortal } from 'react-dom'
import classNames from 'classnames'
import DynamicLottie from '../dynamic-lottie'
import styles from './index.module.css'

let jsonData = isMerchant ? 'loading-business' : 'loading'

function transformJsonData(data) {
  data.assets[0].u = oss_svg_image_domain_address
  data.assets[0].p = `default-loading.png`

  return data
}

function LoadingElement() {
  const isMergeMode = false
  return (
    <div>
      <DynamicLottie
        animationData={jsonData}
        loop
        style={isMergeMode ? { width: '100px', height: '100px' } : { width: '30px', height: '30px' }}
      />
    </div>
  )
}
export function ScreenLoading({ className = '', mask = false }) {
  if (envIsServer) {
    return null
  }
  return createPortal(
    <div
      className={classNames(
        styles['full-screen-loading'],
        {
          'with-mask': mask,
        },
        className
      )}
    >
      <LoadingElement />
    </div>,
    document.body
  )
}

export default LoadingElement
