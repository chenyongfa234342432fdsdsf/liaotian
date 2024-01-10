type IHandler = (...args: any[]) => void

// 创建事件中心
class EventBus {
  private listeners: Record<string, IHandler[]>

  constructor() {
    this.listeners = {}
  }

  // 监听事件
  on(eventName: string, cb: IHandler) {
    this.listeners[eventName] = this.listeners[eventName] || []
    this.listeners[eventName].push(cb)

    return () => this.off(eventName, cb)
  }

  // 触发事件
  emit(eventName: string, ...args: any[]) {
    const cbs = this.listeners[eventName]
    if (cbs) {
      cbs.forEach(cb => {
        try {
          cb(...args)
        } catch (e) {
          console.error(e)
        }
      })
    }
  }

  // 移除事件
  off(eventName: string, cb: IHandler) {
    const cbs = this.listeners[eventName]
    if (cbs) {
      this.listeners[eventName] = cbs.filter(fn => fn !== cb)
    }
  }

  getEventListeners(event: string): IHandler[] | undefined {
    return this.listeners[event]
  }
}

export default EventBus
