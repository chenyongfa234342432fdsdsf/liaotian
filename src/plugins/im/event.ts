import type { ZIMEventHandler } from 'zego-zim-web'
import { getImInstance } from './core'
import EventBus from '../event-bus'

// 这里简单处理即可，不需要加上监听策略等复杂逻辑
const imEventBus = new EventBus()
/** 绑定 im 事件，不同之处在于外部不需要关心 zim 实例，而且可以解除监听，返回一个可以取消监听的函数 */
export function addEventListenerOnIm<K extends keyof ZIMEventHandler>(event: K, callback: ZIMEventHandler[K]) {
  const handlers = imEventBus.getEventListeners(event)
  if (!handlers || handlers.length === 0) {
    getImInstance().on(event, (...params) => {
      imEventBus.emit(event, ...params)
    })
  }
  // 同一函数可以多次监听
  return imEventBus.on(event, callback)
}

export const removeEventListenerOnIm = (event: string, callback: any) => {
  // 最后没有函数的时候也不用取消
  return imEventBus.off(event, callback)
}
