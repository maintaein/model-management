'use client'

import { HTMLAttributes } from 'react'
import { css, cx } from '@/styled-system/css'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'error' | 'warning' | 'info'
  size?: 'sm' | 'md' | 'lg'
}

export function Badge({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cx(
        css({
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'medium',
          borderRadius: 'full',
          whiteSpace: 'nowrap',
          transition: 'all 0.2s',
        }),
        // Size variants
        size === 'sm' &&
          css({
            fontSize: 'xs',
            px: '0.5rem',
            py: '0.125rem',
          }),
        size === 'md' &&
          css({
            fontSize: 'sm',
            px: '0.625rem',
            py: '0.25rem',
          }),
        size === 'lg' &&
          css({
            fontSize: 'base',
            px: '0.75rem',
            py: '0.375rem',
          }),
        // Color variants
        variant === 'default' &&
          css({
            bg: 'gray.100',
            color: 'gray.700',
          }),
        variant === 'primary' &&
          css({
            bg: 'primary',
            color: 'white',
          }),
        variant === 'success' &&
          css({
            bg: 'success',
            color: 'white',
          }),
        variant === 'error' &&
          css({
            bg: 'error',
            color: 'white',
          }),
        variant === 'warning' &&
          css({
            bg: 'warning',
            color: 'white',
          }),
        variant === 'info' &&
          css({
            bg: 'info',
            color: 'white',
          }),
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
