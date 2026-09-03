'use client'

import { useEffect } from 'react'

export function LocatorUI() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    import('@locator/runtime').then(({ default: setupLocatorUI }) => {
      setupLocatorUI()
    })
  }, [])

  return null
}
