import {
  getV1ImChatFriendApplyListApiRequest,
  postV1ImChatFriendAddApiRequest,
  postV1ImChatFriendPassApplyApiRequest,
} from '@/apis/address-book'
import { useEffect, useRef, useState } from 'react'
import { useNewFriendStore } from '@/store/new-friend'
import MaskSecondConfirm from '@/features/group/components/masking-pop'
import ConfirmBtnPop from '@/features/group/components/comfirm-btn-pop'
import { Message } from '@nbit/arco'
import Icon from '@/components/icon'
import { t } from '@lingui/macro'
import { useAddressBookStore } from '@/store/address-book'
import { MessengerRightNavBar } from '../../messenger-right-drawer'
import UserComplain from '../user-complain-modal'
import styles from './index.module.css'

export function Stranger(props) {
  const { setApplyList } = useAddressBookStore()
  const [isShow, setIsShow] = useState(false)
  const { onClose } = props
  const { newFriendItem, off } = useNewFriendStore()
  const [isPop, setIsPop] = useState(false)
  const childRef = useRef<any>()
  const applyAdd = async () => {
    if (newFriendItem?.initiativeAdd || newFriendItem?.applyStatus !== 1) {
      const res = await postV1ImChatFriendAddApiRequest({
        uid: newFriendItem?.initiativeAdd ? newFriendItem?.targetUid : newFriendItem.uid,
      })
      const { isOk, data } = res || {}
      if (isOk && data?.success) {
        setIsPop(false)
        Message.success(t`features_messenger_addition_index_t0o7celfir`)
        setApplyList()
      } else {
        setIsPop(false)
        Message.error(t`features_messenger_addition_index_79dzbswbuk`)
      }
    } else {
      const res = await postV1ImChatFriendPassApplyApiRequest({ recordId: newFriendItem?.recordId })
      const { isOk, data } = res || {}
      if (isOk && data?.success) {
        setIsPop(false)
        Message.success(t`features_messenger_new_friend_stranger_index_4ahi2ggjls`)
        childRef.current.click()
        setApplyList()
      } else {
        setIsPop(false)
        Message.error(t`features_messenger_new_friend_stranger_index_yu9yxtmlq_`)
      }
    }
  }
  const handlevisible = state => {
    setIsShow(state)
  }

  useEffect(() => {
    off && childRef.current.click()
  }, [off])
  return (
    <div className={styles.stranger}>
      <MessengerRightNavBar
        onClose={onClose}
        title={t`features_messenger_new_friend_stranger_index_5nq5jufpaa`}
        ref={childRef}
      />
      <div className="flex justify-center items-center py-8 header">
        <div>
          <div className="w-48 h-48" style={{ borderRadius: '50%' }}>
            <img src="https://oss.chainstar.cloud/im-web/image/defaultheadurl.png" alt="" width={200} height={200} />
          </div>
          <div className="text-center name">{newFriendItem?.nickName}</div>
        </div>
      </div>
      <div
        className="add-friend"
        onClick={() => {
          setIsPop(true)
        }}
      >
        <Icon name="icon_address_book_invite_friend" className="ml-6 mr-4" fontSize={20} />
        {t`features_messenger_chat_information_chat_settings_schema_tgrf_5rcdi`}
      </div>

      <div
        className="complain add-friend"
        onClick={() => {
          setIsShow(true)
        }}
      >
        <Icon name="icon_chat_complaint" className="ml-6 mr-4" fontSize={20} />
        {t`features_messenger_chat_chat_header_more_vegbnukvgl`}
      </div>
      <UserComplain visible={isShow} setvisible={handlevisible} userInfo={newFriendItem} />
      {isPop && (
        <MaskSecondConfirm>
          {
            <ConfirmBtnPop
              title={newFriendItem.nickName}
              content={t`features_messenger_addition_index_1fx0wn_hbe`}
              confirmEvent={() => {
                applyAdd()
              }}
              cancelEvent={() => {
                setIsPop(false)
              }}
            />
          }
        </MaskSecondConfirm>
      )}
    </div>
  )
}
