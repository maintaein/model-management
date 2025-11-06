'use client'

import { ReactElement, cloneElement } from 'react'
import { css } from '@/styled-system/css'
import type { InputProps, TextareaProps, SelectProps } from '@/components/atoms'

// 공통 props 타입 정의
interface CommonFormProps {
  label?: string
  error?: string
}

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
  // React.cloneElement는 제네릭을 사용하여 타입 안전성 보장
  const childWithProps = cloneElement<CommonFormProps>(children, {
    label,
    error,
  })

  return (
    <div className={css({ width: '100%', marginBottom: '1rem' })}>
      {childWithProps}
    </div>
  )
}
