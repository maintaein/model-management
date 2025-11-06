'use client'

import { HTMLAttributes } from 'react'
import { css, cx } from '@/styled-system/css'

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical'
  color?: string
  thickness?: string
}

export function Divider({
  orientation = 'horizontal',
  color = 'gray.200',
  thickness = '1px',
  className,
  ...props
}: DividerProps) {
  return (
    <hr
      className={cx(
        css({
          border: 'none',
          bg: color,
        }),
        orientation === 'horizontal' &&
          css({
            width: '100%',
            height: thickness,
          }),
        orientation === 'vertical' &&
          css({
            width: thickness,
            height: '100%',
            display: 'inline-block',
          }),
        className
      )}
      {...props}
    />
  )
}
