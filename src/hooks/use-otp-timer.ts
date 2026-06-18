'use client'

import { useState, useEffect, useCallback } from 'react'
import { OTP_CONFIG } from '@/lib/constants'

export function useOtpTimer() {
  const [timeLeft, setTimeLeft] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  const startTimer = useCallback(() => {
    setTimeLeft(OTP_CONFIG.resendCooldownSeconds)
    setIsActive(true)
  }, [])

  const resetTimer = useCallback(() => {
    setTimeLeft(0)
    setIsActive(false)
  }, [])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return {
    timeLeft,
    isActive,
    canResend: !isActive && timeLeft === 0,
    startTimer,
    resetTimer,
    formattedTime: formatTime(timeLeft),
  }
}
