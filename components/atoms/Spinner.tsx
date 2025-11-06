'use client'

import { HTMLAttributes } from 'react'
import { css, cx } from '@/styled-system/css'

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
}

export function Spinner({ size = 'md', className, ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="로딩 중"
      className={cx(
        css({
          display: 'inline-block',
          border: '3px solid',
          borderColor: 'brand.200',
          borderTopColor: 'brand.600',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite',
        }),
        size === 'sm' &&
          css({
            width: '1rem',
            height: '1rem',
          }),
        size === 'md' &&
          css({
            width: '2rem',
            height: '2rem',
          }),
        size === 'lg' &&
          css({
            width: '3rem',
            height: '3rem',
          }),
        className
      )}
      {...props}
    />
  )
}
