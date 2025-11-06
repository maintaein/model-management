'use client'

import { css, cx } from '@/styled-system/css'
import { Button } from '@/components/atoms'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  maxVisible?: number
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
}: PaginationProps) {
  // 표시할 페이지 번호 계산
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const half = Math.floor(maxVisible / 2)

    let start = Math.max(1, currentPage - half)
    let end = Math.min(totalPages, currentPage + half)

    // 시작 부분 조정
    if (currentPage <= half) {
      end = Math.min(totalPages, maxVisible)
    }

    // 끝 부분 조정
    if (currentPage + half >= totalPages) {
      start = Math.max(1, totalPages - maxVisible + 1)
    }

    // 첫 페이지 추가
    if (start > 1) {
      pages.push(1)
      if (start > 2) {
        pages.push('...')
      }
    }

    // 중간 페이지들 추가
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // 마지막 페이지 추가
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push('...')
      }
      pages.push(totalPages)
    }

    return pages
  }

  const pages = getPageNumbers()

  return (
    <nav
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        marginTop: '2rem',
      })}
      aria-label="페이지네이션"
    >
      {/* 이전 버튼 */}
      <Button
        size="sm"
        variant="secondary"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
      >
        이전
      </Button>

      {/* 페이지 번호들 */}
      <div
        className={css({
          display: 'flex',
          gap: '0.25rem',
        })}
      >
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.5rem',
                  height: '2.5rem',
                  color: 'brand.500',
                })}
              >
                ...
              </span>
            )
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={cx(
                css({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.5rem',
                  height: '2.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 'medium',
                  borderRadius: '0.375rem',
                  transition: 'all 0.2s',
                  border: 'none',
                  cursor: 'pointer',
                }),
                page === currentPage
                  ? css({
                      bg: 'brand.800',
                      color: 'white',
                    })
                  : css({
                      bg: 'white',
                      color: 'brand.700',
                      _hover: {
                        bg: 'brand.100',
                      },
                    })
              )}
              aria-label={`${page}페이지로 이동`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          )
        })}
      </div>

      {/* 다음 버튼 */}
      <Button
        size="sm"
        variant="secondary"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
      >
        다음
      </Button>
    </nav>
  )
}
