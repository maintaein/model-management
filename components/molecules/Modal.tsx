'use client'

import { ReactNode, useEffect } from 'react'
import { css } from '@/styled-system/css'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      // 모달 열릴 때 body 스크롤 방지
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className={css({
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      })}
      onClick={onClose}
    >
      {/* 오버레이 */}
      <div
        className={css({
          position: 'absolute',
          inset: 0,
          bg: 'rgba(0, 0, 0, 0.5)',
        })}
      />

      {/* 모달 컨텐츠 */}
      <div
        className={css({
          position: 'relative',
          bg: 'white',
          borderRadius: '0.5rem',
          boxShadow:
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          width: '100%',
          maxWidth: '32rem',
          maxHeight: '90vh',
          overflow: 'auto',
        })}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.5rem',
            borderBottom: '1px solid',
            borderColor: 'brand.200',
          })}
        >
          {title && (
            <h3
              className={css({
                fontSize: '1.25rem',
                fontWeight: 'semibold',
                color: 'brand.900',
              })}
            >
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            className={css({
              padding: '0.5rem',
              borderRadius: '0.25rem',
              color: 'brand.500',
              transition: 'all 0.2s',
              _hover: {
                bg: 'brand.100',
                color: 'brand.700',
              },
            })}
            aria-label="닫기"
          >
            <svg
              className={css({ width: '1.5rem', height: '1.5rem' })}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 본문 */}
        <div className={css({ padding: '1.5rem' })}>{children}</div>
      </div>
    </div>
  )
}
