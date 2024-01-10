import Icon from '@/components/icon'
import { Dropdown, Menu, Upload } from '@nbit/arco'
import { useState } from 'react'
import classNames from 'classnames'
import type { UploadItem } from '@nbit/arco/es/Upload'
import { useImStore } from '@/store/im'
import { sendMediaMessage } from '@/helper/message'
import { useMessengerStore } from '@/store/messenger'
import { t } from '@lingui/macro'
import { isEmpty } from 'lodash'
import styles from './input-more.module.css'
import { RedPackets } from '../red-packet/send-red-packets'
import { uploadImagesPopBox } from '../chat-upload-modal'

function useSendFileMessage() {
  const { chatMessagesScrollIntoBottom } = useMessengerStore()
  const { currentConversation } = useImStore()
  return async (files: UploadItem[]) => {
    const file = files[0]!.originFile!
    sendMediaMessage(file, currentConversation!)
    chatMessagesScrollIntoBottom()
  }
}

export function useBatchSendFileMessage() {
  const { chatMessagesScrollIntoBottom } = useMessengerStore()
  const { currentConversation } = useImStore()
  return async (files: File[]) => {
    Promise.all(files?.map(file => sendMediaMessage(file, currentConversation!)))
    chatMessagesScrollIntoBottom()
  }
}

// 更多选项
export function InputMore({
  fileUpload,
  onlyPhotoAlbum,
  allowMultipleUploads = true,
}: {
  fileUpload: ReturnType<typeof useBatchSendFileMessage>
  onlyPhotoAlbum?: boolean
  allowMultipleUploads?: boolean
}) {
  const [opened, setOpened] = useState(false)
  const batchFileUpload = fileUpload // useBatchSendFileMessage()
  const [sendRedPacketVisible, setSendRedPacketVisible] = useState(false)
  const { currentConversation } = useImStore()
  const { conversationName = '' } = currentConversation || {}

  // flag to prevent multiple upload popup modal
  let hasUploaded = false

  return (
    <div
      className={classNames(styles['input-more-wrapper'], {
        'is-opened': opened,
      })}
    >
      <Dropdown
        popupVisible={opened}
        onVisibleChange={setOpened}
        unmountOnExit={false}
        droplist={
          <Menu
            onClick={() => setOpened(false)}
            className={classNames(styles['input-more-menus-wrapper'], 'arco-dropdown-menu')}
          >
            {!onlyPhotoAlbum && (
              <Menu.Item key="1">
                <Upload
                  fileList={[]}
                  accept="*"
                  multiple={allowMultipleUploads}
                  beforeUpload={(file, filesList) => {
                    if (hasUploaded) return false
                    if (filesList.length === 1) {
                      batchFileUpload(filesList)
                      return true
                    }
                    hasUploaded = true
                    return uploadImagesPopBox(conversationName, filesList)
                      .then(files => {
                        if (!isEmpty(files)) batchFileUpload(files)
                        return !isEmpty(files)
                      })
                      .catch(e => {
                        return false
                      })
                      .finally(() => (hasUploaded = false))
                  }}
                  autoUpload={false}
                >
                  <div className="more-menu-item">
                    <Icon className="text-brand_color text-xl mr-3" name="icon_chat_file" />
                    <span>{t`features_messenger_chat_input_input_more_7zskrz9nl6`}</span>
                  </div>
                </Upload>
              </Menu.Item>
            )}
            {!onlyPhotoAlbum && (
              <Menu.Item key="2" onClick={() => setSendRedPacketVisible(true)}>
                <div className="more-menu-item">
                  <Icon className="text-xl mr-3 red-packet-icon" name="icon_chat_red_envelope" />
                  <span>{t`features_messenger_chat_input_input_more_gao0n4ujev`}</span>
                </div>
              </Menu.Item>
            )}
            <Menu.Item key="3">
              <Upload
                fileList={[]}
                accept="image/*, video/*"
                multiple={allowMultipleUploads}
                beforeUpload={(file, filesList) => {
                  if (hasUploaded) return false
                  if (filesList.length === 1) {
                    batchFileUpload(filesList)
                    return true
                  }
                  hasUploaded = true
                  return uploadImagesPopBox(conversationName, filesList)
                    .then(files => {
                      if (!isEmpty(files)) batchFileUpload(files)
                      return !isEmpty(files)
                    })
                    .catch(e => {
                      return false
                    })
                    .finally(() => (hasUploaded = false))
                }}
                autoUpload={false}
              >
                <div className="more-menu-item">
                  <Icon className="text-xl mr-3 text-avatar_bg_06" name="icon_chat_photo_album" />
                  <span>{t`features_messenger_chat_input_input_more_4led8qdx0h`}</span>
                </div>
              </Upload>
            </Menu.Item>
          </Menu>
        }
        trigger="click"
        position="tl"
        triggerProps={{
          clickToClose: true,
          popupAlign: {
            top: [-8, 20],
          },
        }}
      >
        <Icon name="icon_set_new" className="text-icon_color text-xl/6" />
      </Dropdown>
      {sendRedPacketVisible && <RedPackets onCancel={() => setSendRedPacketVisible(false)} />}
    </div>
  )
}
