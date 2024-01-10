import { t } from '@lingui/macro'
import { oss_svg_image_domain_address } from '@/constants/oss'
import LazyImage from '@/components/lazy-image'
import { link } from '@/helper/link'
import { useLayoutStore } from '@/store/layout'
import styles from './index.module.css'

function RegistorHomePage() {
  const { businessName } = useLayoutStore().layoutProps || {}
  return (
    <div className={styles.scoped}>
      <div className="md:hidden  w-full flex justify-center text-white mt-[80px] text-2xl md:text-3xl">
        {t`features_user_operate_home_page_index_2zbxgtb22e`} {businessName}
      </div>
      <div className="registor-image">
        <LazyImage src={`${oss_svg_image_domain_address}registor/register-main.png`} />
      </div>
      <div className="hidden md:w-[430px] md:block md:mx-auto mt-10 text-white text-3xl">
        {t`features_user_operate_home_page_index_2zbxgtb22e`} {businessName}
      </div>
      <div className="go-to-registor" onClick={() => link('/register/create-account')}>
        {t`features_user_operate_home_page_index_y5vlbf66ug`}
      </div>
      <div className="go-to-login">
        {t`features_user_operate_create_account_index_k4d8i_wrxv`}
        <span className="text-[#1B79E7] cursor-pointer" onClick={() => link('/login')}>
          {t`features_chain_star_contact_info_index_e1yu85qr0v`}
        </span>
      </div>
    </div>
  )
}

export default RegistorHomePage
