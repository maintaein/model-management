'use client'

import NextImage from 'next/image'
import { HTMLAttributes } from 'react'
import { css, cx } from '@/styled-system/css'

export interface AvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fallback?: string
}

export function Avatar({
  src,
  alt,
  size = 'md',
  fallback,
  className,
  ...props
}: AvatarProps) {
  const sizeMap = {
    sm: '2rem',
    md: '3rem',
    lg: '4rem',
    xl: '6rem',
  }

  const sizeValue = sizeMap[size]

  return (
    <div
      className={cx(
        css({
          position: 'relative',
          display: 'inline-block',
          borderRadius: 'full',
          overflow: 'hidden',
          bg: 'gray.200',
        }),
        className
      )}
      style={{ width: sizeValue, height: sizeValue }}
      {...props}
    >
      {src ? (
        <NextImage
          src={src}
          alt={alt}
          fill
          className={css({
            objectFit: 'cover',
          })}
        />
      ) : (
        <div
          className={css({
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bg: 'gray.300',
            color: 'gray.600',
            fontWeight: 'semibold',
            fontSize: size === 'sm' ? 'sm' : size === 'xl' ? '2xl' : 'base',
          })}
        >
          {fallback || alt.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  )
}
