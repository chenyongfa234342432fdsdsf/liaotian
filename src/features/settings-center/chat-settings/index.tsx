import React, { useState } from 'react'
import Link from '@/components/link'
import { link } from '@/helper/link'
import { Switch, Message, Icon } from '@nbit/arco'
import { SoundSwitch, MessageSet } from '@/constants/setting'
import { useUserStore } from '@/store/user'
import { postV1ImChatImUserIndividualConfigurationApiRequest } from '@/apis/settings-center'
import { YapiPostV1ImChatImUserIndividualConfigurationApiRequest } from '@/typings/yapi/ImChatImUserIndividualConfigurationV1PostApi'
import { t } from '@lingui/macro'
import { postV1ImCommandCommandResetApiRequest } from '@/apis/command'
import MaskSecondConfirm from '@/features/group/components/masking-pop'
import ConfirmBtnPop from '@/features/group/components/comfirm-btn-pop'
import DisplayList from '../display-list'
import NavigationBar from '../navigation-bar'
import Styles from './index.module.css'

function ChatSettings() {
  const { imConfig, setImConfig, userInfo, setUserInfo } = useUserStore()
  const [newMessage, setNewMessage] = useState(imConfig.messageSet === MessageSet.OPEN)
  const [sound, setSound] = useState(imConfig.soundSwitch === SoundSwitch.OPEN)
  // const [video, setVideo] = useState(imConfig.videoCallBeauty === VideoSwitch.OPEN)
  const [isPop, setIsPop] = useState(false)

  // 个性化设置
  const configuration = (data: YapiPostV1ImChatImUserIndividualConfigurationApiRequest) => {
    postV1ImChatImUserIndividualConfigurationApiRequest(data).then(res => {
      if (res.isOk && res.data?.success) {
        const updatedImConfig = {
          ...imConfig,
          ...data,
        }
        setImConfig(updatedImConfig)
      }
    })
  }

  // 新消息通知
  const onChangeMessageSwitch = (value: boolean) => {
    setNewMessage(value)
    configuration({ messageSet: value ? MessageSet.OPEN : MessageSet.CLOSE })
  }

  // 声音开关
  const onChangeSoundSwitch = (value: boolean) => {
    setSound(value)
    configuration({ soundSwitch: value ? SoundSwitch.OPEN : SoundSwitch.CLOSE })
  }

  // 视频美颜
  // const onChangeVideoSwitch = (value: boolean) => {
  //   setVideo(value)
  //   const updatedImConfig = {
  //     ...imConfig,
  //     ...{ videoCallBeauty: value ? VideoSwitch.OPEN : VideoSwitch.CLOSE },
  //   }
  //   setImConfig(updatedImConfig)
  // }

  const commandReset = async () => {
    const res = await postV1ImCommandCommandResetApiRequest({})
    setUserInfo({ ...userInfo, command: null })
    setIsPop(false)

    const { isOk, data } = res || {}
    if (isOk && data?.success) {
      Message.success(t`features_settings_center_chat_settings_index_5ugd1dmfqf`)
    } else {
      Message.error(t`features_settings_center_chat_settings_index_grc9lej1sx`)
    }
  }
  return (
    <div className={Styles.scoped}>
      <NavigationBar label={t`features_settings_center_chat_settings_index_sa8qxgpqqy`} url="/settings-center" />
      <div className="set-box">
        <DisplayList label={t`features_settings_center_chat_settings_index_ajqshtudr2`}>
          <div className="flex justify-end items-center cursor-pointer">
            <Switch className="switch-bg" checked={newMessage} onChange={onChangeMessageSwitch} />
          </div>
        </DisplayList>
        <DisplayList label={t`features_settings_center_chat_settings_index_ejeihexdvg`}>
          <div className="flex justify-end items-center cursor-pointer">
            <Switch className="switch-bg" checked={sound} onChange={onChangeSoundSwitch} />
          </div>
        </DisplayList>
        {/* <DisplayList label={t`features_settings_center_chat_settings_index_panbapvd9_`}>
          <div className="flex justify-end items-center cursor-pointer">
            <Switch className="switch-bg" checked={video} onChange={onChangeVideoSwitch} />
          </div>
        </DisplayList> */}
        <DisplayList
          label={t`features_settings_center_chat_settings_index_dftcxqrikd`}
          style={{ marginTop: '10px', cursor: 'pointer' }}
          handleDiv={() => {
            setIsPop(true)
          }}
        >
          <Link className="flex justify-end items-center cursor-pointer" href="/devices">
            <Icon name="icon_chat_arrow" fontSize={16} className="arrow-icon" />
          </Link>
        </DisplayList>
        <DisplayList
          label={t`features_settings_center_chat_settings_index_ebnp43o2qa`}
          style={{ cursor: 'pointer' }}
          handleDiv={() => link('/black-list')}
        >
          <div className="flex justify-end items-center cursor-pointer">
            <Icon name="icon_chat_arrow" fontSize={16} className="arrow-icon" />
          </div>
        </DisplayList>
        {isPop && (
          <MaskSecondConfirm>
            {
              <ConfirmBtnPop
                title={t`features_settings_center_chat_settings_index_dftcxqrikd`}
                content={t`features_settings_center_chat_settings_index_h3_xsi7xi_`}
                confirmEvent={() => {
                  commandReset()
                }}
                cancelEvent={() => {
                  setIsPop(false)
                }}
              />
            }
          </MaskSecondConfirm>
        )}
      </div>
    </div>
  )
}

export default ChatSettings
