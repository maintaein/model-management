'use client'

import { useState, useEffect } from 'react'
import NextImage from 'next/image'
import { css, cx } from '@/styled-system/css'
import { Icon } from '@/components/atoms'

export interface LightboxGalleryProps {
  images: string[]
  initialIndex?: number
  className?: string
}

export function LightboxGallery({
  images,
  initialIndex = 0,
  className,
}: LightboxGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, images.length])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index)
  }

  if (images.length === 0) {
    return null
  }

  return (
    <div className={cx(css({ width: '100%' }), className)}>
      {/* 메인 이미지 */}
      <div
        className={css({
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          height: { base: '60vh', md: '70vh', lg: '80vh' },
          mx: 'auto',
          bg: 'gray.100',
          borderRadius: 'md',
          overflow: 'hidden',
        })}
      >
        <NextImage
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          fill
          className={css({
            objectFit: 'contain',
          })}
          priority
        />

        {/* 이전 버튼 */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handlePrevious}
            className={css({
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '3rem',
              height: '3rem',
              bg: 'rgba(0, 0, 0, 0.5)',
              borderRadius: 'full',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              _hover: {
                bg: 'rgba(0, 0, 0, 0.7)',
              },
            })}
            aria-label="이전 이미지"
          >
            <Icon name="arrow-left" size="1.5rem" color="white" />
          </button>
        )}

        {/* 다음 버튼 */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className={css({
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '3rem',
              height: '3rem',
              bg: 'rgba(0, 0, 0, 0.5)',
              borderRadius: 'full',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              _hover: {
                bg: 'rgba(0, 0, 0, 0.7)',
              },
            })}
            aria-label="다음 이미지"
          >
            <Icon name="arrow-right" size="1.5rem" color="white" />
          </button>
        )}

        {/* 이미지 카운터 */}
        <div
          className={css({
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            px: '0.75rem',
            py: '0.375rem',
            bg: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            fontSize: 'sm',
            borderRadius: 'md',
          })}
        >
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* 썸네일 리스트 */}
      {images.length > 1 && (
        <div
          className={css({
            mt: '1.5rem',
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            maxWidth: '1200px',
            mx: 'auto',
          })}
        >
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleThumbnailClick(index)}
              className={cx(
                css({
                  position: 'relative',
                  width: { base: '4rem', md: '6rem' },
                  height: { base: '4rem', md: '6rem' },
                  borderRadius: 'sm',
                  overflow: 'hidden',
                  border: '2px solid',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  _hover: {
                    opacity: 1,
                  },
                }),
                index === currentIndex
                  ? css({
                      borderColor: 'primary',
                      opacity: 1,
                    })
                  : css({
                      borderColor: 'transparent',
                      opacity: 0.6,
                    })
              )}
              aria-label={`이미지 ${index + 1}로 이동`}
            >
              <NextImage
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className={css({
                  objectFit: 'cover',
                })}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
