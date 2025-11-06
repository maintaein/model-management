'use client'

import { useEffect } from 'react'
import { css, cx } from '@/styled-system/css'

export interface ToastProps {
  message: string
  variant?: 'success' | 'error' | 'info'
  duration?: number
  onClose: () => void
}

export function Toast({
  message,
  variant = 'info',
  duration = 3000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div
      className={css({
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        zIndex: 50,
        minWidth: { base: '20rem', md: '24rem' },
        animation: 'slideInRight 0.3s ease-out',
      })}
    >
      <div
        className={cx(
          css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            borderRadius: '0.5rem',
            boxShadow:
              '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            color: 'white',
          }),
          variant === 'success' &&
            css({
              bg: '#059669',
            }),
          variant === 'error' &&
            css({
              bg: '#dc2626',
            }),
          variant === 'info' &&
            css({
              bg: '#3b82f6',
            })
        )}
      >
        <p className={css({ fontSize: '0.875rem', fontWeight: 'medium' })}>
          {message}
        </p>
        <button
          onClick={onClose}
          className={css({
            marginLeft: '1rem',
            padding: '0.25rem',
            borderRadius: '0.25rem',
            transition: 'all 0.2s',
            _hover: {
              bg: 'rgba(255, 255, 255, 0.2)',
            },
          })}
          aria-label="닫기"
        >
          <svg
            className={css({ width: '1.25rem', height: '1.25rem' })}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
