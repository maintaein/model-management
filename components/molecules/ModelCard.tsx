'use client'

import { useState } from 'react'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { css, cx } from '@/styled-system/css'
import { Icon } from '@/components/atoms'

export interface ModelCardProps {
  model: {
    name: string
    slug: string
    profileImage: string
    height?: number
    measurements?: string
    nationality?: string
  }
  className?: string
}

export function ModelCard({ model, className }: ModelCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // measurements 파싱 (예: "90-60-90")
  const measurements = model.measurements?.split('-') || []
  const [bust, waist, hip] = measurements

  return (
    <NextLink href={`/model/${model.slug}`}>
      <div
        className={cx(
          css({
            position: 'relative',
            aspectRatio: '2/3',
            borderRadius: 'md',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            _hover: {
              transform: 'scale(1.02)',
            },
          }),
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 프로필 이미지 */}
        <NextImage
          src={model.profileImage}
          alt={model.name}
          fill
          className={css({
            objectFit: 'cover',
          })}
        />

        {/* 기본 상태: 하단 이름 */}
        <div
          className={css({
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: '1rem',
            bg: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
            color: 'white',
            transition: 'opacity 0.3s',
          })}
          style={{ opacity: isHovered ? 0 : 1 }}
        >
          <p
            className={css({
              fontSize: 'lg',
              fontWeight: 'semibold',
              textAlign: 'center',
            })}
          >
            {model.name}
          </p>
        </div>

        {/* 호버 상태: 상세 정보 */}
        <div
          className={css({
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bg: 'modelOverlay',
            color: 'white',
            p: '1.5rem',
            transition: 'opacity 0.3s',
          })}
          style={{ opacity: isHovered ? 0.95 : 0 }}
        >
          {/* 이름 */}
          <h3
            className={css({
              fontSize: '2xl',
              fontWeight: 'bold',
              mb: '1.5rem',
            })}
          >
            {model.name}
          </h3>

          {/* 정보 */}
          <div
            className={css({
              width: '100%',
              fontSize: 'sm',
              lineHeight: 'relaxed',
            })}
          >
            {model.nationality && (
              <div
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: '0.5rem',
                })}
              >
                <span>NATIONALITY</span>
                <span>{model.nationality}</span>
              </div>
            )}
            {model.height && (
              <div
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: '0.5rem',
                })}
              >
                <span>HEIGHT</span>
                <span>{model.height}</span>
              </div>
            )}
            {bust && (
              <div
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: '0.5rem',
                })}
              >
                <span>BUST</span>
                <span>{bust}</span>
              </div>
            )}
            {waist && (
              <div
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: '0.5rem',
                })}
              >
                <span>WAIST</span>
                <span>{waist}</span>
              </div>
            )}
            {hip && (
              <div
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: '0.5rem',
                })}
              >
                <span>HIP</span>
                <span>{hip}</span>
              </div>
            )}
          </div>

          {/* 화살표 버튼 */}
          <div
            className={css({
              mt: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '3rem',
              height: '3rem',
              bg: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 'full',
              transition: 'all 0.2s',
              _hover: {
                bg: 'rgba(255, 255, 255, 0.3)',
              },
            })}
          >
            <Icon name="arrow-right" size="1.5rem" color="white" />
          </div>
        </div>
      </div>
    </NextLink>
  )
}
