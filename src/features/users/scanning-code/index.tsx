import { useState, useRef, useEffect } from 'react'
import { useMount } from 'react-use'
import { useUserStore } from '@/store/user'
import { useCountDown, useRequest, useUnmount } from 'ahooks'
import { Message, Button } from '@nbit/arco'
import { QRCodeCanvas } from 'qrcode.react'
import { postImChatLoginScan, postImChatLoginGenerateQrcodeTokenApiRequest } from '@/apis/login'
import { YapiPostV1ImChatLoginScanApiResponse } from '@/typings/yapi/ImChatLoginScanV1PostApi.d'
import { t } from '@lingui/macro'
import { getBrowser, getOperationSystem, IsAccountType, FormValuesTrim } from '../utils/common'
import styles from './index.module.css'

interface ScanningCodeProps {
  onLoginSuccess: (data: YapiPostV1ImChatLoginScanApiResponse) => void
}

interface IQrCodeLoginInfo {
  /** 登录信息 */
  loginInfo: string
  /** 验证扫码登录 */
  qrCode: string
}

function ScanningCode({ onLoginSuccess }: ScanningCodeProps) {
  const store = useUserStore()
  const qrCodeLoginInfo = useRef<IQrCodeLoginInfo>()
  const [qrcodeInfo, setQrCodeInfo] = useState<IQrCodeLoginInfo>()
  const [targetDate, setTargetDate] = useState<number>()
  const [qrcodeShow, setQrCodeShow] = useState<boolean>(true)
  const [qrcodeButtonDisabled, setQrcodeButtonDisabled] = useState<boolean>(false)
  const [qrCodeLoginText, setQrCodeLoginText] = useState<string>(t`features_users_scanning_code_index_vd_88zqyyf`)
  const { tokenTtl } = store.personalCenterSettings

  const haveTheQrCodeLogin = async () => {
    const res = await postImChatLoginScan({ qrCode: qrCodeLoginInfo.current?.qrCode || '', tokenTtl })
    if (res.isOk && res.data) {
      if (res.data.token === null && !res.data.isWaiting) {
        setQrcodeButtonDisabled(true)
        setQrCodeShow(false)
        setQrCodeLoginText(t`features_users_scanning_code_index_ei2p1q7nox`)
        return
      }

      if (res.data.token) {
        onLoginSuccess(res.data)
      }
    }
  }

  const getQrCode = async () => {
    const browser = getBrowser()
    const system = getOperationSystem()
    const deviceName = `${browser} (${system})`
    const res = await postImChatLoginGenerateQrcodeTokenApiRequest({ deviceName })
    if (res.isOk) {
      const qrCodeLoginData = res.data as IQrCodeLoginInfo
      qrCodeLoginInfo.current = qrCodeLoginData
      setQrCodeInfo(qrCodeLoginData)
    }
  }

  const { run, cancel } = useRequest(haveTheQrCodeLogin, {
    pollingInterval: 5000,
    pollingWhenHidden: false,
    manual: true,
  })

  useCountDown({
    leftTime: targetDate,
    onEnd: () => {
      setQrCodeLoginText(t`features_users_scanning_code_index_layjerikyp`)
      setQrcodeButtonDisabled(false)
      setQrCodeShow(false)
      setTargetDate(0)
      cancel()
    },
  })

  const handleCountDown = async () => {
    await getQrCode()
    setQrCodeLoginText(t`features_users_scanning_code_index_layjerikyp`)
    setQrCodeShow(true)
    setTargetDate(90 * 1000)
    run()
  }

  useMount(handleCountDown)
  return (
    <div className={styles['login-scanning-code']}>
      <div className="qcode-box">
        <div className="qcrode">
          <QRCodeCanvas style={{ width: '100%', height: '100%' }} value={qrcodeInfo?.loginInfo || ''} />
          {!qrcodeShow && (
            <>
              <div className="mask"></div>
              <div className="refresh">
                <Button type="primary" onClick={handleCountDown} disabled={qrcodeButtonDisabled}>
                  {qrCodeLoginText}
                </Button>
              </div>
            </>
          )}
        </div>
        <h3 className="text-base font-medium text-text_color_01 mt-4">{t`features_users_scanning_code_index_2s67qlrbhh`}</h3>
        <p className="text-sm text-text_color_02 mt-2 text-center">
          <span className="text-brand_color">
            {t`features_users_scanning_code_index_0wwrl_rml9`} {t`features_users_scanning_code_index_zabp9sb8wn`}
          </span>
          {t`features_users_scanning_code_index_mrqwxknzjc`}
        </p>
      </div>
    </div>
  )
}

export default ScanningCode
