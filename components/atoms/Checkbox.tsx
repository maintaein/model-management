'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import { css, cx } from '@/styled-system/css'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, className, id, ...props }, ref) {
    const checkboxId = id || label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={css({ display: 'flex', alignItems: 'center' })}>
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={cx(
            css({
              width: '1rem',
              height: '1rem',
              color: 'brand.600',
              bg: 'white',
              border: '1px solid',
              borderColor: 'brand.300',
              borderRadius: '0.25rem',
              transition: 'all 0.2s',
              cursor: 'pointer',
              _focus: {
                outline: 'none',
                ringWidth: '2px',
                ringColor: 'brand.200',
              },
              _disabled: {
                cursor: 'not-allowed',
                opacity: 0.5,
              },
            }),
            className
          )}
          {...props}
        />
        <label
          htmlFor={checkboxId}
          className={css({
            marginLeft: '0.5rem',
            fontSize: '0.875rem',
            color: 'brand.900',
            cursor: 'pointer',
            _disabled: {
              cursor: 'not-allowed',
              opacity: 0.5,
            },
          })}
        >
          {label}
        </label>
      </div>
    )
  }
)
