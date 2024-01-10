import LazyImage from '@/components/lazy-image'
import { useImStore } from '@/store/im'
import { Button } from '@nbit/arco'
import { useMount, useRequest } from 'ahooks'
import { getV1ImChatGroupInfoApiRequest } from '@/apis/group'
import { useEffect, useRef, useState } from 'react'
import { oss_svg_image_domain_address } from '@/constants/oss'
import dayjs from 'dayjs'
import { t } from '@lingui/macro'
import ChatAvatar from '@/components/chat-avatar'
import { useGetGroupInfoDetails } from '@/hooks/group/chat-group'
import { encryptAES } from '@/features/settings-center/my-qrcode'
import PersonalQrcode from '@/features/settings-center/my-qrcode/personal-qrcode'
import styles from './index.module.css'

function GroupQrCode() {
  const { currentConversation } = useImStore() || {}
  const { conversationAvatarUrl = '', conversationName, conversationID } = currentConversation || {}

  const [encryptedUrl, setEncryptedUrl] = useState('')

  const { details } = useGetGroupInfoDetails()

  const { headImage, groupName } = details?.groupData || {}

  useMount(async () => {
    const dataToEncrypt = {
      bundleId: '',
      type: '2',
      uid: conversationID,
      name: conversationName,
    }
    // 使用 AES 加密对象

    const encryptedData: any = encryptAES({ encryptString: JSON.stringify(dataToEncrypt) })
    setEncryptedUrl(encryptedData)
  })

  const qrCodeRef = useRef<any>(null)
  const handleDownload = () => {
    if (qrCodeRef.current) {
      qrCodeRef.current.downloadQRCode() // 调用子组件暴露的方法
    }
  }

  return (
    <div className={styles['group-qr-code']}>
      <ChatAvatar size={70} src={headImage} />
      <div className="text-base text-text_color_01 mb-6">{groupName}</div>
      <PersonalQrcode value={encryptedUrl} ref={qrCodeRef} />
      <div className="text-text_color_02 text-xs mt-6 mb-10">
        {t({
          id: 'features_messenger_chat_information_qr_code_index_75kguo8yzm',
          values: { 0: dayjs().add(7, 'days').format('YYYY-MM-DD') },
        })}
      </div>
      <Button type={'primary'} onClick={() => handleDownload()}>
        {t`features_messenger_chat_information_qr_code_index_77njplqrds`}
      </Button>
    </div>
  )
}

export default GroupQrCode
