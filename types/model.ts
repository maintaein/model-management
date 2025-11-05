import { z } from 'zod'

export const modelSchema = z.object({
  name: z.string().min(1, '이름을 입력하세요'),
  slug: z.string().min(1, 'URL slug를 입력하세요'),
  category: z.enum(['ALL', 'INTOWN', 'UPCOMING']),
  nationality: z.string().min(1, '국적을 입력하세요'),
  profileImage: z.string().min(1, '프로필 이미지 URL을 입력하세요'),
  images: z.array(z.string()).optional(),
  bio: z.string().optional(),
  height: z.number().int().positive().optional(),
  measurements: z.string().optional(),
  instagram: z.string().optional(),
})

export const archiveSchema = z.object({
  title: z.string().min(1, '제목을 입력하세요'),
  images: z.array(z.string()).min(1, '최소 1개 이미지가 필요합니다'),
  modelId: z.string(),
})

export type ModelInput = z.infer<typeof modelSchema>
export type ArchiveInput = z.infer<typeof archiveSchema>

export type { Model, Archive, Category } from '@prisma/client'
