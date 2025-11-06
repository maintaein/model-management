'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import { css, cx } from '@/styled-system/css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, className, id, ...props }, ref) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={css({ width: '100%' })}>
        {label && (
          <label
            htmlFor={inputId}
            className={css({
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 'medium',
              color: 'brand.900',
              marginBottom: '0.5rem',
            })}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cx(
            css({
              display: 'block',
              width: '100%',
              px: '0.75rem',
              py: '0.625rem',
              fontSize: '1rem',
              lineHeight: '1.5',
              color: 'brand.900',
              bg: 'white',
              border: '1px solid',
              borderColor: error ? '#dc2626' : 'brand.300',
              borderRadius: '0.375rem',
              transition: 'all 0.2s',
              _focus: {
                outline: 'none',
                borderColor: error ? '#dc2626' : 'brand.500',
                ringWidth: '2px',
                ringColor: error ? '#fecaca' : 'brand.200',
              },
              _disabled: {
                bg: 'brand.100',
                cursor: 'not-allowed',
                opacity: 0.6,
              },
              _placeholder: {
                color: 'brand.400',
              },
            }),
            className
          )}
          {...props}
        />
        {error && (
          <p
            className={css({
              marginTop: '0.5rem',
              fontSize: '0.875rem',
              color: '#dc2626',
            })}
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)
