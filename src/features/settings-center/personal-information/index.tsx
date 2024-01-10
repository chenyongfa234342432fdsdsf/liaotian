import { useState } from 'react'
import Icon from '@/components/icon'
import { usePageContext } from '@/hooks/use-page-context'
import { useMount } from 'ahooks'
import { link } from '@/helper/link'
import { Button, Image, Message } from '@nbit/arco'
import { popBoxConfirmWithLoading } from '@/components/pop-box'
import UploadAvatarWithCrop from '@/components/upload-avatar-with-crop'
import { useUserStore } from '@/store/user'
import { editUserInfo, getloginOut } from '@/apis/settings-center'
import { YapiPostV1ImChatImUserInfoEditUserInfoApiRequest } from '@/typings/yapi/ImChatImUserInfoEditUserInfoV1PostApi'
import { t } from '@lingui/macro'
import NavigationBar from '../navigation-bar'
import TextInput from '../text-input'

import Styles from './index.module.css'

function PersonalInformation() {
  const pageContext = usePageContext()
  const { userInfo, setUserInfo, clearUserCacheData } = useUserStore()
  const [headImg, setHeadImg] = useState('')
  const { redirect } = pageContext.urlParsed.search

  const publicEditUserInfo = (data: YapiPostV1ImChatImUserInfoEditUserInfoApiRequest) => {
    editUserInfo(data).then(res => {
      if (res.isOk && res.data) {
        const updatedUserInfo = {
          ...userInfo,
          ...data,
        }
        setUserInfo(updatedUserInfo)
        Message.success(t`features_settings_center_payment_password_index_d33sm6ilif`)
      }
    })
  }

  const handleHeadImgChange = newHeadImg => {
    setHeadImg(newHeadImg)
    publicEditUserInfo({ avatarPath: newHeadImg })
  }
  const handlenickName = (value: string) => {
    publicEditUserInfo({ nickName: value })
  }
  const handlePersonalSignature = (value: string) => {
    publicEditUserInfo({ personalSignature: value })
  }

  // 退出
  const handleSignOut = () => {
    return popBoxConfirmWithLoading({
      content: t`features_settings_center_personal_information_index_vuoskknpxb`,
      onCommit: async () => {
        const res = await getloginOut({})
        if (res.isOk) {
          clearUserCacheData()
          link('/login')
        }
      },
    })
  }

  useMount(() => {
    setHeadImg(userInfo.avatarPath)
  })
  return (
    <div className={Styles.scoped}>
      <NavigationBar label={t`features_settings_center_personal_information_index_rxdpee9x1l`} url={redirect} />
      <div className="pensonl-box">
        <div className="personal">
          <UploadAvatarWithCrop oldHeadImg={headImg} onHeadImgChange={handleHeadImgChange} />
        </div>
        <TextInput
          label={t`features_settings_center_personal_information_index_m8pf1yq1ee`}
          maxLength={10}
          editable
          onConfirm={handlenickName}
          defaultValue={userInfo.nickName}
          placeholder={t`features_settings_center_personal_information_index_6h1kc4tgkf`}
          style={{ marginBottom: '24px' }}
        />
        <TextInput
          label={t`features_settings_center_personal_information_index_4sbsiya1gg`}
          maxLength={20}
          editable={false}
          defaultValue={userInfo.mobileNumber ? `${userInfo.mobileCountryCd}-${userInfo.mobileNumber}` : ''}
          style={{ marginBottom: '24px' }}
        />
        <TextInput
          label={t`features_settings_center_personal_information_index_suyk940elg`}
          maxLength={20}
          editable={false}
          defaultValue={userInfo.email}
          style={{ marginBottom: '24px' }}
        />
        <TextInput
          label={t`features_settings_center_personal_information_index_v2nmegx2ft`}
          maxLength={20}
          editable
          onConfirm={handlePersonalSignature}
          defaultValue={userInfo.personalSignature}
          placeholder={t`features_settings_center_personal_information_index_nwjdukpjtz`}
          style={{ marginBottom: '32px' }}
        />
        <Button type="default" long className="buttonlong" onClick={handleSignOut}>
          {t`features_settings_center_personal_information_index_ozickjsrtu`}
        </Button>
      </div>
    </div>
  )
}

export default PersonalInformation
