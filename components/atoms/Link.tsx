'use client'

import NextLink from 'next/link'
import { AnchorHTMLAttributes } from 'react'
import { css, cx } from '@/styled-system/css'

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string
  variant?: 'default' | 'underline' | 'button'
  disabled?: boolean
}

export function Link({
  href,
  variant = 'default',
  disabled = false,
  className,
  children,
  ...props
}: LinkProps) {
  if (disabled) {
    return (
      <span
        className={cx(
          css({
            cursor: 'not-allowed',
            opacity: 0.5,
          }),
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }

  return (
    <NextLink
      href={href}
      className={cx(
        css({
          transition: 'all 0.2s',
          cursor: 'pointer',
        }),
        variant === 'default' &&
          css({
            color: 'primary',
            _hover: {
              opacity: 0.7,
            },
          }),
        variant === 'underline' &&
          css({
            color: 'primary',
            textDecoration: 'underline',
            _hover: {
              textDecorationThickness: '2px',
            },
          }),
        variant === 'button' &&
          css({
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: '1rem',
            py: '0.5rem',
            bg: 'primary',
            color: 'white',
            borderRadius: 'lg',
            fontWeight: 'medium',
            _hover: {
              opacity: 0.9,
            },
          }),
        className
      )}
      {...props}
    >
      {children}
    </NextLink>
  )
}
