import { MessengerRightDrawer } from '@/features/messenger/messenger-right-drawer'
import { useUpdateEffect } from 'ahooks'
import { useState, ReactNode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

export function useMessengerRightDrawer(destroyOnClose = true) {
  const [visible, setVisible] = useState(false)
  const [children, setChildren] = useState<ReactNode>(null)
  const open = (node: ReactNode) => {
    setVisible(true)
    setChildren(node)
  }

  const close = () => {
    setVisible(false)
  }
  const [root, setRoot] = useState<any>(null)
  const node = (
    <MessengerRightDrawer destroyOnClose={destroyOnClose} onClose={close} visible={visible}>
      {children}
    </MessengerRightDrawer>
  )
  useEffect(() => {
    const divEl = document.createElement('div')
    setRoot(divEl)
    document.body.appendChild(divEl)
    const realRoot = createRoot(divEl)
    realRoot.render(node)
    setRoot(realRoot)
    return () => {
      // 多个 root 卸载这里会导致报错
      // 因此延迟执行
      setTimeout(() => {
        realRoot.unmount()
      }, 100)
      document.body.removeChild(divEl)
    }
  }, [])
  useUpdateEffect(() => {
    root.render(node)
  }, [visible, children])

  return [open, close] as const
}
