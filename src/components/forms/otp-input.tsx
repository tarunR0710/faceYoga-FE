'use client'

import { useRef, useState, useEffect, KeyboardEvent, ClipboardEvent } from 'react'
import { cn } from '@/lib/utils'

interface OtpInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  error?: string
}

export function OtpInput({
  length = 6,
  value,
  onChange,
  disabled = false,
  error,
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  const valueArray = value.split('').slice(0, length)

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index: number, digit: string) => {
    if (disabled) return

    const newDigit = digit.slice(-1)
    if (newDigit && !/^\d$/.test(newDigit)) return

    const newValueArray = [...valueArray]
    while (newValueArray.length < length) {
      newValueArray.push('')
    }
    newValueArray[index] = newDigit

    const newValue = newValueArray.join('')
    onChange(newValue)

    if (newDigit && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return

    if (e.key === 'Backspace') {
      if (!valueArray[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      } else {
        handleChange(index, '')
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return
    e.preventDefault()

    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (pastedData) {
      onChange(pastedData)
      const focusIndex = Math.min(pastedData.length, length - 1)
      inputRefs.current[focusIndex]?.focus()
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-center gap-2 sm:gap-3">
        {Array.from({ length }).map((_, index) => {
          const isFilled = !!valueArray[index]
          const isFocused = focusedIndex === index

          return (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={1}
              value={valueArray[index] || ''}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              disabled={disabled}
              className={cn(
                'w-11 h-13 sm:w-12 sm:h-14 text-center text-[20px] rounded-xl transition-all duration-200',
                'focus:outline-none',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                error
                  ? 'bg-red-50 border border-red-300 text-red-600'
                  : isFocused
                    ? 'bg-white border-2 border-[#111] text-[#111]'
                    : isFilled
                      ? 'bg-[#f0f0f0] border border-[#ddd] text-[#111]'
                      : 'bg-[#f5f5f5] border border-transparent text-[#111]'
              )}
              style={{ fontWeight: 500 }}
            />
          )
        })}
      </div>
      {error && (
        <p className="text-center text-[13px] text-red-500">{error}</p>
      )}
    </div>
  )
}
