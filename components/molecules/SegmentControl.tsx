'use client'

import { HTMLAttributes } from 'react'
import { css, cx } from '@/styled-system/css'

export interface SegmentOption {
  value: string
  label: string
}

export interface SegmentControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: SegmentOption[]
  value: string
  onChange: (value: string) => void
}

export function SegmentControl({
  options,
  value,
  onChange,
  className,
  ...props
}: SegmentControlProps) {
  return (
    <div
      className={cx(
        css({
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          p: '0.25rem',
          bg: 'gray.100',
          borderRadius: '2xl',
          border: '1px solid',
          borderColor: 'gray.200',
        }),
        className
      )}
      role="tablist"
      {...props}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          onClick={() => onChange(option.value)}
          className={cx(
            css({
              px: '1.5rem',
              py: '0.5rem',
              borderRadius: 'xl',
              fontSize: 'sm',
              fontWeight: 'medium',
              transition: 'all 0.3s',
              cursor: 'pointer',
              border: 'none',
              outline: 'none',
              _focus: {
                ringWidth: '2px',
                ringColor: 'primary',
                ringOffset: '2px',
              },
            }),
            value === option.value
              ? css({
                  bg: 'white',
                  color: 'primary',
                  boxShadow: 'sm',
                })
              : css({
                  bg: 'transparent',
                  color: 'gray.600',
                  _hover: {
                    color: 'gray.900',
                  },
                })
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
