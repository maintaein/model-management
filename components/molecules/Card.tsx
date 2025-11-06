'use client'

import { HTMLAttributes, ReactNode } from 'react'
import { css, cx } from '@/styled-system/css'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
}

export function Card({ children, hover = false, className, ...props }: CardProps) {
  return (
    <div
      className={cx(
        css({
          bg: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          padding: { base: '1rem', md: '1.5rem' },
          transition: 'all 0.2s',
        }),
        hover &&
          css({
            _hover: {
              boxShadow:
                '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              transform: 'translateY(-2px)',
            },
          }),
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
