'use client'

import { TextareaHTMLAttributes, forwardRef } from 'react'
import { css, cx } from '@/styled-system/css'

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, error, className, id, rows = 4, ...props }, ref) {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={css({ width: '100%' })}>
        {label && (
          <label
            htmlFor={textareaId}
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
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
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
              resize: 'vertical',
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
