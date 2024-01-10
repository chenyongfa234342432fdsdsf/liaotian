import { Button, Input, Message, Modal, Upload } from '@nbit/arco'
import { awsS3UploadFile } from '@/plugins/aws-s3/utils'
import { useEffect, useState } from 'react'
import { AwsS3FolderModuleName, AwsS3FolderModuleUseCaseName } from '@/plugins/aws-s3/constants'
import { postV1ImChatComplaintCreateApiRequest } from '@/apis/settings-center'
import { t } from '@lingui/macro'
import { YapiGetV1ImChatFriendApplyListData } from '@/typings/yapi/ImChatFriendApplyListV1GetApi'
import styles from './index.module.css'

const TextArea = Input.TextArea

function UserComplain({
  visible,
  setvisible,
  userInfo,
}: {
  visible: boolean
  setvisible: (state: boolean) => void
  userInfo: YapiGetV1ImChatFriendApplyListData
}) {
  const [files, setfiles] = useState<File[]>()
  const [inputText, setinputText] = useState('')
  // 做出判断是否为主动添加，取不同的id
  let uid
  if (userInfo.initiativeAdd) {
    uid = userInfo.targetUid
  } else {
    uid = userInfo.uid
  }
  const handleSubmit = async () => {
    const toUploadFiles =
      files?.map(file =>
        awsS3UploadFile(file, AwsS3FolderModuleName.im, AwsS3FolderModuleUseCaseName.complain_application)
      ) || []

    const res = await Promise.all(toUploadFiles)

    const submitRes = await postV1ImChatComplaintCreateApiRequest({
      complaintType: 1,
      complaintReason: inputText,
      complaintImage: res.join(','),
      complaintUid: uid,
    })

    if (submitRes.isOk && submitRes.data?.success) {
      setisVisible(false)
      Message.success(t`features_messenger_chat_information_modals_chat_complain_modal_index_vypvbrvdtg`)
    } else {
      setisVisible(false)
      Message.error(t`features_messenger_chat_information_modals_chat_complain_modal_index_9xd4v0bewm`)
    }
  }

  const [isVisible, setisVisible] = useState(visible)

  useEffect(() => {
    setisVisible(visible)
  }, [visible])

  useEffect(() => {
    setvisible(isVisible)
  }, [isVisible])

  return (
    <Modal
      autoFocus={false}
      closable={false}
      className={styles['chat-complain-model']}
      visible={visible}
      onCancel={() => setisVisible(false)}
      title={t`features_messenger_chat_chat_header_more_qwqejeixxl`}
      footer={() => (
        <>
          <Button className={'ml-auto'} type="outline" onClick={() => setisVisible(false)}>
            {t`features_group_components_comfirm_btn_pop_index_2sr1guu0iy`}
          </Button>
          <Button onClick={() => handleSubmit()} type="primary">
            {t`features_messenger_chat_information_modals_chat_complain_modal_index_njx6ip3sh8`}
          </Button>
        </>
      )}
    >
      <div>
        <span className="text-base text-text_color_01">{t`features_messenger_chat_information_modals_chat_complain_modal_index_t4sy5xghsn`}</span>
        <TextArea onChange={setinputText} showWordLimit maxLength={200} />
        <div className="text-base text-text_color_01 mt-6">{t`features_messenger_chat_information_modals_chat_complain_modal_index_2fq23veoy8`}</div>
        <div className="text-text_color_02 text-xs mb-3">
          {t`features_messenger_chat_information_modals_chat_complain_modal_index_kqg5woa3og`}
        </div>
        <Upload
          multiple
          limit={5}
          action="/"
          listType="picture-card"
          onChange={(fileList, file) => {
            const files = fileList?.map(file => file?.originFile)
            files && setfiles(files as any)
          }}
        />
      </div>
    </Modal>
  )
}

export default UserComplain
