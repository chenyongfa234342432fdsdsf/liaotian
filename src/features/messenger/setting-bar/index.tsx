import { Avatar } from '@nbit/arco'
import LazyImage from '@/components/lazy-image'
import { useUserStore } from '@/store/user'
import Link from '@/components/link'
import Icon from '@/components/icon'
import { link } from '@/helper/link'
import ChatAvatar from '@/components/chat-avatar'
import { useAddressBookStore } from '@/store/address-book'
import { useEffect, useState } from 'react'
import { getTime } from '@/helper/getTime'
import { getV1ImCommandGetUserCommandInfoApiRequest } from '@/apis/command'
import { YapiGetV1ImCommandGetUserCommandInfoData } from '@/typings/yapi/ImCommandGetUserCommandInfoV1GetApi'
import styles from './index.module.css'

function SettingBar() {
  const { userInfo } = useUserStore()
  const { applyList, setApplyList } = useAddressBookStore()
  const [userCommand, setUserCommand] = useState<YapiGetV1ImCommandGetUserCommandInfoData | undefined>()
  const menus = [
    {
      path: '/checkin-center',
      icon: 'icon_set_sign_in',
    },
    {
      path: '/messenger/address-book',
      icon: 'icon_chat_address_book',
    },
    {
      path: userCommand ? userCommand?.linkUrl || '' : '/messenger/command',
      icon: 'icon_chat_assword',
    },
    {
      path: '/messenger/find',
      icon: 'icon_chat_discover',
    },
    {
      path: '/settings-center',
      icon: 'icon_chat_set',
    },
  ]
  const toUserCenter = () => {
    link('/')
  }
  const handleHeadClick = () => {
    link('/personal-information?redirect=/messenger')
  }
  const three = 3 // 三天为基线
  // 新朋友未读申请个数
  const newApplyNumber = applyList?.filter(item => {
    if (item.applyStatus === 1 && getTime(item.applyTime) < three && !item.initiativeAdd) {
      return item
    }
    return null
  })

  const getUserCommand = async () => {
    const res = await getV1ImCommandGetUserCommandInfoApiRequest({})
    setUserCommand(res?.data)
    // console.log('getV1ImCommandGetUserCommandInfoApiRequest=>', res)
  }
  useEffect(() => {
    getUserCommand()
    setApplyList()
  }, [])
  return (
    <div className={styles['setting-bar-wrapper']}>
      <div onClick={handleHeadClick}>
        <ChatAvatar src={userInfo.avatarPath} className="cursor-pointer" size={40} />
      </div>
      <div className="flex items-center">
        {menus.map(menu => {
          return (
            <Link
              className="mr-6 last:mr-0 relative"
              key={menu.icon}
              href={menu.path}
              target={menu.icon === 'icon_chat_assword' ? !!userCommand : false}
            >
              {menu.path === '/messenger/address-book' && !!newApplyNumber.length && (
                <div className="tips-apply-number">{newApplyNumber?.length}</div>
              )}
              <Icon className="text-xl text-icon_color hover:text-brand_color" name={menu.icon} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default SettingBar
