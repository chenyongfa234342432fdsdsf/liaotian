import { t } from '@lingui/macro'
import { useState, forwardRef, useImperativeHandle, useRef } from 'react'
import { Modal } from '@nbit/arco'
import { oss_svg_image_domain_address } from '@/constants/oss'
import LazyImage from '@/components/lazy-image'
import { link } from '@/helper/link'
import { useLayoutStore } from '@/store/layout'
import styles from './index.module.css'

type Props = {
  onClosedChange?: () => void
}

function CompleteRegistrationModal(props: Props, ref) {
  const { onClosedChange } = props || {}

  const [visible, setVisible] = useState<boolean>(false)

  const { businessName } = useLayoutStore().layoutProps || {}

  const containerRef = useRef<HTMLDivElement | null>(null)

  useImperativeHandle(ref, () => ({
    openRegistrationModal() {
      setVisible(true)
    },
  }))

  const setGoToContact = () => {
    link('/')
    onClosedChange && onClosedChange()
  }

  return (
    <div
      ref={containerRef}
      onClick={() => {
        link('/')
        onClosedChange && onClosedChange()
      }}
    >
      <Modal
        visible={visible}
        getPopupContainer={() => containerRef?.current as Element}
        footer={null}
        className={styles.scoped}
        closable={false}
        maskClosable
      >
        <div onClick={e => e.stopPropagation()}>
          <LazyImage src={`${oss_svg_image_domain_address}registor/register-successful-icon.png`} />
          <div className="flex justify-center text-center text-white mt-2 mb-6 text-base md:text-xl md:my-6">{t`features_user_operate_complete_registration_modal_index_qzmv0ryfca`}</div>
          <div
            onClick={setGoToContact}
            className="w-[200px] h-[36px] mb-2  md:w-[200px] md:h-[54px] mx-auto flex justify-center items-center text-sm text-white rounded bg-[#1B79E7] cursor-pointer"
          >
            {t`features_user_operate_complete_registration_modal_index_tltlxmbttt`}
            {businessName}
            {t`features_user_operate_complete_registration_modal_index__p_5wbeokq`}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default forwardRef(CompleteRegistrationModal)
