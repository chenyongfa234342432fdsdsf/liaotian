import { ScreenLoading } from '@/components/loading-element'
import { Root, createRoot } from 'react-dom/client'

/** 重新渲染一个 root 到 body 里，函数式调用 */
export function renderRoot(fn: (destroy: () => void) => JSX.Element, { destroyOnRouteChange = true } = {}) {
  const div = document.createElement('div')
  document.body.appendChild(div)
  let root = createRoot(div)
  const unmount = () => {
    root.unmount()
    div.remove()
    window.removeEventListener('popstate', unmount)
  }

  if (destroyOnRouteChange) {
    window.addEventListener('popstate', unmount)
  }
  root.render(fn(unmount))
}

let loadingCount = 0
let loadingRoot: Root
let loadingDivEl: HTMLDivElement
/** 请求时展示 loading */
export async function requestWithLoading<T>(promise: Promise<T>, delay = 300) {
  if (!loadingDivEl) {
    loadingDivEl = document.createElement('div')
    document.body.appendChild(loadingDivEl)
    loadingRoot = createRoot(loadingDivEl)
  }
  const timer = setTimeout(() => {
    loadingRoot.render(<ScreenLoading mask />)
  }, delay)
  loadingCount += 1
  const res = await promise.finally(() => {
    loadingCount -= 1
    if (loadingCount === 0) {
      loadingRoot.render(null)
    }
  })
  clearTimeout(timer)
  return res
}
