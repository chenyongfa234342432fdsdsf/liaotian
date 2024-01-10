import LazyImage, { Type } from '@/components/lazy-image'
import { ThemeEnum } from '@/constants/base'
import { oss_svg_image_domain_address } from '@/constants/oss'
import { useCommonStore } from '@/store/common'
import { t } from '@lingui/macro'

export function Empty() {
  return (
    <div className=" flex flex-col items-center border-t border-solid border-line_color_02">
      <LazyImage
        hasTheme
        alt="empty"
        className="mt-[120px]"
        width={180}
        height={180}
        imageType={Type.svg}
        src={`${oss_svg_image_domain_address}no_search_message_results`}
      />
      <div className="text-text_color_03 text-sm">{t`features_group_components_search_friend_index_eppdggih18`}</div>
    </div>
  )
}
