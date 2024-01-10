import { IIMConversation } from '@/plugins/im/types'

type DetectionPermissions = {
  video: boolean
  audio: boolean
}

/** 发送的端 */
enum Sender {
  Web = 'Web',
}

/** 通话类型 */
enum VideoCall {
  // 语音通话
  voicecall = 0,
  // 视频通话
  videocall = 1,
}

/** 通话类型 */
enum GroupCall {
  // 单人通话
  singlePersonCall = 0,
  // 群聊通话
  groupChatCall = 1,
}

enum CallUserState {
  // 接受
  Accepted = 1,
  // 拒绝
  Rejected = 2,
}

enum StreamUpdateEnum {
  // 增加
  ADD = 'ADD',
  // 删除
  DELETE = 'DELETE',
}

enum RejectionType {
  // 挂断
  Hangup = 0,
  // 忙线
  Busy = 1,
}

enum ZIMCallUserState {
  // 超时
  timeout = 6,
  // 接受
  accept = 1,
  // 拒绝
  reject = 2,
  // 退出
  quit = 7,
}

enum SoundSwitch {
  // 打开
  open = 1,
  // 关闭
  close = 2,
}

enum ZegoRoomStateChangedReason {
  // 踢出房间
  Kickout = 'KICKOUT',
}

/** 请求接口房间类型 */
enum RoomType {
  /** 单聊 */
  SingleChat = 1,
  /** 群聊 */
  GroupleChat = 2,
}

/** 请求接口房间流类型 */
enum RoomFlowType {
  /** 音频 */
  Audio = 1,
  /** 视频 */
  Video = 2,
}

type AudioRef = {
  openAudioModal: () => void
  closeAudioModal: () => void
  openAudioInviteModal: () => void
  closeAudioInviteModal: () => void
}

type MultipleAudioRef = {
  openMultipleAudioModal: () => void
  closeMultipleAudioModal: () => void
  openMultipleAudioInviteModal: () => void
  closeMultipleAudioInviteModal: () => void
  applyToJoinChat: (roomId: string, joinChatConversation) => void
}

type MultipleVideoRef = {
  openMultipleVideoModal: () => void
  closeMultipleVideoModal: () => void
  applyToJoinChat: (roomId: string, joinChatConversation) => void
}

type VideoRef = {
  openVideoModal: () => void
  closeVideoModal: () => void
}

type VideoInviteRef = {
  openVideoInviteModal: () => void
  closeVideoInviteModal: () => void
}

type MinWidthAndHeight = {
  width: number
  height: number
}

type ResizeAndDragMoveProps = {
  /** 需要拖拽的 Dom */
  interactDom: string
  /** 改变相关 Dom 的变大是以哪个父亲为准 */
  outer?: string
  /** 拖拽相关 Dom 的是以哪个父亲为准  */
  restriction?: string
  /** 是否需要改变 dom 的大小  */
  whetherSizeOfTheDom?: boolean
  /** dom 最小宽高  */
  restrictSizeMinWidthAndHeight?: Record<'width' | 'height', number>
  /** dom 最大宽高  */
  restrictSizeMaxWidthAndHeight?: Record<'width' | 'height', number>
  /** 是否允许拖动 */
  whetherDragMove?: boolean
  setDomMoveNum?: React.Dispatch<React.SetStateAction<MinWidthAndHeight>>
  /** 变化后的 container 的大小 */
  domMoveNum?: MinWidthAndHeight
}

type ShowOrHideCamera = {
  cameraStatus: boolean
  userID: string
}

type CallAudioInvitationReceivedInfo = {
  roomID?: string
  videoCall: number
  groupCall: number
  conversationID?: string
  conversationName?: string
  inviterAvatarUrl?: string
  inviterID?: string
  inviter?: string
  sender?: string
  type?: number
}

type InvitingAndDecliningInfo = {
  inviteId?: string
  rejectInvitingId?: string[]
}

type ComponentProps = {
  currentConversation?: IIMConversation
  callInvitationReceivedInfo?: CallAudioInvitationReceivedInfo
  setCallInviteChange?: (item: string[] | string | undefined, info: CallAudioInvitationReceivedInfo) => void
  setConversation?: React.Dispatch<React.SetStateAction<IIMConversation | undefined>>
  setCancelCallInviteChange?: (item: string[] | string | undefined) => void
  setCallRejectInvite?: (item: Record<'userId' | 'userName' | 'sender', string>) => void
  setCallAcceptInvite?: (item: () => void, detail: CallAudioInvitationReceivedInfo | undefined) => void
  hangupText?: string
  setHangupText?: React.Dispatch<React.SetStateAction<string>>
  sameLoginVerificationRef?: React.MutableRefObject<boolean>
  invitingAndDecliningInfo?: InvitingAndDecliningInfo
  whetherVoiceAndVideoIngRef?: React.MutableRefObject<boolean>
  getImChatGroupHasOngoingCall?: () => void
  setCallEnd?: (item?: IIMConversation, itemStandby?: IIMConversation) => void
}

type DragAudioHandleObjectProps = {
  answeronClick?: () => void
  hanguponClick?: () => void
  microPhoneturnedOffClick?: () => void
  microPhoneturnedOnClick?: () => void
  speakerTurnedOnClick?: () => void
  speakerTurnedOffClick?: () => void
  cameraTurnedOnClick?: () => void
  cameraTurnedOffClick?: () => void
  onMouseDown?: React.MouseEventHandler
  iconContainerHeight?: string
  iconContainerWidth?: string
  iconWidthAndHeight?: string
}

type AudioAndVideoStoreRef = {
  multipleAudioRef: React.RefObject<MultipleAudioRef | null>
  multipleVideoRef: React.RefObject<MultipleVideoRef | null>
}

export {
  VideoCall,
  GroupCall,
  CallUserState,
  StreamUpdateEnum,
  RejectionType,
  DetectionPermissions,
  ZegoRoomStateChangedReason,
  ZIMCallUserState,
  SoundSwitch,
  AudioRef,
  MultipleAudioRef,
  MultipleVideoRef,
  VideoRef,
  VideoInviteRef,
  MinWidthAndHeight,
  ResizeAndDragMoveProps,
  ShowOrHideCamera,
  ComponentProps,
  InvitingAndDecliningInfo,
  CallAudioInvitationReceivedInfo,
  DragAudioHandleObjectProps,
  Sender,
  RoomType,
  RoomFlowType,
  AudioAndVideoStoreRef,
}
