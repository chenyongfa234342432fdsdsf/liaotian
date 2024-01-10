// 信令消息相关

import { PLATFORM_ENUM } from '@/constants/env'
import EventBus from '@/plugins/event-bus'
import { CommandTypeEnum, ZIMEventEnum, ZIMMessageType } from '@/plugins/im/constants'
import { addEventListenerOnIm } from '@/plugins/im/event'
import { IIMMessage } from '@/plugins/im/types'
import { getCurrentPlatform } from '../env'

const commandEventBus = new EventBus()
/** 命令是否相同 */
export function isSameCommand(a: Uint8Array, b: Uint8Array) {
  return a.byteLength === b.byteLength && a.every((value, index) => value === b[index])
}
let currentPlatform = '' as PLATFORM_ENUM
getCurrentPlatform().then(res => (currentPlatform = res))
function isSamePlatformWhenEndLogin(b?: PLATFORM_ENUM) {
  if (!b) return false
  const a = currentPlatform
  // 禁止同平台登录
  return (
    a === b ||
    (a === PLATFORM_ENUM.WEB && b === PLATFORM_ENUM.H5) ||
    (a === PLATFORM_ENUM.MAC && b === PLATFORM_ENUM.WINDOWS) ||
    (a === PLATFORM_ENUM.WINDOWS && b === PLATFORM_ENUM.MAC)
  )
}
/** 获取是否为登录信令和对应平台 */
export function getIsEndLoginCommand(command: Uint8Array) {
  const platform = {
    0x01: PLATFORM_ENUM.ANDROID,
    0x02: PLATFORM_ENUM.IOS,
    0x03: PLATFORM_ENUM.WEB,
    0x04: PLATFORM_ENUM.H5,
    0x05: PLATFORM_ENUM.MAC,
    0x06: PLATFORM_ENUM.WINDOWS,
  }[command[0]]

  return isSamePlatformWhenEndLogin(platform)
}

/** 获取是否为撤回信令，并返回对应的消息 id */
export function getRevokeCommandMessageIds(command: Uint8Array) {
  const messageIds = Array.from(command)
    .map(item => String.fromCharCode(item))
    .join('')
    .split(',')

  return messageIds
}
function onCommand(messageList: IIMMessage[]) {
  const conversationID = messageList[0]?.conversationID
  if (!conversationID) return
  const commands = messageList.filter(item => item.type === ZIMMessageType.Command)
  commands.forEach(item => {
    const type = (item.message as Uint8Array)[1]
    const data = item.message.slice(3)
    commandEventBus.emit(type.toString(), data as Uint8Array, item)
  })
}
/** 处理监听信令消息 */
export function bindEventOnCommand() {
  addEventListenerOnIm(ZIMEventEnum.message, (_, { messageList }) => {
    onCommand(messageList)
  })
  addEventListenerOnIm(ZIMEventEnum.receiveGroupMessage, (_, { messageList }) => {
    onCommand(messageList)
  })
}
/**
 * 订阅信令消息
 * @param event 信令类型
 * @param fn 回调函数，参数为信令数据和信令消息
 */
export function subscribeCommandMessage<T = Uint8Array>(
  event: CommandTypeEnum,
  fn: (data: T, message: IIMMessage) => void
) {
  return commandEventBus.on(event.toString(), fn)
}
/** 取消订阅信令消息 */
export function unsubscribeCommandMessage(event: CommandTypeEnum, fn: any) {
  return commandEventBus.off(event.toString(), fn)
}
