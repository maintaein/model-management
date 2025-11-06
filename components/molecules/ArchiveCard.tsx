'use client'

import NextImage from 'next/image'
import NextLink from 'next/link'
import { css, cx } from '@/styled-system/css'

export interface ArchiveCardProps {
  archive: {
    id: string
    title: string
    images: string[] | { url: string }[]
    modelName?: string
  }
  className?: string
}

export function ArchiveCard({ archive, className }: ArchiveCardProps) {
  // 첫 번째 이미지 URL 가져오기
  const firstImage =
    archive.images.length > 0
      ? typeof archive.images[0] === 'string'
        ? archive.images[0]
        : archive.images[0].url
      : '/placeholder.jpg'

  return (
    <NextLink href={`/archive/${archive.id}`}>
      <div
        className={cx(
          css({
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            _hover: {
              transform: 'translateY(-4px)',
              boxShadow: 'lg',
            },
          }),
          className
        )}
      >
        {/* 이미지 */}
        <div
          className={css({
            position: 'relative',
            width: '100%',
            aspectRatio: '4/5',
            borderRadius: 'md',
            overflow: 'hidden',
            bg: 'gray.200',
          })}
        >
          <NextImage
            src={firstImage}
            alt={archive.title}
            fill
            className={css({
              objectFit: 'cover',
            })}
          />
        </div>

        {/* 정보 */}
        <div
          className={css({
            mt: '1rem',
          })}
        >
          {/* 브랜드명 */}
          <h3
            className={css({
              fontSize: 'lg',
              fontWeight: 'bold',
              color: 'primary',
              mb: '0.25rem',
            })}
          >
            {archive.title}
          </h3>

          {/* 모델명 */}
          {archive.modelName && (
            <p
              className={css({
                fontSize: 'sm',
                color: 'gray.600',
              })}
            >
              {archive.modelName}
            </p>
          )}
        </div>
      </div>
    </NextLink>
  )
}
