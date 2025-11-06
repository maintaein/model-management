'use client'

import { HTMLAttributes, ReactNode } from 'react'
import { css, cx } from '@/styled-system/css'

// Heading 컴포넌트
type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel
  children: ReactNode
}

export function Heading({ as: Component = 'h2', className, children, ...props }: HeadingProps) {
  const headingStyles = {
    h1: css({
      fontSize: { base: '2rem', md: '2.5rem', lg: '3rem' },
      fontWeight: 'bold',
      lineHeight: '1.2',
      color: 'brand.900',
    }),
    h2: css({
      fontSize: { base: '1.75rem', md: '2rem', lg: '2.25rem' },
      fontWeight: 'bold',
      lineHeight: '1.3',
      color: 'brand.900',
    }),
    h3: css({
      fontSize: { base: '1.5rem', md: '1.75rem', lg: '1.875rem' },
      fontWeight: 'semibold',
      lineHeight: '1.4',
      color: 'brand.900',
    }),
    h4: css({
      fontSize: { base: '1.25rem', md: '1.5rem' },
      fontWeight: 'semibold',
      lineHeight: '1.4',
      color: 'brand.900',
    }),
    h5: css({
      fontSize: { base: '1.125rem', md: '1.25rem' },
      fontWeight: 'medium',
      lineHeight: '1.5',
      color: 'brand.900',
    }),
    h6: css({
      fontSize: '1rem',
      fontWeight: 'medium',
      lineHeight: '1.5',
      color: 'brand.900',
    }),
  }

  return (
    <Component className={cx(headingStyles[Component], className)} {...props}>
      {children}
    </Component>
  )
}

// Text 컴포넌트
export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: 'sm' | 'base' | 'lg'
  children: ReactNode
}

export function Text({ size = 'base', className, children, ...props }: TextProps) {
  return (
    <p
      className={cx(
        css({
          lineHeight: '1.6',
          color: 'brand.700',
        }),
        size === 'sm' &&
          css({
            fontSize: '0.875rem',
          }),
        size === 'base' &&
          css({
            fontSize: '1rem',
          }),
        size === 'lg' &&
          css({
            fontSize: { base: '1.125rem', md: '1.25rem' },
          }),
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

// Label 컴포넌트
export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  htmlFor?: string
  children: ReactNode
}

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      className={cx(
        css({
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: 'medium',
          color: 'brand.900',
        }),
        className
      )}
      {...props}
    >
      {children}
    </label>
  )
}
