import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

async function checkTestData() {
  try {
    await prisma.$connect()

    const modelCount = await prisma.model.count()
    const archiveCount = await prisma.archive.count()
    const adminCount = await prisma.admin.count()

    console.log('\n=== Railway DB 현재 데이터 ===')
    console.log(`Model 테이블: ${modelCount}개`)
    console.log(`Archive 테이블: ${archiveCount}개`)
    console.log(`Admin 테이블: ${adminCount}개`)
    console.log('===========================\n')

    if (modelCount > 0) {
      console.log('⚠️ Model 데이터가 존재합니다:')
      const models = await prisma.model.findMany({
        select: { id: true, name: true, slug: true, createdAt: true },
      })
      models.forEach(m => {
        console.log(`  - ${m.name} (${m.slug}) - 생성: ${m.createdAt.toISOString()}`)
      })
      console.log()
    }

    if (archiveCount > 0) {
      console.log('⚠️ Archive 데이터가 존재합니다:')
      const archives = await prisma.archive.findMany({
        select: { id: true, title: true, modelId: true, createdAt: true },
      })
      archives.forEach(a => {
        console.log(`  - ${a.title} (모델 ID: ${a.modelId}) - 생성: ${a.createdAt.toISOString()}`)
      })
      console.log()
    }

    if (modelCount === 0 && archiveCount === 0) {
      console.log('✅ 테스트 데이터가 모두 정리되었습니다!')
    } else {
      console.log('❌ 테스트 데이터가 남아있습니다. 정리가 필요합니다.')
      console.log('\n테스트 데이터를 정리하려면:')
      console.log('  npm run clean-test-data')
    }

  } catch (error) {
    console.error('DB 확인 중 오류:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkTestData()
