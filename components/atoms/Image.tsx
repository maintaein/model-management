'use client'

import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { css, cx } from '@/styled-system/css'

export interface ImageProps extends Omit<NextImageProps, 'alt'> {
  alt: string
}

export function Image({ className, ...props }: ImageProps) {
  return (
    <NextImage
      className={cx(
        css({
          display: 'block',
          maxWidth: '100%',
          height: 'auto',
        }),
        className
      )}
      loading="lazy"
      {...props}
    />
  )
}
