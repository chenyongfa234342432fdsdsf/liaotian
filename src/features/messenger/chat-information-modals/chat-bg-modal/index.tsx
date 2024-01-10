import UploadFile from '@/components/upload-file'
import { Button, Modal, Upload } from '@nbit/arco'
import LazyImage from '@/components/lazy-image'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import styles from './index.module.css'

function ChatBgModal({ visible, setvisible }: { visible: boolean; setvisible: (state: boolean) => void }) {
  const [isVisible, setisVisible] = useState(visible)

  useEffect(() => {
    setisVisible(visible)
  }, [visible])

  useEffect(() => {
    setvisible(isVisible)
  }, [isVisible])
  return (
    <Modal
      closable={false}
      className={styles['chat-bg-modal']}
      visible={visible}
      onCancel={() => setisVisible(false)}
      title={'设置聊天背景'}
      footer={() => (
        <>
          <Button className={'ml-auto'} type="outline" onClick={() => setisVisible(false)}>
            {'取消'}
          </Button>
          <Button type="primary">恢复默认背景</Button>
        </>
      )}
    >
      <Upload limit={1}>
        <div className="uploader-container">
          <span>当前使用</span>
          <div className="relative">
            <LazyImage
              width={450}
              height={200}
              src={
                'https://newbit-staging-s3.chainstar.cloud/Snipaste_2023-11-09_11-19-13.png?AWSAccessKeyId=AKIAYR2KF6TGWOQ67CXX&Expires=1924905600&Signature=Zo5Zbmv00GN50d0tom7LYqAt5HY%3D'
              }
            />
            <div className={classNames('image-overlay')}>
              <span className="text-brand_color">更换新的背景</span>
            </div>
          </div>
        </div>
      </Upload>
    </Modal>
  )
}

export default ChatBgModal
