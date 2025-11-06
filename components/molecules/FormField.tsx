'use client'

import { ReactElement, cloneElement } from 'react'
import { css } from '@/styled-system/css'
import { Input, Textarea, Select } from '@/components/atoms'
import type { InputProps, TextareaProps, SelectProps } from '@/components/atoms'

// FormField가 받을 수 있는 input 컴포넌트 타입
type FormInputElement =
  | ReactElement<InputProps>
  | ReactElement<TextareaProps>
  | ReactElement<SelectProps>

export interface FormFieldProps {
  label?: string
  error?: string
  children: FormInputElement
}

export function FormField({ label, error, children }: FormFieldProps) {
  // children에게 label과 error props를 전달
  const childWithProps = cloneElement(children, {
    label,
    error,
  })

  return (
    <div className={css({ width: '100%', marginBottom: '1rem' })}>
      {childWithProps}
    </div>
  )
}
