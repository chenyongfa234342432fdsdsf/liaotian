import React, { useState, useRef, useEffect } from 'react'
import Icon from '@/components/icon'
import PopBox from '@/components/pop-box'
import {
  getV1ImChatImUserDeviceQueryListApiRequest,
  getV1ImChatImUserDeviceDeleteApiRequest,
} from '@/apis/settings-center'
import { YapiGetV1ImChatImUserDeviceQueryData } from '@/typings/yapi/ImChatImUserDeviceQueryListV1GetApi'
import { t } from '@lingui/macro'
import NavigationBar from '../navigation-bar'
import Styles from './index.module.css'

function Equipment({ handleDeleteClick, equipment, deviceKey }) {
  return (
    <div className="devices-item">
      <div className="devices-left">
        <p className="devices-name">{equipment.deviceName || ''}</p>
        <p className="devices-band">{equipment.deviceModel || ''}</p>
      </div>
      <div className="devices-right">
        {deviceKey === 0 && <span className="currently">{t`features_settings_center_devices_index_zsbhltoclp`}</span>}
        {deviceKey !== 0 && (
          <Icon
            name="icon_chat_delete1"
            fontSize={24}
            className="delete-icon"
            onClick={() => handleDeleteClick(equipment)}
          />
        )}
      </div>
    </div>
  )
}

function Devices() {
  const [visible, setVisible] = useState(false)
  const [deviceList, setDeviceList] = useState<YapiGetV1ImChatImUserDeviceQueryData[]>([])
  const [deviceNo, setDeviceNo] = useState('')

  const devicesQueryList = () => {
    getV1ImChatImUserDeviceQueryListApiRequest({}).then(async res => {
      if (res.isOk && res.data) {
        // 接口定义类型错误，只能写any了
        let _data: any = res.data
        setDeviceList(_data || [])
      }
    })
  }

  const deleteV1ImChatImUserDeviceDeleteApiRequest = () => {
    getV1ImChatImUserDeviceDeleteApiRequest({ deviceNo }).then(async res => {
      if (res.isOk && res.data?.success) {
        devicesQueryList()
        setVisible(false)
      }
    })
  }

  useEffect(() => {
    devicesQueryList()
  }, [])

  const hanleModalClose = () => {
    setVisible(false)
  }
  const handleCommit = () => {
    deleteV1ImChatImUserDeviceDeleteApiRequest()
  }
  const handleDeleteClick = equipment => {
    setDeviceNo(equipment.deviceNo)
    setVisible(true)
  }

  return (
    <>
      <div className={Styles.scoped}>
        <NavigationBar label={t`features_settings_center_account_security_index_cvvt11wwte`} url="/account-security" />
        <div className="devices-list">
          {deviceList.map((equipment, index) => (
            <Equipment handleDeleteClick={handleDeleteClick} equipment={equipment} deviceKey={index} key={index} />
          ))}
        </div>
      </div>
      <PopBox
        visible={visible}
        content={t`features_settings_center_devices_index_4g6pfdzakx`}
        onClose={hanleModalClose}
        onCommit={handleCommit}
      />
    </>
  )
}

export default Devices
