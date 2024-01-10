import classNames from 'classnames'
import { ReactNode } from 'react'
import { isAbsoluteUrl } from '@/helper/common'
import { removeLocale } from '@/helper/i18n'
import { isPlatformDeskTop } from '@/helper/env'

export type ILinkProps = {
  href: string
  children: ReactNode
  prefetch?: boolean
  className?: string
  /** 打开新页面 */
  target?: boolean
}

/**
 *
 * @param param prefetch:是否预获取资源
 * @returns
 */
function Link({ href, children, prefetch, className, target }: ILinkProps) {
  const lang = ''
  const sanitisedHref = removeLocale(href) || ''
  let _herf = `${lang}${sanitisedHref}`
  let _target = target ? '_blank' : '_self'

  // 防止后端设置为 null
  if (!href) _herf = ''
  if (isAbsoluteUrl(href)) {
    _herf = href
    if (isPlatformDeskTop) {
      _target = '_blank'
    }
  }

  return (
    <a href={_herf} target={_target} className={classNames('navigation-link', className)}>
      {children}
    </a>
  )
}
export default Link
