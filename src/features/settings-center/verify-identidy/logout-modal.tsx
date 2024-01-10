import React, { useState, useRef, useEffect } from 'react'
import Icon from '@/components/icon'
import { Modal, Spin } from '@nbit/arco'
import { useUserStore } from '@/store/user'
import { link } from '@/helper/link'
import ChatAvatar from '@/components/chat-avatar'
import {
  getV1ImChatGroupQueryLordGroupApiRequest,
  postV1ImChatImUserInfoDestroyApiRequest,
} from '@/apis/settings-center'
import { YapiGetV1ImChatGroupQueryLordGroupListData } from '@/typings/yapi/ImChatGroupQueryLordGroupV1GetApi'
import { YapiPostV1ImChatImUserInfoDestroyApiRequest } from '@/typings/yapi/ImChatImUserInfoDestroyV1PostApi'
import { t } from '@lingui/macro'
import Styles from './logout-modal.module.css'

type LogoutModalProps = {
  visible: boolean
  verifyCode: string
  onCommit: () => void
}
const sureTxt = t`features_settings_center_verify_identidy_logout_modal_da0pfanyhk`

function LogoutModal({ visible, verifyCode, onCommit }: LogoutModalProps) {
  const { userInfo, clearUserCacheData } = useUserStore()
  const [queryLordGroup, setQueryLordGroup] = useState<YapiGetV1ImChatGroupQueryLordGroupListData[]>([])
  const [canOut, setCanOut] = useState(false)
  const getGroupApiRequest = () => {
    getV1ImChatGroupQueryLordGroupApiRequest({}).then(res => {
      if (res.isOk && res.data) {
        setCanOut(true)
        if (res.data.length) {
          setQueryLordGroup(res.data)
        } else {
          destroy()
        }
      }
    })
  }

  // 注销账号
  const destroy = () => {
    let data: YapiPostV1ImChatImUserInfoDestroyApiRequest
    if (userInfo.mobileNumber) {
      data = {
        mobileCountryCd: userInfo.mobileCountryCd,
        mobileNumber: userInfo.mobileNumber,
        verifyCode,
      }
    } else {
      data = {
        email: userInfo.email,
        verifyCode,
      }
    }
    postV1ImChatImUserInfoDestroyApiRequest(data).then(res => {
      if (res.isOk && res.data) {
        clearUserCacheData()
      }
    })
  }

  const handleOk = () => {
    if (queryLordGroup.length) {
      onCommit()
    } else {
      link('/login')
    }
  }
  useEffect(() => {
    getGroupApiRequest()
  }, [])
  return (
    <Modal
      className={Styles.popbox}
      closable={false}
      style={{ height: 'auto' }}
      title={<div style={{ textAlign: 'left' }}>{t`features_settings_center_account_security_index_kkqlfhbqu1`}</div>}
      visible={visible && canOut}
      okText={sureTxt}
      onOk={handleOk}
    >
      {queryLordGroup.length ? (
        <div className="chat-list">
          <p className="text-text_color_02 text-sm">{t`features_settings_center_verify_identidy_logout_modal_p99v97gjhc`}</p>
          <ul className="h-auto overflow-y-auto w-full list-box">
            {queryLordGroup.map(item => {
              return (
                <li className="flex justify-start h-10 items-center mt-4" key={item.groupId}>
                  <ChatAvatar size={40} className="rounded-img" src={item.headImage} />
                  <span className="text-base text-text_color_01 ml-3">{item.groupName}</span>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
      {!queryLordGroup.length && (
        <div className="flex items-center">
          <Icon name="icon_set_logout_successful" fontSize={20} className="text-brand_color" />
          <span className="text-lg text-text_color_01 ml-3">{t`features_settings_center_verify_identidy_logout_modal_yqxwa5wm8p`}</span>
        </div>
      )}
    </Modal>
  )
}

export default LogoutModal
