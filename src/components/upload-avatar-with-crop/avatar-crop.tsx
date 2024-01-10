import React, { useState, useEffect } from 'react'
import { Modal } from '@nbit/arco'
import Icon from '@/components/icon'
import Cropper from 'react-easy-crop'
import { t } from '@lingui/macro'
import getCroppedImg from './cropImage'
import Styles from './avatar-crop.module.css'

interface AvatarCropProps {
  file: File | undefined
  visible: boolean
  onClose: () => void
  onCommit: (data: { croppedImage: File | null }) => void
  onImageChange: () => void
}
let changeImg
function AvatarCrop({ file, visible, onClose, onCommit, onImageChange }: AvatarCropProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  // let url =file ? URL.createObjectURL(file) : ''

  const onCropChange = crop => {
    setCrop(crop)
  }

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const onZoomChange = zoom => {
    setZoom(zoom)
  }

  const handleCancel = () => {
    if (changeImg) {
      clearInterval(changeImg)
    }
    onClose()
  }

  const handleCommitClick = async () => {
    try {
      const croppedImageUrl: any = await getCroppedImg(imageUrl, croppedAreaPixels)
      if (croppedImageUrl) {
        const fileName = `croppedImage_${new Date().getTime()}.jpg` // 根据当前时间生成文件名
        const file = new File([croppedImageUrl], fileName, { type: 'image/jpeg' })
        onCommit({ croppedImage: file })
      } else {
        onCommit({ croppedImage: null })
      }
      if (changeImg) {
        clearInterval(changeImg)
      }
    } catch (e) {
      console.error(e)
    }
  }
  const handleAdd = () => {
    setZoom(prevCount => prevCount + 0.5)
  }

  const handleSubtract = () => {
    if (zoom <= 0.5) return
    setZoom(prevCount => prevCount - 0.5)
  }

  const handleImageChange = () => {
    onImageChange()
  }
  useEffect(() => {
    if (changeImg) {
      clearInterval(changeImg)
    }
    let url = ''
    if (file) {
      url = URL.createObjectURL(file)
      setImageUrl(url)
    }

    return () => {
      if (url) {
        URL.revokeObjectURL(url)
        setImageUrl('')
      }
    }
  }, [file])

  useEffect(() => {
    if (file) {
      let url = ''
      changeImg = setInterval(() => {
        url = URL.createObjectURL(file)
        setImageUrl(url)
      }, 500)

      return () => {
        URL.revokeObjectURL(url) // 在组件卸载时释放 URL 对象
        if (changeImg) {
          clearInterval(changeImg)
        }
      }
    }
  }, [file])

  return (
    <Modal className={Styles.scoped} simple footer={null} style={{}} title="" visible={visible}>
      <div className="avatar-box">
        <div className="avatar-top">
          <Icon name="icon_chat_close" fontSize={20} className="close-icon" onClick={handleCancel} />
          <span className="title-label">{t`components_upload_avatar_with_crop_avatar_crop_jxto5gweak`}</span>
          <div className="re-upload mr-6" onClick={handleImageChange}>
            <Icon name="icon_register_upload" fontSize={20} className="re-upload-icon mr-2" />
            <span className="text-sm">{t`components_upload_avatar_with_crop_avatar_crop_ygs1rgurzb`}</span>
          </div>
        </div>
        <div className="crop-container">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={4 / 4}
            minZoom={0.5}
            cropSize={{ width: 340, height: 340 }}
            cropShape="round"
            showGrid={false}
            restrictPosition={false}
            onCropChange={onCropChange}
            onCropComplete={onCropComplete}
            onZoomChange={onZoomChange}
          />
        </div>
        <div className="controls">
          <Icon name="icon_set_new" fontSize={12} className="controls-icon" onClick={handleAdd} />
          <Icon name="icon_register_photo_reduction" fontSize={12} className="controls-icon" onClick={handleSubtract} />
        </div>
        <div className="commit-btn" onClick={handleCommitClick}>
          <Icon name="icon_set_confirm" fontSize={24} className="commit-icon" />
        </div>
      </div>
    </Modal>
  )
}
export default AvatarCrop
