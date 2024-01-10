/* eslint-disable @typescript-eslint/no-use-before-define */
import { WsBizEnum, WsTypesEnum } from '@/constants/ws'
import { Any } from '@/plugins/ws/protobuf/ts/google/protobuf/any'
import { Response, CommonRsp } from '@/plugins/ws/protobuf/ts/proto/Response'
import { FriendDestroy } from '@/plugins/ws/protobuf/ts/proto/FriendDestroy'
import { FriendAddPush } from '@/plugins/ws/protobuf/ts/proto/FriendAddPush'
import { FriendAddPassPush } from '@/plugins/ws/protobuf/ts/proto/FriendAddPassPush'
import { UserInfoModify } from '@/plugins/ws/protobuf/ts/proto/UserInfoModify'
import { RedPackageStatusPush } from '@/plugins/ws/protobuf/ts/proto/RedPackageStatusPush'
import { subscribeReqKeys } from '../constants'

// https://cd.admin-devops.com/zentao/doc-objectLibs-custom-0-79-665.html#app=doc

/** pb 解码 */
export const PBDecode = (msg: Uint8Array): any => {
  const msgVal = Response.fromBinary(new Uint8Array(msg))

  return PBDecodeFeatures(msgVal)
}

function PBDecodeFeatures(msgVal) {
  const { type, data, biz } = msgVal || { type: undefined, data: undefined, biz: undefined }

  if ([WsTypesEnum.friendDestroy].includes(type)) {
    const val = Any.unpack(data, FriendDestroy) as FriendDestroy
    return { topic: getTopicKey(msgVal), data: val }
  }
  if ([WsTypesEnum.friendApply].includes(type)) {
    const val = Any.unpack(data, FriendAddPush) as FriendAddPush
    return { topic: getTopicKey(msgVal), data: val }
  }
  if ([WsTypesEnum.passFriendApply].includes(type)) {
    const val = Any.unpack(data, FriendAddPassPush) as FriendAddPassPush
    return { topic: getTopicKey(msgVal), data: val }
  }
  if ([WsTypesEnum.userInfoModify].includes(type)) {
    const val = Any.unpack(data, UserInfoModify) as UserInfoModify
    return { topic: getTopicKey(msgVal), data: val }
  }
  if ([WsTypesEnum.redPackageStatus].includes(type)) {
    const val = Any.unpack(data, RedPackageStatusPush) as RedPackageStatusPush
    return { topic: getTopicKey(msgVal), data: val }
  }

  return { topic: null, data: null }
}

/** json 字符串转对象 */
export const stringToJson = (message: string): any => {
  if (!message) {
    return null
  }
  try {
    message = JSON.parse(message)
  } catch (e) {
    console.warn(e)
  }
  return message
}

/** 是否为空 */
export const isEmpty = (data: any[]): boolean => !Array.isArray(data) || (Array.isArray(data) && data.length === 0)

export function alphabeticalSort(a, b) {
  return a.localeCompare(b)
}

/**
 * 按照顺序、排除某 Key 返回某对象
 * 需指定关键的 key
 */
function getSortKeyObject(val) {
  const sortKeys = Object.keys(val).sort()
  const obj = {}
  sortKeys.forEach(key => {
    if (subscribeReqKeys.includes(key) && val[key]) {
      obj[key] = val[key]
    }
  })
  return obj
}

/**
 * 解析纯字符串 topic 或者 json topic
 */
export function getTopicKey(val) {
  if (!val) {
    return ''
  }
  if (typeof val === 'string') {
    return JSON.stringify(val)
  }
  return JSON.stringify(getSortKeyObject(val))
}

export function safeSetInterval(func, delay, immediately = false) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  // 声明 timer，用于后面清除定时器
  let timer: any = null
  const interval = () => {
    // 执行对应传入函数
    func()
    // 用 timer 接收 setTimeout 返回的定时器编号
    // setTimeout 接收 interval 和 delay，等待 delay 结束后，再次执行 setTimeout
    timer = setTimeout(interval, delay)
  }
  if (immediately) {
    func()
  }
  // 第一次调用 setTimeout，调用 interval，时延为 delay
  setTimeout(interval, delay)
  // 返回一个 cancel 方法取消调用
  return {
    cancel: () => {
      // 清除 timer 编号的定时器
      clearTimeout(timer)
    },
  }
}

/**
 * 从 unSendSubTopics、unSendUnSubTopics 中找出真正应该发送的订阅，处理重复订阅、订阅取消订阅重复的情况
 */
export function getTopicsFormSubUnSub(unSendSubTopics, unSendUnSubTopics) {
  const cacheMapKeys = {}
  const subTopics: string[] = []
  const unSubTopics: string[] = []

  unSendSubTopics.forEach(topicKey => {
    if (cacheMapKeys[topicKey]) {
      // eslint-disable-next-line operator-assignment
      cacheMapKeys[topicKey] = cacheMapKeys[topicKey] + 1
    } else {
      cacheMapKeys[topicKey] = 1
    }
  })

  unSendUnSubTopics.forEach(topicKey => {
    if (cacheMapKeys[topicKey]) {
      // eslint-disable-next-line operator-assignment
      cacheMapKeys[topicKey] = cacheMapKeys[topicKey] - 1
    } else {
      cacheMapKeys[topicKey] = -1
    }
  })
  const topics = Object.keys(cacheMapKeys)
  topics.forEach(topicKey => {
    if (cacheMapKeys[topicKey] > 0) {
      subTopics.push(topicKey)
      return
    }
    if (cacheMapKeys[topicKey] < 0) {
      unSubTopics.push(topicKey)
    }
  })

  return {
    subTopics,
    unSubTopics,
  }
}
