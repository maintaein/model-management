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
      log: ['error', 'warn'],
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

    // Prisma 연결 확인
    const testPrisma = getTestPrisma()
    await testPrisma.$connect()
  } catch (error) {
    console.error('테스트 DB 마이그레이션 실패:', error)
    throw error
  }
}

// 테스트 DB 정리
export async function cleanDatabase(): Promise<void> {
  const testPrisma = getTestPrisma()

  // Prisma 연결 확인
  await testPrisma.$connect()

  // 모든 테이블 데이터 삭제 (순서 중요: 외래키 제약조건)
  await testPrisma.archive.deleteMany({})
  await testPrisma.model.deleteMany({})
  await testPrisma.admin.deleteMany({})

  // Railway MySQL 원격 DB의 커밋 완료 대기
  await new Promise(resolve => setTimeout(resolve, 500))

  // 삭제가 완료되었는지 명시적으로 확인
  const modelCount = await testPrisma.model.count()
  const archiveCount = await testPrisma.archive.count()

  if (modelCount > 0 || archiveCount > 0) {
    console.warn(`⚠️ Cleanup incomplete: ${modelCount} models, ${archiveCount} archives remaining`)
    // 추가 대기 후 재시도
    await new Promise(resolve => setTimeout(resolve, 500))
    await testPrisma.archive.deleteMany({})
    await testPrisma.model.deleteMany({})
  }
}

// 테스트 DB 연결 종료
export async function disconnectDatabase(): Promise<void> {
  if (prisma) {
    await prisma.$disconnect()
  }
}
