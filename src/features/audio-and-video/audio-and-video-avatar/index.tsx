import { Image } from '@nbit/arco'
import { oss_svg_image_domain_address } from '@/constants/oss'
import styles from './index.module.css'

// type VideosRef = {
//   openVideoModal: () => void
// }

type Props = {
  src?: string
  size?: number
  key?: string | number
  className?: string
}

export const defaultAvatarSrc = `${oss_svg_image_domain_address}icon_peer_default_avatar.png`

function AudioAndVideoAvatar(props: Props) {
  const { src, size, key, className } = props

  return (
    <div className={className} key={key}>
      <Image
        src={src || defaultAvatarSrc}
        width={size}
        height={size}
        className={className}
        preview={false}
        alt=""
        error={<img width={size} height={size} className={className} src={defaultAvatarSrc} alt="" />}
      />
    </div>
  )
}

export default AudioAndVideoAvatar
