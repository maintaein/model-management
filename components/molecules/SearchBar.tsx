'use client'

import { useState, ChangeEvent, KeyboardEvent } from 'react'
import { css, cx } from '@/styled-system/css'
import { Icon } from '@/components/atoms'

export interface SearchBarProps {
  placeholder?: string
  onSearch: (query: string) => void
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export function SearchBar({
  placeholder = '검색...',
  onSearch,
  value: controlledValue,
  onChange: controlledOnChange,
  className,
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState('')

  // Controlled vs Uncontrolled
  const value = controlledValue !== undefined ? controlledValue : internalValue
  const setValue = controlledOnChange || setInternalValue

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(value)
    }
  }

  const handleClear = () => {
    setValue('')
    onSearch('')
  }

  const handleSearch = () => {
    onSearch(value)
  }

  return (
    <div
      className={cx(
        css({
          position: 'relative',
          width: '100%',
          maxWidth: '32rem',
        }),
        className
      )}
    >
      {/* 검색 아이콘 */}
      <div
        className={css({
          position: 'absolute',
          left: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        })}
      >
        <Icon name="search" size="1.25rem" color="gray.400" />
      </div>

      {/* 입력 필드 */}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={css({
          width: '100%',
          pl: '3rem',
          pr: value ? '6rem' : '1rem',
          py: '0.75rem',
          fontSize: 'base',
          border: '1px solid',
          borderColor: 'gray.300',
          borderRadius: 'lg',
          bg: 'white',
          transition: 'all 0.2s',
          _focus: {
            outline: 'none',
            borderColor: 'accent',
            ringWidth: '2px',
            ringColor: 'rgba(0, 188, 212, 0.2)',
          },
          _placeholder: {
            color: 'gray.400',
          },
        })}
      />

      {/* 클리어/검색 버튼 */}
      {value && (
        <div
          className={css({
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            gap: '0.5rem',
          })}
        >
          {/* 클리어 버튼 */}
          <button
            type="button"
            onClick={handleClear}
            className={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2rem',
              height: '2rem',
              borderRadius: 'full',
              border: 'none',
              bg: 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s',
              _hover: {
                bg: 'gray.100',
              },
            })}
            aria-label="검색어 지우기"
          >
            <Icon name="close" size="1.125rem" color="gray.500" />
          </button>

          {/* 검색 버튼 */}
          <button
            type="button"
            onClick={handleSearch}
            className={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: '0.75rem',
              py: '0.375rem',
              borderRadius: 'md',
              border: 'none',
              bg: 'accent',
              color: 'white',
              fontSize: 'sm',
              fontWeight: 'medium',
              cursor: 'pointer',
              transition: 'all 0.2s',
              _hover: {
                opacity: 0.9,
              },
            })}
            aria-label="검색"
          >
            검색
          </button>
        </div>
      )}
    </div>
  )
}
