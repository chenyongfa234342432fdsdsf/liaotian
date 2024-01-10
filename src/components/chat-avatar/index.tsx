import { Image } from '@nbit/arco'
import classNames from 'classnames'
import { oss_svg_image_domain_address } from '@/constants/oss'
import Icon from '../icon'
import styles from './index.module.css'

export type IChatAvatarProps = {
  src?: string
  isGroup?: boolean
  size: number
  className?: string
  /** 当加载失败时图标离左右总边距 */
  padding?: number
}

/** 聊天头像 */
function ChatAvatar(props: IChatAvatarProps) {
  const defaultImageSrc = `${oss_svg_image_domain_address}${
    props.isGroup ? 'icon_group_default_avatar' : 'icon_peer_default_avatar'
  }.png`
  const defaultIconImage = (
    <img width={props.size} height={props.size} className="rounded-full avatar-img" src={defaultImageSrc} alt="" />
  )
  let src = props.src
  if (!src || src === 'null') {
    src = defaultImageSrc
  }
  return (
    <div
      className={classNames(styles['chat-avatar-wrapper'], props.className)}
      style={{
        width: props.size,
        height: props.size,
      }}
    >
      <Image
        width={props.size}
        height={props.size}
        preview={false}
        className="rounded-full avatar-img"
        error={defaultIconImage}
        src={src}
        alt=""
      />
    </div>
  )
}

export default ChatAvatar
