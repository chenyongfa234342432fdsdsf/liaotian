import { envIsServer } from '@/helper/env'
import React, { useEffect, useState } from 'react'

function AsyncSuspenseServer({ children, hasLoading = false }) {
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  if (envIsServer) {
    if (hasLoading) {
      return null
    }
    return null
  }

  return <React.Suspense fallback={hasLoading ? null : null}>{children}</React.Suspense>
}
export default AsyncSuspenseServer
