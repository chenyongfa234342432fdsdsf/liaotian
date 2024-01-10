import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useMount } from 'ahooks'
import Link from '@/components/link'
import Icon from '@/components/icon'
import { Image, Button } from '@nbit/arco'
import CryptoJS from 'crypto-js'
import { oss_svg_image_domain_address } from '@/constants/oss'
import { useUserStore } from '@/store/user'
import { businessCountryInfo } from '@/apis/settings-center'
import { t } from '@lingui/macro'
import PersonalQrcode from './personal-qrcode'
import NavigationBar from '../navigation-bar'
import Styles from './index.module.css'

const AES = 'AES'
const PUBLIC_KEY = 'snra6h1yki7fvgzo'
const IV_PARAMETER = '46kd4xzguyt1xs3c'

interface BusinessCountry {
  businessId: number
  countryEnCode: string
  countryId: number
  countryName: string
  countryShortName: string
  createdById: string
  createdByTime: string
  enableInd: number
  id: number
  isDelete: number
  language: string
  updatedById: string
  updatedByTime: string
  version: number
}

interface EncryptAESProps {
  encryptString: string
}

export const encryptAES = ({ encryptString }: EncryptAESProps): string | null => {
  try {
    const raw = CryptoJS.enc.Utf8.parse(PUBLIC_KEY)
    const iv = CryptoJS.enc.Utf8.parse(IV_PARAMETER)

    const encrypted = CryptoJS.AES.encrypt(encryptString, raw, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })

    return encrypted.toString()
  } catch (e) {
    console.error(e)
    return null
  }
}

function MyQrcode(props, ref) {
  const { userInfo } = useUserStore()
  const [encryptedUrl, setEncryptedUrl] = useState('')
  const [bindCountry, setBindCountry] = useState('')
  const qrCodeRef = useRef<any>(null)

  // 查找国家名字，接口没有这个字段
  const getbusinessCountryInfo = () => {
    businessCountryInfo({}).then(res => {
      if (res.isOk && res.data) {
        const getArea = res.data.find(area => area.countryEnCode === userInfo.mobileCountryCd) as BusinessCountry
        if (getArea) {
          setBindCountry(getArea.countryName)
        }
      }
    })
  }

  const handleDownload = () => {
    if (qrCodeRef.current) {
      qrCodeRef.current.downloadQRCode() // 调用子组件暴露的方法
    }
  }

  useMount(async () => {
    const dataToEncrypt = {
      bundleId: '',
      type: '1',
      uid: userInfo.uid,
      name: userInfo.nickName,
    }
    // 使用 AES 加密对象

    const encryptedData: any = encryptAES({ encryptString: JSON.stringify(dataToEncrypt) })
    setEncryptedUrl(encryptedData)
  })

  useMount(() => {
    getbusinessCountryInfo()
  })
  return (
    <div className={Styles.scoped}>
      <NavigationBar label={t`features_settings_center_my_qrcode_index_g8zmlgrmra`} url="/settings-center" />
      <div className="qrode-box">
        <div className="user-box">
          <Image
            preview={false}
            width={70}
            className="headurl"
            src={userInfo.avatarPath ? userInfo.avatarPath : `${oss_svg_image_domain_address}defaultheadurl.png`}
          />
          <p className="user-name font-medium">{userInfo.nickName}</p>
          <p className="user-nation">{userInfo.bindCountry || bindCountry}</p>
        </div>
        <div className="qrcode-img">
          <PersonalQrcode value={encryptedUrl} ref={qrCodeRef} />
          <p className="tip">{t`features_settings_center_my_qrcode_index_gl_brstbj0`}</p>
          <Button type="default" long className="save-qrcode font-medium" onClick={handleDownload}>
            {t`features_messenger_chat_information_qr_code_index_77njplqrds`}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MyQrcode
