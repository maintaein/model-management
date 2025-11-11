import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import { join } from 'path'

const prismaBinary = join(__dirname, '..', '..', 'node_modules', '.bin', 'prisma')

let prisma: PrismaClient

// 테스트 DB 싱글톤
export function getTestPrisma(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    })
  }
  return prisma
}

// 테스트 DB 초기화 (마이그레이션 실행)
export async function setupTestDatabase(): Promise<void> {
  try {
    // SQLite 테스트 DB 마이그레이션
    execSync(`${prismaBinary} migrate deploy`, {
      env: {
        ...process.env,
        DATABASE_URL: process.env.DATABASE_URL,
      },
    })
  } catch (error) {
    console.error('테스트 DB 마이그레이션 실패:', error)
    throw error
  }
}

// 테스트 DB 정리
export async function cleanDatabase(): Promise<void> {
  const testPrisma = getTestPrisma()

  // 모든 테이블 데이터 삭제 (순서 중요: 외래키 제약조건)
  await testPrisma.archive.deleteMany({})
  await testPrisma.model.deleteMany({})
  await testPrisma.admin.deleteMany({})

  // 연결이 끊기지 않도록 약간의 대기
  await new Promise(resolve => setTimeout(resolve, 100))
}

// 테스트 DB 연결 종료
export async function disconnectDatabase(): Promise<void> {
  if (prisma) {
    await prisma.$disconnect()
  }
}
