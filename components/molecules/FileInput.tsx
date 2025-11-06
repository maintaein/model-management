'use client'

import { useRef, ChangeEvent } from 'react'
import { css, cx } from '@/styled-system/css'

export interface FileInputProps {
  label: string
  accept?: string
  onChange: (file: File | null) => void
  required?: boolean
  error?: string
  value?: File | null
  className?: string
}

export function FileInput({
  label,
  accept = 'image/*',
  onChange,
  required = false,
  error,
  value,
  className,
}: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onChange(file)
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className={cx(css({ width: '100%' }), className)}>
      {/* 라벨 */}
      <label
        className={css({
          display: 'block',
          fontSize: 'sm',
          fontWeight: 'medium',
          color: 'gray.900',
          mb: '0.5rem',
        })}
      >
        {label}
        {required && (
          <span
            className={css({
              color: 'error',
              ml: '0.25rem',
            })}
          >
            *
          </span>
        )}
      </label>

      {/* 파일 선택 영역 */}
      <div
        onClick={handleClick}
        className={cx(
          css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            p: '0.75rem 1rem',
            border: '1px solid',
            borderRadius: 'md',
            cursor: 'pointer',
            transition: 'all 0.2s',
            _hover: {
              borderColor: 'gray.400',
              bg: 'gray.50',
            },
          }),
          error
            ? css({
                borderColor: 'error',
                _focus: {
                  borderColor: 'error',
                  ringColor: 'rgba(220, 38, 38, 0.2)',
                },
              })
            : css({
                borderColor: 'gray.300',
                _focus: {
                  borderColor: 'accent',
                  ringColor: 'rgba(0, 188, 212, 0.2)',
                },
              })
        )}
      >
        {/* 파일명 또는 플레이스홀더 */}
        <span
          className={css({
            fontSize: 'sm',
            color: value ? 'gray.900' : 'gray.400',
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          })}
        >
          {value ? value.name : '선택된 파일 없음'}
        </span>

        {/* 버튼 영역 */}
        <div
          className={css({
            display: 'flex',
            gap: '0.5rem',
            ml: '1rem',
          })}
        >
          {/* 클리어 버튼 (파일이 선택된 경우에만) */}
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className={css({
                px: '0.75rem',
                py: '0.375rem',
                fontSize: 'sm',
                fontWeight: 'medium',
                color: 'gray.600',
                bg: 'gray.100',
                borderRadius: 'sm',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                _hover: {
                  bg: 'gray.200',
                },
              })}
            >
              제거
            </button>
          )}

          {/* 파일 선택 버튼 */}
          <button
            type="button"
            className={css({
              px: '0.75rem',
              py: '0.375rem',
              fontSize: 'sm',
              fontWeight: 'medium',
              color: 'white',
              bg: 'gray.700',
              borderRadius: 'sm',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              _hover: {
                bg: 'gray.800',
              },
            })}
          >
            파일 선택
          </button>
        </div>
      </div>

      {/* 숨겨진 input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className={css({ display: 'none' })}
      />

      {/* 에러 메시지 */}
      {error && (
        <p
          className={css({
            mt: '0.5rem',
            fontSize: 'sm',
            color: 'error',
          })}
        >
          {error}
        </p>
      )}
    </div>
  )
}
