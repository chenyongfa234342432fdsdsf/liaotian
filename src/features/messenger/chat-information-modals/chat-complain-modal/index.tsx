import { Button, Input, Message, Modal, Upload } from '@nbit/arco'
import { awsS3UploadFile } from '@/plugins/aws-s3/utils'
import { useEffect, useState } from 'react'
import { AwsS3FolderModuleName, AwsS3FolderModuleUseCaseName } from '@/plugins/aws-s3/constants'
import { postV1ImChatComplaintCreateApiRequest } from '@/apis/settings-center'
import { useImStore } from '@/store/im'
import { ZIMConversationType } from '@/plugins/im/constants'
import { t } from '@lingui/macro'
import Icon from '@/components/icon'
import styles from './index.module.css'

const TextArea = Input.TextArea

function ChatComplainModal({ visible, setvisible }: { visible: boolean; setvisible: (state: boolean) => void }) {
  const [files, setfiles] = useState<File[]>()
  const [inputText, setinputText] = useState('')
  const { currentConversation } = useImStore()

  const handleSubmit = async () => {
    if (!currentConversation?.conversationID) return
    const toUploadFiles =
      files?.map(file =>
        awsS3UploadFile(file, AwsS3FolderModuleName.im, AwsS3FolderModuleUseCaseName.complain_application)
      ) || []

    const res = (await Promise.all(toUploadFiles))?.map(each => each?.url)

    const submitRes = await postV1ImChatComplaintCreateApiRequest({
      complaintType:
        currentConversation.type === ZIMConversationType.Group ? ZIMConversationType.Group : ZIMConversationType.Room,
      complaintReason: inputText,
      complaintImage: res.join(','),
      ...(currentConversation.type === ZIMConversationType.Group
        ? {
            complaintGroupId: currentConversation.conversationID,
          }
        : {
            complaintUid: Number(currentConversation.conversationID),
          }),
    })

    if (submitRes.isOk && submitRes.data?.success) {
      Message.success(t`features_messenger_chat_information_modals_chat_complain_modal_index_vypvbrvdtg`)
      setinputText('')
      setfiles(undefined)
      setvisible(false)
    } else Message.error(t`features_messenger_chat_information_modals_chat_complain_modal_index_9xd4v0bewm`)
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
      title={t`features_messenger_chat_chat_header_more_vegbnukvgl`}
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
        <TextArea
          placeholder={t`features_messenger_chat_information_modals_chat_complain_modal_index_o3udar1f4e`}
          onChange={setinputText}
          showWordLimit
          maxLength={200}
        />
        <div className="text-base text-text_color_01 mt-6">{t`features_messenger_chat_information_modals_chat_complain_modal_index_2fq23veoy8`}</div>
        <div className="text-text_color_02 text-xs mb-3">
          {t`features_messenger_chat_information_modals_chat_complain_modal_index_kqg5woa3og`}
        </div>
        <Upload
          multiple
          limit={5}
          action="/"
          accept="image/jpg, image/png, image/jpeg"
          listType="picture-card"
          showUploadList={{
            removeIcon: (
              <div className="remove-icon-container">
                <Icon className="remove-icon" name={'icon_chat_delete'} />
              </div>
            ),
            previewIcon: undefined,
          }}
          beforeUpload={files => {
            return new Promise(resolve => {
              if (files.size > 5 * 1024 * 1024) {
                Message.error(t`features_messenger_chat_information_modals_chat_complain_modal_index_0laoynxf80`)
                resolve(false)
              } else {
                resolve(true)
              }
            })
          }}
          onChange={(fileList, file) => {
            const files = fileList?.map(file => file?.originFile)
            files && setfiles(files as any)
          }}
        />
      </div>
    </Modal>
  )
}

export default ChatComplainModal
