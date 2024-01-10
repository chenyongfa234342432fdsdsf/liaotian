import { oss_svg_image_domain_address } from '@/constants/oss'
import { Icon } from '@nbit/arco'
import classNames from 'classnames'
import { RedPacketStatusEnum } from '@/plugins/im/constants'
import { t } from '@lingui/macro'
import style from './red-pocket-message.module.css'
import { useRedPacketInfo } from '../../red-envelope/use-package-info'

export function RedPocketInMessage(props: { id: number; isSelf: boolean; onClick: () => void }) {
  const { data } = useRedPacketInfo(props.id)
  const remark = data?.data?.remark || t`features_messenger_chat_message_custom_red_pocket_message_hflxvdk0jj`
  const isExpired = data?.data?.statusInd === RedPacketStatusEnum.expired
  const hasRemained = (data?.data?.residueAmount ?? 0) > 0
  const icon = !hasRemained
    ? `${oss_svg_image_domain_address}opened-red-packet-icon.svg`
    : `${oss_svg_image_domain_address}red-packet-icon.svg`
  const withShadow = isExpired || !hasRemained
  const bgImg = props.isSelf
    ? `${oss_svg_image_domain_address}got-red-packet-message.svg`
    : `${oss_svg_image_domain_address}message-red-packet.svg`
  const fgImg = props.isSelf
    ? `${oss_svg_image_domain_address}send-red-packet-message-front-img.svg`
    : `${oss_svg_image_domain_address}got-red-packet-message-front-img.svg`
  return (
    <div className={classNames('relative')} role="button" tabIndex={0} onClick={props.onClick}>
      <div
        style={{
          backgroundImage: `url(${bgImg})`,
        }}
        className={classNames('relative', style['red-packet-message'], props.isSelf ? 'mr-[-6px]' : 'ml-[-6px]', {
          opened: !hasRemained || isExpired,
        })}
      >
        <div className="content">
          <img alt="red packet" src={icon} className={classNames('icon shrink-0')} />
          <div className="text-box text-ellipsis overflow-hidden whitespace-nowrap">
            <div className="title">{remark}</div>
            <div
              className={classNames('status', {
                'with-shadow': withShadow,
              })}
            >
              {hasRemained ? '' : t`features_messenger_chat_message_custom_red_pocket_message_c5sdqtfpqv`}
            </div>
          </div>
        </div>
        <div
          className={classNames('payment', {
            'with-shadow': withShadow,
          })}
        >
          {isExpired
            ? t`features_messenger_chat_message_custom_red_pocket_message_uqobfipajg`
            : t`features_messenger_chat_message_custom_red_pocket_message_panqdkltlw`}
        </div>
      </div>
      {(!hasRemained || isExpired) && (
        <div
          className={classNames(props.isSelf ? 'mr-[-6px]' : 'ml-[-6px]')}
          style={{
            backgroundImage: `url(${fgImg})`,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        ></div>
      )}
    </div>
  )
}
