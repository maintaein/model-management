'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import { css, cx } from '@/styled-system/css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cx(
        css({
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'medium',
          borderRadius: '0.375rem',
          transition: 'all 0.2s',
          cursor: 'pointer',
          border: 'none',
          outline: 'none',
          _disabled: {
            opacity: 0.5,
            cursor: 'not-allowed',
          },
          _focus: {
            ringWidth: '2px',
            ringOffset: '2px',
          },
        }),
        // variant 스타일
        variant === 'primary' &&
          css({
            bg: 'brand.800',
            color: 'white',
            _hover: {
              bg: 'brand.900',
            },
            _focus: {
              ringColor: 'brand.500',
            },
          }),
        variant === 'secondary' &&
          css({
            bg: 'brand.200',
            color: 'brand.900',
            _hover: {
              bg: 'brand.300',
            },
            _focus: {
              ringColor: 'brand.400',
            },
          }),
        variant === 'danger' &&
          css({
            bg: '#dc2626',
            color: 'white',
            _hover: {
              bg: '#b91c1c',
            },
            _focus: {
              ringColor: '#f87171',
            },
          }),
        // size 스타일
        size === 'sm' &&
          css({
            px: '0.75rem',
            py: '0.5rem',
            fontSize: '0.875rem',
          }),
        size === 'md' &&
          css({
            px: '1rem',
            py: '0.625rem',
            fontSize: '1rem',
          }),
        size === 'lg' &&
          css({
            px: '1.5rem',
            py: '0.75rem',
            fontSize: '1.125rem',
          }),
        className
      )}
      {...props}
    >
      {loading && (
        <span
          className={css({
            display: 'inline-block',
            width: '1rem',
            height: '1rem',
            marginRight: '0.5rem',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.6s linear infinite',
          })}
        />
      )}
      {children}
    </button>
  )
}
