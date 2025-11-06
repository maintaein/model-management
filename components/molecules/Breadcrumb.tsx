'use client'

import NextLink from 'next/link'
import { css, cx } from '@/styled-system/css'
import { Icon } from '@/components/atoms'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cx(
        css({
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: 'sm',
          color: 'gray.600',
        }),
        className
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div
            key={index}
            className={css({
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            })}
          >
            {item.href && !isLast ? (
              <NextLink
                href={item.href}
                className={css({
                  color: 'gray.600',
                  transition: 'color 0.2s',
                  _hover: {
                    color: 'primary',
                  },
                })}
              >
                {item.label}
              </NextLink>
            ) : (
              <span
                className={cx(
                  isLast &&
                    css({
                      color: 'primary',
                      fontWeight: 'medium',
                    })
                )}
              >
                {item.label}
              </span>
            )}

            {!isLast && <Icon name="arrow-right" size="1rem" color="gray.400" />}
          </div>
        )
      })}
    </nav>
  )
}
