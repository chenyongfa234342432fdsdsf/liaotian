import { useEffect, useRef, useState } from 'react'
import Icon from '@/components/icon'
import { link } from '@/helper/link'
import classNames from 'classnames'
import { getV1ImChatGroupMyGroupApiRequest } from '@/apis/group'
import { YapiGetV1ImChatGroupMyGroupListData } from '@/typings/yapi/ImChatGroupMyGroupV1GetApi'
import { getImInstance } from '@/plugins/im/core'
import { ZIMConversationType } from '@/plugins/im/constants'
import dayjs from 'dayjs'
import { createConversation } from '@/helper/conversation'
import { t } from '@lingui/macro'
import { useThrottleFn } from 'ahooks'
import { useMyGroupStore } from '@/store/my-group'
import ListEmpty from '@/components/list-empty'
import LoadingElement from '@/components/loading-element'
import styles from './index.module.css'
import AddressBookNav from '../address-book/address-book-nav-component'
import GroupCom from '../address-book/group-component'

enum activateEnum {
  found = 1,
  join = 2,
}
function MyGroup() {
  const zim = getImInstance()
  const { setJoinWidth, setFoundWidth } = useMyGroupStore()
  const [activate, setActivate] = useState(activateEnum.found)
  const [myGroupFound, setMyGroupFound] = useState<YapiGetV1ImChatGroupMyGroupListData[]>()
  const [myGroupJoin, setMyGroupJoin] = useState<YapiGetV1ImChatGroupMyGroupListData[]>()
  const [sdkMassage, setSdkMassage] = useState<any[]>([])
  const [innerWidth, setInnerWidth] = useState<number | undefined>(0)
  const [isLoading, setISLoading] = useState<boolean>(false)

  const groupJoinRef = useRef<HTMLDivElement>(null)
  const groupFoundRef = useRef<HTMLDivElement>(null)
  const groupMass = data => {
    data?.forEach(item => {
      zim
        .queryConversation(item.groupId, ZIMConversationType.Group)
        .then(res => {
          let lastMessage = res.conversation.lastMessage
          let timeStamp = res.conversation.lastMessage?.timestamp as number
          const date = dayjs(timeStamp)
          let timeFormat = date.format('HH:mm')
          setSdkMassage(prv => [...prv, { groupId: item.groupId, lastMessage, timeStamp: timeFormat }])
        })
        .catch(() => {
          setSdkMassage(prv => [...prv, { groupId: item.groupId, lastMessage: null, timeStamp: null }])
        })
    })
  }
  const getMyGroupFound = async () => {
    setISLoading(true)
    const res = await getV1ImChatGroupMyGroupApiRequest({ queryType: '1' })
    const { isOk, data } = res || {}
    if (isOk) {
      setISLoading(false)

      setMyGroupFound(data)
      groupMass(data)
    }
  }
  const myGroupFoundHandle = myGroupFound?.map(item => {
    const findSdk = sdkMassage.find(sdk => {
      if (item.groupId === sdk.groupId) {
        return sdk
      }
      return null
    })
    return { ...item, ...findSdk }
  })
  const getMyGroupJoin = async () => {
    const res = await getV1ImChatGroupMyGroupApiRequest({ queryType: '2' })
    const { isOk, data } = res || {}
    if (isOk) {
      setMyGroupJoin(data)
      groupMass(data)
    }
  }
  const myGroupJoinHandle = myGroupJoin?.map(item => {
    const findSdk = sdkMassage.find(sdk => {
      if (item.groupId === sdk.groupId) {
        return sdk
      }
      return null
    })
    return { ...item, ...findSdk }
  })
  useEffect(() => {
    getMyGroupFound()
    getMyGroupJoin()
  }, [])
  // useEffect(() => {
  //   const res = zim.queryConversationList({
  //     count: 100,
  //     nextConversation: {} as any,
  //   })
  //   res
  //     .then(ok => {
  //       setConversation(ok.conversationList)
  //     })
  //     .catch(() => {
  //       // console.log('获取消息失败了=>')
  //     })
  // }, [])

  // 获取宽度
  useEffect(() => {
    const groupJoin = groupJoinRef.current?.clientWidth
    const groupFound = groupFoundRef.current?.clientWidth
    setJoinWidth(groupJoin)
    setFoundWidth(groupFound)
  }, [activate, innerWidth])

  const { run } = useThrottleFn(
    () => {
      setInnerWidth(window.innerWidth)
    },
    { wait: 500 }
  )
  // 监听视口变化
  useEffect(() => {
    window.addEventListener('resize', run)
    return () => {
      window.removeEventListener('resize', run)
    }
  }, [])
  return (
    <div className={styles['my-group']}>
      <AddressBookNav titleText={t`features_select_contact_index_ursogloihf`} />
      <div
        className="nav-item"
        onClick={() => {
          link('/group/add-member')
        }}
      >
        <div className="nav-ico-box">
          <Icon name={'icon_address_book_group'} fontSize={28} className="icon-color" />
        </div>
        <div className="nav-text">{t`features_messenger_my_group_index_bcypcolpmt`}</div>
      </div>
      <div className="group-tabs">
        <div
          className={classNames('has-found-join', activate === activateEnum.found && 'has-found-join-activate')}
          onClick={() => {
            setActivate(activateEnum.found)
          }}
        >{t`features_select_contact_group_iykozky04y`}</div>
        <div
          className={classNames('has-found-join', activate === activateEnum.join && 'has-found-join-activate')}
          onClick={() => {
            setActivate(activateEnum.join)
          }}
        >{t`features_select_contact_group_f2v65kjlnm`}</div>
      </div>
      {isLoading ? (
        <div className="flex justify-center mt-40">
          <LoadingElement />
        </div>
      ) : (
        <div
          className="found-list group-list"
          style={{ display: activate === activateEnum.found && !!myGroupFoundHandle?.length ? 'block' : 'none' }}
        >
          {myGroupFoundHandle?.map((item, index) => {
            return (
              <div
                ref={groupFoundRef}
                key={item?.groupId}
                onClick={() => {
                  createConversation({ group: item })
                }}
              >
                <GroupCom
                  crewName={item?.groupName}
                  messageDisturb={item?.messageDisturb === 2}
                  number={item?.number}
                  time={item?.timeStamp}
                  message={item?.lastMessage}
                  img={item?.headImage}
                  line={!(myGroupFoundHandle.length - 1 === index)}
                />
              </div>
            )
          })}
        </div>
      )}
      {isLoading
        ? null
        : !myGroupFoundHandle?.length &&
          activate === activateEnum.found && <ListEmpty text={t`features_messenger_my_group_index_ezj8ubt9up`} />}
      <div
        className="join-list group-list"
        style={{ display: activate === activateEnum.join && !!myGroupJoinHandle?.length ? 'block' : 'none' }}
      >
        {myGroupJoinHandle?.map((item, index) => {
          return (
            <div
              ref={groupJoinRef}
              key={item?.groupId}
              onClick={() => {
                createConversation({ group: item })
              }}
            >
              <GroupCom
                crewName={item?.groupName}
                key={item?.groupId}
                messageDisturb={item?.messageDisturb === 2}
                number={item?.number}
                time={item?.timeStamp}
                message={item?.lastMessage}
                img={item?.headImage}
                line={!(myGroupJoinHandle.length - 1 === index)}
              />
            </div>
          )
        })}
      </div>
      {isLoading
        ? null
        : !myGroupJoinHandle?.length &&
          activate === activateEnum.join && <ListEmpty text={t`features_messenger_my_group_index_7ha404uvph`} />}
    </div>
  )
}
export default MyGroup
