import Icon from '@/components/icon'
import { useUserStore } from '@/store/user'
import { t } from '@lingui/macro'
import Styles from './binding-success.module.css'

function BindingSuccess() {
  const { userInfo } = useUserStore()
  return (
    <div className={Styles.bindsuccess}>
      <div className="success-icon">
        <Icon name="icon_set_binding_number1" fontSize={26} className="mobile-icon" />
      </div>
      <p className="success-label">{t`features_settings_center_bind_mobile_binding_success_ejh2f4d2gq`}</p>
      <h3>
        +{userInfo.mobileCountryCd} {userInfo.mobileNumber}
      </h3>
    </div>
  )
}
export default BindingSuccess
