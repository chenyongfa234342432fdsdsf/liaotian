import { useSize } from 'ahooks'
import { debounce } from 'lodash'
import { useEffect, useRef, useState } from 'react'

function checkIsBottom(reference) {
  return Math.floor(reference.scrollHeight - reference.scrollTop) - 2 <= reference.clientHeight
}

function useScrollTrackerYAxis() {
  const scroller = useRef<HTMLDivElement>(null)
  const [reference, setreference] = useState<HTMLDivElement>()
  const [isBottomSub, setisBottomSub] = useState<boolean>(true)
  const size = useSize(scroller)

  useEffect(() => {
    const setRef = () => {
      if (scroller && scroller.current) {
        setreference(scroller.current)
      }
    }
    setRef()
  }, [scroller, size])

  // update position
  useEffect(() => {
    function updateScrollPosition(e) {
      if (reference) {
        const isBottom = checkIsBottom(reference)
        setisBottomSub(isBottom)
      }
    }
    const debouncedUpdate = debounce(updateScrollPosition, 500)
    if (reference) {
      reference.addEventListener('scroll', debouncedUpdate)
    }

    return () => {
      if (reference) reference.removeEventListener('scroll', debouncedUpdate)
    }
  }, [reference])

  return { scroller, isBottomSub }
}

export default useScrollTrackerYAxis
