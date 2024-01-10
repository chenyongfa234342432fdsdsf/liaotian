// 单独写是因为 sdk 只有 declare 无法运行时使用
export enum ZIMConnectionEvent {
  Success = 0,
  ActiveLogin = 1,
  LoginTimeout = 2,
  LoginInterrupted = 3,
  KickedOut = 4,
}
export enum ZIMErrorCode {
  Success = 0,
  Failed = 1,
  CommonModuleParamInvalid = 6000001,
  CommonModuleNotInit = 6000002,
  CommonModuleInvalidAppID = 6000003,
  CommonModuleTriggerSDKFrequencyLimit = 6000004,
  CommonModuleTriggerServerFrequencyLimit = 6000005,
  CommonModuleSwitchServerError = 6000006,
  CommonModuleIMServerError = 6000007,
  CommonModuleUploadLogError = 6000010,
  CommonModuleUserIsNotExist = 6000011,
  CommonModuleUserInfoQueriedLimit = 6000012,
  CommonModuleUnsupportedRequest = 6000013,
  CommonModuleUnactivatedIMServer = 6000014,
  CommonModuleExceedDAULimit = 6000015,
  CommonModuleExceedMAULimit = 6000016,
  NetworkModuleCommonError = 6000101,
  NetworkModuleServerError = 6000102,
  NetworkModuleTokenInvalid = 6000103,
  NetworkModuleNetworkError = 6000104,
  NetworkModuleTokenExpired = 6000106,
  NetworkModuleTokenVersionError = 6000107,
  NetworkModuleTokenTimeIsTooShort = 6000108,
  NetworkModuleUserHasAlreadyLogged = 6000111,
  NetworkModuleUserIsNotLogged = 6000121,
  ConversationModuleCommonError = 6000601,
  ConversationModuleServerError = 6000602,
  ConversationModuleConversationDoesNotExist = 6000603,
  ConversationModuleTheNumberOfPinnedConversationsHasReachedLimit = 6000604,
  MessageModuleCommonError = 6000201,
  MessageModuleServerError = 6000202,
  MessageModuleSendMessageFailed = 6000203,
  MessageModuleTargetDoesNotExist = 6000204,
  MessageModuleFileNotExist = 6000211,
  MessageModuleFileServerError = 6000212,
  MessageModuleFileTypeUnsupported = 6000213,
  MessageModuleFileSizeInvalid = 6000214,
  MessageModuleFileDurationInvalid = 6000215,
  MessageModuleAuditRejected = 6000221,
  MessageModuleAuditFailed = 6000222,
  MessageModuleAuditCustomSentRejected = 6000230,
  MessageModuleCallError = 6000270,
  MessageModuleCancelCallError = 6000271,
  MessageModuleCallServerError = 6000272,
  MessageModuleIsNotInvitor = 6000273,
  MessageModuleIsNotInvitee = 6000274,
  MessageModuleCallAlreadyExists = 6000275,
  MessageModuleCallDoesNotExist = 6000276,
  MessageModuleReceiptReadError = 6000277,
  MessageModuleMessageExceedsRevokeTime = 6000278,
  MessageModuleMessageHasBeenRevoked = 6000279,
  MessageModuleMessageReactionTypeExisted = 6000280,
  MessageModuleCallInviteUserDoesNotExist = 6000281,
  MessageModuleMessageReceiptLimit = 6000282,
  RoomModuleCommonError = 6000301,
  RoomModuleServerError = 6000302,
  RoomModuleCreateRoomError = 6000303,
  RoomModuleJoinRoomError = 6000304,
  RoomModuleLeaveRoomError = 6000306,
  RoomModuleTheRoomMemberQueryFailed = 6000310,
  RoomModuleTheRoomMembersQueryFailedCompletely = 6000311,
  RoomModuleUserIsNotInTheRoom = 6000321,
  RoomModuleTheRoomDoesNotExist = 6000322,
  RoomModuleTheRoomAlreadyExists = 6000323,
  RoomModuleTheNumberOfExistingRoomsHasReachedLimit = 6000324,
  RoomModuleTheNumberOfJoinedRoomsHasReachedLimit = 6000325,
  RoomModuleRoomAttributesCommonError = 6000330,
  RoomModuleRoomAttributesOperationFailedCompletely = 6000331,
  RoomModuleRoomAttributesQueryFailed = 6000333,
  RoomModuleTheNumberOfRoomAttributesExceedsLimit = 6000334,
  RoomModuleTheLengthOfRoomAttributeKeyExceedsLimit = 6000335,
  RoomModuleTheLengthOfRoomAttributeValueExceedsLimit = 6000336,
  RoomModuleTheTotalLengthOfRoomAttributesValueExceedsLimit = 6000337,
  RoomModuleRoomMemberAttributesCommonError = 6000350,
  RoomModuleTheTotalLengthOfRoomMemberAttributesExceedsLimit = 6000351,
  RoomModuleTheLengthOfRoomMemberAttributesKeyExceedsLimit = 6000352,
  RoomModuleTheLengthOfRoomMemberAttributesValueExceedsLimit = 6000353,
  RoomModuleTheMemberNumberOfRoomMemberAttributesExceedsLimit = 6000357,
  GroupModuleCommonError = 6000501,
  GroupModuleServerError = 6000502,
  GroupModuleCreateGroupError = 6000503,
  GroupModuleDismissGroupError = 6000504,
  GroupModuleJoinGroupError = 6000505,
  GroupModuleLeaveGroupError = 6000506,
  GroupModuleKickoutGroupMemberError = 6000507,
  GroupModuleInviteUserIntoGroupError = 6000508,
  GroupModuleTransferOwnerError = 6000509,
  GroupModuleUpdateGroupInfoError = 6000510,
  GroupModuleQueryGroupInfoError = 6000511,
  GroupModuleGroupAttributesOperationFailed = 6000512,
  GroupModuleGroupAttributesQueryFailed = 6000513,
  GroupModuleUpdateGroupMemberInfoError = 6000514,
  GroupModuleQueryGroupMemberInfoError = 6000515,
  GroupModuleQueryGroupListError = 6000516,
  GroupModuleQueryGroupMemberListError = 6000517,
  GroupModuleUserIsNotInTheGroup = 6000521,
  GroupModuleMemberIsAlreadyInTheGroup = 6000522,
  GroupModuleGroupDoesNotExist = 6000523,
  GroupModuleGroupAlreadyExists = 6000524,
  GroupModuleGroupMemberHasReachedLimit = 6000525,
  GroupModuleGroupAttributeDoesNotExist = 6000526,
  GroupModuleTheNumberOfGroupAttributesExceedsLimit = 6000531,
  GroupModuleTheLengthOfGroupAttributeKeyExceedsLimit = 6000532,
  GroupModuleTheLengthOfGroupAttributeValueExceedsLimit = 6000533,
  GroupModuleTheTotalLengthOfGroupAttributesValueExceedsLimit = 6000534,
  GroupModuleNoCorrespondingOperationAuthority = 6000541,
}
export enum ZIMMessagePriority {
  Low = 1,
  Medium = 2,
  High = 3,
}
export enum ZIMConversationType {
  Unknown = -1,
  Peer = 0,
  Room = 1,
  Group = 2,
}
export enum ZIMConversationEvent {
  Added = 0,
  Updated = 1,
  Disabled = 2,
  Deleted = 3,
}
export enum ZIMConversationNotificationStatus {
  Notify = 1,
  DoNotDisturb = 2,
}
export enum ZIMMessageType {
  Unknown = 0,
  Text = 1,
  Command = 2,
  Image = 11,
  File = 12,
  Audio = 13,
  Video = 14,
  Barrage = 20,
  System = 30,
  Revoke = 31,
  Custom = 200,
}
export enum ZIMMessageSentStatus {
  Sending = 0,
  Success = 1,
  Failed = 2,
}
export enum ZIMMessageDirection {
  Send = 0,
  Receive = 1,
}
export enum ZIMMessageOrder {
  Descending = 0,
  Ascending = 1,
}
export enum ZIMMessageReceiptStatus {
  None = 0,
  Processing = 1,
  Done = 2,
  Expired = 3,
  Failed = 4,
}
export enum ZIMMessageRevokeStatus {
  Unknown = -1,
  SelfRevoke = 0,
  SystemRevoke = 1,
  ServiceAPIRevoke = 2,
  GroupAdminRevoke = 3,
  GroupOwnerRevoke = 4,
}
export enum ZIMRevokeType {
  TwoWay = 0,
  OneWay = 1,
}
export enum ZIMConnectionState {
  Disconnected = 0,
  Connecting = 1,
  Connected = 2,
  Reconnecting = 3,
}
export enum ZIMEventEnum {
  /** 单聊 */
  message = 'receivePeerMessage',
  /** 群聊 */
  receiveGroupMessage = 'receiveGroupMessage',
  connectionStateChanged = 'connectionStateChanged',
  tokenWillExpire = 'tokenWillExpire',
  /** 会话改变 */
  conversationChanged = 'conversationChanged',
  /** 发送了一条消息 */
  messageSentStatusChanged = 'messageSentStatusChanged',
  /** 服务端删除了一条消息 */
  messageDeleted = 'messageDeleted',
  /** 服务端撤回了一条消息 */
  messageRevokeReceived = 'messageRevokeReceived',
  /** 收到已读回调 */
  messageReceiptChanged = 'messageReceiptChanged',
  /** 群更新 */
  groupStateChanged = 'groupStateChanged',
  groupNameUpdated = 'groupNameUpdated',
  groupAvatarUrlUpdated = 'groupAvatarUrlUpdated',
  groupNoticeUpdated = 'groupNoticeUpdated',
  groupAttributesUpdated = 'groupAttributesUpdated',
  groupMemberStateChanged = 'groupMemberStateChanged',
  groupMemberInfoUpdated = 'groupMemberInfoUpdated',
  /** 用户信息更新 */
  userInfoUpdated = 'userInfoUpdated',
}
/** 文件类型 */
export const IMFileTypesMap = {
  [ZIMMessageType.Audio]: ['mp3', 'amr', 'wav'],
  [ZIMMessageType.Image]: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'png'],
  [ZIMMessageType.Video]: ['mp4', 'mov', 'avi', 'rmvb', 'rm', 'flv', '3gp', 'wmv', 'mkv'],
  [ZIMMessageType.File]: ['pdf', 'pptx', 'xls', 'docx'],
}
/** 发送时的文件类型，主要是音频消息有大小限制，所以要分开 */
export const IMFileTypesMapWhenSend = {
  [ZIMMessageType.Image]: IMFileTypesMap[ZIMMessageType.Image],
  [ZIMMessageType.Video]: IMFileTypesMap[ZIMMessageType.Video],
}
/** 内部自定义的消息类型 用于 subType 字段 */
export enum IMCustomMessageSubTypeEnum {
  /** 音视频关闭，童通话结束 */
  mediaZoomClosed = 31,
  /** 红包消息 */
  redPocket = 15,
  /** 红包领取消息 */
  redPocketReceive = 16,
  /** 群组被封消息 */
  groupBlocked = 43,
  /** 加入群组消息 */
  groupJoin = 44,
  /** 被踢出群组消息 */
  groupKickOut = 45,
  /** 解散群组消息 */
  groupDismiss = 46,
  /** 账号被禁用消息 */
  accountDisabled = 47,
  /** 添加好友成功消息 */
  friendAdded = 48,
  /** 用户签到提醒 */
  checkInReminder = 51,
  /** 主动退出群组消息 */
  groupExit = 49,
  /** 消息发送失败 */
  messageSendFail = 52,
  /** 呼叫拒绝消息 */
  callReject = 53,
  /** 呼叫取消消息 */
  callCancel = 54,
  /** 禁言/取消禁言消息 */
  muteUnmute = 56,
  /** 用户注销消息 */
  userLogout = 57,
}
/*
 * 业务类型枚举
 * 1. 单个红包
 * 2. 群红包
 */
export enum RedPacketBusinessTypeEnum {
  single = 1,
  group = 2,
}

/**
 * 红包状态枚举
 * 1. 正常
 * 2. 已领完
 * 3. 已过期
 */
export enum RedPacketStatusEnum {
  normal = 1,
  received = 2,
  expired = 3,
}

export enum IMCustomMessageRefTypeCdEnum {
  /** 单个红包 */
  single = 'single',
  /** 群红包 */
  group = 'group',
}
/** 消息发送失败类型枚举 */
export enum MessageSendFailTypeEnum {
  notFriend = 1,
  youBlocked = 2,
  youAreBlocked = 3,
  otherBlocked = 4,
  yourAccountBlocked = 5,
  otherAccountCancelled = 6,
  sensitiveContent = 7,
  groupIsBan = 8,
  isBanInGroup = 9,
}
/** 禁言状态枚举 */
export enum MuteUnmuteStatusEnum {
  mute = 1,
  unmute = 2,
}

/** 用户注销状态枚举 */
export enum UserLogoutStatusEnum {
  logout = 1,
  undoLogout = 2,
}
/** 信令消息枚举 */
export enum CommandTypeEnum {
  /** 群通话状态 */
  groupCallStatus = 0x01,
  /** 多端登录 */
  login = 0x03,
  /** 撤回消息 */
  revoke = 0x04,
  /** 群组禁言状态更新 */
  groupMuteStatus = 0x05,
  /** 群普通成员显示设置 */
  groupMemberShowSetting = 0x06,
  /** 群管理员变化 */
  groupAdminChange = 0x07,
  /** 用户身份等级变化 */
  userLevelChange = 0x08,
}
