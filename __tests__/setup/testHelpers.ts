import type { Category } from '@prisma/client'
import { getTestPrisma } from './testDb'
import { getServerSession } from 'next-auth'

// NextAuth mock 헬퍼
export function mockAuthenticatedSession() {
  ;(getServerSession as jest.Mock).mockResolvedValue({
    user: {
      id: 'test-admin-id',
      email: 'admin@test.com',
    },
  })
}

export function mockUnauthenticatedSession() {
  ;(getServerSession as jest.Mock).mockResolvedValue(null)
}

// 테스트 데이터 팩토리
export async function createTestModel(data?: Partial<{
  name: string
  slug: string
  category: Category
  nationality: string
  profileImage: string
  images: string[]
  bio: string
  height: number
  measurements: string
  instagram: string
}>) {
  const prisma = getTestPrisma()

  return prisma.model.create({
    data: {
      name: data?.name || 'Test Model',
      slug: data?.slug || 'test-model',
      category: data?.category || 'ALL',
      nationality: data?.nationality || 'Korea',
      profileImage: data?.profileImage || 'https://example.com/profile.jpg',
      images: data?.images || ['https://example.com/image1.jpg'],
      bio: data?.bio,
      height: data?.height,
      measurements: data?.measurements,
      instagram: data?.instagram,
    },
  })
}

export async function createTestArchive(modelId: string, data?: Partial<{
  title: string
  images: string[]
}>) {
  const prisma = getTestPrisma()

  return prisma.archive.create({
    data: {
      title: data?.title || 'Test Archive',
      images: data?.images || ['https://example.com/archive1.jpg'],
      modelId,
    },
  })
}
