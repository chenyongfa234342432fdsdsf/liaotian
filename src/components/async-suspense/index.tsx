import { Spin, SpinProps } from '@nbit/arco'
import { envIsServer } from '@/helper/env'
import React, { useEffect, useState } from 'react'

function AsyncSuspense({
  children,
  hasLoading = false,
  spinProps = {},
}: {
  children: React.ReactNode
  hasLoading?: boolean
  spinProps?: SpinProps
}) {
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  if (envIsServer) {
    if (hasLoading) {
      return <Spin />
    }
    return null
  }

  return <React.Suspense fallback={hasLoading ? <Spin {...spinProps} /> : null}>{children}</React.Suspense>
}
export default AsyncSuspense
