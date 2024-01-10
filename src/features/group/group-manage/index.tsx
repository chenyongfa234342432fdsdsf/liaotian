import Icon from '@/components/icon'
import {
  deleteGroup,
  queryAllGroup,
  getGroupMembers,
  setNormalUserHide,
  getV1ImChatGroupInfoApiRequest,
  banGroup,
} from '@/apis/group'
import { useImStore } from '@/store/im'
import { useEffect, useState } from 'react'
import { userToast } from '@/features/users/user-toast'
import { groupStore } from '@/store/group'
import { GroupEnum } from '@/constants/group'
import { useMessengerRightDrawer } from '@/hooks/use-messenger-right-drawer'
import { ChatEditMembers } from '@/features/messenger/chat-information'
import { t } from '@lingui/macro'
import { useUserStore } from '@/store/user'
import { ImChatGroupMemberListData } from '@/typings/apis/group'
import { Message, Spin, Switch } from '@nbit/arco'
import { baseAddressBookStore } from '@/store/address-book'
import { useRequest } from 'ahooks'
import LoadingElement from '@/components/loading-element'
import { useChatGroupStore } from '@/store/group/chat-group'
import { updateGroupDetail } from '@/helper/address-book'
import Styles from './index.module.css'
import MaskSecondConfirm from '../components/masking-pop'
import ConfirmBtnPop from '../components/comfirm-btn-pop'

enum UserIsHideEnum {
  /** 开启隐藏 */
  hidden = 1,
  /** 开启显示 */
  show = 2,
}
enum IsBanGroupEnum {
  /** 已禁言 */
  ban = 1,
  /** 未禁言 */
  noBan = 2,
}
export default function GroupManage({ noHeader, onClose }: { noHeader?: boolean; onClose: () => void }) {
  const { currentConversation } = useImStore()
  const [isShowConfirm, setIsShowConfirm] = useState(false)
  const [open, close] = useMessengerRightDrawer()
  const { userInfo } = useUserStore()
  const [loading, setLoading] = useState(false)
  const { setMyGroupList, setJoinGroupList } = baseAddressBookStore.getState()
  const [isHideUser, setIsHideUser] = useState<boolean>(true)
  const [isBanGroup, setIsBanGroup] = useState<boolean>(false)
  const [myGroupIdentityInfo, setMyGroupIdentityInfo] = useState<ImChatGroupMemberListData>(
    {} as ImChatGroupMemberListData
  )

  /** 切换显示普通成员 */
  const isHiddenSwitchFunc = async () => {
    const res = await setNormalUserHide({
      groupId: currentConversation?.conversationID || '',
      isHideUser: isHideUser ? UserIsHideEnum.hidden : UserIsHideEnum.show,
    })
    if (res.data?.success) {
      setIsHideUser(!isHideUser)
      currentConversation?.conversationID && updateGroupDetail(currentConversation.conversationID)
      Message.success(
        !isHideUser ? t`features_group_group_manage_index_0szooprmbb` : t`features_group_group_manage_index_fk2brnhzab`
      )
    }
  }
  const { loading: isHiddenSwitchloading, run: isHiddenSwitchClick } = useRequest(isHiddenSwitchFunc, {
    manual: true,
  })
  const isBanGroupSwitch = async () => {
    const res = await banGroup({
      groupId: currentConversation?.conversationID || '',
      banType: 1,
      ban: !isBanGroup ? IsBanGroupEnum.ban : IsBanGroupEnum.noBan,
    })
    if (res.data?.success) {
      setIsBanGroup(!isBanGroup)
      currentConversation?.conversationID && updateGroupDetail(currentConversation.conversationID)
      Message.success(
        !isBanGroup ? t`features_group_group_manage_index_2rv0p0cplr` : t`features_group_group_manage_index_ah7ydd4loe`
      )
    }
  }
  /** 切换普通账号禁言 */
  const { loading: isBanGroupSwitchLoading, run: isBanGroupSwitchClick } = useRequest(isBanGroupSwitch, {
    manual: true,
  })
  const getFilterOprateLinkList = () => {
    /** 是否群主 */
    const isGroupLord = myGroupIdentityInfo.lord
    const oprateLinkList = [
      {
        name: t`features_group_group_manage_index_tcjzrkguez`,
        isShow: isGroupLord,
        onClick: () => {
          const { setGroupOperateMark } = groupStore.getState()
          setGroupOperateMark(GroupEnum.addGroup)
          open(<ChatEditMembers onClose={close} />)
        },
      },
      {
        name: t`features_group_group_manage_index_av7bsinhzv`,
        isShow: isGroupLord,
        onClick: () => {
          const { setGroupOperateMark } = groupStore.getState()
          setGroupOperateMark(GroupEnum.delGroup)
          open(<ChatEditMembers onClose={close} />)
        },
      },
      {
        name: t`features_group_group_manage_index_aygntn7brj`,
        isShow: true,
        onClick: () => {
          const { setGroupOperateMark } = groupStore.getState()
          setGroupOperateMark(GroupEnum.del)
          open(<ChatEditMembers onClose={close} />)
        },
      },
      {
        name: t`features_group_group_manage_index_f6ugkcd0j_`,
        isShow: true,
        rightSlot: (
          <Switch
            onClick={() => {
              if (isHiddenSwitchloading) return
              isHiddenSwitchClick()
            }}
            loading={isHiddenSwitchloading}
            checked={isHideUser}
          />
        ),
        onClick: () => {},
      },
      {
        name: t`features_group_group_manage_index_24gf_hxlhg`,
        isShow: true,
        rightSlot: (
          <Switch
            onClick={() => {
              if (isBanGroupSwitchLoading) return
              isBanGroupSwitchClick()
            }}
            loading={isBanGroupSwitchLoading}
            checked={isBanGroup}
          />
        ),
        onClick: () => {},
      },
    ]
    return oprateLinkList
  }
  const cancelEvent = () => {
    setIsShowConfirm(false)
  }
  const confirmEvent = () => {
    setLoading(true)
    // /** 解散群 */
    deleteGroup({
      groupId: currentConversation?.conversationID || '',
    }).then(res => {
      if (res.data?.success) {
        Message.success(t`features_group_group_manage_index_f9zb4m5ujv`)
        setIsShowConfirm(false)
        setJoinGroupList()
        setMyGroupList()
        onClose()
      } else {
        Message.error(t`features_group_group_manage_index_xji5aycfnc`)
      }
      setLoading(false)
    })
  }
  const getInfo = async () => {
    /** 获取自己在群内的信息 */
    const res = await getGroupMembers({ groupId: currentConversation?.conversationID || '' })
    if (res.isOk && res.data) {
      const myGroupInfo = res.data.find(i => i.uid === userInfo.uid)
      myGroupInfo && setMyGroupIdentityInfo(myGroupInfo)
    }
    /** 获取群设置信息 */
    const infoRes = await getV1ImChatGroupInfoApiRequest({
      groupId: currentConversation?.conversationID || '',
    })
    if (infoRes.isOk && infoRes.data) {
      const { groupData } = infoRes.data
      setIsHideUser(groupData.isHideUser === UserIsHideEnum.show)
      setIsBanGroup(groupData.groupBan === IsBanGroupEnum.ban)
    }
  }
  const { loading: getInfoLoading, run } = useRequest(getInfo, { manual: true })
  useEffect(() => {
    run()
  }, [])
  return (
    <div className={Styles['group-manage']}>
      {!noHeader && (
        <header>
          <Icon name="a-Notselected" />
          <span>{t`features_group_group_manage_index_eqe9ptkxdg`}</span>
        </header>
      )}
      {getInfoLoading ? (
        <div className="flex justify-center pb-4">
          <LoadingElement />
        </div>
      ) : (
        <>
          {getFilterOprateLinkList()?.map((i, index) => {
            if (!i.isShow) return
            return (
              <div className="group-operate-link" key={index} onClick={() => i.onClick && i.onClick()}>
                <span>{i.name}</span>
                {i.rightSlot ? (
                  // i.rightRender(isHideUser, isHiddenSwitchloading)
                  i.rightSlot
                ) : (
                  <Icon className="text-icon_color w-[16px] h-[16px]" name="icon_chat_arrow" />
                )}
              </div>
            )
          })}
          <div className="separate-line"></div>
          {myGroupIdentityInfo.lord ? (
            <div
              className="text-base text-secondary_color bg-bg_color p-6 cursor-pointer"
              onClick={() => setIsShowConfirm(true)}
            >{t`features_group_group_manage_index_iqtjdgdysl`}</div>
          ) : null}
        </>
      )}
      {isShowConfirm && (
        <MaskSecondConfirm>
          <ConfirmBtnPop
            title={t`features_group_group_manage_index_xbjmyda1qy`}
            content={t`features_group_group_manage_index_dc6ly_z6gr`}
            cancelEvent={cancelEvent}
            confirmEvent={confirmEvent}
            loading={loading}
          />
        </MaskSecondConfirm>
      )}
    </div>
  )
}
