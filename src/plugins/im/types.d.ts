import type {
  ZIMAudioMessage,
  ZIMConversation,
  ZIMConversationSearchInfo,
  ZIMCustomMessage,
  ZIMFileMessage,
  ZIMImageMessage,
  ZIMMediaMessage,
  ZIMMediaMessageBase,
  ZIMMessage,
  ZIMRevokeMessage,
  ZIMUserInfo,
  ZIMVideoMessage,
} from 'zego-zim-web'
import {
  IMCustomMessageRefTypeCdEnum,
  RedPacketStatusEnum,
  MessageSendFailTypeEnum,
  MuteUnmuteStatusEnum,
  UserLogoutStatusEnum,
} from './constants'

export type IIMConversation = ZIMConversation
export type IIMMessage = ZIMMessage & {
  /** 已读人数 */
  readMemberCount?: number
  /** 未读人数 */
  unreadMemberCount?: number
}
export type IIMMediaMessageBase = ZIMMediaMessageBase
type IFileMessage = {
  uploadedSize?: number
}
export type IIMMediaMessage = ZIMMediaMessage & IFileMessage
export type IIMImageMessage = ZIMImageMessage & IFileMessage
export type IIMVideoMessage = ZIMVideoMessage & IFileMessage
export type IIMAudioMessage = ZIMAudioMessage & IFileMessage
export type IIMRevokeMessage = ZIMRevokeMessage
export type IIMFileMessage = ZIMFileMessage & IFileMessage
export type IIMCustomMessage = ZIMCustomMessage
export type IIMConversationSearchInfo = ZIMConversationSearchInfo
export type IIMUserInfo = ZIMUserInfo

/**
 * 音视频关闭，通话结束
 * - roomId: 房间 ID
 * - time: 房间持续时间，毫秒
 */
export type IIMMessageContentMediaZoomClosed = {
  /** 房间 ID */
  roomId: string
  /** 房间持续时间，毫秒 */
  time: number
}

/**
 * 红包消息
 * - refTypeCd: 业务类型
 * - packageAmount: 红包金额
 * - packageCount: 红包数量
 * - yetCount: 已领取红包数量
 * - residueAmount: 剩余红包金额
 * - expireationTime: 红包过期时间
 * - statusInd: 红包状态
 * - remark: 备注
 * - receiveUid: 接收人 UID
 * - receiveGroupId: 接收群组 ID
 * - refundAmount: 已退还金额
 * - createdByTime: 红包发送时间
 */
export type IIMMessageContentRedPocket = {
  id: number
  /** 业务类型 */
  refTypeCd: IMCustomMessageRefTypeCdEnum
  /** 红包金额 */
  packageAmount: number
  /** 红包数量 */
  packageCount: number
  /** 已领取红包数量 */
  yetCount: number
  /** 剩余红包金额 */
  residueAmount: number
  /** 红包过期时间 */
  expireationTime: number
  /** 红包状态 */
  statusInd: RedPacketStatusEnum
  /** 备注 */
  remark: string
  /** 接收人 UID */
  receiveUid: number
  /** 接收群组 ID */
  receiveGroupId: number
  /** 已退还金额 */
  refundAmount: number
  /** 红包发送时间 */
  createdByTime: number
}
export type IIMMessageContentRedPocketReceive = {
  /** 红包ID */
  packageId: number
  /** 领取用户ID */
  uid: number
  /** 领取用户昵称 */
  nickName: string
  /** 发送用户ID */
  sendUid: number
  /** 发送用户昵称 */
  sendNickName: string
}
/**
 * 消息发送失败具体类型
 * - type: 消息发送失败类型
 * - msgId: 消息 ID
 * - senderUid: 消息发送方用户 ID
 */
export interface IIMMessageSendFailMessageContent {
  /** 消息发送失败类型 */
  type: MessageSendFailTypeEnum
  /** 消息 ID */
  msgId: string
  /** 消息发送方用户 ID */
  senderUid: string
}

/**
 * 禁言/取消禁言消息具体类型
 * - isBan: 1，禁言；2，解除禁言
 */
export interface IIMMuteUnmuteMessageContent {
  /** 1，禁言；2，解除禁言 */
  isBan: MuteUnmuteStatusEnum
}

/**
 * 用户注销消息具体类型
 * - isBan: 1，禁言；2，解除禁言
 */
export interface IIMUserLogoutMessageContent {
  /** 1，禁言；2，解除禁言 */
  isBan: UserLogoutStatusEnum
}

/**
 * 群组被封消息用户信息
 * - groupId: 群组 ID
 * - time: 被封时间，时间戳格式，毫秒
 */
export interface IIMGroupBlockedUserInfoMessageContent {
  /** 群组 ID */
  groupId: string
  /** 被封时间，时间戳格式，毫秒 */
  time: number
}

/**
 * 加入群组消息用户信息
 * - uid: 用户 ID
 * - nickName: 用户昵称
 * - isInitiative: 是否主动入群，true，是，false，不是
 * - inviterUid: 邀请人 UID，isInitiative=false 时有值
 * - inviterNickName: 邀请人昵称，isInitiative=false 时有值
 */
export interface IIMGroupJoinUserInfoMessageContent {
  /** 用户 ID */
  uid: number
  /** 用户昵称 */
  nickName: string
  /** 是否主动入群，true，是，false，不是 */
  isInitiative: boolean
  /** 邀请人 UID，isInitiative=false 时有值 */
  inviterUid?: number
  /** 邀请人昵称，isInitiative=false 时有值 */
  inviterNickName?: string
}
/** 加入群组消息 */
export type IIMJoinGroupMessageContent = {
  groupId: string
  users: IIMGroupJoinUserInfoMessageContent[]
}

/**
 * 被踢出群组消息用户信息
 * - kickUid: 踢除人 UID
 * - kickUsername: 踢除人用户昵称
 * - kickedUid: 被踢除人 UID
 * - kickedUsername: 被踢除人用户昵称
 */
export interface IIMGroupKickOutUserInfoMessageContent {
  /** 踢除人 UID */
  kickUid: number
  /** 踢除人用户昵称 */
  kickUsername: string
  /** 被踢除人 UID */
  kickedUid: number
  /** 被踢除人用户昵称 */
  kickedUsername: string
}
/** 提出群组消息 */
export type IIMGroupKickOutMessageContent = {
  groupId: string
  users: IIMGroupKickOutUserInfoMessageContent[]
  lord: string
}

export type IIMGroupExitMessageContent = {
  groupId: string
  uid: number
  nickName: string
  time: number
  lord: number
  administratorList: number[]
}

/** 撤回消息额外数据 */
export interface IRevokeExtendedData {
  /** 撤回人 */
  operatorName: string
}
/** 添加好友的 message */
export type IIMAddFriendMessageContent = {
  applyNickName: string
  applyUid: string
  targetNickName: string
}

/** 呼叫拒绝消息 */
export type IIMCallRejectMessageContent = {
  callId: string
  callRejectUserId: number
  time: number
}
/** 呼叫取消消息 */
export type IIMCallCancelMessageContent = {
  callId: string
  callCancelUserId: number
  time: number
}
