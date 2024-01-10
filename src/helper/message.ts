import { IIMConversation, IIMCustomMessage, IIMMediaMessage, IIMMediaMessageBase, IIMMessage } from '@/plugins/im/types'
import {
  IMCustomMessageSubTypeEnum,
  IMFileTypesMap,
  IMFileTypesMapWhenSend,
  ZIMConversationNotificationStatus,
  ZIMConversationType,
  ZIMEventEnum,
  ZIMMessageDirection,
  ZIMMessagePriority,
  ZIMMessageSentStatus,
  ZIMMessageType,
} from '@/plugins/im/constants'
import { addEventListenerOnIm } from '@/plugins/im/event'
import { baseImStore } from '@/store/im'
import dayjs from 'dayjs'
import { getImInstance } from '@/plugins/im/core'
import { chunk, debounce } from 'lodash'
import produce from 'immer'
import { popBoxConfirm } from '@/components/pop-box'
import type ZIM from 'zego-zim-web'
import { baseUserStore } from '@/store/user'
import { baseCommonStore } from '@/store/common'
import { Message } from '@nbit/arco'
import { t } from '@lingui/macro'
import { baseAddressBookStore } from '@/store/address-book'
import { UserSoundNotifyEnabledEnum } from '@/constants/user'
import { formatDate } from './date'
import { isSameUid } from './address-book'
import { envIsProd } from './env'
import { isAtMe } from './message-mention'

function playMessageNotificationSound() {
  const { globalAudioRefs } = baseCommonStore.getState()
  globalAudioRefs.message?.current?.play()
}

/** 处理本地发送消息最开始的事件，这个时候刚开始发送 */
function onSendMessage(message: IIMMessage) {
  const { updateMessagesByConversation } = baseImStore.getState()
  updateMessagesByConversation(message.conversationID, [message]!, 'push')
}
function updateSendFailedMessages() {
  const { messagesByConversation, updateMessagesByConversation } = baseImStore.getState()
  messagesByConversation.forEach(conversation => {
    const messages = conversation.messages.filter(item => {
      // 可以全部认为发送失败，中间如果成功了，会自动更新
      return item.direction === ZIMMessageDirection.Send && item.sentStatus === ZIMMessageSentStatus.Sending
    })
    updateMessagesByConversation(
      conversation.conversationId,
      produce(messages, draft => {
        draft.forEach(item => {
          item.sentStatus = ZIMMessageSentStatus.Failed
        })
      }),
      'update'
    )
  })
}

type ISendMessageParams = Parameters<ZIM['sendMessage']>
export const sendMessage = (
  message: ISendMessageParams[0],
  toConversationId: ISendMessageParams[1],
  conversationType: ISendMessageParams[2],
  config?: ISendMessageParams[3],
  notification?: ISendMessageParams[4]
) => {
  return getImInstance()
    .sendMessage(
      message,
      toConversationId,
      conversationType,
      {
        // @ts-ignore
        priority: ZIMMessagePriority.Low,
        hasReceipt: true,
        ...config,
      },
      {
        onMessageAttached: onSendMessage,
        ...(notification || {}),
      }
    )
    .catch(error => {
      // 发送失败后更新消息状态，web 端超时没有看到有回调
      updateSendFailedMessages()
      return Promise.reject(error)
    })
}

/** 重发消息 */
export async function reSendMessage(message: IIMMessage, conversation: IIMConversation) {
  // 先删除
  deleteMessages([message], conversation, false)
  // 走转发逻辑即可
  forwardMessage(message, conversation)
}

/** 在会话中显示格式化时间 */
export function formatMessageTimeInConversation(time: number) {
  if (dayjs().isSame(time, 'day')) {
    return formatDate(time, 'HH:mm')
  }
  if (dayjs().subtract(1, 'day').isSame(time, 'day')) {
    return t`helper_message_0jp5jdxnde`
  }
  // 今年
  if (dayjs().isSame(time, 'year')) {
    return formatDate(time, 'MM-DD')
  }
  return formatDate(time, 'YYYY-MM-DD')
}
export function formatMessageTimeGroup(time: number) {
  if (dayjs().isSame(time, 'day')) {
    return t`helper_message_oxygd4ytur`
  }
  if (dayjs().subtract(1, 'day').isSame(time, 'day')) {
    return t`helper_message_0jp5jdxnde`
  }
  // 今年
  if (dayjs().isSame(time, 'year')) {
    return formatDate(time, 'MM-DD')
  }
  return formatDate(time, 'YYYY-MM-DD')
}
// 红包领取详情时间显示
export function formatTimeInRedPacket(time: number) {
  if (dayjs().isSame(time, 'day')) {
    return formatDate(time, 'HH:mm')
  }
  if (dayjs().subtract(1, 'day').isSame(time, 'day')) {
    return `${t`helper_message_0jp5jdxnde`} ${formatDate(time, 'HH:mm')}`
  }
  // 今年
  if (dayjs().isSame(time, 'year')) {
    return formatDate(time, 'MM-DD HH:mm')
  }
  return formatDate(time, 'YYYY-MM-DD HH:mm')
}

/** 在聊天中显示格式化时间 */
export function formatMessageTimeInChat(time: number) {
  return formatDate(time, 'HH:mm')
}

/** 将消息按发送时间分类 */
export function getMessagesGroupsByTime(messages: IIMMessage[]) {
  const groups: IIMMessage[][] = []
  let lastTime = 0
  let lastGroup: IIMMessage[] = []
  groups.push(lastGroup)
  messages.forEach(message => {
    const timestamp = Number(message.timestamp)
    // 间隔大于 10 分钟为一组
    if (timestamp - lastTime > 10 * 60 * 1000) {
      lastGroup = []
      groups.push(lastGroup)
    }
    lastGroup.push(message)
    lastTime = timestamp
  })
  return groups.filter(group => group.length > 0)
}
export type IAppendExtraDataParams = {
  /** 默认不用传，只有群聊消息时需要传入 */
  fromNickname?: string
  /** 头像，不传 */
  avatarUrl?: string
  /** 子类型 */
  secondType?: string
  /** 预览图 */
  previewUrl?: string
  /** 艾特信息 */
  atMsgMap?: string
}
/** 附加额外消息的字段说明 */
export function appendExtraData(params: IAppendExtraDataParams) {
  const { userInfo } = baseUserStore.getState()
  return JSON.stringify({
    avatarUrl: userInfo.avatarPath,
    fromNickname: userInfo.nickName,
    ...params,
  })
}
export function getExtraDataFromMessage(message?: IIMMessage) {
  if (!message) {
    return {} as IAppendExtraDataParams
  }
  let result = {} as IAppendExtraDataParams
  try {
    result = JSON.parse(message.extendedData || '{}')
  } catch (error) {
    result.fromNickname = message.conversationID
  }

  return result
}

/** 根据文件名获取文件类型 */
export function getMessageFileType(name: string, isSend = true) {
  const suffix = name.split('.').pop()?.toLowerCase()
  let type: ZIMMessageType = ZIMMessageType.File
  const map = isSend ? IMFileTypesMapWhenSend : IMFileTypesMap
  Object.keys(map).forEach(key => {
    if (map[key].includes(suffix)) {
      type = key as any
    }
  })

  return Number(type)
}
let listenTime: number
/** 处理是否可以播放声音 */
async function handleCanPlayMessageNotification(messages: IIMMessage[]) {
  // 这里刚进入页面时有时会接收到已收到过的消息，而且无法辨别，所以加哥时间辨别
  if (!listenTime || Date.now() - listenTime < 2000) {
    return
  }
  const { imConfig } = baseUserStore.getState()
  const { myGroupList, joinGroupList } = baseAddressBookStore.getState()
  const allGroups = [...myGroupList, ...joinGroupList]
  messages = messages.filter(item => item.direction === ZIMMessageDirection.Receive)
  let notificationMessage: any = messages.find(item => {
    return item.conversationType === ZIMConversationType.Peer
  })
  if (!notificationMessage) {
    const groupMessages = messages.filter(item => item.conversationType === ZIMConversationType.Group)
    const groups = groupMessages.map(item => allGroups.find(item2 => isSameUid(item2.groupId, item.conversationID)))
    notificationMessage = groups.find(item => item?.messageDisturb === ZIMConversationNotificationStatus.Notify)
  }
  // 对于关掉的群如果艾特了自己，也可以通知
  if (!notificationMessage) {
    notificationMessage = messages.find(item => isAtMe(item))
  }
  if (imConfig.soundSwitch === UserSoundNotifyEnabledEnum.yes && notificationMessage) {
    playMessageNotificationSound()
  }
}
export function ignoreMessage(message: IIMMessage) {
  return [ZIMMessageType.Command].includes(message.type)
}
/** 全局处理收到消息的情况 */
export function bindEventOnReceiveMessage() {
  baseImStore.subscribe(
    state => state.imIsLogin,
    isLogin => {
      listenTime = isLogin ? Date.now() : 0
    }
  )
  const events = [ZIMEventEnum.message, ZIMEventEnum.receiveGroupMessage]
  // 不用取消
  events.forEach(event => {
    addEventListenerOnIm(event as ZIMEventEnum.message, (_, data) => {
      const { updateMessagesByConversation } = baseImStore.getState()
      const messages = data.messageList.filter(message => {
        // 指令消息就不展示了，也不会被存储
        return !ignoreMessage(message)
      })
      if (messages.length === 0) {
        return
      }
      updateMessagesByConversation(data.fromConversationID, messages, 'update')
      handleCanPlayMessageNotification(messages)
    })
  })
}

/** 全局处理发送消息成功的情况 */
export function bindEventOnMessageSentStatsChange() {
  addEventListenerOnIm(ZIMEventEnum.messageSentStatusChanged, (_, data) => {
    const { updateMessagesByConversation } = baseImStore.getState()
    data.infos.forEach(item => {
      if (ignoreMessage(item.message)) {
        return
      }
      // 可以依次更新
      updateMessagesByConversation(item.message.conversationID, [item.message]!, 'update')
    })
  })
}
/** 刚刚删除的会话 id，自己删除也会收到服务器的回调，避免冲突 */
let clearConversationMessagesConversationId = ''
/** 处理服务器删除消息的回调 */
export function binEventOnMessageDelete() {
  addEventListenerOnIm(ZIMEventEnum.messageDeleted, (_, data) => {
    const { updateMessagesByConversation } = baseImStore.getState()
    const { conversationID, conversationType, isDeleteConversationAllMessage, messageList } = data
    // 避免重复
    if (conversationID === clearConversationMessagesConversationId) {
      clearConversationMessagesConversationId = ''
      return
    }
    if (isDeleteConversationAllMessage) {
      updateMessagesByConversation(conversationID, [], 'replace')
    } else {
      updateMessagesByConversation(conversationID, messageList, 'delete')
    }
  })
}
/** 处理服务器撤回消息的回调 */
export function binEventOnMessageRevoke() {
  addEventListenerOnIm(ZIMEventEnum.messageRevokeReceived, (_, data) => {
    const { updateMessagesByConversation } = baseImStore.getState()
    const { messageList } = data
    messageList.forEach(item => {
      updateMessagesByConversation(item.conversationID, messageList, 'update')
    })
  })
}
/** 处理收到消息已读的情况 */
export function binEventOnMessageRead() {
  addEventListenerOnIm(ZIMEventEnum.messageReceiptChanged, (_, data) => {
    const { updateMessagesByConversation, messagesByConversation } = baseImStore.getState()
    const { infos } = data
    infos.forEach(item => {
      const conversation = messagesByConversation.find(item2 => item2.conversationId === item.conversationID)
      // 这里找不到就算了
      if (!conversation) {
        return
      }
      const message = conversation.messages.find(item2 => item2.messageID === item.messageID)
      // 同样，没有消息的话也可以不管
      if (!message || message.direction !== ZIMMessageDirection.Send) {
        return
      }
      updateMessagesByConversation(
        item.conversationID,
        [
          produce(message, draft => {
            draft.receiptStatus = item.status
            draft.readMemberCount = item.readMemberCount
            draft.unreadMemberCount = item.unreadMemberCount
          }),
        ],
        'update'
      )
    })
  })
}
/** 删除消息 */
export async function deleteMessages(messages: IIMMessage[], conversation: IIMConversation, needConfirm = true) {
  if (needConfirm) {
    await popBoxConfirm(t`helper_message_fugvl05ct4`, t`helper_message_2vml_jf2mx`)
  }
  const { updateMessagesByConversation } = baseImStore.getState()
  getImInstance().deleteMessages(messages, conversation.conversationID, conversation.type, {
    isAlsoDeleteServerMessage: false,
  })
  getImInstance().deleteMessages(messages, conversation.conversationID, conversation.type, {
    isAlsoDeleteServerMessage: true,
  })
  updateMessagesByConversation(conversation.conversationID, messages, 'delete')
  if (needConfirm) {
    Message.success(t`helper_message_oqdnd_extp`)
  }
}

/** 处理本地发送消息上传文件进度 */
export function onMediaUploadingProgress(message: IIMMediaMessage, currentFileSize: number, totalFileSize: number) {
  const { updateMessagesByConversation } = baseImStore.getState()
  message.uploadedSize = currentFileSize
  message.fileSize = totalFileSize
  updateMessagesByConversation(message.conversationID, [message]!, 'update')
}

/** 格式化媒体时间 */
export function formatMediaTime(duration = 0) {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return dayjs(date)
    .add(duration || 0, 'second')
    .format(duration >= 3600 ? 'HH:mm:ss' : 'mm:ss')
}

export async function forwardMessage(message: IIMMessage, conversation: IIMConversation) {
  const zim = getImInstance()
  switch (message.type) {
    case ZIMMessageType.Image:
    case ZIMMessageType.Video:
    case ZIMMessageType.Audio:
    case ZIMMessageType.File:
      const medialMessage = message as IIMMediaMessage
      // 只保留必要属性
      const props = [
        'type',
        'fileLocalPath',
        'thumbnailDownloadUrl',
        'fileDownloadUrl',
        'fileName',
        'fileSize',
        'fileUID',
        'largeImageDownloadUrl',
        'originalImageWidth',
        'originalImageHeight',
        'thumbnailWidth',
        'thumbnailHeight',
        'largeImageWidth',
        'largeImageHeight',
        'videoDuration',
        'videoFirstFrameDownloadUrl',
        'videoFirstFrameWidth',
        'videoFirstFrameHeight',
      ]
      const newMessage: IIMMediaMessage = {} as any
      props.forEach(prop => {
        newMessage[prop] = medialMessage[prop]
      })
      medialMessage.extendedData = appendExtraData({})
      // TODO: 还有问题，转发会出 bug，图片和视频大小等没办法传过去
      return sendMediaMessage(newMessage.fileLocalPath, conversation, newMessage)
    case ZIMMessageType.Text:
      return sendMessage(
        {
          message: message.message,
          type: message.type,
          extendedData: appendExtraData({}),
        },
        conversation.conversationID,
        conversation.type
      )
    default:
      break
  }
}
let waitReadMessages = {} as Record<string, IIMMessage[]>
const debounceSendMessagesReceiptRead = debounce(() => {
  const zim = getImInstance()
  Object.values(waitReadMessages).forEach(messages => {
    if (!messages[0]) {
      return
    }
    // 分批发送
    const messageGroups = chunk(messages, 8)
    messageGroups.forEach(group => {
      zim.sendMessageReceiptsRead(group, group[0].conversationID, group[0].conversationType)
    })
  })
  waitReadMessages = {}
}, 500)
/** 设置消息为已读，内部已经做了批量和延迟处理 */
export function sendMessagesReceiptRead(messages: IIMMessage[]) {
  if (!messages[0]) {
    return
  }
  if (waitReadMessages[messages[0].conversationID]) {
    waitReadMessages[messages[0].conversationID].push(...messages)
  } else {
    waitReadMessages[messages[0].conversationID] = messages
  }
  debounceSendMessagesReceiptRead()
}
/** 删除会话 */
export async function deleteConversation(conversation: IIMConversation, needConfirm = true) {
  const { updateConversations } = baseImStore.getState()
  const zim = getImInstance()
  if (needConfirm) {
    await popBoxConfirm(t`helper_message_fugvl05ct4`, t`helper_message_ged1hbl6c6`)
  }
  // 先清空本地
  zim.deleteAllMessage(conversation.conversationID, conversation.type, {
    isAlsoDeleteServerMessage: false,
  })
  zim.deleteAllMessage(conversation.conversationID, conversation.type, {
    isAlsoDeleteServerMessage: true,
  })
  zim.deleteConversation(conversation.conversationID, conversation.type, {
    isAlsoDeleteServerConversation: true,
  })
  // 否则和会话通知冲突了
  setTimeout(() => {
    updateConversations([conversation], 'delete')
  }, 500)
  if (needConfirm) {
    Message.success(t`helper_message_oqdnd_extp`)
  }
}

/** 清空聊天会话 */
export async function clearConversationMessages(conversation: IIMConversation) {
  const { updateMessagesByConversation } = baseImStore.getState()
  const zim = getImInstance()
  await popBoxConfirm(t`helper_message_fugvl05ct4`, t`helper_message_cfq3xh_jii`)
  // 首先快速清掉本地记录，否则可能清空后触发加载更多，这是本地记录还没删除
  zim.deleteAllMessage(conversation.conversationID, conversation.type, {
    isAlsoDeleteServerMessage: false,
  })
  // 然后再请求服务器
  zim
    .deleteAllMessage(conversation.conversationID, conversation.type, {
      isAlsoDeleteServerMessage: true,
    })
    .then(() => {
      clearConversationMessagesConversationId = conversation.conversationID
    })

  updateMessagesByConversation(conversation.conversationID, [], 'replace')
  Message.success(t`helper_message_vuhq9kavrv`)
}

export function getFileIcon(fileName: string) {
  const fileIcon = {
    pdf: 'icon_chat_document_pdf',
    doc: 'icon_chat_document_doc',
    docx: 'icon_chat_document_docx',
    ppt: 'icon_chat_document_pptx',
    xls: 'icon_chat_document_excel',
    xlsx: 'icon_chat_document_excel',
    zip: 'icon_chat_document_zip',
    gif: 'icon_chat_document_gif',
    txt: 'icon_chat_document_txt',
    mp4: 'icon_chat_document_video',
    mp3: 'icon_chat_document_mp3',
    html: 'icon_chat_document_html',
    psd: 'icon_chat_document_psd',
  }

  return fileIcon[fileName.split('.').pop() || ''] || 'icon_chat_document_unknown'
}
export function getFileSizeHuman(kb: number) {
  if (kb < 1024) {
    return `${kb.toFixed(2)}KB`
  }
  if (kb < 1024 * 1024) {
    return `${(kb / 1024).toFixed(2)}MB`
  }
  return `${(kb / 1024 / 1024).toFixed(2)}GB`
}
// 波形高度数组
export const waveHeightArr = [
  // 进度条高度
  6.6, 4.4, 6.6, 11, 15.4, 22, 15.4, 4.4, 11, 3.3, 2.2, 4.4, 8.8, 6.6, 3.3, 4.4, 3.3, 6.6, 4.4, 6.6, 11, 15.4, 15.4,
  4.4, 11, 3.3, 2.2, 4.4, 10, 6.6, 3.3, 4.4, 3.3, 6.6, 3.3, 4.4, 2.2,
]
/**
 * 这里的类型文件有点过时了，所以直接 any，参考官方源码即可
 * @param recorder js-audio-recorder 实例
 */
export async function voiceToMp3File(recorder: any) {
  // lamejs npm 版本是有问题的，所以依赖使用了 github 版本
  const lamejs = await import('lamejs').then(res => res.default)
  const wavDataView = recorder.getWAV()
  // 获取 wav 头信息
  const wav = lamejs.WavHeader.readHeader(wavDataView) // 此处其实可以不用去读 wav 头信息，毕竟有对应的 config 配置
  const { channels, sampleRate } = wav
  const mp3enc = new lamejs.Mp3Encoder(channels, sampleRate, 128)
  // 获取左右通道数据
  const result = recorder.getChannelData()
  const buffer: any[] = []

  const leftData = result.left && new Int16Array(result.left.buffer, 0, result.left.byteLength / 2)
  const rightData = result.right && new Int16Array(result.right.buffer, 0, result.right.byteLength / 2)
  const remaining = leftData.length + (rightData ? rightData.length : 0)

  const maxSamples = 1152
  for (let i = 0; i < remaining; i += maxSamples) {
    const left = leftData.subarray(i, i + maxSamples)
    let right = null
    let mp3buf: any

    if (channels === 2) {
      right = rightData.subarray(i, i + maxSamples)
      mp3buf = mp3enc.encodeBuffer(left, right)
    } else {
      mp3buf = mp3enc.encodeBuffer(left)
    }

    if (mp3buf.length > 0) {
      buffer.push(mp3buf)
    }
  }

  const enc = mp3enc.flush()

  if (enc.length > 0) {
    buffer.push(enc)
  }

  const blob = new Blob(buffer, { type: 'audio/mp3' })

  return new File([blob], `voice_${Date.now()}.mp3`, { type: 'audio/mp3' })
}

export function sendMediaMessage(
  file: File | undefined,
  conversation: IIMConversation,
  override: Partial<IIMMediaMessageBase> = {}
) {
  if (!file && !override.fileDownloadUrl) {
    Message.error(t`helper_message_b5j5vtgb6j`)
    return Promise.reject()
  }
  const zim = getImInstance()
  // TODO: 获取图片和视频的宽高信息传入
  const message: IIMMediaMessageBase = {
    // 主要是录音这里指定为语音
    // @ts-ignore
    type: getMessageFileType(file?.name || ''),
    fileLocalPath: file,
    extendedData: appendExtraData({}),
    ...override,
  }
  return zim
    .sendMediaMessage(
      message,
      conversation!.conversationID,
      conversation!.type,
      {
        priority: ZIMMessagePriority.Low,
        hasReceipt: true,
      },
      {
        onMessageAttached: onSendMessage,
        onMediaUploadingProgress,
      }
    )
    .catch(error => {
      // 发送失败后更新消息状态，web 端超时没有看到有回调
      updateSendFailedMessages()
      return Promise.reject(error)
    })
}

export function sortMessages(messages: IIMMessage[]) {
  const sorted = messages.slice().sort((a, b) => {
    return Number(a.timestamp) - Number(b.timestamp)
  })
  return sorted
}
