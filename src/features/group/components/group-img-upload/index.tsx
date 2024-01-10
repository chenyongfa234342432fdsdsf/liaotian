import Icon from '@/components/icon'
import UploadAndCropImage from '@/components/upload-avatar-with-crop'
import Styles from './index.module.css'

export default function GroupImgUpload({ onHeadImgChange }) {
  return (
    <div className={Styles['img-box']}>
      <UploadAndCropImage onHeadImgChange={onHeadImgChange} />
    </div>
  )
}
