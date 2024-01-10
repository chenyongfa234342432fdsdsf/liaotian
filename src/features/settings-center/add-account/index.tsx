import Icon from '@/components/icon'
import { usePageContext } from '@/hooks/use-page-context'
import { Input, Message, Modal } from '@nbit/arco'
import { ISafetyVerificationProps, getBindAccountRoutePath } from '@/constants/my-wallet'
import { link } from '@/helper/link'
import { postBindGetThirdUserInfo, postV1ImChatImUserBindDeleteApiRequest } from '@/apis/settings-center/wallet'
import { useEffect, useState } from 'react'
import { useUserStore } from '@/store/user'
import { useCommonStore } from '@/store/common'
import decryption from '@/helper/ASE_RSA'
import { useRequest, useToggle } from 'ahooks'
import { getV1ImCommandGetUserCommandInfoApiRequest } from '@/apis/command'
import { t } from '@lingui/macro'
import commonModalStyles from '@/components/common-modal/index.module.css'
import { filterOnlyNumbers } from '@/helper/input'
import PasswordInput from '../change-password/password-input'
import NavigationBar from '../navigation-bar'
import styles from './index.module.css'
import SafetyVerification from '../safety-verification'

export default function AddAccount() {
  const ctx = usePageContext()
  const editingId = ctx.urlParsed?.search?.id ?? ''
  const editingUId = ctx.urlParsed?.search?.uid ?? ''
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const { userInfo } = useUserStore()
  const { businessId } = useCommonStore()
  const { data: commandData, loading } = useRequest(getV1ImCommandGetUserCommandInfoApiRequest, {
    ready: userInfo?.command,
  })
  const [thirdUserInfo, setThirdUserInfo] = useState<ISafetyVerificationProps | null>(null)

  useEffect(() => {
    if (editingUId) setUserId(editingUId)
  }, [editingUId])

  const handleClick = async () => {
    if (!userInfo?.command) {
      Message.info(t`features_settings_center_add_account_index_agb2q2z8le`)
      return
    }
    const pwd = decryption.monkeyEncrypt(password, true)
    const params = {
      uid: `${userInfo?.uid}`,
      thirdUid: Number(userId),
      thirdPassWord: pwd,
      ...(businessId && {
        businessId,
      }),
    }
    const res = await postBindGetThirdUserInfo(params)
    if (res.isOk && res.data) {
      setThirdUserInfo({
        ...res.data,
        thirdUid: Number(userId),
        thirdPassword: pwd,
        imUid: userInfo?.uid,
        imBusinessId: businessId,
        // 修改绑定账户时要传bindId
        ...(editingId && {
          bindId: editingId,
        }),
      })
    }
  }

  const handleDelete = async () => {
    Modal.confirm({
      title: t`features_settings_center_add_account_index_3hhv5im9oe`,
      content: t`features_settings_center_add_account_index_plfbnpmmhu`,
      closable: false,
      className: commonModalStyles.scoped,
      onOk: async () => {
        const res = await postV1ImChatImUserBindDeleteApiRequest({ bindId: editingId })
        if (res.isOk) {
          link(getBindAccountRoutePath())
        }
      },
    })
  }

  // 注册账号时跳转到口令页
  const navigateToCommand = () => {
    if (!userInfo?.command) {
      Message.info(t`features_settings_center_add_account_index_agb2q2z8le`)
      return
    }
    const targetUrl = commandData?.data?.linkUrl
    link(targetUrl, { target: true })
  }

  const handleInputUID = (val: string) => {
    setUserId(filterOnlyNumbers(val))
  }
  return thirdUserInfo ? (
    <SafetyVerification data={thirdUserInfo} />
  ) : (
    <div className={styles.scoped}>
      <NavigationBar
        label={
          editingId
            ? t`features_settings_center_add_account_index_doyv35cxms`
            : t`features_settings_center_bind_account_index_hmuz2srdow`
        }
        url={getBindAccountRoutePath()}
        extra={
          editingId ? <Icon onClick={handleDelete} className="delete-icon" name="icon_chat_messages_delete" /> : null
        }
      />
      <div className="flex-1 overflow-y-scroll">
        <div className="px-6 bg-card_bg_color_03 mb-6">
          <div className="border-b border-line_color_02 py-6">{commandData?.data?.commandName ?? '--'}</div>
          <div className="border-b border-line_color_02">
            <Input
              value={userId}
              onChange={handleInputUID}
              placeholder={t`features_settings_center_add_account_index__xyq0axfg6`}
            />
          </div>
          <PasswordInput
            placeholder={t`features_users_create_account_index_uqp_bpomjo`}
            type="password"
            onChange={setPassword}
          />
        </div>
        {!editingId ? (
          <div className="my-6 text-text_color_02 text-sm px-6">
            {t`features_settings_center_add_account_index_ztwxvuyyyn`}
            <span className="text-brand_color cursor-pointer" onClick={navigateToCommand}>
              {t`features_users_login_index_r_dc9gbbyo`}
            </span>
          </div>
        ) : null}
        {userId && password ? (
          <div
            onClick={handleClick}
            className="mb-6 text-2xl mx-auto w-11 h-11 rounded-full bg-brand_color flex items-center justify-center"
          >
            <Icon name="icon_chat_unread" className="submit-icon" />
          </div>
        ) : null}
      </div>
    </div>
  )
}
