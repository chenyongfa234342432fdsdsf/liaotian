import React, { useState, useRef, useEffect } from 'react'
import Icon from '@/components/icon'
import { Button, Image, List, Spin, Dropdown, Menu } from '@nbit/arco'
import LazyImage from '@/components/lazy-image'
import { oss_svg_image_domain_address } from '@/constants/oss'
import { awsS3UploadFile } from '@/plugins/aws-s3/utils'
import ChatAvatar from '@/components/chat-avatar'
import { AwsS3FolderModuleName, AwsS3FolderModuleUseCaseName } from '@/plugins/aws-s3/constants'
import { t } from '@lingui/macro'
import AvatarCrop from './avatar-crop'
import Styles from './index.module.css'

interface UploadAndCropImageProps {
  oldHeadImg?: string
  onHeadImgChange: (headimg: string) => void
  containerClassName?: string
  isGroup?: boolean
  size?: number
  padding?: number
}
function UploadAndCropImage({
  oldHeadImg = '',
  onHeadImgChange,
  containerClassName = '',
  isGroup,
  size = 200,
  padding = 65,
}: UploadAndCropImageProps) {
  const [headImg, setHeadImg] = useState('')
  const [file, setFile] = useState<File | undefined>()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [imgVisible, setImgVisible] = useState(false)
  const childRef = useRef<HTMLInputElement>(null)
  const [visible, setVisible] = useState(false)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('two')
    const file = event.target.files?.[0]
    if (file) {
      setFile(file)
      setVisible(true)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  const handleIconClick = () => {
    if (fileInputRef.current) {
      console.log('one')
      fileInputRef.current.click()
    }
  }

  const handleCountryComit = async (data: { croppedImage: File | null }) => {
    setVisible(false)
    setLoading(true)
    let uploadedUrl = await uploadImg(
      AwsS3FolderModuleName.c2c,
      AwsS3FolderModuleUseCaseName.merchant_application,
      data.croppedImage
    )

    setHeadImg(uploadedUrl.url)
    onHeadImgChange(uploadedUrl.url)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  async function uploadImg(
    folderName: AwsS3FolderModuleName,
    usercaseName: AwsS3FolderModuleUseCaseName,
    file?: File | null
  ): Promise<{ url: string }> {
    return new Promise(async (resolve, reject) => {
      if (!file) {
        resolve({ url: '' })
        return
      }
      awsS3UploadFile(file, folderName, usercaseName)
        .then(res => {
          if (res.url) {
            resolve(res)
          }
        })
        .catch(() => {
          reject()
        })
    })
  }
  const hanleModalClose = () => {
    setVisible(false)
  }

  // 移除
  const handleRemove = () => {
    setHeadImg('')
    onHeadImgChange('')
  }
  useEffect(() => {
    setHeadImg(oldHeadImg || '')
  }, [oldHeadImg])

  return (
    <div className={`${Styles.upscoped} ${containerClassName}`}>
      <Spin loading={loading} className="avatar-box">
        <div className="upload">
          <ChatAvatar size={size} padding={padding} className="headimg" src={headImg} isGroup={isGroup} />
          <Image.Preview src={headImg} visible={imgVisible} onVisibleChange={setImgVisible} />
          <Dropdown
            droplist={
              <Menu>
                {headImg && (
                  <Menu.Item key="1" onClick={() => setImgVisible(true)}>
                    {t`components_upload_avatar_with_crop_index_msz3_ispbq`}
                  </Menu.Item>
                )}
                {/* <Menu.Item key="2">{t`components_upload_avatar_with_crop_index_kjwd4qbhec`}</Menu.Item> */}
                <Menu.Item key="3" onClick={handleIconClick}>
                  {t`components_upload_avatar_with_crop_index_2acd25pbs7`}
                </Menu.Item>
                {headImg && (
                  <Menu.Item key="4" onClick={handleRemove}>
                    {t`components_upload_avatar_with_crop_index_5kpqjaxtwr`}
                  </Menu.Item>
                )}
              </Menu>
            }
          >
            <div className="upload-icon-box">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <Icon name="icon_register_avatar" className="upload-icon" />
            </div>
          </Dropdown>
        </div>
        <AvatarCrop
          file={file}
          visible={visible}
          onClose={hanleModalClose}
          onCommit={handleCountryComit}
          onImageChange={handleIconClick}
        />
      </Spin>
    </div>
  )
}

export default UploadAndCropImage
