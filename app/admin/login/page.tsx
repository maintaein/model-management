'use client'

import { useState, FormEvent } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { css } from '@/styled-system/css'
import { Button, Input } from '@/components/atoms'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다')
        setIsLoading(false)
        return
      }

      if (result?.ok) {
        router.push('/admin')
        router.refresh()
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다')
      setIsLoading(false)
    }
  }

  return (
    <div
      className={css({
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bg: 'gray.50',
        px: '1rem',
      })}
    >
      <div
        className={css({
          width: '100%',
          maxWidth: '28rem',
          bg: 'white',
          borderRadius: 'lg',
          boxShadow: 'lg',
          p: { base: '2rem', md: '3rem' },
        })}
      >
        {/* 로고/제목 */}
        <div className={css({ textAlign: 'center', mb: '2rem' })}>
          <h1
            className={css({
              fontSize: { base: '2xl', md: '3xl' },
              fontWeight: 'bold',
              color: 'primary',
              mb: '0.5rem',
            })}
          >
            TAYLOR&apos;S MODEL
          </h1>
          <p className={css({ fontSize: 'sm', color: 'gray.600' })}>
            관리자 로그인
          </p>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div
            className={css({
              mb: '1.5rem',
              p: '0.75rem',
              bg: 'error',
              color: 'white',
              borderRadius: 'md',
              fontSize: 'sm',
              textAlign: 'center',
            })}
          >
            {error}
          </div>
        )}

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit}>
          <div className={css({ mb: '1.5rem' })}>
            <Input
              type="email"
              label="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className={css({ mb: '2rem' })}>
            <Input
              type="password"
              label="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isLoading}
            disabled={isLoading}
            className={css({ width: '100%' })}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>
        </form>
      </div>
    </div>
  )
}
